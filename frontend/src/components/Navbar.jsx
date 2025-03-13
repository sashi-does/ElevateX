import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', to: 'home' },
  { name: 'Services', to: 'services' },
  { name: 'Portfolio', to: 'portfolio' },
  { name: 'Testimonials', to: 'testimonials' },
  { name: 'Contact', to: 'contact' },
];

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    if (!isHomePage) {
      window.scrollTo(0, 0);
    }
  };

  const renderNavLink = (link) => {
    if (isHomePage) {
      return (
        <ScrollLink
          key={link.name}
          to={link.to}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="text-secondary hover:text-white cursor-pointer transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          {link.name}
        </ScrollLink>
      );
    }
    return (
      <RouterLink
        key={link.name}
        to={`/#${link.to}`}
        className="text-secondary hover:text-white cursor-pointer transition-colors"
        onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}
      >
        {link.name}
      </RouterLink>
    );
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glassmorphism py-5 bg-white' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RouterLink 
            to="/" 
            onClick={handleLogoClick}
            className="text-2xl font-bold violet-gradient"
          >
            Logo
          </RouterLink>
        </motion.div>

        <div className="hidden md:flex space-x-8">
          {navLinks.map(renderNavLink)}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 glassmorphism"
        >
          <div className="px-6 py-4 space-y-4">
            {navLinks.map(renderNavLink)}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;