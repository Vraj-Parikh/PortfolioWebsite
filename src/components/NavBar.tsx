import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import Hamburger from "hamburger-react";

interface NavItems {
  name: string;
  href: string;
}
const navItems: NavItems[] = [
  {
    name: "About",
    href: "about",
  },
  {
    name: "Projects",
    href: "projects",
  },
  {
    name: "Experience",
    href: "experience",
  },
  {
    name: "Contact",
    href: "contact",
  },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navBarRef: React.Ref<HTMLElement> = useRef(null);
  const [navBarHeight, setNavBarHeight] = useState(0);

  useEffect(() => {
    setNavBarHeight(navBarRef.current?.offsetHeight || 0);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
      }}
      ref={navBarRef}
    >
      <div className="max-w-7xl mx-auto font-bold px-4 md:px-6">
        <div className="flex justify-between items-center py-4">
          <motion.div
            className="text-2xl md:text-3xl font-bold font-inter z-50"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="bg-gradient-to-r from-coral-500 to-coral-600 bg-clip-text text-transparent">
              Vraj Parikh
            </span>
          </motion.div>
          {/* Desktop Menu*/}
          <div className="hidden md:flex justify-between items-center">
            {navItems.map((navItem, idx) => (
              <motion.button
                key={navItem.name + navItem.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (idx + 1) * 0.3 }}
              >
                <Link
                  to={navItem.href}
                  smooth={true}
                  duration={500}
                  className="relative px-4 py-2 text-gray-700 font-bold cursor-pointer group"
                >
                  <motion.span
                    className="inline-block relative transition-colors z-10 duration-200 group-hover:text-gray-900"
                    whileHover={{ scale: 1.1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                    }}
                  >
                    {navItem.name}
                  </motion.span>
                </Link>
              </motion.button>
            ))}
          </div>
          {/* Hamburger Button */}
          <div className="md:hidden flex items-center space-x-2 z-50">
            <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
          </div>
          {isMenuOpen && (
            <div
              className={`fixed inset-0 z-40 md:hidden ${
                isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              />
              {/* Mobile Menu */}
              <div
                className={`absolute left-0 right-0 bottom-0 flex flex-col backdrop-blur-xl bg-white/95  shadow-2xl overflow-hidden items-stretch md:hidden ${
                  isMenuOpen
                    ? "opacity-100 scale-100 translate-x-0"
                    : "opacity-0 scale-90 translate-x-12"
                }`}
                style={{ top: `${navBarHeight}px` }}
              >
                {navItems.map((navItem, idx) => (
                  <motion.button
                    key={navItem.name + navItem.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (idx + 1) * 0.15 }}
                  >
                    <Link
                      to={navItem.href}
                      smooth={true}
                      duration={500}
                      className="relative px-4 py-2 text-gray-700 font-bold cursor-pointer shadow-md inline-block w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.span className="inline-block relative transition-colors z-10">
                        {navItem.name}
                      </motion.span>
                    </Link>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
