// 'use client';

// import { useState, forwardRef } from 'react';
// import {
//   Input,
//   Button
// } from '@heroui/react';

// interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
//   error?: boolean;
//   helperText?: string;
// }

// export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
//   ({ error, helperText, className, ...props }, ref) => {
//     const [showPassword, setShowPassword] = useState(false);

//     return (
//       <div className="relative">
//         <Input
//           ref={ref}
//           type={showPassword ? 'text' : 'password'}
//           className={`pr-16 ${className}`}
//           {...props}
//         />
//         <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//           <Button
//             size="sm"
//             variant="ghost"
//             onClick={() => setShowPassword(!showPassword)}
//             aria-label={showPassword ? 'Hide password' : 'Show password'}
//             className="h-7"
//           >
//             {showPassword ? 'Hide' : 'Show'}
//           </Button>
//         </div>
//         {helperText && (
//           <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
//             {helperText}
//           </p>
//         )}
//       </div>
//     );
//   }
// );

// PasswordInput.displayName = 'PasswordInput';
