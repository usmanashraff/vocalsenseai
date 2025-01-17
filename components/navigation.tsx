'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MenuIcon, XIcon, AudioLines } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";





export function Navigation({isAuth}: any) {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const routes = [
    {
      href: "/feedback",
      label: "Feedback",
    },
    {
      href: "/about",
      label: "About",
    },
    
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="pl-6 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center space-x-2">
          <AudioLines className='font-bold' />
            <span className="text-xl font-bold text-primary">
              
              VocalsenseAI</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-6 ml-6 justify-end pr-2 ">
          <div className="flex">
          {isAuth &&   <button className=" hover:bg-purple-500 hover:text-white p-2 rounded-sm mx-2 text-sm transition-all">
            <LogoutLink>Log out</LogoutLink>


          </button>}
          {!isAuth &&   <button className=" hover:bg-purple-500 hover:text-white p-2 rounded-sm mx-2 text-sm transition-all">
            <LoginLink >Login</LoginLink>

          </button>}
          {!isAuth &&   <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 font-medium transition-all flex items-center text-sm rounded-sm">
            <RegisterLink>Sign up</RegisterLink>

          </button>}
          </div>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-purple-600"
                  : "text-foreground/60"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto hidden md:inline-flex"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <XIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-background border-t flex flex-col items-center justify-center space-y-2">
          {!isAuth &&   <button className=" text-gray-300 hover:text-white px-8 p-2 text-sm transition-all mt-2">
            <LoginLink >Login</LoginLink>

          </button>}
          {!isAuth &&   <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 font-medium transition-all flex items-center text-sm rounded-sm">
            <RegisterLink>Sign up</RegisterLink>

          </button>}
          <ul className="flex flex-col items-center space-y-4 py-4">
            {routes.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === route.href
                      ? "text-purple-600"
                      : "text-foreground/60"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                >
                  {route.label}
                </Link>
              </li>
            ))}
            <li>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setTheme(theme === "light" ? "dark" : "light");
                  setIsMobileMenuOpen(false); // Close menu on theme toggle
                }}
              >
                <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
