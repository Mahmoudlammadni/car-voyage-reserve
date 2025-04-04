
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCarById } from "@/services/carService";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import ReservationForm from "@/components/reservation/ReservationForm";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const ReservationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data: car, isLoading, error } = useQuery({
    queryKey: ['car', id],
    queryFn: () => getCarById(id || ""),
    enabled: !!id,
    onError: () => {
      toast.error("Failed to load car details");
    },
  });

  // Redirect to login if user is not authenticated
  React.useEffect(() => {
    if (!user && !isLoading) {
      toast("Please log in to make a reservation");
      navigate("/login");
    }
  }, [user, navigate, isLoading]);

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          <Link to="/cars" className="flex items-center text-skyblue hover:underline mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to cars
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="page-container">
        <div className="max-w-7xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Car Not Found</h2>
          <p className="text-gray-600 mb-8">The car you're trying to reserve doesn't exist or has been removed.</p>
          <Link to="/cars">
            <Button>View All Cars</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <Link to={`/cars/${id}`} className="flex items-center text-skyblue hover:underline mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to car details
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-2xl font-bold mb-4">Reserve Your Car</h1>
            <div className="rounded-lg overflow-hidden mb-4">
              <img
                src={car.imageUrl}
                alt={`${car.make} ${car.model}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <h2 className="text-xl font-semibold">{car.make} {car.model}</h2>
            <p className="text-gray-500">{car.year} • {car.category}</p>
          </div>
          
          <ReservationForm car={car} />
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
