
interface SwitchPropsType {
    image_1: string,
    image_2: string
    setSwitch: (text: string) => void;
}

export default function Switch(props: SwitchPropsType) {
    return (
        <>
            <div className="switch">
                <span className="flex-between gap-6 flex-row-reverse">
                    <img src={props.image_1} alt="" className="size-6" />
                    <img src={props.image_2} alt="" className="size-6" />
                </span>
                <div
                    className="rounded-full size-9 bg-white -translate-x-5 absolute transition-all duration-300 ease-in-out flex-center cursor-pointer"
                    onClick={(div) => {
                        if (div.currentTarget.classList.contains("translate-x-5")) {
                            div.currentTarget.classList.remove("translate-x-5");
                            div.currentTarget.classList.add("-translate-x-5");
                            props.setSwitch("Mode_1")
                        } else {
                            div.currentTarget.classList.remove("-translate-x-5");
                            div.currentTarget.classList.add("translate-x-5");
                            props.setSwitch("Mode_2")
                        }
                    }}
                ></div>
            </div>
        </>
    )
}
