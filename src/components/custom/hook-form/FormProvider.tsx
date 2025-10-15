import { FormProvider as Form, UseFormReturn } from "react-hook-form";

interface IProps {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
}

export default function FormProvider({ children, onSubmit, methods }: IProps) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
