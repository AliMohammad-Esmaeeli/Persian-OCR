import Footer from "./components/footer";
import Input from "./components/Input_component/input";


export default function App() {
  return (
    <div className="bg-[#faf3ea] min-h-dvh w-screen scroll-smooth overflow-x-hidden select-none appearance-none font-yekanBakh flex-center flex-col">
      {/* Input component */}
      <Input />
      <Footer />
    </div>
  )
}