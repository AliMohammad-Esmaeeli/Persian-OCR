import { ChangeEvent } from "react";
import OCR from "../Process/OCR";

interface FileInputProps {
  inputFileRef: any;
  setText: (text: string) => void;
  setInputImage: (url: string) => void;
  setPage: (page: string) => void;
  setLoading: (loading: boolean) => void;
}

export default function FileInput(props: FileInputProps) {
  return (
    <>
      <input
        accept=".png , .jpg"
        type="file"
        name=""
        id=""
        hidden
        ref={props.inputFileRef}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;

          if (files && files.length > 0) {
            props.setLoading(true);
            const file = files[0];
            OCR(file, props.setText);

            const fileURL = URL.createObjectURL(file);
            props.setInputImage(fileURL);
            props.setPage("ShowImage");
            props.setLoading(false);
          }
        }}
      />
    </>
  );
}
