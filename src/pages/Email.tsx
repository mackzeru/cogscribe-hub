import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import FormProvider from "@/components/custom/hook-form/FormProvider";
import RHFTextField from "@/components/custom/hook-form/RHFTextField";
import RHFRichEditor from "@/components/custom/hook-form/RHFRichEditor";
import { EmailSchema, EmailFormDataType } from "@/schemas/email-schema";
import { useToast } from "@/hooks/use-toast";

const EmailComposer = () => {
  const [htmlOutput, setHtmlOutput] = useState("");
  const { toast } = useToast();

  const methods = useForm<EmailFormDataType>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      recipient: "",
      subject: "",
      content: "",
    },
  });

  const onSubmit = (data: EmailFormDataType) => {
    setHtmlOutput(data.content);
    toast({
      title: "Email Ready",
      description: "HTML has been generated successfully!",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Email Composer
          </h1>
          <p className="text-muted-foreground">
            Create and preview your email content
          </p>
        </div>

        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <RHFTextField
              label="Recipient Email"
              name="recipient"
              type="email"
              placeholder="recipient@example.com"
              isRequired={true}
            />

            <RHFTextField
              label="Subject Line"
              name="subject"
              type="text"
              placeholder="Enter email subject"
              isRequired={true}
            />

            <RHFRichEditor
              label="Email Content"
              name="content"
              placeholder="Start writing your email..."
              isRequired={true}
            />

            <div className="pt-8">
              <Button type="submit" className="w-full" size="lg">
                Generate HTML & Send
              </Button>
            </div>

            {htmlOutput && (
              <div className="space-y-2 pt-4">
                <p className="text-sm font-medium">Generated HTML</p>
                <ScrollArea className="h-64 w-full rounded-md border border-input bg-muted/30 p-4">
                  <pre className="text-sm text-foreground whitespace-pre-wrap break-words">
                    {htmlOutput}
                  </pre>
                </ScrollArea>
              </div>
            )}
          </div>
        </FormProvider>
      </Card>
    </div>
  );
};

export default EmailComposer;
