import { Bell, CircleUserRound, Search, Menu, X, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { ModeToggle } from "../components/mode-toggle";
import { Input } from "../components/ui/input";
import DarkLogo from "../images/vergedraft-dark-mode.png";
import LightLogo from "../images/vergedraft-light-mode.png";
import { useTheme } from "@/components/theme-provider";

export default function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const searchRef = useRef(null);

  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const springConfig = { stiffness: 300, damping: 30 };
  const searchWidth = useSpring(400, springConfig);

  useEffect(() => {
    searchWidth.set(isSearchExpanded ? 600 : 400);
  }, [isSearchExpanded, searchWidth]);

  useEffect(() => {
    if (isSearchExpanded && searchRef.current) {
      setTimeout(() => {
        searchRef.current.focus();
      }, 100);
    }
  }, [isSearchExpanded]);

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      if (!searchValue) {
        setIsSearchExpanded(false);
      }
    }, 200);
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full border-b border-gray-200/30 dark:border-gray-700/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <motion.div
            className="flex items-center flex-shrink-0 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <motion.img
              src={currentTheme === "dark" ? DarkLogo : LightLogo}
              className="w-8 h-8 sm:w-10 sm:h-10"
              alt="Logo"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <motion.div className="ml-2 relative">
              <motion.p
                className="font-[exo+2] italic font-semibold text-base sm:text-lg whitespace-nowrap relative z-10 text-gray-900 dark:text-gray-100  bottom-0.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                VERGE DRAFT
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Desktop Search Bar */}
          <motion.div
            className="hidden md:flex flex-1 mx-8 relative justify-center"
            style={{ maxWidth: searchWidth }}
            onHoverStart={() => setIsSearchHovered(true)}
            onHoverEnd={() => setIsSearchHovered(false)}
          >
            <motion.div
              className="relative w-full"
              animate={{
                scale: isSearchExpanded ? 1 : 1,
                y: isSearchExpanded ? -2 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              <Input
                ref={searchRef}
                className={`relative w-full pl-12 pr-12 py-3 rounded-full transition-all duration-300 ease-out
                  ${
                    isSearchExpanded
                      ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                  } 
                  border hover:bg-white dark:hover:bg-gray-800 
                  focus:outline-none focus:bg-white dark:focus:bg-gray-800
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
                  text-gray-900 dark:text-gray-100`}
                type="text"
                placeholder={
                  isSearchExpanded
                    ? "Type to search amazing content..."
                    : "Search mind blowing blogs..."
                }
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClick={handleSearchClick}
                onBlur={handleSearchBlur}
              />

              <motion.div
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                animate={{
                  scale: isSearchExpanded ? 1.1 : 1,
                  rotate: isSearchExpanded ? 90 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Search
                  className={`transition-colors duration-300 ${
                    isSearchExpanded
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                  size={20}
                />
              </motion.div>

              <AnimatePresence mode="wait">
                {isSearchExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        rotate: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    >
                      <Sparkles className="text-yellow-500" size={18} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <ModeToggle />
            </motion.div>
            <motion.button
              className="relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Bell size={20} />
              <motion.span
                className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
            <motion.button
              className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <CircleUserRound size={20} />
            </motion.button>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Search size={20} />
            </motion.button>
            <ModeToggle />
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "menu"}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isSearchExpanded && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <div className="pb-3 px-2">
                <motion.div
                  className="relative"
                  initial={{ scale: 0.95, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Input
                    className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-gray-400 dark:focus:border-gray-500 transition-all duration-200"
                    type="text"
                    placeholder="Search mind blowing blogs..."
                    autoFocus
                  />
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                    size={18}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-gray-200/30 dark:border-gray-700/30"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.nav
                className="py-3 space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {[
                  { icon: Bell, label: "Notifications" },
                  { icon: CircleUserRound, label: "Profile" },
                ].map((item, index) => (
                  <motion.button
                    key={item.label}
                    className="flex items-center gap-3 px-4 py-2.5 w-full hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    whileHover={{ x: 4, backgroundColor: "rgba(0,0,0,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <item.icon size={20} />
                    </motion.div>
                    <span className="font-medium">{item.label}</span>
                    {item.label === "Notifications" && (
                      <motion.span
                        className="ml-auto w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.8, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
