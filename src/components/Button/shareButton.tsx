import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, addToast, Button } from "@heroui/react";
import { useLanguage } from "../../locales/locales";

import shareSvg from "../../assets/svgs/share.svg";
import shareBlackSvg from "../../assets/svgs/share-black.svg";
import copySvg from "../../assets/svgs/copy.svg";

export default function ShareButton(Text: any) {
    const { translations } = useLanguage();
    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="button"
                    >
                        <img className="size-6 stroke-white" src={shareSvg} alt="" />
                        <p className="text-white">{translations.share}</p>
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
                            <p>{translations.share}</p>
                        </span>
                    </DropdownItem>

                    <DropdownItem key="copy"
                        onClick={() => {
                            navigator.clipboard.writeText(Text)
                            addToast({
                                title: translations.copyedSuccessfully,
                                color: "success",
                                classNames: {
                                    title: "font-yekanBakh"
                                }
                            })
                        }}>
                        <span className="text-black text-base font-yekanBakh flex-center flex-row-reverse gap-2">
                            <img className="size-5 stroke-black" src={copySvg} alt="" />
                            <p>{translations.copy}</p>
                        </span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
