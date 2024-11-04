"use client";

// import libs
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormInputs>({ mode: "onChange" });

  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const successMessage = "You have successfully logged in. Welcome back!";
  const emailValue = watch("email");
  const passwordValue = watch("password");

  useEffect(() => {
    setLoginError("");
  }, [emailValue, passwordValue]);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const { email, password } = data;

    if (email === "admin@example.com" && password === "password") {
      setIsDialogOpen(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
      return;
    }

    setLoginError("Incorrect email or password.");
  };

  return (
    <div className="bg-white flex items-center justify-center min-h-screen p-6">
      <div className="bg-[#C4CEFF] p-16 rounded-lg shadow-lg w-full max-w-[1300px] flex">
        <div className="w-1/2 p-16 rounded-l-lg">
          <div className="text-center mb-12">
            <Image
              src="/imgs/logo.png"
              alt="Logo"
              width={500}
              height={500}
              className="mx-auto mb-8"
            />
            <h2 className="text-5xl font-bold text-[#5271FF]">WELCOME BACK</h2>
            <p className="text-gray-600 text-2xl">
              Log in to continue accessing the page
            </p>
          </div>
        </div>

        <div className="w-1/2 bg-white p-16 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-[#11009E]">Log In</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <Label
                htmlFor="email"
                className="block text-[#11009E] text-lg mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format.",
                  },
                })}
                className="border-2 border-[#C4CEFF] focus:border-blue-500 focus:!ring-2 focus:!ring-blue-300 focus:!ring-offset-0 focus:outline-none rounded-lg"
              />

              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4 relative">
              <Label
                htmlFor="password"
                className="block text-[#11009E] text-lg mb-2">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required.",
                  })}
                  className="border-2 border-[#C4CEFF] focus:border-blue-500 focus:!ring-2 focus:!ring-blue-300 focus:!ring-offset-0 focus:outline-none rounded-lg pr-10 bg-blue-100"
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
              disabled={!isValid}
              className={`w-full h-12 py-3 rounded-lg text-lg mt-12 ${
                isValid
                  ? "bg-[#5271FF] text-white hover:bg-[#11009E]"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}>
              Log In
            </Button>
          </form>
        </div>
      </div>

      <NotificationSuccess
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        message={successMessage}
      />
    </div>
  );
}
