"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/auth.context";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner color="primary" size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-textPrimary">
            Credenza Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <Text color="textSecondary">
              {user?.firstName
                ? `${user.firstName} ${user.lastName || ""}`
                : user?.email}
            </Text>
            <Button variant="outline" onClick={logout}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-3 p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-textPrimary">
                Welcome to Credenza
              </h2>
              <p className="text-textSecondary">
                Your credit scoring platform for digital creators.
              </p>

              {user?.role === "CREATOR" ? (
                <div className="space-y-2">
                  <Text color="primary.500" fontSize="lg" fontWeight="semibold">
                    You are registered as a creator!
                  </Text>
                  <p className="text-textSecondary">
                    Connect your platforms to improve your credit score.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Text color="textSecondary">
                    Want to monitor your creator metrics?
                  </Text>
                  <Button>Register as Creator</Button>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-textPrimary">
                Credit Score
              </h2>

              {user?.role === "CREATOR" ? (
                <div className="flex flex-col items-center">
                  <Text
                    color="primary.500"
                    fontSize="5xl"
                    fontWeight="bold"
                    mb={2}
                  >
                    750
                  </Text>
                  <Text color="textSecondary" fontSize="sm">
                    Excellent
                  </Text>
                </div>
              ) : (
                <div className="h-32 flex items-center justify-center">
                  <Text color="textSecondary">Available for creators</Text>
                </div>
              )}
            </div>
          </Card>

          <Card className="col-span-2 p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-textPrimary">
                Creator Stats
              </h2>

              {user?.role === "CREATOR" ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Text color="textSecondary">Platforms:</Text>
                    <Text color="textPrimary">3</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text color="textSecondary">Followers:</Text>
                    <Text color="textPrimary">127,500</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text color="textSecondary">Monthly Income:</Text>
                    <Text color="textPrimary">$4,230</Text>
                  </div>
                </div>
              ) : (
                <div className="h-32 flex items-center justify-center">
                  <Text color="textSecondary">Available for creators</Text>
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
