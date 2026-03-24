import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { taskZodSchema, type TaskZodSchemaType } from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { useTaskAction } from "@/hooks/use-task-actions";
import { toast } from "sonner";

const FormTask = () => {
     const [isPending, startTransition] = useTransition();
     const {createTask} = useTaskAction()
  const form = useForm<TaskZodSchemaType>({
    resolver: zodResolver(taskZodSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: TaskZodSchemaType) => {
    startTransition(async()=>{
        try {
            await createTask(data)
            form.reset()
        } catch (error) {
            console.log(error)
            toast.error("Failed to create task")
        }
    })
    console.log(data);
  };

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
              <Input
                {...field}
                placeholder="Task title"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Description</FieldLabel>
              <Input
                {...field}
                placeholder="Task Description"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" disabled={isPending}>
        {isPending? "Creating..." : "Create Task"}
      </Button>
    </form>
  );
};

export default FormTask;
