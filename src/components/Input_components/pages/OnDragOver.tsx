import { useLanguage } from "../../../locales/locales";

// Importing SVGs
import addSvg from "../../../assets/svgs/add.svg";

export default function OnDragOver() {
  const { translations } = useLanguage();
  return (
    <>
      <span className="flex-center flex-row-reverse rtl:flex-row gap-3">
        <img className="size-7 fill-white" src={addSvg} alt="" />
        <p className="text-base md:text-lg lg:text-xl truncate">
          {translations.dropFile}
        </p>
      </span>
    </>
  );
}
