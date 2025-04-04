
import React from "react";
import { format } from "date-fns";
import { Clock, CalendarCheck, CalendarX } from "lucide-react";
import { Reservation } from "@/services/carService";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ReservationCardProps {
  reservation: Reservation;
  carDetails?: {
    make: string;
    model: string;
    imageUrl: string;
  };
}

const ReservationCard: React.FC<ReservationCardProps> = ({ 
  reservation,
  carDetails
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "declined":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CalendarCheck className="h-4 w-4 mr-1" />;
      case "declined":
        return <CalendarX className="h-4 w-4 mr-1" />;
      default:
        return <Clock className="h-4 w-4 mr-1" />;
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">
            {carDetails 
              ? `${carDetails.make} ${carDetails.model}` 
              : "Car Reservation"}
          </CardTitle>
          <Badge 
            className={cn(
              "ml-2",
              getStatusColor(reservation.status)
            )}
          >
            <span className="flex items-center">
              {getStatusIcon(reservation.status)}
              <span className="capitalize">{reservation.status}</span>
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {carDetails && (
          <div className="mb-4 h-32 overflow-hidden rounded">
            <img 
              src={carDetails.imageUrl} 
              alt={`${carDetails.make} ${carDetails.model}`} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">Reservation ID:</div>
            <div className="font-medium truncate">{reservation.id.substring(0, 8)}...</div>
            
            <div className="text-gray-500">Start Date:</div>
            <div className="font-medium">{formatDate(reservation.startDate)}</div>
            
            <div className="text-gray-500">End Date:</div>
            <div className="font-medium">{formatDate(reservation.endDate)}</div>
            
            <div className="text-gray-500">Total Price:</div>
            <div className="font-medium">${reservation.totalPrice}</div>
          </div>
          
          <div className="pt-2 text-xs text-gray-500">
            Reserved on {format(new Date(reservation.createdAt), "MMMM d, yyyy 'at' h:mm a")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
