import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  emailFriendZodSchema,
  type EmailFriendZodSchemaType,
} from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { useRoomActions } from "@/hooks/use-room-actions";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const FormSearchFriend = ({ handleClickRoomId }: Props) => {
  const [isLoading, startTransition] = useTransition();
  const { findOrCreateRoomn } = useRoomActions();

  const form = useForm<EmailFriendZodSchemaType>({
    resolver: zodResolver(emailFriendZodSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: EmailFriendZodSchemaType) {
    startTransition(async () => {
      const response = await findOrCreateRoomn(data.email);

      console.log(response);
      if (response.success) {
        handleClickRoomId(response.roomId);
        toast.success("Friend encontrado, comienza a chatear");
        form.reset();
      }

      toast.error(response.message);
    });
  }

  return (
    <form
      id="form-rhf-demo"
      onSubmit={form.handleSubmit(onSubmit)}
      className="p-3 border-b border-border space-y-2"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex gap-2">
                <Input
                  {...field}
                  placeholder="Buscar por email..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !field.value.trim()}
                  className="px-4"
                  size="sm"
                >
                  {isLoading ? "..." : "Buscar"}
                </Button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
};

export default FormSearchFriend;
