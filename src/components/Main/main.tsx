// Importing components
import { useState } from "react";
import Switch from "../Button/switch";
import Input from "../Input_components/input";

// Importing Svgs
import person_svg from "../../assets/svgs/person.svg";
import document_svg from "../../assets/svgs/document.svg";
import FaceDetection from "../FaceDetection/faceDetection";

export default function Main() {
  const [_switch, _setSwitch] = useState("Mode_1");

  return (
    <>
      <main className="flex-center flex-col gap-5 w-screen mt-[5vh]">
        <Switch
          image_1={document_svg}
          image_2={person_svg}
          setSwitch={_setSwitch}
        />

        {_switch === "Mode_1" ? <Input /> : <FaceDetection />}
      </main>
    </>
  );
}
