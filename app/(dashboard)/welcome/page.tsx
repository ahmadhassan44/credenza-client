"use client";

import { useAuth } from "@/context/auth.context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/button";

function WelcomePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // If user is not authenticated and not loading, redirect to login
    if (mounted && !isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router, mounted]);

  if (!mounted || isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gray-700"></div>
          <div className="h-4 w-32 mx-auto rounded bg-gray-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="p-8 mb-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="mb-6">
            <Image 
              src="/credenzaLogo.svg"
              alt="Credenza Logo"
              width={180}
              height={60}
              className="mx-auto"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Credenza!</h1>
          <Text className="text-gray-400 mb-6">
            {user ? `Hello, ${user.firstName} ${user.lastName}!` : 'Hello!'}
          </Text>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="p-6 border border-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Your Account</h2>
            <div className="space-y-3">
              <div>
                <Text className="text-gray-400">Email:</Text>
                <Text className="font-medium">{user?.email}</Text>
              </div>
              <div>
                <Text className="text-gray-400">Name:</Text>
                <Text className="font-medium">{user ? `${user.firstName} ${user.lastName}` : 'N/A'}</Text>
              </div>
              <div>
                <Text className="text-gray-400">Account Created:</Text>
                <Text className="font-medium">Just now</Text>
              </div>
            </div>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">✓</div>
                <Text>Create your account</Text>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">→</div>
                <Text>Complete your profile</Text>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">→</div>
                <Text>Explore our features</Text>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">→</div>
                <Text>Start using Credenza</Text>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button as={Link} href="/dashboard" color="primary">
            Go to Dashboard
          </Button>
          <Button as={Link} href="/profile" variant="bordered">
            Complete Your Profile
          </Button>
        </div>
      </Card>

      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Personalize Your Experience</h3>
          <Text className="text-gray-400 mb-4">
            Customize your workspace and settings to match your workflow.
          </Text>
          <Button as={Link} href="/settings" size="sm" color="default" variant="flat">
            Go to Settings
          </Button>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Discover Features</h3>
          <Text className="text-gray-400 mb-4">
            Explore all the powerful features Credenza has to offer.
          </Text>
          <Button as={Link} href="/features" size="sm" color="default" variant="flat">
            Explore Features
          </Button>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <Text className="text-gray-400 mb-4">
            Check out our documentation or contact support.
          </Text>
          <Button as={Link} href="/help" size="sm" color="default" variant="flat">
            Get Help
          </Button>
        </Card>
      </div>
    </div>
  );
}


export default WelcomePage;