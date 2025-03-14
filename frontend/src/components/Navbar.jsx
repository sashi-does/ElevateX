import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


const Navbar = ({ isMenuOpen, setIsMenuOpen, theme }) => {
  const navLinks = theme === "Home" ? [
    { name: "Home", to: "home" },
    { name: "Services", to: "services" },
    { name: "Portfolio", to: "portfolio" },
    { name: "Testimonials", to: "testimonials" },
    { name: "Contact", to: "contact" },
  ] : [
    { name: "Back", to: "home" },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const hoverColor = theme === "Home" ? "hover:text-cyan-500" : "hover:text-orange-400";
  const activeTextColor = theme === "Home" ? "text-cyan-500" : "text-[#edc380]";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    if (!isHomePage) {
      window.scrollTo(0, 0);
    }
  };

  const handleSetActive = (to) => {
    setActiveSection(to);
  };

  const renderNavLink = (link) => {
    const isActive = activeSection === link.to;
    const activeStyles = isActive 
      ? `${activeTextColor}` 
      : "";

    if (isHomePage) {
      return (
        <ScrollLink
          key={link.name}
          to={link.to}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          onSetActive={() => handleSetActive(link.to)}
          className={`block relative text-gray-300 ${hoverColor} cursor-pointer transition-colors duration-300 py-2 text-center md:text-left ${activeStyles}`}
        >
          {link.name}
        </ScrollLink>
      );
    }
    return (
      <RouterLink
        key={link.name}
        to={`/#${link.to}`}
        className={`block text-gray-300 ${hoverColor} cursor-pointer transition-colors duration-300 py-2 text-center md:text-left ${activeStyles}`}
        onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}
      >
        {link.name}
      </RouterLink>
    );
  };

  const menuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled || isMenuOpen ? "glassmorphism bg-white py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RouterLink
              to="/"
              onClick={handleLogoClick}
              className="text-2xl font-bold"
            >
              <img
  className="w-28 sm:w-32 md:w-34 lg:w-38 h-auto opacity-[85%] max-w-full"
  src={
    theme === "Home"
      ? "https://res.cloudinary.com/dvukdxs2m/image/upload/v1741979882/openskill-blue_bvrhs4.png"
      : "https://res.cloudinary.com/dvukdxs2m/image/upload/v1741979882/openskill-orange_dr21gx.png"
  }
  alt="logo"
/>
            </RouterLink>
          </motion.div>

          <div className="hidden md:flex space-x-8 relative">
            {navLinks.map(renderNavLink)}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="py-4 space-y-2"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {renderNavLink(link)}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;