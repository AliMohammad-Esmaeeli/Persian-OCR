import OnDragOver from "../pages/OnDragOver";
import Upload_section from "../pages/Upload_section";
import ShowImage from "./ShowImage";

interface PropsType {
  page: string;
  loading: boolean;
  inputImage: string;
}

export default function Page(props: PropsType) {
  switch (props.page) {
    case "UploadPage":
    default:
      return <Upload_section />;
      break;
    case "OnDragOver":
      return <OnDragOver />;
      break;
    case "ShowImage":
      return (
        <ShowImage loading={props.loading} inputImage={props.inputImage} />
      );
      break;
  }
}
