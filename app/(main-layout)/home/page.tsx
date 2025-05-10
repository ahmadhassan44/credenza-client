"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Credit Scoring for Digital Creators
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Credenza helps digital creators access fair financial products by
              evaluating creditworthiness through platform metrics, income
              stability, and growth patterns.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/signup">
                <Button color="primary" size="lg">
                  Get started
                </Button>
              </Link>
              <Link
                className="text-sm font-semibold leading-6 text-white"
                href="/about"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Faster credit decisions
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to evaluate digital creators
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our platform analyzes creator metrics across multiple platforms to
            provide a comprehensive credit assessment.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                    fillRule="evenodd"
                  />
                </svg>
                Platform Integration
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                <p className="flex-auto">
                  Connect YouTube, TikTok, Instagram, and other platforms to get
                  a holistic view of creator metrics.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    fillRule="evenodd"
                  />
                </svg>
                Advanced Analytics
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                <p className="flex-auto">
                  Our proprietary algorithms analyze growth trends, audience
                  engagement, and income stability.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                    fillRule="evenodd"
                  />
                </svg>
                Instant Decisions
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                <p className="flex-auto">
                  Get instant credit decisions based on your platform
                  performance, not just traditional credit scores.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* CTA section */}
      <div className="mt-32 sm:mt-56">
        <div className="relative isolate overflow-hidden bg-gray-900">
          <div className="px-6 py-24 sm:px-8 sm:py-32 lg:px-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Sign up today and discover how Credenza can help you access
                financial products tailored for digital creators.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/signup">
                  <Button color="primary" size="lg">
                    Get started
                  </Button>
                </Link>
                <Link
                  className="text-sm font-semibold leading-6 text-white"
                  href="/docs"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <svg
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            viewBox="0 0 1024 1024"
          >
            <circle
              cx="512"
              cy="512"
              fill="url(#radial-gradient)"
              fillOpacity="0.7"
              r="512"
            />
            <defs>
              <radialGradient id="radial-gradient">
                <stop stopColor="#7775D6" />
                <stop offset="1" stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
