import Loading from "../../Loading/loading";

interface PropsType {
  loading: boolean;
  inputImage: string;
}
export default function ShowImage(props: PropsType) {
  return (
    <>
      {props.loading && (
        <Loading className="absolute inset-1/2 z-50 !size-8 " />
      )}
      <img src={props.inputImage} alt="" />
    </>
  );
}
