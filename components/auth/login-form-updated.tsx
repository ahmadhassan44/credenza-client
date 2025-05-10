'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LoginFormValues, loginSchema } from '@/lib/validations/auth';
import { useAuth } from '@/context/auth.context';
import { 
  Button,
  Input
} from '@heroui/react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '../ui/icons/icons';
import '@/styles/auth.css';

export function LoginForm() {
  const { login, error: authError, clearError } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setError(null);
    clearError();

    try {
      await login(data.email, data.password, data.rememberMe);
      router.push('/dashboard');
    } catch (err: any) {
      const errorMessage = 
        err?.response?.data?.message || 
        err?.message || 
        'An error occurred during login. Please try again.';
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-12 bg-black min-h-screen w-screen max-w-[100vw] overflow-hidden font-space-grotesk">
      {/* Right side - Gradient background */}
      <div className="rounded-lg col-span-6 flex justify-center items-center flex-col" 
           style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 55%), radial-gradient(50% 50% at 50% 50%, #000000 20.67%, rgba(0,0,0,0) 100.00%), radial-gradient(52.345% 70.975% at 50% 50%, #9E00F9 62.28%, #CA6EFF 77.42%, #F1C7FF 92.12%)' }}>
        <div className="flex flex-col gap-[30px] items-center">
          <p className="text-white text-[28px] font-medium leading-6 font-space-grotesk">Credenza</p>
          <div className="flex flex-col gap-[22px] self-stretch justify-between items-center">
            <p className="text-white text-4xl font-medium leading-6 font-space-grotesk">Welcome Back to Credenza</p>
            <p className="text-[#8F8F8F] text-[22px] font-medium leading-6 text-center font-space-grotesk">
              Complete these steps to log in to your account
            </p>
          </div>
        </div>
      </div>

      {/* Left side - Form */}
      <div className="col-span-6 flex justify-center items-center flex-col">
        <div className="flex flex-col justify-start items-start gap-[37px] max-w-[530px]">
          {/* Title section */}
          <div className="flex self-stretch justify-center items-center flex-col gap-[21px] w-full">
            <p className="self-stretch text-white text-[28px] font-medium leading-6 text-center font-space-grotesk">
              Log In Account
            </p>
            <p className="self-stretch text-white text-sm text-center leading-6 font-space-grotesk">
              Log in to Credenza
            </p>
          </div>

          {/* Social sign-up options */}
          <div className="flex self-stretch justify-start items-center flex-row gap-[34px]">
            <Button
              className="cursor-pointer flex justify-center items-center gap-2 px-[24px] rounded-xl w-[248px] h-[48px] font-space-grotesk text-[#F4F4F5] border border-[#52525B] bg-transparent"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.7874 10.2301C19.7874 9.55068 19.7291 8.86814 19.6083 8.2022H10.2083V11.9726H15.6256C15.3916 13.1914 14.6999 14.2309 13.6833 14.9167V17.3426H16.8916C18.7499 15.6309 19.7874 13.1559 19.7874 10.2301Z" fill="#4285F4"/>
                <path d="M10.2083 20.0001C12.9083 20.0001 15.1708 19.1209 16.8958 17.3426L13.6875 14.9168C12.7958 15.5168 11.6166 15.8626 10.2125 15.8626C7.59996 15.8626 5.39162 14.1051 4.60413 11.7334H1.30413V14.2334C3.02496 17.6834 6.3958 20.0001 10.2083 20.0001Z" fill="#34A853"/>
                <path d="M4.59996 11.7333C4.19996 10.5333 4.19996 9.2666 4.59996 8.0666V5.5666H1.30413C0.104134 8.0083 0.104134 11.7916 1.30413 14.2333L4.59996 11.7333Z" fill="#FBBC04"/>
                <path d="M10.2083 4.13756C11.6208 4.11673 12.9791 4.65423 13.9875 5.63339L16.8458 2.77506C15.0625 1.08339 12.6875 0.0250614 10.2083 0.0417448C6.3958 0.0417448 3.02496 2.3584 1.30413 5.8084L4.59996 8.30839C5.3833 5.9334 7.59996 4.13756 10.2083 4.13756Z" fill="#EA4335"/>
              </svg>
              <span>Google</span>
            </Button>
            <Button
              className="cursor-pointer flex justify-center items-center gap-2 px-[24px] rounded-xl w-[248px] h-[48px] font-space-grotesk text-[#F4F4F5] border border-[#52525B] bg-transparent"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.1617 15.5306C17.8717 16.2675 17.5233 16.945 17.1117 17.5696C16.5442 18.4113 16.0783 19.0141 15.7183 19.3775C15.16 19.9358 14.5633 20.222 13.9267 20.2382C13.4683 20.2382 12.9117 20.0977 12.2617 19.8125C11.6092 19.5282 11.005 19.387 10.4467 19.387C9.86 19.387 9.2392 19.5282 8.5833 19.8125C7.9267 20.0977 7.3967 20.2422 6.9908 20.2472C6.3833 20.2573 5.7767 19.9651 5.17 19.3775C4.7783 18.9843 4.2942 18.3654 3.7183 17.5214C3.1033 16.6286 2.6025 15.6228 2.2158 14.502C1.8025 13.29 1.5958 12.1128 1.5958 10.9697C1.5958 9.64183 1.8583 8.49714 2.3842 7.53833C2.7983 6.76802 3.3475 6.15 4.0333 5.68318C4.7192 5.21635 5.4708 4.97573 6.2883 4.95954C6.7758 4.95954 7.3992 5.12168 8.1625 5.43875C8.9233 5.75664 9.42 5.91868 9.65 5.91868C9.8217 5.91868 10.3775 5.73022 11.4108 5.35412C12.3892 5.00714 13.2083 4.86661 13.8708 4.93C15.4317 5.08666 16.6092 5.72583 17.4008 6.85168C16.0042 7.70203 15.3158 8.86147 15.3342 10.3268C15.3517 11.4758 15.7775 12.4319 16.61 13.1886C16.9875 13.5364 17.4125 13.8044 17.89 13.9937C17.9875 14.5093 18.0792 14.9986 18.1617 15.5306Z" fill="white"/>
              </svg>
              <span>Apple</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="w-full relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#8F8F8F]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-black text-[#8F8F8F] text-sm font-space-grotesk">or</span>
            </div>
          </div>

          {/* Form fields */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col gap-2.5 w-full">
              {/* Email */}
              <div className="min-w-[116px] flex flex-col">
                <div className="pb-3 pr-2">
                  <span className="text-white text-sm leading-4 font-space-grotesk">Email</span>
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g, johndoe@example.com"
                  autoComplete="email"
                  isDisabled={isLoading}
                  isInvalid={!!form.formState.errors.email}
                  errorMessage={form.formState.errors.email?.message}
                  className="bg-[#1A1A1A] text-white border-[#52525B] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] font-space-grotesk"
                  {...form.register('email')}
                />
              </div>

              {/* Password */}
              <div className="min-w-[116px] flex flex-col">
                <div className="pb-3 pr-2">
                  <span className="text-white text-sm leading-4 font-space-grotesk">Password</span>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={isVisible ? 'text' : 'password'}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    isDisabled={isLoading}
                    isInvalid={!!form.formState.errors.password}
                    errorMessage={form.formState.errors.password?.message}
                    className="bg-[#1A1A1A] text-white border-[#52525B] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] font-space-grotesk"
                    endContent={
                      <div 
                        className="cursor-pointer text-gray-400"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? <EyeFilledIcon /> : <EyeSlashFilledIcon />}
                      </div>
                    }
                    {...form.register('password')}
                  />
                </div>
              </div>

              {/* Remember me and Forgot password row */}
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="w-4 h-4 rounded border-gray-300"
                    {...form.register('rememberMe')}
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-[#8F8F8F] text-sm font-space-grotesk">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-white text-sm hover:text-gray-300 font-space-grotesk">
                  Forgot password?
                </Link>
              </div>

              {/* Error Messages */}
              {(error || authError) && (
                <div className="text-red-400 text-sm font-space-grotesk">
                  {error || authError}
                </div>
              )}

              {/* Submit button and signup link */}
              <div className="flex flex-col gap-3 mt-4 self-stretch items-center">
                <Button
                  type="submit"
                  className="cursor-pointer w-full flex justify-center items-center rounded-xl h-[48px] bg-white text-black hover:bg-gray-200 font-space-grotesk"
                  isDisabled={isLoading}
                  isLoading={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </Button>
                
                <p className="font-space-grotesk text-center font-medium leading-6">
                  <span className="text-[#8F8F8F]">Don't have an account?</span>
                  <Link href="/signup" className="text-white hover:text-gray-300">
                    {' '}Sign up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
