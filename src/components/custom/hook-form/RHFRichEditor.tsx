import { useFormContext, Controller } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Link } from "@tiptap/extension-link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
  Redo,
} from "lucide-react";
import { useEffect } from "react";

interface IProps {
  name: string;
  label: string;
  isRequired?: boolean;
  isOptionalCaptionVisible?: boolean;
  isRequiredAstrictCaptionVisible?: boolean;
  placeholder?: string;
}

export default function RHFRichEditor({
  name,
  isRequired = true,
  isOptionalCaptionVisible = true,
  isRequiredAstrictCaptionVisible = true,
  label,
  placeholder = "Start writing...",
}: IProps) {
  const { control, clearErrors } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const editor = useEditor({
          extensions: [
            StarterKit,
            TextStyle,
            Color,
            Link.configure({
              openOnClick: false,
              HTMLAttributes: {
                class: "text-primary underline",
              },
            }),
          ],
          content: field.value || `<p>${placeholder}</p>`,
          onUpdate: ({ editor }) => {
            field.onChange(editor.getHTML());
            clearErrors(name);
          },
          editorProps: {
            attributes: {
              class: "prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4",
            },
          },
        });

        useEffect(() => {
          if (editor && field.value !== editor.getHTML()) {
            editor.commands.setContent(field.value || `<p>${placeholder}</p>`);
          }
        }, [field.value, editor, placeholder]);

        const setLink = () => {
          if (!editor) return;
          const url = window.prompt("Enter URL:");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        };

        return (
          <div className="space-y-1">
            <Label className="text-sm font-medium" htmlFor={name}>
              {label}{" "}
              {isRequired
                ? isRequiredAstrictCaptionVisible && (
                    <span className="text-destructive align-middle">{" *"}</span>
                  )
                : isOptionalCaptionVisible && (
                    <span className="text-muted-foreground font-normal text-xs">{`(optional)`}</span>
                  )}
            </Label>
            <div
              className={`border rounded-md bg-background ${
                error ? "border-destructive" : "border-input"
              }`}
            >
              {/* Toolbar */}
              <div className="border-b border-input p-2 flex flex-wrap gap-1 bg-muted/30">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={editor?.isActive("bold") ? "bg-muted" : ""}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={editor?.isActive("italic") ? "bg-muted" : ""}
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                  className={editor?.isActive("strike") ? "bg-muted" : ""}
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-8 bg-border mx-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={
                    editor?.isActive("heading", { level: 1 }) ? "bg-muted" : ""
                  }
                >
                  <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={
                    editor?.isActive("heading", { level: 2 }) ? "bg-muted" : ""
                  }
                >
                  <Heading2 className="h-4 w-4" />
                </Button>
                <div className="w-px h-8 bg-border mx-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor?.chain().focus().toggleBulletList().run()
                  }
                  className={editor?.isActive("bulletList") ? "bg-muted" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor?.chain().focus().toggleOrderedList().run()
                  }
                  className={editor?.isActive("orderedList") ? "bg-muted" : ""}
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
            {error && (
              <p className="text-destructive text-xs mt-1">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
