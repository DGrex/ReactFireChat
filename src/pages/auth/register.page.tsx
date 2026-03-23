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

import { Controller, useForm } from "react-hook-form";


import CardFooterAuth from "@/components/card-footer-auth";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerZodSchema, type RegisterZodSchemaType } from "@/lib/zod.schemas";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";



const RegisterPage = () => {
  const {loading, register} = useAuthActions()
  
  const form = useForm({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      email: "",
      displayName: "",
      password:"",
      confirmPassword: "",
    }
  })

  const onSubmit = async(data: RegisterZodSchemaType)=>{
    const response = await register(data)
    if(!response.success){
      toast.error("his email is already registered")
      if(response.error?.code=== "auth/email-already-in-use"){
        form.setError("email",{
          type: "manual",
          message: "This email is already registered"
        })
        console.log("This email is already registered")
      }else{
        console.log(response.error?.code)
      }
    }
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Register to you accont using email and password or with Google
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
                name="displayName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Display Name
                    </FieldLabel>
                    <Input
                      type="text"
                      placeholder="Enter your name"
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
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Confirm Password
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
                  Registrar 
                </>
              )} 
            </Button>
          </form>

        </CardContent>
        <CardFooterAuth 
          type="register"
          loading= {loading}
        />
      </CardHeader>
    </Card>
  );
};

export default RegisterPage;
