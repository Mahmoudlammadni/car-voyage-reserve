
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { getUserReservations, getCarById } from "@/services/carService";
import { Button } from "@/components/ui/button";
import { Car, User } from "lucide-react";
import ReservationCard from "@/components/reservation/ReservationCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if user is not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { data: reservations, isLoading: reservationsLoading } = useQuery({
    queryKey: ['userReservations', user?.id],
    queryFn: () => getUserReservations(user?.id || ""),
    enabled: !!user,
  });

  // For each reservation, get the car details
  const carQueries = useQuery({
    queryKey: ['carDetails', reservations],
    queryFn: async () => {
      if (!reservations || reservations.length === 0) return {};
      
      const carDetails = {};
      for (const reservation of reservations) {
        try {
          const car = await getCarById(reservation.carId);
          if (car) {
            carDetails[reservation.carId] = {
              make: car.make,
              model: car.model,
              imageUrl: car.imageUrl
            };
          }
        } catch (error) {
          console.error("Failed to load car details:", error);
        }
      }
      return carDetails;
    },
    enabled: !!reservations && reservations.length > 0,
  });

  if (!user) return null; // Don't render anything while checking auth

  return (
    <div className="page-container">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar - User Info */}
          <div>
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-skyblue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-skyblue" />
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <p className="text-sm text-gray-500">{user.email}</p>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full mb-3"
                  onClick={() => navigate("/cars")}
                >
                  <Car className="mr-2 h-4 w-4" />
                  Browse Cars
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-red-500 hover:text-red-600"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Log out
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content - Reservations */}
          <div className="md:col-span-2">
            <h1 className="text-2xl font-bold mb-6">My Reservations</h1>
            
            {reservationsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array(2).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))}
              </div>
            ) : reservations && reservations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reservations.map((reservation) => (
                  <ReservationCard 
                    key={reservation.id} 
                    reservation={reservation}
                    carDetails={carQueries.data?.[reservation.carId]}
                  />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No Reservations Yet</h3>
                  <p className="text-gray-500 mb-6">You haven't made any car reservations yet.</p>
                  <Button 
                    onClick={() => navigate("/cars")}
                    className="bg-skyblue hover:bg-skyblue/90"
                  >
                    Browse Available Cars
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
