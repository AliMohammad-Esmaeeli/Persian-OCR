// Importing dependencies
import { RefObject } from "react";

import OCR from "../Process/OCR";
import lang from "../../locales/fa.json";

// Importing SVGs
import uploadSvg from "../../assets/svgs/upload.svg";
import addSvg from "../../assets/svgs/add.svg";

// props type
interface DragAndDropProps {
    inputFileRef: RefObject<HTMLInputElement>;
    page: string;
    setPage: (page: string) => void;
    setText: (text: string) => void;
    setInputImage: (inputImage: string) => void;
    inputImage: string | null | undefined
}

export default function Drag_and_Drop(props: DragAndDropProps) {
    return (
        <>
            <div
                className="upload-component bg-white w-[80vw] md:w-[60vw] lg:w-[35vw] h-56 md:h-60 flex-col overflow-hidden"
                onClick={(e) => {
                    e.preventDefault();
                    props.inputFileRef.current?.click()
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    props.setPage("hover")
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    props.setPage("title")
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    const files = e.dataTransfer.files;

                    if (files.length > 0) {
                        const file = files[0];
                        OCR(file, props.setText)

                        const fileURL = URL.createObjectURL(file);
                        props.setInputImage(fileURL)
                        props.setPage("show")
                    }
                }}
            >

                {
                    props.page === "title" ?
                        <>
                            <span className="flex-center flex-row-reverse gap-3">
                                <img className="size-7" src={uploadSvg} alt="" />
                                <p className="text-base md:text-lg lg:text-xl truncate">{lang.uploadFile}</p>
                            </span>
                            <p className="text-base md:text-lg lg:text-lg text-blue-300 truncate">{lang.clickIt}</p>
                        </> : props.page == "hover" ?
                            <span className="flex-center flex-row-reverse gap-3">
                                <img className="size-7 fill-white" src={addSvg} alt="" />
                                <p className="text-base md:text-lg lg:text-xl truncate">{lang.dropFile}</p>
                            </span>
                            :
                            props.inputImage && <img src={props.inputImage} alt="" />

                }

            </div>
        </>
    )
}
