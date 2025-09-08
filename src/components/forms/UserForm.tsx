import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { CreateUserForm, User } from "@/types";
import { userService } from "@/services/crudService";
import { toast } from "@/hooks/use-toast";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

interface UserFormProps {
  user?: User;
  onSuccess: (user: User) => void;
  onCancel: () => void;
}

const departments = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Operations",
  "HR"
];

const commonSkills = [
  "React", "TypeScript", "Node.js", "Python", "AWS", "Docker",
  "Figma", "Design Systems", "User Research", "Prototyping",
  "Project Management", "Agile", "Scrum", "Leadership",
  "Product Strategy", "Analytics", "Marketing", "Sales"
];

export function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const [newSkill, setNewSkill] = useState("");
  const isEditing = !!user;

  const form = useForm<CreateUserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "",
      department: user?.department || "",
      skills: user?.skills || [],
    },
  });

  const currentSkills = form.watch("skills");

  const addSkill = (skill: string) => {
    if (skill && !currentSkills.includes(skill)) {
      form.setValue("skills", [...currentSkills, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue("skills", currentSkills.filter(skill => skill !== skillToRemove));
  };

  const onSubmit = (data: CreateUserForm) => {
    try {
      let result: User;
      
      if (isEditing && user) {
        result = userService.update(user.id, {
          ...data,
          initials: data.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        }) as User;
        toast({
          title: "User updated",
          description: `${data.name} has been updated successfully.`,
        });
      } else {
        result = userService.create({
          ...data,
          avatar: "/api/placeholder/32/32",
          initials: data.name.split(' ').map(n => n[0]).join('').toUpperCase(),
          status: 'active' as const,
          joinDate: new Date().toISOString().split('T')[0],
        });
        toast({
          title: "User created",
          description: `${data.name} has been added to the team.`,
        });
      }
      
      onSuccess(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Senior Developer, Product Manager" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <Label>Skills</Label>
          <div className="flex flex-wrap gap-2 mb-3">
            {currentSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="pr-1">
                {skill}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 ml-1 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeSkill(skill)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill(newSkill);
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addSkill(newSkill)}
            >
              Add
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {commonSkills
              .filter(skill => !currentSkills.includes(skill))
              .slice(0, 8)
              .map((skill) => (
                <Button
                  key={skill}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => addSkill(skill)}
                >
                  + {skill}
                </Button>
              ))}
          </div>

          {form.formState.errors.skills && (
            <p className="text-sm text-destructive">
              {form.formState.errors.skills.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="icog-button-primary">
            {isEditing ? "Update User" : "Create User"}
          </Button>
        </div>
      </form>
    </Form>
  );
}