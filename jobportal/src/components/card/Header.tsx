"use client";

import { Briefcase } from "lucide-react";
import Link from "next/link";
import DialogCard from "./DialogCard";
import SearchBarInput from "../SearchBarInput";
import AddJob from "./AddJob";
import { ThemeToggle } from "../ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className=" items-center space-x-2 hidden md:flex">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Next Hire</span>
          </Link>
          <nav className="hidden md:flex space-x-8 ">
            <Link
              href="/jobs"
              className="font-medium hover:text-blue-600 transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              href="/company"
              className="font-medium hover:text-blue-600 transition-colors"
            >
              Company
            </Link>
            <Link
              href="/saved"
              className="font-medium hover:text-blue-600 transition-colors"
            >
              Saved Jobs
            </Link>
            <AddJob />
          </nav>
          <nav className="flex items-center justify-center md:hidden">
            <SearchBarInput />
          </nav>

          <div className="p-2 flex items-center justify-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <DialogCard />
          </div>

        </div>
      </div>
    </header>
  );
}
