"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, Phone, Mail } from "lucide-react";
import Image from "next/image";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/stock", label: "Stock Catalogue" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden md:flex items-center justify-end py-2 text-sm text-muted-foreground border-b">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+880 1711-871147</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@seemaenterprise.com</span>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Seema Enterprise Logo"
              width={40}
              height={40}
              className="h-16 w-16 object-contain rounded-md"
              priority
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">
                Seema Enterprise
              </span>
              <span className="text-xs text-muted-foreground">Since 1992</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/stock" passHref>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex bg-transparent">
                <Search className="h-4 w-4 mr-2" />
                Search Stock
              </Button>
            </Link>

            <Link href="/contact" passHref>
              <Button size="sm" className="hidden md:flex">
                Get Quote
              </Button>
            </Link>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}>
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <Link href="/stock" passHref>
                      <Button className="w-full mb-2">
                        <Search className="h-4 w-4 mr-2" />
                        Search Stock
                      </Button>
                    </Link>
                    <Link href="/contact" passHref>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent">
                        Get Quote
                      </Button>
                    </Link>
                  </div>
                  <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>+880 1711-871147</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>info@seemaenterprise.com</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
