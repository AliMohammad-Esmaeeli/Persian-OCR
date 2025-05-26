import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from "../../locales/locales";
import useTextStore from "../../state management/store";

// Importing SVGs
import translateSvg from "../../assets/svgs/translate.svg";

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Input,
    Button,
    Avatar,
} from "@heroui/react";
import { translateText } from '../Process/TextProcessor';

interface Language {
    code: string;
    name: string;
    flag: string;
}

interface CountryApiResponse {
    languages?: Record<string, string>;
    flags: {
        png: string;
    };
}

export default function LanguageDropdown() {
    const { translations } = useLanguage();
    const [languages, setLanguages] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get<CountryApiResponse[]>(
                    'https://restcountries.com/v3.1/all?fields=languages,flags'
                );

                const languageSet = new Set<string>();
                const languagesList: Language[] = [];

                response.data.forEach((country) => {
                    if (country.languages) {
                        Object.entries(country.languages).forEach(([code, name]) => {
                            const languageKey = `${code}-${name}`;
                            if (!languageSet.has(languageKey)) {
                                languageSet.add(languageKey);
                                languagesList.push({
                                    code,
                                    name,
                                    flag: country.flags?.png || ''
                                });
                            }
                        });
                    }
                });

                languagesList.sort((a, b) => a.name.localeCompare(b.name));
                setLanguages(languagesList);
            } catch (err) {
                setError('Failed to load languages. Please try again later.');
                console.error('Error fetching languages:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLanguages();
    }, []);

    const filteredLanguages = languages.filter((lang) =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return <div className="text-danger">{error}</div>;
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="bordered"
                    className="button"
                >
                    {isLoading &&
                        <svg className="mr-3 -ml-1 size-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    }
                    {selectedLanguage ?
                        <div className="flex items-center gap-2">
                            <Avatar
                                src={selectedLanguage.flag}
                                className="w-6 h-4"
                                radius="none"
                            />
                            <span>{selectedLanguage.name}</span>
                        </div>
                        :
                        <>
                            <p className="text-white">{translations.translate}</p>
                            <img className="size-6" src={translateSvg} alt="translate" />
                        </>
                    }
                </Button>
            </DropdownTrigger>

            <DropdownMenu
                aria-label="Language selection"
                className="max-h-96 overflow-y-auto"
                items={[
                    // This is a dummy item to satisfy the type system
                    { key: 'search', isReadOnly: true },
                    ...filteredLanguages.map(lang => ({
                        key: lang.code,
                        name: lang.name,
                        flag: lang.flag
                    }))
                ]}
            >
                {(item: any) => {
                    if (item.key === 'search') {
                        return (
                            <DropdownItem key="search" isReadOnly>
                                <Input
                                    placeholder="Search languages..."
                                    value={searchTerm}
                                    onChange={(e: any) => setSearchTerm(e.target.value)}
                                    classNames={{
                                        inputWrapper: "bg-default-100"
                                    }}
                                />
                            </DropdownItem>
                        );
                    }
                    return (
                        <DropdownItem
                            key={item.key}
                            startContent={
                                <Avatar
                                    src={item.flag}
                                    className="w-6 h-4"
                                    radius="none"
                                />
                            }
                            onClick={() => {
                                const selected = languages.find(lang => lang.code === item.key);
                                if (selected) setSelectedLanguage(selected);
                                useTextStore.setState({ targetLanguage: selected?.code });
                                translateText();
                            }}
                        >
                            {item.name}
                        </DropdownItem>
                    );
                }}
            </DropdownMenu>
        </Dropdown>
    );
}