import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Link } from "@tiptap/extension-link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  LinkIcon,
  Undo,
  Redo
} from "lucide-react";

const EmailComposer = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
    ],
    content: '<p>Start writing your email...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  const handleGenerateHTML = () => {
    if (editor) {
      setHtmlOutput(editor.getHTML());
    }
  };

  const setLink = () => {
    if (!editor) return;
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
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

          {/* Tiptap Editor */}
          <div className="space-y-2">
            <Label>Email Content</Label>
            <div className="border border-input rounded-md bg-background">
              {/* Toolbar */}
              <div className="border-b border-input p-2 flex flex-wrap gap-1 bg-muted/30">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={editor?.isActive('bold') ? 'bg-muted' : ''}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={editor?.isActive('italic') ? 'bg-muted' : ''}
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                  className={editor?.isActive('strike') ? 'bg-muted' : ''}
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-8 bg-border mx-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={editor?.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
                >
                  <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={editor?.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
                >
                  <Heading2 className="h-4 w-4" />
                </Button>
                <div className="w-px h-8 bg-border mx-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                  className={editor?.isActive('bulletList') ? 'bg-muted' : ''}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                  className={editor?.isActive('orderedList') ? 'bg-muted' : ''}
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-px h-8 bg-border mx-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={setLink}
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
                <div className="w-px h-8 bg-border mx-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().undo().run()}
                  disabled={!editor?.can().undo()}
                >
                  <Undo className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().redo().run()}
                  disabled={!editor?.can().redo()}
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </div>
              {/* Editor Content */}
              <EditorContent editor={editor} className="prose-editor" />
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
