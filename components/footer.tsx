"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
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
                <span className="text-xs text-muted-foreground">
                  Since 1992
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Leading supplier of offset printing and paper-converting
              machinery. Trusted across Bangladesh and globally for reliable
              equipment and service.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/stock"
                  className="text-muted-foreground hover:text-primary">
                  Stock Catalogue
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary">
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="text-muted-foreground hover:text-primary">
                  Request Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">
                  Used Machinery Sales
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Equipment Valuation
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Shipping & Delivery
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Installation & Support
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Spare Parts Supply
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">
                    55/2, Farm'r Mor, Paradogair, Matuail, Jatrabari
                  </p>
                  <p className="text-muted-foreground">
                    Dhaka 1362, Bangladesh
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">01711-871147</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  info@seemaenterprisebdbd.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Sat–Thu: 10 AM – 7 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Seema Enterprise. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
