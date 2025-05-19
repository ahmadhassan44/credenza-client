"use client";

import NextLink from "next/link";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Link as HeroLink,
  Avatar,
} from "@heroui/react";

import { useAuth } from "@/context/auth.context";

export function CustomNavbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Navbar
      className="fixed top-6 left-1/2 z-50 border-gray-100 bg-black/60 backdrop-blur-md rounded-xl shadow-lg max-w-4xl w-[95vw] -translate-x-1/2 flex items-center"
      classNames={{
        wrapper: "w-full px-6 flex items-center justify-between min-h-14",
      }}
      isBordered={false}
      style={{ boxShadow: "0 2px 24px 0 #00000040" }}
    >
      <NavbarBrand>
        <NextLink passHref href="/">
          <Image
            priority
            alt="Credenza Logo"
            height={40}
            src="/credenzaLogo.svg"
            width={120}
          />
        </NextLink>
      </NavbarBrand>

      {/* <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <HeroLink
            as={NextLink}
            className="text-white font-medium"
            color="foreground"
            href="/"
          >
            Home
          </HeroLink>
        </NavbarItem>
        <NavbarItem>
          <HeroLink
            as={NextLink}
            className="text-white font-medium"
            color="foreground"
            href="/#features"
          >
            Features
          </HeroLink>
        </NavbarItem>
        <NavbarItem>
          <HeroLink
            as={NextLink}
            className="text-white font-medium"
            color="foreground"
            href="/#pricing"
          >
            Pricing
          </HeroLink>
        </NavbarItem>
        <NavbarItem>
          <HeroLink
            as={NextLink}
            className="text-white font-medium"
            color="foreground"
            href="/about"
          >
            About
          </HeroLink>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarContent justify="end">
        {isAuthenticated ? (          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                name={user ? `${user.firstName} ${user.lastName}` : undefined}
                size="sm"
                src={user?.profilePicture || "/profileTab.svg"}
                fallback={
                  <Image 
                    src="/profileTab.svg"
                    alt="Profile"
                    width={24} 
                    height={24}
                  />
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              {/* <DropdownItem key="welcome">
                <NextLink className="w-full" href="/welcome">
                  Welcome
                </NextLink>
              </DropdownItem> */}
              <DropdownItem key="dashboard">
                <NextLink className="w-full" href="/dashboard">
                  Dashboard
                </NextLink>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="hidden sm:flex">
              <HeroLink as={NextLink} className="text-white" href="/login">
                Login
              </HeroLink>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={NextLink}
                className="bg-[#9E00F9] text-white font-semibold hover:bg-[#CA6EFF] hover:text-white transition-all duration-200"
                color="primary"
                href="/signup"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
