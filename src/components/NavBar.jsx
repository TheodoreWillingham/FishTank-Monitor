import { cn } from "../lib/utils";

const navItems = [
  { name: "Main", href: "#intro" },
  { name: "Monitor", href: "#monitor" },
  { name: "History", href: "#history" },
  { name: "Donate", href: "#donate" },
];

export const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="w-full flex items-center justify-between px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 py-4">
        {/* Left side - Logo */}
        <a
          href="#intro"
          className="text-xl font-bold text-primary flex items-center"
        >
          <span>
            Theo&apos;s <span className="text-secondary">Reef</span> Tank
          </span>
        </a>

        {/* Right side - Nav links */}
        <div className="flex items-center space-x-8">
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
      </div>
    </nav>
  );
};
