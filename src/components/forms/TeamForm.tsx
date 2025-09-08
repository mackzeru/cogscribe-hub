import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateTeamForm, Team } from "@/types";
import { teamService, userService } from "@/services/crudService";
import { toast } from "@/hooks/use-toast";

const teamSchema = z.object({
  name: z.string().min(2, "Team name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  leadId: z.string().min(1, "Team lead is required"),
  memberIds: z.array(z.string()).min(1, "At least one team member is required"),
});

interface TeamFormProps {
  team?: Team;
  onSuccess: (team: Team) => void;
  onCancel: () => void;
}

export function TeamForm({ team, onSuccess, onCancel }: TeamFormProps) {
  const isEditing = !!team;

  const users = userService.getAll();

  const form = useForm<CreateTeamForm>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: team?.name || "",
      description: team?.description || "",
      leadId: team?.leadId || "",
      memberIds: team?.memberIds || [],
    },
  });

  const selectedMemberIds = form.watch("memberIds");
  const selectedLeadId = form.watch("leadId");

  const onSubmit = (data: CreateTeamForm) => {
    // Ensure team lead is included in member list
    const memberIds = [...new Set([...data.memberIds, data.leadId])];
    
    try {
      let result: Team;
      
      if (isEditing && team) {
        result = teamService.update(team.id, {
          ...data,
          memberIds,
        }) as Team;
        toast({
          title: "Team updated",
          description: `${data.name} has been updated successfully.`,
        });
      } else {
        result = teamService.create({
          ...data,
          memberIds,
        });
        toast({
          title: "Team created",
          description: `${data.name} has been created successfully.`,
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
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter team name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the team's purpose and responsibilities"
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leadId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Lead</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team lead" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                        </Avatar>
                        <span>{user.name} - {user.role}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="memberIds"
          render={() => (
            <FormItem>
              <FormLabel>Team Members</FormLabel>
              <div className="grid grid-cols-1 gap-3 mt-2">
                {users.map((user) => (
                  <FormField
                    key={user.id}
                    control={form.control}
                    name="memberIds"
                    render={({ field }) => {
                      const isSelected = field.value?.includes(user.id);
                      const isTeamLead = user.id === selectedLeadId;
                      
                      return (
                        <FormItem
                          key={user.id}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={isSelected || isTeamLead}
                              disabled={isTeamLead}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...(field.value || []), user.id]
                                  : (field.value || []).filter((value) => value !== user.id);
                                field.onChange(updatedValue);
                              }}
                            />
                          </FormControl>
                          <div className="flex items-center space-x-2 flex-1">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <FormLabel className="text-sm font-medium">
                                {user.name}
                                {isTeamLead && <span className="text-primary ml-1">(Team Lead)</span>}
                              </FormLabel>
                              <p className="text-xs text-muted-foreground">
                                {user.role} • {user.department}
                              </p>
                            </div>
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="icog-button-primary">
            {isEditing ? "Update Team" : "Create Team"}
          </Button>
        </div>
      </form>
    </Form>
  );
}