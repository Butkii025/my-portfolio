import { LuArrowUp } from "react-icons/lu";
import GradientText from "./ui/GradientText";

export default function Footer() {
  const iconSize = 18;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-2 sm:mt-1">
      <div className="pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4">
          <p className="text-xs sm:text-xs text-zinc-500 text-center sm:text-center">
            © {currentYear} P_Vijay. All rights reserved .
          </p>
          
          <button
            onClick={scrollToTop}
            className="cursor-pointer inline-flex items-center gap-2 text-xs sm:text-xs text-zinc-500 hover:text-blue-400 transition-colors duration-300 group active:scale-95 px-3 py-2 sm:px-0 sm:py-0 rounded-lg sm:rounded-none hover:bg-zinc-800/50 sm:hover:bg-transparent"
            aria-label="Scroll to top"
          ><GradientText
                  colors={["#5227FF", "#FF9FFC", "#B497CF"]}
                  animationSpeed={1}
                  showBorder={false}
                  className="py-3 px-1 mt-3 inline"
                >
                  Back to top    <LuArrowUp />         

                </GradientText>
            
            <LuArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}