// Importing components
import Header from "./components/Header/header";
import Main from "./components/Main/main";
import Footer from "./components/Footer/footer";
import { useLanguage } from "./locales/locales";

import { addToast } from "@heroui/react";
import { useEffect } from "react";

export default function App() {
  const { language, translations } = useLanguage();

  useEffect(() => {
    addToast({
      title: translations.cookieTitle,
      description: translations.cookieDescription,
      color: "primary",
      classNames: {
        title: "font-yekanBakh",
        description: "font-yekanBakh !text-xs",
      },
    });
  }, [language]);

  return (
    <div
      className={`bg-[#faf3ea] min-h-dvh w-screen scroll-smooth overflow-x-hidden select-none appearance-none flex-center flex-col ${
        language === "fa" ? "font-yekanBakh" : "font-inter"
      }`}
    >
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
