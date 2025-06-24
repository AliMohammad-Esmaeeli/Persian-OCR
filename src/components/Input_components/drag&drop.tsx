// Importing dependencies
import { useRef } from "react";

import OCR from "../Process/OCR";

import FileInput from "./fileInput";
import Page from "./pages/Page";

// props type
interface DragAndDropProps {
  page: string;
  setPage: (page: string) => void;
  setText: (text: string) => void;
  setInputImage: (inputImage: string) => void;
  inputImage: string | null | undefined;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

export default function Drag_and_Drop(props: DragAndDropProps) {
  const inputFileRef = useRef<HTMLInputElement>();

  return (
    <>
      <div
        id="drag_and_drop"
        className="upload-component bg-white w-[80vw] md:w-[60vw] lg:w-[35vw] h-56 md:h-60 flex-col overflow-hidden relative"
        onClick={(e) => {
          e.preventDefault();
          inputFileRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          props.setPage("OnDragOver");
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          props.setPage("UploadPage");
        }}
        onDrop={(e) => {
          e.preventDefault();
          const files = e.dataTransfer.files;
          props.setLoading(true);

          if (files.length > 0) {
            const file = files[0];
            OCR(file, props.setText);

            const fileURL = URL.createObjectURL(file);
            props.setInputImage(fileURL);
            props.setPage("ShowImage");
            props.setLoading(false);
          }
        }}
      >
        <Page
          page={props.page}
          inputImage={props.inputImage!}
          loading={props.loading}
        />
      </div>
      <FileInput
        inputFileRef={inputFileRef}
        setInputImage={props.setInputImage}
        setPage={props.setPage}
        setText={props.setText}
        setLoading={props.setLoading}
      />
    </>
  );
}
