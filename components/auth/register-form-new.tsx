"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Input, Button } from "@heroui/react";
import { RegisterFormValues, registerSchema } from "@/lib/validations/auth";
import { useAuth } from "@/context/auth.context";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../ui/icons/icons";

export function RegisterForm() {
  const { register: registerUser, error: authError, clearError } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => 
    setIsPasswordVisible(!isPasswordVisible);

  const toggleConfirmPasswordVisibility = () => 
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    setError(null);
    clearError();

    try {
      await registerUser(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
      );
      router.push("/dashboard");
    } catch (err: any) {
      const errorMessage = 
        err?.response?.data?.message || 
        err?.message || 
        "An error occurred during registration. Please try again.";
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-12 gap-[30px] bg-black min-h-screen">
      {/* Left side - Form */}
      <div className="flex justify-center items-center flex-col pt-[126px] pb-[125px] px-[95px] bg-black col-span-12 md:col-span-6">
        <div className="flex justify-start items-start flex-col gap-[37px] w-full max-w-[530px]">
          <div className="flex self-stretch justify-start items-center flex-col gap-[33px]">
            <div className="flex justify-center items-center flex-col gap-[21px] w-full">
              <p className="self-stretch text-white text-[28px] font-medium text-center leading-6 font-['Space_Grotesk']">
                Sign Up Account
              </p>
              <p className="self-stretch text-white text-sm text-center leading-6 font-['Space_Grotesk']">
                Enter your personal data to create an account
              </p>
            </div>
            
            <div className="flex self-stretch justify-start items-center flex-row gap-[34px]">
              <Button 
                className="flex justify-center items-center gap-2 px-[24px] border-solid border-[#52525B] border-2 rounded-xl w-full h-[48px] bg-transparent"
                startContent={
                  <svg 
                    fill="none"
                    height="20"
                    viewBox="0 0 20 20" 
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" 
                      fill="#4285F4"
                    />
                  </svg>
                }
              >
                <span className="text-[#F4F4F5] text-sm font-['Space_Grotesk'] leading-6">
                  Google
                </span>
              </Button>
              
              <Button 
                className="flex justify-center items-center gap-2 px-[24px] border-solid border-[#52525B] border-2 rounded-xl w-full h-[48px] bg-transparent"
                startContent={
                  <svg 
                    fill="none"
                    height="20"
                    viewBox="0 0 21 20" 
                    width="21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M10.5 17.5C14.6421 17.5 18 14.1421 18 10C18 5.85786 14.6421 2.5 10.5 2.5C6.35786 2.5 3 5.85786 3 10C3 14.1421 6.35786 17.5 10.5 17.5Z" 
                      fill="#000000"
                    />
                  </svg>
                }
              >
                <span className="text-[#F4F4F5] text-sm font-['Space_Grotesk'] leading-6">
                  Apple
                </span>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center w-full">
            <div className="flex-grow border-t border-[#8F8F8F]" />
            <span className="flex-shrink mx-4 text-[#8F8F8F] font-['Space_Grotesk']">
              or
            </span>
            <div className="flex-grow border-t border-[#8F8F8F]" />
          </div>

          <form 
            className="flex flex-col gap-[30px] w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2">
              <div className="flex flex-col">
                <label 
                  className="text-[#52525B] text-sm font-['Space_Grotesk'] leading-4 pb-3 pr-2"
                  htmlFor="firstName" 
                >
                  First Name
                </label>
                <Input
                  className="bg-[#1A1A1A] text-white border-[#52525B] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] font-['Space_Grotesk']"
                  color={form.formState.errors.firstName ? "danger" : "default"}
                  errorMessage={form.formState.errors.firstName?.message}
                  id="firstName"
                  placeholder="e.g, John"
                  type="text"
                  {...form.register("firstName")}
                />
              </div>
              
              <div className="flex flex-col">
                <label 
                  className="text-[#52525B] text-sm font-['Space_Grotesk'] leading-4 pb-3 pr-2"
                  htmlFor="lastName" 
                >
                  Last Name
                </label>
                <Input
                  className="bg-[#1A1A1A] text-white border-[#52525B] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] font-['Space_Grotesk']"
                  color={form.formState.errors.lastName ? "danger" : "default"}
                  errorMessage={form.formState.errors.lastName?.message}
                  id="lastName"
                  placeholder="e.g, Doe"
                  type="text"
                  {...form.register("lastName")}
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <label 
                className="text-[#52525B] text-sm font-['Space_Grotesk'] leading-4 pb-3 pr-2"
                htmlFor="email" 
              >
                Email
              </label>
              <Input
                className="bg-[#1A1A1A] text-white border-[#52525B] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] font-['Space_Grotesk']"
                color={form.formState.errors.email ? "danger" : "default"}
                errorMessage={form.formState.errors.email?.message}
                id="email"
                placeholder="e.g, johndoe@example.com"
                type="email"
                {...form.register("email")}
              />
            </div>
            
            <div className="flex flex-col">
              <label 
                className="text-[#52525B] text-sm font-['Space_Grotesk'] leading-4 pb-3 pr-2"
                htmlFor="password" 
              >
                Password
              </label>
              <Input
                className="bg-[#1A1A1A] text-white border-[#52525B] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] font-['Space_Grotesk']"
                color={form.formState.errors.password ? "danger" : "default"}
                endContent={
                  <button 
                    className="focus:outline-none text-gray-400"
                    onClick={togglePasswordVisibility}
                    type="button" 
                  >
                    {isPasswordVisible ? (
                      <EyeSlashFilledIcon className="w-4 h-4" />
                    ) : (
                      <EyeFilledIcon className="w-4 h-4" />
                    )}
                  </button>
                }
                errorMessage={form.formState.errors.password?.message}
                id="password"
                placeholder="Enter your password"
                type={isPasswordVisible ? "text" : "password"}
                {...form.register("password")}
              />
            </div>
            
            <div className="flex flex-col">
              <label 
                className="text-[#52525B] text-sm font-['Space_Grotesk'] leading-4 pb-3 pr-2"
                htmlFor="confirmPassword" 
              >
                Confirm Password
              </label>
              <Input
                className="bg-[#1A1A1A] text-white border-[#52525B] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] font-['Space_Grotesk']"
                color={form.formState.errors.confirmPassword ? "danger" : "default"}
                endContent={
                  <button 
                    className="focus:outline-none text-gray-400"
                    onClick={toggleConfirmPasswordVisibility}
                    type="button" 
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeSlashFilledIcon className="w-4 h-4" />
                    ) : (
                      <EyeFilledIcon className="w-4 h-4" />
                    )}
                  </button>
                }
                errorMessage={form.formState.errors.confirmPassword?.message}
                id="confirmPassword"
                placeholder="Confirm Password"
                type={isConfirmPasswordVisible ? "text" : "password"}
                {...form.register("confirmPassword")}
              />
            </div>
            
            {(error || authError) && (
              <div className="text-red-400 text-sm font-['Space_Grotesk']">
                {error || authError}
              </div>
            )}
            
            <div className="flex self-stretch justify-center items-center flex-col gap-3">
              <Button
                className="flex self-stretch justify-center items-center bg-white text-black rounded-xl h-[48px] w-full font-['Space_Grotesk'] text-sm font-medium"
                color="default"
                disabled={isLoading}
                isLoading={isLoading}
                type="submit"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
              
              <p className="self-stretch font-['Space_Grotesk'] text-center font-medium leading-6">
                <span className="text-[#8F8F8F]">Already have an account?</span>
                <Link 
                  className="text-white hover:text-gray-300 ml-1"
                  href="/login"
                >
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right side - Gradient background section */}
      <div className="hidden md:flex justify-center items-center flex-col rounded-[35px] col-span-6 bg-gradient-radial from-purple-800 via-transparent to-black">
        <div className="flex justify-start items-center flex-col gap-[30px] px-20">
          <p className="self-stretch text-white text-[28px] font-['Space_Grotesk'] text-center font-medium leading-6">
            Credenza
          </p>
          <div className="flex self-stretch justify-start items-start flex-col gap-[22px]">
            <p className="self-stretch text-white text-4xl font-['Space_Grotesk'] font-medium leading-6">
              Get Started with Us
            </p>
            <p className="self-stretch text-[#8F8F8F] text-[22px] font-['Space_Grotesk'] text-center font-medium leading-6">
              Complete these steps to register your account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
