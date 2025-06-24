import { useLanguage } from "../../../locales/locales";

// Importing SVGs
import uploadSvg from "../../../assets/svgs/upload.svg";

export default function Upload_section() {
  const { translations } = useLanguage();
  return (
    <>
      <span className="flex-center flex-row-reverse gap-3">
        <img className="size-7" src={uploadSvg} alt="" />
        <p className="text-base md:text-lg lg:text-xl truncate">
          {translations.uploadFile}
        </p>
      </span>
      <p className="text-base md:text-lg lg:text-lg text-blue-300 truncate">
        {translations.clickIt}
      </p>
    </>
  );
}
