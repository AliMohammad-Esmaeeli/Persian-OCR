import { useState } from "react";
import axios from "axios";
import { useLanguage } from "../../locales/locales";
import useTextStore from "../../state management/store";
import Loading from "../Loading/loading";
import translateSvg from "../../assets/svgs/translate.svg";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
  addToast,
} from "@heroui/react";
import { AddCookie, GetCookie } from "../Cookie/cookie";

// https://restcountries.com/v3.1/all?fields=languages,flags

export default function TranslateButton() {
  const languages = [
    {
      name: "English",
      flag: "https://hatscripts.github.io/circle-flags/flags/us.svg",
      code: "en",
    },
    {
      name: "Français",
      flag: "https://hatscripts.github.io/circle-flags/flags/fr.svg",
      code: "fr",
    },
    {
      name: "Deutsch",
      flag: "https://hatscripts.github.io/circle-flags/flags/de.svg",
      code: "de",
    },
    {
      name: "Spanish",
      flag: "https://hatscripts.github.io/circle-flags/flags/es.svg",
      code: "es",
    },
  ];
  const { translations } = useLanguage();
  const { text, setTranslation } = useTextStore();
  const [selectedLanguage, setSelectedLanguage] = useState<string>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const handleTranslate = async () => {
    if (GetCookie("Useage") === "3") {
      addToast({
        title: translations.warningLimitTitle,
        description: translations.warningLimitDescription,
        color: "warning",
        classNames: {
          title: "font-yekanBakh !text-sm !text-red-500",
          description: "font-yekanBakh !text-xs !text-red-400",
        },
      });
    } else {
      const BACKEND_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
        import.meta.env.GEMINI_API_KEY
      }`;
      setLoading(true);
      setError("");
      setTranslation("");
      try {
        const response = await axios.post(BACKEND_URL, {
          contents: [
            {
              parts: [
                {
                  text: `Translate the following text in ${selectedLanguage}: ${text}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          },
        });
        if (
          response.data &&
          response.data.candidates &&
          response.data.candidates.length > 0 &&
          response.data.candidates[0].content &&
          response.data.candidates[0].content.parts &&
          response.data.candidates[0].content.parts.length > 0 &&
          response.data.candidates[0].content.parts[0].text
        ) {
          const actualTranslation =
            response.data.candidates[0].content.parts[0].text;
          setTranslation(actualTranslation);
          switch (GetCookie("Useage")) {
            case "0":
            case null:
            case undefined:
            default:
              AddCookie("Useage", "1");
              break;
            case "1":
              AddCookie("Useage", "2");
              break;
            case "2":
              AddCookie("Useage", "3");
              break;
          }
        } else {
          setError(
            "Could not extract Translation from Gemini API response. Response structure might be unexpected."
          );
          console.error(
            "Unexpected Gemini API response structure:",
            response.data
          );
        }
      } catch (error: any) {
        console.error("Error sending text to backend:", error);
        setError(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="group relative">
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="button flex-row-reverse"
            isDisabled={loading || !text}
          >
            {loading ? (
              <Loading />
            ) : error ? (
              <p className="text-lg text-center text-red-600 truncate">
                {error}
              </p>
            ) : (
              <>
                <p className="text-white">{translations.translate}</p>
                <img className="size-6" src={translateSvg} alt="translate" />
              </>
            )}
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Language selection"
          className="max-h-96 overflow-y-auto"
        >
          {languages.map((language) => {
            return (
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
                onPress={() => {
                  setSelectedLanguage(language.code);
                  handleTranslate();
                }}
              >
                <p className="text-base text-black font-inter text-center">
                  {language.name}
                </p>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
      <span className="hidden group-hover:block text-sm text-center text-white bg-black px-3 py-2 rounded-md absolute mt-2 after:rotate-45 after:absolute after:!bg-black after:size-4 after:rounded-sm after:bottom-16 after:left-1/2 after:right-1/2 after:z-50">
        {translations.translatePopover}
      </span>
    </div>
  );
}
