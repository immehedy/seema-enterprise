"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Mail, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMachinesOpen, setIsMachinesOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
  ];

  // Define your machine categories organized by columns
  const machineColumns = [
    {
      title: "Pre-Press",
      items: [
        { href: "/stock", label: "All Machine" },
      ],
    },
    {
      title: "Post-Press",
      items: [
        { href: "/stock", label: "All Machine" },
      ],
    },
    {
      title: "Printing",
      items: [
        { href: "/stock", label: "All Machine" },
      ],
    },
  ];
  

  // Flatten for mobile view
  const allMachineItems = machineColumns.flatMap(column => column.items);

  const afterMachinesItems = [
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full md:w-[80%] mx-auto bg-white">
      <nav className="relative w-full shadow-md">
        <div className="container mx-auto px-0 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="">
            <Image
              src="/logo.svg"
              alt="Seema Enterprise"
              title="Seema Enterprise"
              width={40}
              height={40}
              className=" object-cover h-auto w-[200px] md:w-[300px] mt-5"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex items-center ml-4 space-x-0">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 px-3 hover:text-blue-700 transition-colors text-gray-700 font-normal">
                    {item.label}
                  </Link>
                </li>
              ))}
              
              {/* Machines Dropdown - Desktop with Multiple Columns */}
              <li 
                className="relative"
                onMouseEnter={() => setIsMachinesOpen(true)}
                onMouseLeave={() => setIsMachinesOpen(false)}
              >
                <button className="flex items-center gap-1 py-3 px-3 hover:text-blue-700 transition-colors text-gray-700 font-normal">
                  Machines
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMachinesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMachinesOpen && machineColumns?.length >= 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-md py-4 px-4">
                    <div 
                      className="grid gap-6"
                      style={{ 
                        gridTemplateColumns: `repeat(${machineColumns.length}, minmax(200px, 1fr))` 
                      }}
                    >
                      {machineColumns?.map((column: any, idx: number) => (
                        <div key={idx} className="px-2 min-w-0">
                          <h3 className="font-semibold text-sm text-gray-900 mb-3 px-2 text-wrap">
                            {column.title}
                          </h3>
                          <div className="space-y-1">
                            {column.items.map((machine: any) => (
                              <Link
                                key={machine?.href}
                                href={machine?.href}
                                className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-700 transition-colors rounded text-wrap"
                              >
                                {machine?.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              {afterMachinesItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 px-3 hover:text-blue-700 transition-colors text-gray-700 font-normal">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Language Selector & Contact Info - Desktop */}
          <div className="hidden lg:flex items-center pr-3 gap-4">
            {/* Contact Info */}
            <div className="flex flex-col gap-0">
              <Link
                href="tel:+8801711871147"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-700 transition-colors py-1">
                <Phone className="h-4 w-4" />
                <span className="font-semibold whitespace-nowrap xl:inline hidden">
                  +880 1711-871147
                </span>
              </Link>
              <Link
                href="mailto:info@seemaenterprisebd.com"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700 transition-colors py-1">
                <Mail className="h-4 w-4" />
                <span className="font-semibold whitespace-nowrap xl:inline hidden">
                  info@seemaenterprisebd.com
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-20 w-20 border-0 rounded-none hover:bg-gray-50"
                aria-label="Toggle navigation">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full sm:w-[400px] p-0 overflow-auto">
              <div className="bg-white h-full">
                {/* Mobile Header */}
                <div className="bg-gray-100 p-4 text-center">
                  <h2 className="text-xl font-normal uppercase tracking-wide">
                    Menu
                  </h2>
                </div>

                {/* Mobile Contact Info - Top */}
                <div className="flex border-b justify-center">
                  <Link
                    href="tel:+8801711871147"
                    className="flex items-center justify-center gap-1 px-2 py-4 flex-1 border-r hover:bg-gray-50">
                    <Phone className="h-3 w-3" />
                    <span className="text-xs font-semibold">
                      +880 1711-871147
                    </span>
                  </Link>
                  <Link
                    href="mailto:info@seemaenterprisebd.com"
                    className="flex items-center justify-center gap-1 px-2 py-4 flex-1 hover:bg-gray-50">
                    <Mail className="h-3 w-3" />
                    <span className="text-xs font-semibold">
                      info@seemaenterprisebd.com
                    </span>
                  </Link>
                </div>

                {/* Mobile Navigation Links */}
                <ul className="flex flex-col">
                  {navItems.map((item) => (
                    <li key={item.href} className="border-b">
                      <Link
                        href={item.href}
                        className="block py-4 px-4 hover:bg-gray-50 text-gray-700"
                        onClick={() => setIsOpen(false)}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  
                  {/* Machines Dropdown - Mobile (Grouped by Category) */}
                  <li className="border-b">
                    <button
                      onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                      className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 text-gray-700"
                    >
                      <span>Machines</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isMobileDropdownOpen && (
                      <div className="bg-gray-50">
                        {machineColumns.map((column: any, idx: any) => (
                          <div key={idx} className="border-t first:border-t-0">
                            <div className="px-6 py-2 text-xs font-semibold text-gray-600 uppercase">
                              {column.title}
                            </div>
                            {column.items.map((machine: any) => (
                              <Link
                                key={machine.href}
                                href={machine.href}
                                className="block py-3 px-8 hover:bg-gray-100 text-gray-600 text-sm"
                                onClick={() => setIsOpen(false)}
                              >
                                {machine.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>

                  {afterMachinesItems.map((item) => (
                    <li key={item.href} className="border-b">
                      <Link
                        href={item.href}
                        className="block py-4 px-4 hover:bg-gray-50 text-gray-700"
                        onClick={() => setIsOpen(false)}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Bottom spacing */}
                <div className="h-32"></div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}