import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const EmailComposer = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");

  const handleGenerateHTML = () => {
    setHtmlOutput(content);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Email Composer</h1>
          <p className="text-muted-foreground">Create and preview your email content</p>
        </div>

        <div className="space-y-4">
          {/* Recipient Email */}
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Email</Label>
            <Input
              id="recipient"
              type="email"
              placeholder="recipient@example.com"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          {/* Subject Line */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject Line</Label>
            <Input
              id="subject"
              type="text"
              placeholder="Enter email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* Quill Editor */}
          <div className="space-y-2">
            <Label>Email Content</Label>
            <div className="bg-background border border-input rounded-md">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="h-64"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ color: [] }, { background: [] }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-12">
            <Button 
              onClick={handleGenerateHTML}
              className="w-full"
              size="lg"
            >
              Generate HTML & Send
            </Button>
          </div>

          {/* HTML Output */}
          {htmlOutput && (
            <div className="space-y-2 pt-4">
              <Label>Generated HTML</Label>
              <ScrollArea className="h-64 w-full rounded-md border border-input bg-muted/30 p-4">
                <pre className="text-sm text-foreground whitespace-pre-wrap break-words">
                  {htmlOutput}
                </pre>
              </ScrollArea>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EmailComposer;
