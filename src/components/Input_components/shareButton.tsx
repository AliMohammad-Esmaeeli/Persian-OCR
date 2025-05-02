import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, addToast } from "@heroui/react";
import lang from "../../locales/fa.json";

import shareSvg from "../../assets/svgs/share.svg";
import shareBlackSvg from "../../assets/svgs/share-black.svg";
import copySvg from "../../assets/svgs/copy.svg";

export default function ShareButton(Text: any) {
    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="!py-6 px-8 rounded-xl shadow-2xl bg-blue-600 mt-4 flex-center gap-2"
                    >

                        <img className="size-6 stroke-white" src={shareSvg} alt="" />
                        <p className="text-white">{lang.share}</p>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="share"
                        onClick={() => {
                            navigator.share(
                                {
                                    text: Text,
                                    url: document.location.href
                                }
                            )
                        }}>
                        <span className="text-black text-base font-yekanBakh flex-center flex-row-reverse gap-2">
                            <img className="size-5 stroke-white" src={shareBlackSvg} alt="" />
                            <p>{lang.share}</p>
                        </span>
                    </DropdownItem>

                    <DropdownItem key="copy"
                        onClick={() => {
                            navigator.clipboard.writeText(Text)
                            addToast({
                                title: lang.copyedSuccessfully,
                                color: "success",
                                classNames: {
                                    title: "font-yekanBakh"
                                }
                            })
                        }}>
                        <span className="text-black text-base font-yekanBakh flex-center flex-row-reverse gap-2">
                            <img className="size-5 stroke-black" src={copySvg} alt="" />
                            <p>{lang.copy}</p>
                        </span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
