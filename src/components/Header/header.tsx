import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import SquareButton from "../Button/squareButton";

import { useEffect } from "react";
import { useLanguage } from "../../locales/locales";

import world_svg from "../../assets/svgs/world.svg";
import github_svg from "../../assets/svgs/github.svg";

export default function Header() {
  const languages = [
    {
      code: "fa",
      name: "فارسی",
      flag: "https://hatscripts.github.io/circle-flags/flags/ir.svg",
      dir: "rtl",
    },
    {
      code: "en",
      name: "English",
      flag: "https://hatscripts.github.io/circle-flags/flags/us.svg",
      dir: "ltr",
    },
    {
      code: "fr",
      name: "Français",
      flag: "https://hatscripts.github.io/circle-flags/flags/fr.svg",
      dir: "ltr",
    },
    {
      code: "de",
      name: "Deutsch",
      flag: "https://hatscripts.github.io/circle-flags/flags/de.svg",
      dir: "ltr",
    },
    {
      code: "es",
      name: "Español",
      flag: "https://hatscripts.github.io/circle-flags/flags/es.svg",
      dir: "ltr",
    },
    { 
      code: "auto", 
      name: "System language", 
      flag: "https://em-content.zobj.net/source/apple/419/strawberry_1f353.png",
      dir: "ltr" // Added default direction for auto
    },
  ];

  const { language, setLanguage, translations } = useLanguage();

  // Handle language change and document attributes
  useEffect(() => {
    const html = document.documentElement;
    const currentLanguage = languages.find((l) => l.code === language);
    
    if (currentLanguage) {
      html.lang = language;
      html.dir = currentLanguage.dir;
    }
  }, [language]);

  const autoDetectLanguage = () => {
    if (!navigator) {
      setLanguage("fa");
      return;
    }

    const browserLang = navigator.language.split('-')[0]; // Get base language code
    const supportedCodes = languages.map(l => l.code);
    
    if (supportedCodes.includes(browserLang)) {
      setLanguage(browserLang);
    } else {
      setLanguage("fa"); // Default to Farsi
    }
  };

  const handleLanguageChange = (key: string) => {
    if (key === "auto") {
      autoDetectLanguage();
    } else {
      setLanguage(key);
    }
  };

  return (
    <header className="w-screen">
      <nav className="flex-end rtl:flex-start gap-5 mt-5 mx-5">
        <Dropdown>
          <DropdownTrigger>
            <SquareButton icon={world_svg} text={translations.choiceLang} />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Language Selection"
            onAction={(key) => handleLanguageChange(key as string)}
            selectedKeys={[language]}
            selectionMode="single"
          >
            {languages.map((lang) => (
              <DropdownItem
                key={lang.code}
                className="flex-between flex-row rtl:flex-row-reverse"
                startContent={
                  <Avatar
                    src={lang.flag}
                    className="size-8"
                    radius="full"
                    alt={lang.name}
                  />
                }
              >
                <p className="text-base text-black font-inter text-center">
                  {lang.name}
                </p>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <a
          href="https://github.com/AliMohammad-Esmaeeli/Persian-OCR"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SquareButton icon={github_svg} text={translations.github} />
        </a>
      </nav>
    </header>
  );
}