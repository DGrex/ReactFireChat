import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { messageZodSchema, type MessageZodSchemaType } from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useMessageActions } from "@/hooks/use-messages-actions";
import { toast } from "sonner";
import { useTransition } from "react";

interface Props {
  roomId: string;
}

const FormMessageChat = ({ roomId }: Props) => {
  const [isLoading, startTransition] = useTransition();
  const { sendMessage } = useMessageActions(roomId);
  const form = useForm<MessageZodSchemaType>({
    resolver: zodResolver(messageZodSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(data: MessageZodSchemaType) {
    startTransition(async () => {
      try {
        await sendMessage(data.text);
        form.reset();
      } catch (error) {
        console.log(error);
        toast.error("No se puedo enviar el mensaje");
      }
    });
  }

  return (
    <form
      id="form-rhf-demo"
      onSubmit={form.handleSubmit(onSubmit)}
      className="border-t border-border bg-background p-4 space-y-2"
    >
      <FieldGroup>
        <Controller
          name="text"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex gap-2">
                <Input
                  {...field}
                  placeholder="Escribe un mensaje..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !field.value.trim()}
                  className="px-6"
                >
                  {isLoading ? "Enviando..." : "Enviar"}
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

export default FormMessageChat;
