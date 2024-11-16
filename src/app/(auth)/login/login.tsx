"use client";

// import libs
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
// import components
import { NotificationSuccess } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormInputs>({ mode: "onChange" });

  let returnUrl = searchParams.get("returnUrl") || "/";
  if (returnUrl === "/login") {
    returnUrl = "/";
  }
  console.log("returnUrl",returnUrl);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const successMessage = "You have successfully logged in. Welcome back!";
  const titleMessage="Login Successful!"
  const emailValue = watch("email");
  const passwordValue = watch("password");

  useEffect(() => {
    setLoginError("");
  }, [emailValue, passwordValue]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const { email, password } = data;

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false, // Prevent auto redirection, allowing custom handling
      });

      if (!response?.error) {
        // Show success notification and navigate after a delay
        setIsDialogOpen(true);
        setTimeout(() => {
          router.push(returnUrl as string);
          router.refresh();
        }, 3000);
      } else {
        setLoginError(response.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Failed to login. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-between p-[50px]">
      <div className="flex-col justify-between gap-[30px] rounded-l-lg">
        <div className="text-center">
          <Image
            src="/imgs/logo.png"
            alt="Logo"
            width={375}
            height={127}
            className="text-center"
          />
        </div>
        <div className="text-center">
          <p className="text-[45px] font-bold text-[#5271FF]">WELCOME BACK</p>
          <p className="text-gray-600 text-[16px]">
            Log in to continue accessing the page
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-white p-[50px] w-[512px]">
        <h2 className="text-center font-bold mb-6 text-[#5271FF] text-[45px]">
          Log In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="block text-[22px] text-[#000000] mb-2">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format.",
                },
              })}
              className="border border-[#D4D1D1] focus:border-blue-500 focus:!ring-2 focus:!ring-blue-300 focus:!ring-offset-0 focus:outline-none pr-10 rounded-[18px] bg-white"
            />

            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4 relative text-[22px]">
            <Label
              htmlFor="password"
              className="block text-[22px] text-[#000000] mb-2">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required.",
                })}
                className="border border-[#D4D1D1] focus:border-blue-500 focus:!ring-2 focus:!ring-blue-300 focus:!ring-offset-0 focus:outline-none pr-10 rounded-[18px] bg-white"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className="text-gray-500" />
                ) : (
                  <Eye className="text-gray-500" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
          <Button
            type="submit"
            className="w-full py-3 rounded-[18px] text-lg mt-12 bg-[#5271FF] text-white hover:bg-[#11009E]">
            Login
          </Button>
        </form>
      </div>

      <NotificationSuccess
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={titleMessage}
        message={successMessage}
      />
    </div>
  );
}
