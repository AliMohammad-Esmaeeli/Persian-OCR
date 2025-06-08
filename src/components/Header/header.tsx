import SquareButton from "../Button/squareButton";
import world_svg from "../../assets/svgs/world.svg";
import github_svg from "../../assets/svgs/github.svg";
import { useLanguage } from "../../locales/locales";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";

export default function Header() {
    const languages = [
        { code: "fa", label: "فارسی", flag: "🇮🇷" },
        { code: "en", label: "English", flag: "🇬🇧" },
        { code: "fr", label: "Français", flag: "🇫🇷" },
        { code: "de", label: "Deutsch", flag: "🇩🇪" },
    ];

    const { language, setLanguage, translations } = useLanguage();

    return (
        <header className="w-screen">
            <nav className="flex-end gap-5 mt-5 mx-5">
                <Dropdown>
                    <DropdownTrigger>
                        <SquareButton
                            icon={world_svg}
                            text={translations.choiceLang}
                        />
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Language Selection"
                        onAction={key => {
                            setLanguage(key as string);
                        }}
                        selectedKeys={[language]}
                        selectionMode="single"
                    >
                        {languages.map(lang => (
                            <DropdownItem key={lang.code} startContent={<span className="font-iosEmoji">{lang.flag}</span>}>
                                {lang.label}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>

                <a href="https://github.com/AliMohammad-Esmaeeli/Persian-OCR" target="_blank" rel="noopener noreferrer">
                    <SquareButton
                        icon={github_svg}
                        text={translations.github}
                    />
                </a>
            </nav>
        </header>
    );
}