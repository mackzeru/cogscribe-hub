import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CreateMeetingForm, Meeting } from "@/types";
import { meetingService, userService, projectService } from "@/services/crudService";
import { toast } from "@/hooks/use-toast";

const meetingSchema = z.object({
  title: z.string().min(2, "Meeting title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["recurring", "one-time", "instant"]),
  projectId: z.string().optional(),
  attendeeIds: z.array(z.string()).min(1, "At least one attendee is required"),
  date: z.string().min(1, "Date is required"),
  duration: z.number().min(15, "Duration must be at least 15 minutes"),
  agenda: z.array(z.string()).min(1, "At least one agenda item is required"),
});

interface MeetingFormProps {
  meeting?: Meeting;
  onSuccess: (meeting: Meeting) => void;
  onCancel: () => void;
  defaultProjectId?: string;
}

export function MeetingForm({ meeting, onSuccess, onCancel, defaultProjectId }: MeetingFormProps) {
  const [newAgendaItem, setNewAgendaItem] = useState("");
  const isEditing = !!meeting;

  const users = userService.getAll();
  const projects = projectService.getAll();

  const form = useForm<CreateMeetingForm>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      title: meeting?.title || "",
      description: meeting?.description || "",
      type: meeting?.type || "one-time",
      projectId: meeting?.projectId || defaultProjectId || "",
      attendeeIds: meeting?.attendeeIds || [],
      date: meeting?.date ? meeting.date.split('T')[0] : "",
      duration: meeting?.duration || 60,
      agenda: meeting?.agenda || [],
    },
  });

  const selectedAttendeeIds = form.watch("attendeeIds");
  const currentAgenda = form.watch("agenda");

  const addAgendaItem = () => {
    if (newAgendaItem.trim()) {
      form.setValue("agenda", [...currentAgenda, newAgendaItem.trim()]);
      setNewAgendaItem("");
    }
  };

  const removeAgendaItem = (index: number) => {
    form.setValue("agenda", currentAgenda.filter((_, i) => i !== index));
  };

  const onSubmit = (data: CreateMeetingForm) => {
    // Convert date to ISO string
    const meetingDate = new Date(data.date + 'T09:00:00').toISOString();
    
    try {
      let result: Meeting;
      
      if (isEditing && meeting) {
        result = meetingService.update(meeting.id, {
          ...data,
          date: meetingDate,
        }) as Meeting;
        toast({
          title: "Meeting updated",
          description: `${data.title} has been updated successfully.`,
        });
      } else {
        result = meetingService.create({
          ...data,
          date: meetingDate,
        });
        toast({
          title: "Meeting scheduled",
          description: `${data.title} has been scheduled successfully.`,
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter meeting title" {...field} />
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
                  placeholder="Describe the meeting purpose and objectives"
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="one-time">One-time Meeting</SelectItem>
                    <SelectItem value="recurring">Recurring Meeting</SelectItem>
                    <SelectItem value="instant">Instant Sync</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project (Optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">No specific project</SelectItem>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Meeting Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick meeting date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString().split('T')[0])}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="attendeeIds"
          render={() => (
            <FormItem>
              <FormLabel>Attendees</FormLabel>
              <div className="grid grid-cols-1 gap-3 mt-2 max-h-48 overflow-y-auto">
                {users.map((user) => (
                  <FormField
                    key={user.id}
                    control={form.control}
                    name="attendeeIds"
                    render={({ field }) => {
                      const isSelected = field.value?.includes(user.id);
                      
                      return (
                        <FormItem
                          key={user.id}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={isSelected}
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

        <div className="space-y-3">
          <FormLabel>Agenda</FormLabel>
          <div className="space-y-2">
            {currentAgenda.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Badge variant="outline" className="flex-1 justify-start px-3 py-1">
                  {index + 1}. {item}
                </Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeAgendaItem(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Add agenda item"
              value={newAgendaItem}
              onChange={(e) => setNewAgendaItem(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addAgendaItem();
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={addAgendaItem}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {form.formState.errors.agenda && (
            <p className="text-sm text-destructive">
              {form.formState.errors.agenda.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="icog-button-primary">
            {isEditing ? "Update Meeting" : "Schedule Meeting"}
          </Button>
        </div>
      </form>
    </Form>
  );
}