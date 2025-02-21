"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Rocket, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { useSession, signOut ,   } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar =  () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { data: session } = useSession();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-gray-900/70 border-b border-gray-800/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-purple-500" />
            <span className="text-xl font-bold text-gradient">Bountyverse</span>
          </div>

          {!isMobile ? (
            <>
              <NavigationMenu>
                <NavigationMenuList>
                  {/* ... existing menu items ... */}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Bounties
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Categories
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Leaderboard
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Companies
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex items-center gap-4">
                {session?.user ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 hover:bg-gray-800/50"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={session.user.image ?? undefined} />
                          <AvatarFallback>
                            {session.user.name?.[0] || session.user.email?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-gray-200 max-w-[120px] truncate">
                          {session.user.name || session.user.email}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2 bg-gray-800 border-gray-700">
                      <Link href="/account/profile">
                        <Button
                          //onClick={() => signOut()}
                          variant="ghost"
                          className="w-full justify-start text-red-400 hover:bg-gray-700/50"
                        >
                          Profile
                        </Button>
                      </Link>
                      <Link href="/account/profile/edit">
                        <Button
                          //onClick={() => signOut()}
                          variant="ghost"
                          className="w-full justify-start text-red-400 hover:bg-gray-700/50"
                        >
                           Edit Profile
                        </Button>
                      </Link>

                      
                      <Button
                        onClick={() => signOut()}
                        variant="ghost"
                        className="w-full justify-start text-red-400 hover:bg-gray-700/50"
                      >
                        Notification
                      </Button>

                      <Button
                        onClick={() => signOut()}
                        variant="ghost"
                        className="w-full justify-start text-red-400 hover:bg-gray-700/50"
                      >
                        Sign Out
                      </Button>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <>
                    <Link href="/sign-in">
                      <Button variant="ghost">Sign In</Button>
                    </Link>
                    <Link href="/get-started">
                      <Button className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="py-4 space-y-4">
              <nav className="flex flex-col space-y-2">
                {/* ... existing mobile menu items ... */}
                <a
                  href="#"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  Bounties
                </a>

                <a
                  href="#"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  Categories
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  Leaderboard
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  Companies
                </a>
              </nav>
              <div className="flex flex-col space-y-2 px-4 ">
                {session?.user ? (
                  <Button
                    onClick={() => signOut()}
                    className="w-full justify-center bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Link href="/auth/signin">
                      <Button variant="ghost" className="w-full justify-center">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/get-started">
                      <Button className="w-full justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;
