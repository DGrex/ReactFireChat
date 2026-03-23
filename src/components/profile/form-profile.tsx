import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { profileZodSchema, type ProfileZodSchemaType } from "@/lib/zod.schemas";
import { Button } from "../ui/button";
import type { User } from "firebase/auth";
import { UseProfileActions } from "@/hooks/use-profile-actions";
import { toast } from "sonner";

interface Porops{
	user : User
}

const FormProfile = ({user}:Porops) => {
  const { loading, updateUserProfile  } = UseProfileActions()

		
  const form = useForm<ProfileZodSchemaType>({
    resolver: zodResolver(profileZodSchema),
    defaultValues: {
      displayName: user?.displayName ||"",
      photoURL: user?.photoURL || "",
    },
  });

  const onSubmit = async (data: ProfileZodSchemaType) => {
		const result = await updateUserProfile(data)
		if(result.success){
			return toast.success("Profile update succesfully")
		}
		return toast.error("Error updating profile")    
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Controller
          name="displayName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">User Name</FieldLabel>
              <Input {...field} placeholder="User Name" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Controller
          name="photoURL"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-description">
                Photo URL
              </FieldLabel>
              <Input {...field} placeholder="https://example.com/photo.jpg" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" disabled = {loading}>
        {loading? "Updating...":"Update Profile"}
      </Button>
    </form>
  );
};

export default FormProfile;
