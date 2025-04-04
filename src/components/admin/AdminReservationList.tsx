
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllReservations, updateReservationStatus, getCarById } from "@/services/carService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const AdminReservationList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: reservations, isLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: getAllReservations
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "approved" | "declined" }) => 
      updateReservationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success("Reservation status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update reservation status");
    }
  });

  const handleUpdateStatus = (id: string, status: "approved" | "declined") => {
    updateMutation.mutate({ id, status });
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin h-8 w-8 border-4 border-skyblue border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading reservations...</p>
      </div>
    );
  }

  if (!reservations || reservations.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">No reservations found</p>
        <p className="text-gray-500 mt-2">When customers make reservations, they will appear here.</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "declined":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Declined
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Car</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-mono text-xs">
                {reservation.id.substring(0, 8)}...
              </TableCell>
              <TableCell>
                <div className="font-medium">{reservation.userName}</div>
                <div className="text-xs text-gray-500">{reservation.userEmail}</div>
              </TableCell>
              <TableCell>
                <CarInfo carId={reservation.carId} />
              </TableCell>
              <TableCell>
                <div className="text-xs">
                  {format(new Date(reservation.startDate), "MMM d, yyyy")} - 
                  {format(new Date(reservation.endDate), "MMM d, yyyy")}
                </div>
              </TableCell>
              <TableCell>${reservation.totalPrice}</TableCell>
              <TableCell>{getStatusBadge(reservation.status)}</TableCell>
              <TableCell>
                {reservation.status === "pending" && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-green-50 text-green-700 hover:bg-green-100 h-8"
                      onClick={() => handleUpdateStatus(reservation.id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-red-50 text-red-700 hover:bg-red-100 h-8"
                      onClick={() => handleUpdateStatus(reservation.id, "declined")}
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Helper component to fetch and display car info
const CarInfo: React.FC<{ carId: string }> = ({ carId }) => {
  const { data: car, isLoading } = useQuery({
    queryKey: ['car', carId],
    queryFn: () => getCarById(carId)
  });

  if (isLoading || !car) {
    return <div className="text-xs text-gray-500">Loading car info...</div>;
  }

  return (
    <div>
      <div className="font-medium">
        {car.make} {car.model}
      </div>
      <div className="text-xs text-gray-500">{car.year}</div>
    </div>
  );
};

export default AdminReservationList;
