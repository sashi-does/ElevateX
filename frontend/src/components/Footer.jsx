import { Link } from "react-scroll";

const Footer = ({ theme }) => {
  console.log(theme);
  return (
    <footer
      className={`relative bg-gradient-to-b ${
        theme === "schedule"
          ? "from-[#0B0708] to-[#2e1a00ac]"
          : "from-[#060816] to-[#019da526]"
      } py-12 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="space-y-4">
            <img
              className="w-30 h-8 opacity-[85%]"
              src={
                theme !== "schedule"
                  ? "https://res.cloudinary.com/dvukdxs2m/image/upload/v1741979882/openskill-blue_bvrhs4.png"
                  : "https://res.cloudinary.com/dvukdxs2m/image/upload/v1741979882/openskill-orange_dr21gx.png"
              }
              alt="logo"
            />
            <p className="text-slate-400 text-sm">
              Transforming Ideas Into Digital Excellence
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link
              to="home"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={`text-slate-400 hover:${
                theme === "schedule" ? "text-orange-400" : "text-white"
              } active:${
                theme === "schedule" ? "text-orange-600" : "text-blue-400"
              } cursor-pointer transition-colors text-sm`}
            >
              Home
            </Link>
            <Link
              to="services"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={`text-slate-400 hover:${
                theme === "schedule" ? "text-orange-400" : "text-white"
              } active:${
                theme === "schedule" ? "text-orange-600" : "text-blue-400"
              } cursor-pointer transition-colors text-sm`}
            >
              Services
            </Link>
            <Link
              to="portfolio"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={`text-slate-400 hover:${
                theme === "schedule" ? "text-orange-400" : "text-white"
              } active:${
                theme === "schedule" ? "text-orange-600" : "text-blue-400"
              } cursor-pointer transition-colors text-sm`}
            >
              Portfolio
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={`text-slate-400 hover:${
                theme === "schedule" ? "text-orange-400" : "text-white"
              } active:${
                theme === "schedule" ? "text-orange-600" : "text-blue-400"
              } cursor-pointer transition-colors text-sm`}
            >
              Contact
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a
              href="/privacy-policy"
              className={`text-slate-400 hover:${
                theme === "schedule" ? "text-orange-400" : "text-white"
              } cursor-pointer transition-colors text-sm`}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className={`text-slate-400 hover:${
                theme === "schedule" ? "text-orange-400" : "text-white"
              } cursor-pointer transition-colors text-sm`}
            >
              Terms & Conditions
            </a>
            <a
              href="/cookies"
              className={`text-slate-400 hover:${
                theme === "schedule" ? "text-orange-400" : "text-white"
              } cursor-pointer transition-colors text-sm`}
            >
              Cookie Policy
            </a>
            <a
              href="/faq"
              className={`text-slate-400 hover:${
                theme === "schedule" ? "text-orange-400" : "text-white"
              } cursor-pointer transition-colors text-sm`}
            >
              FAQ
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/50 text-center text-slate-400 text-sm">
          <p>© 2025 DigitalAgency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;