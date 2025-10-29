import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Faculty, AvailabilitySlot } from "@/types/faculty.types";
import { facultyService } from "@/services/facultyService";
import { toast } from "sonner";

interface ManageAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  faculty: Faculty;
  onSuccess: () => void;
}

const dayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const ManageAvailabilityModal = ({
  isOpen,
  onClose,
  faculty,
  onSuccess,
}: ManageAvailabilityModalProps) => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>(
    faculty.availability.length > 0
      ? faculty.availability
      : [{ days: [], startTime: "", endTime: "" }]
  );

  const addSlot = () => {
    setSlots([...slots, { days: [], startTime: "", endTime: "" }]);
  };

  const removeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const updateSlot = (index: number, field: keyof AvailabilitySlot, value: any) => {
    const newSlots = [...slots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setSlots(newSlots);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validSlots = slots.filter(
      (slot) => slot.days.length > 0 && slot.startTime && slot.endTime
    );

    if (validSlots.length === 0) {
      toast.error("Please add at least one valid availability slot");
      return;
    }

    facultyService.updateFaculty(faculty.id, { availability: validSlots });
    toast.success("Availability updated successfully");
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Manage Availability - {faculty.firstName} {faculty.lastName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Set Availability</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You can select multiple days and set the start and end times for each
              selected day. Use the '+' button to add more days and their corresponding
              timings as needed.
            </p>

            <div className="space-y-4">
              {slots.map((slot, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-5 space-y-2">
                    <Label>Select Days</Label>
                    <Select
                      value={slot.days.join(", ")}
                      onValueChange={(value) => {
                        const days = value.split(", ");
                        updateSlot(index, "days", days);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mon, Tue, Wed">Mon, Tue, Wed</SelectItem>
                        <SelectItem value="Thu, Fri">Thu, Fri</SelectItem>
                        <SelectItem value="Sat, Sun">Sat, Sun</SelectItem>
                        <SelectItem value="Mon, Wed, Fri">Mon, Wed, Fri</SelectItem>
                        <SelectItem value="Tue, Thu">Tue, Thu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-3 space-y-2">
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) =>
                        updateSlot(index, "startTime", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-span-3 space-y-2">
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => updateSlot(index, "endTime", e.target.value)}
                    />
                  </div>

                  <div className="col-span-1 flex gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSlot(index)}
                      disabled={slots.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    {index === slots.length - 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={addSlot}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
