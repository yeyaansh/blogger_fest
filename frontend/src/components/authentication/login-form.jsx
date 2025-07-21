import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Link} from "react-router"
import {email, z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import apiClient from "../../api/apiRequest"



export default function LoginForm({
  className,
  ...props
}) {


const loginSchema = z.object({
  email_id: z.email("Enter correct email-id"),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters long")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password should contain UpperCase, LowerCase, Number, and Special Characters"
      ),
});

const {register,handleSubmit,formState: { errors },} = useForm({resolver:zodResolver(loginSchema)})


  const submittedData = async(e) => {
    try {
      await apiClient.post('/account/login',e)
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
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submittedData)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                {errors.email_id && <span>{errors.email_id?.message}</span>}
                <Input id="email" type="email" placeholder="rohit@example.com" 
                  {...register("email_id",{required:true})}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                 
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                 {errors.password && <span>{errors.password?.message}</span>}
                <Input id="password" type="password" placeholder="************"
                {...register("password",{required:true})}
                 />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline underline-offset-3">Register</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>);
}
