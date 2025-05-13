import Link from "next/link";
import { Button } from "@heroui/react";

const Footer = () => (
  <footer className="relative z-10 w-full bg-[#18122B] border-t border-[#9E00F9]/20 py-12 px-6 mt-auto">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex-1 mb-8 md:mb-0">
        <h3 className="text-xl font-semibold text-white mb-2">
          Ready to understand your creator credit score?
        </h3>
        <Button
          as={Link}
          className="bg-gradient-to-r from-[#9E00F9] to-[#CA6EFF] font-semibold hover:scale-105 px-8 py-3 rounded-xl shadow-lg text-white transition-all duration-200"
          href="/signup"
          size="lg"
        >
          Get Started for Free
        </Button>
      </div>
      <div className="flex-[2] grid grid-cols-2 sm:grid-cols-4 gap-8 w-full">
        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>
              <Link className="hover:text-[#9E00F9] transition" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#9E00F9] transition" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <a className="hover:text-[#9E00F9] transition" href="/careers">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Resources</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>
              <a className="hover:text-[#9E00F9] transition" href="/help">
                Help Center
              </a>
            </li>
            <li>
              <a className="hover:text-[#9E00F9] transition" href="/api-docs">
                API Docs
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>
              <a className="hover:text-[#9E00F9] transition" href="mailto:support@credenza.ai">
                support@credenza.ai
              </a>
            </li>
            <li>
              <a className="hover:text-[#9E00F9] transition" href="https://linkedin.com" rel="noopener noreferrer" target="_blank">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="hover:text-[#9E00F9] transition" href="https://twitter.com" rel="noopener noreferrer" target="_blank">
                Twitter
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Legal</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>
              <a className="hover:text-[#9E00F9] transition" href="/terms">
                Terms of Service
              </a>
            </li>
            <li>
              <a className="hover:text-[#9E00F9] transition" href="/privacy">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="mt-10 text-center text-gray-500 text-xs">
      © 2025 Credenza Technologies Inc. All rights reserved.
    </div>
  </footer>
);

export default Footer;
