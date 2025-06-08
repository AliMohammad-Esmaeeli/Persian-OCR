import { useRef, useState } from "react";

// Importing dependencies
import useTextStore from "../../state management/store";
// import { summarizeText, translateText } from "../Process/TextProcessor";
import { useLanguage } from "../../locales/locales";

// Importing components
import ShareButton from "../Button/shareButton";
import FileInput from "./fileInput";

// Importing SVGs
import Drag_and_Drop from "./drag&drop";
import SummarizeButton from "../Button/SummarizeButton";
// import TranslateButton from "../Button/TranslateButton";

export default function Input() {
  const { translations } = useLanguage();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [inputImage, setInputImage] = useState<string | null>();
  const [page, setPage] = useState("title");

  const { text, setText, summary, translation } =
    useTextStore();

  // setTargetLanguage,

  return (
    <>
      <div className="flex-center flex-col md:flex-row gap-5 w-screen">
        {/* Drag & Drop component */}
        <Drag_and_Drop
          inputFileRef={inputFileRef}
          setInputImage={setInputImage}
          inputImage={inputImage}
          page={page}
          setPage={setPage}
          setText={setText}
        />

        {/* Display recognized text */}
        {text && (
          <div className="w-1/2 flex flex-col">
            <div className="rtl flex flex-col gap-3">
              {text && <p className="text-xl">{translations.text}</p>}
              <p className="text-base leading-8"> {text} </p>

              {/* Displaying the summary and translation */}

              {summary && <p className="text-xl">{translations.summarized}</p>}
              {summary && <p className="text-base leading-8">{summary}</p>}

              {translation && <p className="text-xl">{translations.translated}</p>}
              {translation && (
                <p className="text-base leading-8">{translation}</p>
              )}
            </div>

            {/* Buttons for share, translate & summarize text  */}
            <div className="flex-center flex-col md:flex-row gap-0 md:gap-3">
              <ShareButton Text={text} />
              {/* <TranslateButton /> */}
              <SummarizeButton />
            </div>
          </div>
        )}
      </div>

      <FileInput
        inputFileRef={inputFileRef}
        setInputImage={setInputImage}
        setPage={setPage}
        setText={setText}
      />
    </>
  );
}
