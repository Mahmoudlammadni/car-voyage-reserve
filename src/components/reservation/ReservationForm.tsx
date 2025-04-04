
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Car, checkCarAvailability, createReservation } from "@/services/carService";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { format, addDays, differenceInDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReservationFormProps {
  car: Car;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ car }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const today = new Date();
  const maxDate = addDays(today, 90); // Allow bookings up to 90 days in advance

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const days = differenceInDays(endDate, startDate) + 1; // Include end date
    return car.price * days;
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    // If end date is before new start date or not set, update it
    if (date && (!endDate || endDate < date)) {
      setEndDate(date);
    }
    setIsAvailable(null); // Reset availability when dates change
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    setIsAvailable(null); // Reset availability when dates change
  };

  const handleCheckAvailability = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    setIsChecking(true);
    try {
      const available = await checkCarAvailability(car.id, startDate, endDate);
      setIsAvailable(available);

      if (available) {
        toast.success("The car is available for your selected dates!");
      } else {
        toast.error("Sorry, the car is not available for your selected dates.");
      }
    } catch (error) {
      toast.error("Failed to check availability. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast("Please log in to make a reservation");
      navigate("/login");
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    if (isAvailable !== true) {
      toast.error("Please check availability before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      await createReservation(
        car.id,
        user.id,
        user.name,
        user.email,
        startDate,
        endDate
      );

      toast.success("Reservation submitted successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to submit reservation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reserve Your {car.make} {car.model}</CardTitle>
        <CardDescription>
          ${car.price} per day • Reserve now to secure your booking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateChange}
                  disabled={(date) => date < today || date > maxDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateChange}
                  disabled={(date) => 
                    date < (startDate || today) || 
                    date > maxDate
                  }
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            onClick={handleCheckAvailability}
            disabled={!startDate || !endDate || isChecking}
            className="w-full sm:w-auto bg-navy hover:bg-navy/90"
          >
            {isChecking ? "Checking..." : "Check Availability"}
          </Button>
        </div>
        
        {isAvailable !== null && (
          <div className={cn(
            "p-4 rounded-md text-center",
            isAvailable ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          )}>
            {isAvailable 
              ? "Great! This car is available for your selected dates." 
              : "Sorry, this car is not available for your selected dates."}
          </div>
        )}
        
        {startDate && endDate && (
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Daily Rate:</span>
              <span>${car.price}/day</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Rental Period:</span>
              <span>{differenceInDays(endDate, startDate) + 1} days</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${calculateTotalPrice()}</span>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={!startDate || !endDate || isAvailable !== true || isSubmitting}
          className="w-full bg-skyblue hover:bg-skyblue/90"
        >
          {isSubmitting ? "Submitting..." : "Reserve Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReservationForm;
