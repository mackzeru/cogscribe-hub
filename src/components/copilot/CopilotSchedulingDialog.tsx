import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CopilotSelection } from "./CopilotSelection";
import { SchedulingPanel } from "./SchedulingPanel";

interface CopilotSchedulingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CopilotSchedulingDialog = ({
  open,
  onOpenChange,
}: CopilotSchedulingDialogProps) => {
  const [step, setStep] = useState(1);
  const [selectedCopilot, setSelectedCopilot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleCopilotSelect = (copilotId: string) => {
    setSelectedCopilot(copilotId);
    setStep(2);
  };

  const handleSchedule = () => {
    console.log("Scheduling interview:", {
      copilot: selectedCopilot,
      date: selectedDate,
      time: selectedTime,
    });
    // Reset and close
    setStep(1);
    setSelectedCopilot(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    onOpenChange(false);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedCopilot(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Select a Copilot" : "Schedule Interview"}
          </DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Choose an AI copilot to schedule an interview with"
              : "Select a date and time for your interview"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <CopilotSelection onSelect={handleCopilotSelect} />
        ) : (
          <div className="space-y-4">
            <SchedulingPanel
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button
                onClick={handleSchedule}
                disabled={!selectedDate || !selectedTime}
              >
                Schedule Interview
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
