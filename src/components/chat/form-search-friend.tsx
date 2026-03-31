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
      className="space-y-2"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input {...field} placeholder="search@mail.com" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        variant={"outline"}
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Buscando Friend" : "Buscar"}
      </Button>
    </form>
  );
};

export default FormSearchFriend;
