import { ChangeEvent, useRef, useState } from "react"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, addToast } from "@heroui/react";

import lang from "../../locales/fa.json";
import { createWorker } from 'tesseract.js';

export default function Input() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [inputImage, setInputImage] = useState<string | null>();
    const [page, setPage] = useState("title");
    const [text, setText] = useState<string | null>()

    const OCR = async (Image: any) => {
        const worker = await createWorker("fas");
        const result = await worker.recognize(Image);
        setText(result.data.text);
        worker.terminate();
    }

    {/* Input component */ }
    return (
        <>
            <div className="flex-center flex-col md:flex-row gap-5 w-screen">
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
                            OCR(file)

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
                                    <img className="size-7" src="/svgs/upload.svg" alt="" />
                                    <p className="text-base md:text-lg lg:text-xl truncate">{lang.uploadFile}</p>
                                </span>
                                <p className="text-base md:text-lg lg:text-lg text-blue-300 truncate">{lang.clickIt}</p>
                            </> : page == "hover" ?
                                <span className="flex-center flex-row-reverse gap-3">
                                    <img className="size-7 fill-white" src="/svgs/add.svg" alt="" />
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
                        <button


                        >

                        </button>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    className="!py-6 px-8 rounded-xl shadow-2xl bg-blue-600 mt-4 flex-center gap-2"
                                >

                                    <img className="size-6 stroke-white" src="/svgs/share.svg" alt="" />
                                    <p className="text-white">{lang.share}</p>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="share"
                                    onClick={() => {
                                        navigator.share(
                                            {
                                                text: text,
                                                url: document.location.href
                                            }
                                        )
                                    }}>
                                    <span className="text-black text-base font-yekanBakh flex-center flex-row-reverse gap-2">
                                        <img className="size-5 stroke-white" src="/svgs/share-black.svg" alt="" />
                                        <p>{lang.share}</p>
                                    </span>
                                </DropdownItem>

                                <DropdownItem key="copy"
                                    onClick={() => {
                                        navigator.clipboard.writeText(text)
                                        addToast({
                                            title: lang.copyedSuccessfully,
                                            color: "success",
                                            classNames: {
                                                title: "font-yekanBakh"
                                            }
                                        })
                                    }}>
                                    <span className="text-black text-base font-yekanBakh flex-center flex-row-reverse gap-2">
                                        <img className="size-5 stroke-black" src="/svgs/copy.svg" alt="" />
                                        <p>{lang.copy}</p>
                                    </span>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                }
            </div>

            <input
                accept=".png , .jpg"
                type="file" name="" id=""
                hidden
                ref={inputFileRef}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {

                    const files = e.target.files;

                    if (files && files.length > 0) {
                        const file = files[0];
                        OCR(file);

                        const fileURL = URL.createObjectURL(file);
                        setInputImage(fileURL)
                        setPage("show");
                    }
                }}
            />
        </>
    )
}
