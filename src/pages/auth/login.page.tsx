import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field, 
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";


import { Input } from "@/components/ui/input";
import { MoveRight } from 'lucide-react';
import CardFooterAuth from "@/components/card-footer-auth";
import { useAuthActions } from "@/hooks/use-auth-actions";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginZodSchema, type LoginZodSchemaType } from "@/lib/zod.schemas";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const LoginPage = () => {
  const { loading, login} = useAuthActions();

  const form = useForm<LoginZodSchemaType>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async(data: LoginZodSchemaType) => {
    const response = await login(data)
    if (!response.success){
      if(response.error?.code === "auth/invalid-login-credentials"){
        /*form.setError("email",{
          type: "manual",
          message: "Invalid email or password"
        })
        form.setError("password",{
          type: "manual",
          message: "Invalid email or password"
        })*/
       toast.error("Invalid email or password")
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to you accont using email and password or with Google
        </CardDescription>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Email
                    </FieldLabel>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Password
                    </FieldLabel>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button
              type="submit"
              className="w-full mt-5"
              disabled= {loading}
            >
              {loading ? "Loggin in ..." : (
                <>
                  Login <MoveRight className="ml-3" /> 
                </>
              )} 
            </Button>
          </form>
        </CardContent>
        <CardFooterAuth type="login" loading={loading} />
      </CardHeader>
    </Card>
  );
};

export default LoginPage;
