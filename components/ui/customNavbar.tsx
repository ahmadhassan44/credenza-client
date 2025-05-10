"use client";

import NextLink from "next/link";
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

import { CredenzaLogo } from "./credenzaLogo";

import { useAuth } from "@/context/auth.context";

export function CustomNavbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Navbar
      className="bg-black/60 backdrop-blur-sm border-b border-gray-800"
      classNames={{
        wrapper: "max-w-full px-6",
      }}
    >
      <NavbarBrand>
        <NextLink passHref href="/">
          <CredenzaLogo />
        </NextLink>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
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
      </NavbarContent>

      <NavbarContent justify="end">
        {isAuthenticated ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                name={user ? `${user.firstName} ${user.lastName}` : undefined}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="dashboard">
                <NextLink className="w-full" href="/dashboard">
                  Dashboard
                </NextLink>
              </DropdownItem>
              <DropdownItem key="settings">Account Settings</DropdownItem>
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
                className="text-white"
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
