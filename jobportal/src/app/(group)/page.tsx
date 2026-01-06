import React from "react";
import {
  Briefcase,
  Building2,
  TrendingUp,
  Users,
  Clock,
  Search,
} from "lucide-react";
import Link from "next/link";
import AddJob from "@/components/card/AddJob";

export default function page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              #1 Job Platform for Tech Professionals
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Find Your
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text block mt-2">
                Dream Career
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with top companies and discover opportunities that match
              your skills and ambitions. Your next career move starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/jobs"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 w-full sm:w-auto shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1"
              >
                <Search className="h-5 w-5 mr-2" />
                Browse Jobs
              </Link>
              <Link
                href="/company"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 dark:text-white transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 w-full sm:w-auto shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <Building2 className="h-5 w-5 mr-2" />
                Explore Companies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-500 mb-2">50K+</div>
              <div className="font-medium text-gray-600 dark:text-gray-400">Active Jobs</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-extrabold text-purple-600 dark:text-purple-500 mb-2">
                10K+
              </div>
              <div className="font-medium text-gray-600 dark:text-gray-400">Companies</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-extrabold text-pink-600 dark:text-pink-500 mb-2">1M+</div>
              <div className="font-medium text-gray-600 dark:text-gray-400">Job Seekers</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-extrabold text-green-600 dark:text-green-500 mb-2">95%</div>
              <div className="font-medium text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose Next Hire?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We connect talented professionals with amazing opportunities
              through our innovative platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Smart Matching
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our AI-powered algorithm matches you with the most relevant job
                opportunities based on your skills and preferences.
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Top Companies
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Connect with leading companies across industries, from startups
                to Fortune 500 enterprises.
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-pink-500/20 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300">
              <div className="w-14 h-14 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-7 w-7 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Quick Applications
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Apply to multiple jobs with just one click using your saved
                profile and tailored resumes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs
            through Next Hire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl hover:-translate-y-1"
            >
              Create Account
            </Link>
            <Link
              href="/learn-more"
              className="bg-blue-700/50 backdrop-blur-sm border border-blue-400/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700/70 transition-all hover:-translate-y-1"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <Briefcase className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold text-white">Next Hire</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Connecting talent with opportunity. Your career journey starts
                here.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">For Job Seekers</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/jobs" className="hover:text-blue-400 transition-colors">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Career Advice
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Salary Guide
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">For Employers</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <AddJob />
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Find Talent
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Employer Branding
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © 2025 Next Hire. All rights reserved. Built with ❤️ for job seekers
              everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
