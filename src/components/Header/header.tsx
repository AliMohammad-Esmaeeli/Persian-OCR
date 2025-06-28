import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import SquareButton from "../Button/squareButton";

import { useLanguage } from "../../locales/locales";

import world_svg from "../../assets/svgs/world.svg";
import github_svg from "../../assets/svgs/github.svg";

export default function Header() {
  const languages = [
    {
      code: "fa",
      name: "فارسی",
      flag: "https://hatscripts.github.io/circle-flags/flags/ir.svg",
    },
    {
      code: "en",
      name: "English",
      flag: "https://hatscripts.github.io/circle-flags/flags/us.svg",
    },
    {
      code: "fr",
      name: "Français",
      flag: "https://hatscripts.github.io/circle-flags/flags/fr.svg",
    },
    {
      code: "de",
      name: "Deutsch",
      flag: "https://hatscripts.github.io/circle-flags/flags/de.svg",
    },
    {
      code: "es",
      name: "Spanish",
      flag: "https://hatscripts.github.io/circle-flags/flags/es.svg",
    },
    { code: "auto", name: "System language", flag: "🖥" },
  ];

  const { language, setLanguage, translations } = useLanguage();

  return (
    <header className="w-screen">
      <nav className="flex-end gap-5 mt-5 mx-5">
        <Dropdown>
          <DropdownTrigger>
            <SquareButton icon={world_svg} text={translations.choiceLang} />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Language Selection"
            onAction={(key) => {
              if (key === "auto") {
                if (navigator) {
                  switch (navigator.language) {
                    case "en-US":
                    case "en":
                      setLanguage("en");
                      break;
                    case "fr-FR":
                    case "fr":
                      setLanguage("fr");
                      break;
                    case "de-DE":
                    case "de":
                      setLanguage("de");
                      break;
                    default:
                      setLanguage("fa");
                  }
                } else {
                  setLanguage("fa");
                }
              } else {
                setLanguage(key as string);
              }
            }}
            selectedKeys={[language]}
            selectionMode="single"
          >
            {languages.map((language) => (
              <DropdownItem
                key={language.code}
                startContent={
                  <Avatar
                    src={language.flag}
                    className="size-8"
                    radius="full"
                    alt={language.name}
                  />
                }
              >
                <p className="text-base text-black font-inter text-center">{language.name}</p>
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
