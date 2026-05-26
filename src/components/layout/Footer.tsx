"use client";

import React from "react";
import Link from "next/link";

interface NavLink {
  name: string;
  href: string;
}

interface ServiceLink {
  name: string;
  href: string;
}

const quickLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Booking", href: "/booking" },
  { name: "Gallery", href: "/gallery" },
  { name: "Estimate", href: "/estimate" },
  { name: "Contact", href: "/contact" },
];

const servicesList: ServiceLink[] = [
  { name: "Home Cleaning", href: "/services#home" },
  { name: "Office Cleaning", href: "/services#office" },
  { name: "Carpet Cleaning", href: "/services#carpet" },
  { name: "Deep Sanitization", href: "/services#sanitization" },
  { name: "Post Construction", href: "/services#post-construction" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    const message = `Hello Deep Cleaning et! I'm interested in your cleaning services.`;
    const phoneNumber = "251XXXXXXXXX"; // Replace with actual WhatsApp number
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-1">
              <span className="text-xl md:text-2xl font-light tracking-tight text-gray-900">
                Deep Cleaning
              </span>
              <span className="text-xl md:text-2xl font-medium text-gray-900">
                et
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Premium deep cleaning services in Ethiopia for homes and
              businesses. Experience the highest standard of cleanliness with
              our professional team.
            </p>

            {/* Social/Trust Badge */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500">Rated 4.9/5</span>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-gray-900 transition-colors duration-300 text-sm group flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-1.5 h-0.5 bg-gray-900 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {servicesList.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-500 hover:text-gray-900 transition-colors duration-300 text-sm group flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-1.5 h-0.5 bg-gray-900 transition-all duration-300"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              {/* Phone */}
              <li className="flex items-start gap-3 group">
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors duration-300 -shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                  <a
                    href="tel:+251XXXXXXXXX"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
                  >
                    +251 XXX XXX XXX
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3 group">
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors duration-300 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Email</p>
                  <a
                    href="mailto:info@deepcleaninget.com"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
                  >
                    info@deepcleaninget.com
                  </a>
                </div>
              </li>

              {/* Location */}
              <li className="flex items-start gap-3 group">
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors duration-300 -shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Location</p>
                  <p className="text-gray-600 text-sm">Addis Ababa, Ethiopia</p>
                </div>
              </li>
            </ul>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.576 2.032.885 3.151.886h.002c3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.585-5.768-5.766-5.768zm2.015 8.06c-.243.683-1.412 1.334-1.998 1.396-.527.056-.985.125-2.392-.539-1.563-.736-2.662-2.266-2.75-2.382-.088-.116-1.006-1.336-.699-2.355.202-.666.977-1.046 1.615-1.098.206-.017.367.019.515.116.413.27.826 1.058.939 1.328.113.27.169.525.032.828-.089.203-.223.332-.406.508-.218.218-.348.334-.566.564-.135.143-.07.314.032.455.399.562 1.154 1.315 1.959 1.642.228.092.435.15.641.15.441 0 .776-.305.877-.631.166-.537-.112-1.125-.355-1.505-.371-.58-1.107-1.528-1.779-1.906-.405-.228-.64-.346-.961-.129-.499.338-.505.901-.44 1.238.076.398.362.972.848 1.448.394.388.92.675 1.472.85.493.157 1.075.172 1.545.054z" />
              </svg>
              <span className="text-sm font-medium">Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-xs text-center md:text-left">
              © {currentYear} Deep Cleaning et. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300 text-xs"
              >
                Privacy Policy
              </a>
              <span className="text-gray-300 text-xs">|</span>
              <a
                href="/terms"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300 text-xs"
              >
                Terms of Service
              </a>
              <span className="text-gray-300 text-xs">|</span>
              <a
                href="/cookies"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300 text-xs"
              >
                Cookie Policy
              </a>
            </div>

            {/* Design Credit */}
            <p className="text-gray-400 text-xs text-center md:text-right">
              Premium cleaning service for Ethiopia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
