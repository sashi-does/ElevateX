import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#190D07] to-bg-slate-950/90 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              DigitalAgency
            </h1>
            <p className="text-slate-400 mt-2">Transforming Ideas Into Digital Excellence</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="home"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="text-slate-400 hover:text-orange-400 cursor-pointer transition-colors"
            >
              Home
            </Link>
            <Link
              to="services"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="text-slate-400 hover:text-orange-400 cursor-pointer transition-colors"
            >
              Services
            </Link>
            <Link
              to="portfolio"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="text-slate-400 hover:text-orange-400 cursor-pointer transition-colors"
            >
              Portfolio
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="text-slate-400 hover:text-orange-400 cursor-pointer transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-400">
          <a
            href="/privacy-policy"
            className="hover:text-orange-400 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:text-orange-400 transition-colors"
          >
            Terms & Conditions
          </a>
          <a
            href="/cookies"
            className="hover:text-orange-400 transition-colors"
          >
            Cookie Policy
          </a>
          <a
            href="/faq"
            className="hover:text-orange-400 transition-colors"
          >
            FAQ
          </a>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800/50 text-center text-slate-400">
          <p>© 2025 DigitalAgency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;