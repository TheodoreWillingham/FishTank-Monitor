import { useState } from "react";
import { cn } from "../lib/utils";
import { X, Menu } from "lucide-react";

const navItems = [
  { name: "Main", href: "#intro" },
  { name: "Monitor", href: "#monitor" },
  { name: "History", href: "#history" },
  { name: "Donate", href: "#donate" },
];

export const NavBar = () => {
  //handles if menu is open or not (default false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="w-full flex items-center justify-between px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 py-4">
          {/* Left side - Logo */}
          <a
            href="#intro"
            className="text-xl font-bold text-primary flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>
              Theo&apos;s <span className="text-secondary">Reef</span> Tank
            </span>
          </a>

          {/* Right side - Nav links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-secondary transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* menu button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 bg-bakground/95 backdrop-blur-md z-35 flex flex-col items-center justify-center",
          "transition-all duration-300 md:hidden",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col space-y-2 items-center">
          {navItems.map((item, key) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-primary  transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
