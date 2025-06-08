import { useState } from "react";
import axios from "axios";
import { Button } from "@heroui/react";
import Loading from "../Loading/loading";
import { useLanguage } from "../../locales/locales";
import useTextStore from "../../state management/store";
import GeminiSvg from "../../assets/svgs/gemini.svg";

export default function SummarizeButton() {
  const { translations } = useLanguage();

  const { text, setSummary } = useTextStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    const BACKEND_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
      import.meta.env.GEMINI_API_KEY
    }`;
    if (!text.trim()) {
      setError("Please enter some text to summarize.");
      return;
    }
    setLoading(true);
    setError("");
    setSummary("");
    try {
      const response = await axios.post(BACKEND_URL, {
        contents: [
          {
            parts: [
              {
                text: `Summarize the following text in persian: ${text}`,
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
        const actualSummary = response.data.candidates[0].content.parts[0].text;
        setSummary(actualSummary);
      } else {
        setError(
          "Could not extract summary from Gemini API response. Response structure might be unexpected."
        );
        console.error(
          "Unexpected Gemini API response structure:",
          response.data
        );
      }
    } catch (error: any) {
      console.error("Error sending text to backend:", error);
      setError(error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="group relative">
      <Button
        className="button flex-row-reverse gap-4"
        onPress={handleSummarize}
      >
        {loading ? (
          <Loading />
        ) : error ? (
          <p className="text-lg text-red-600 text-center truncate">{error}</p>
        ) : (
          <>
            <p className="text-white">{translations.summarize}</p>
            <img className="size-5" src={GeminiSvg} alt="" />
          </>
        )}
      </Button>
      <span className="hidden group-hover:block text-sm text-center text-white bg-black px-3 py-2 rounded-md absolute mt-2 after:rotate-45 after:absolute after:!bg-black after:size-4 after:rounded-sm after:bottom-16 after:left-1/2 after:right-1/2 after:z-50">
        {translations.summarizePopover}
      </span>
    </div>
  );
}
