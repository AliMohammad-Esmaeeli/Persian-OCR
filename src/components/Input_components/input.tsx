import { useRef, useState } from "react"

import uploadSvg from "../../assets/svgs/upload.svg";
import addSvg from "../../assets/svgs/add.svg";

import OCR from "./OCR";
import ShareButton from "./shareButton";
import FileInput from "./fileInput";
import lang from "../../locales/fa.json";

export default function Input() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [inputImage, setInputImage] = useState<string | null>();
    const [page, setPage] = useState("title");
    const [text, setText] = useState<string | null>()



    {/* Input component */ }
    return (
        <>
            <div className="flex-center flex-col md:flex-row gap-5 w-screen mt-[26vh]">
                <div
                    className="upload-component bg-white w-[80vw] md:w-[60vw] lg:w-[35vw] h-56 md:h-60 flex-col overflow-hidden"
                    onClick={(e) => {
                        e.preventDefault();
                        inputFileRef.current?.click()
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setPage("hover")
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        setPage("title")
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        const files = e.dataTransfer.files;

                        if (files.length > 0) {
                            const file = files[0];
                            OCR(file, setText)

                            const fileURL = URL.createObjectURL(file);
                            setInputImage(fileURL)
                            setPage("show")
                        }
                    }}
                >

                    {
                        page === "title" ?
                            <>
                                <span className="flex-center flex-row-reverse gap-3">
                                    <img className="size-7" src={uploadSvg} alt="" />
                                    <p className="text-base md:text-lg lg:text-xl truncate">{lang.uploadFile}</p>
                                </span>
                                <p className="text-base md:text-lg lg:text-lg text-blue-300 truncate">{lang.clickIt}</p>
                            </> : page == "hover" ?
                                <span className="flex-center flex-row-reverse gap-3">
                                    <img className="size-7 fill-white" src={addSvg} alt="" />
                                    <p className="text-base md:text-lg lg:text-xl truncate">{lang.dropFile}</p>
                                </span>
                                :
                                inputImage && <img src={inputImage} alt="" />

                    }

                </div>

                {
                    text &&
                    <div className="rtl w-1/2 ">
                        <p className="text-base leading-8">
                            {text}
                        </p>
                        <ShareButton Text={text} />
                    </div>
                }
            </div>

            <FileInput
                inputFileRef={inputFileRef}
                setInputImage={setInputImage}
                setPage={setPage}
                setText={setText}
            />
        </>
    )
}
