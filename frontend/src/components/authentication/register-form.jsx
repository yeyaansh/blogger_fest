import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../../api/apiRequest";

// export default function RegisterForm({ className, ...props }) {
export default function RegisterForm({ className, ...props }) {
  const registerSchema = z.object({
    full_name: z
      .string()
      .min(3, "Name should be at least 3 characters long")
      .max(30, "Name shouldn't exceed 30 characters long"),
    email_id: z.email("Enter correct email-id"),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters long")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password should contain UpperCase, LowerCase, Number, and Special Characters"
      ),
  });

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  // console.log(watch(['full_name',"email_id","password"]))
  // when you need to re-render the page on value changes in specific fields, best for UI real-time updates.
  // for example you can use it with any UI changes when typing password (like real-time showing weak or strong password);

  const submittedData = async(e) => {
    try {
      await apiClient.post('/account/register',e)
      // console.log(e);
    } catch (err) {
      console.log(err);
    }
  };

  return (
        <div className="w-100vw pt-20 flex justify-center">
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register your account</CardTitle>
          <CardDescription>
            Enter your name, email and password below to register your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submittedData)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="full_name">Full Name</Label>
                {errors.full_name && <span>{errors.full_name?.message}</span>}
                <Input
                  {...register("full_name", { required: true })}
                  placeholder="Rohit Negi"
                  id="full_name"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email_id">Email</Label>
                {errors.email_id && <span>{errors.email_id?.message}</span>}

                <Input
                  id="email_id"
                  type="email"
                  placeholder="rohit@example.com"
                  {...register("email_id", { required: true })}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                {errors.password && <span>{errors.password?.message}</span>}

                <Input
                  id="password"
                  type="password"
                  placeholder="************"
                  {...register("password", { required: true })}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Register
                </Button>
                <Button variant="outline" className="w-full">
                  Register with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-3">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
