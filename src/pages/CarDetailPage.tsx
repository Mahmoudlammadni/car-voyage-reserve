
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCarById } from "@/services/carService";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Users, Calendar, Fuel, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: car, isLoading, error } = useQuery({
    queryKey: ['car', id],
    queryFn: () => getCarById(id || ""),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="max-w-7xl mx-auto">
          <Link to="/cars" className="flex items-center text-skyblue hover:underline mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to cars
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Skeleton className="h-[400px] w-full rounded-lg" />
            
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
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
          <p className="text-gray-600 mb-8">The car you're looking for doesn't exist or has been removed.</p>
          <Link to="/cars">
            <Button>View All Cars</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <Link to="/cars" className="flex items-center text-skyblue hover:underline mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to cars
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="relative">
            <div className="rounded-lg overflow-hidden">
              <img
                src={car.imageUrl}
                alt={`${car.make} ${car.model}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <Badge className="absolute top-4 right-4 bg-skyblue text-white text-base px-4 py-1">
              ${car.price}/day
            </Badge>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-navy">{car.make} {car.model}</h1>
                <Badge variant="outline">{car.category}</Badge>
              </div>
              <p className="text-xl text-gray-500">{car.year}</p>
            </div>
            
            <p className="text-gray-700">{car.description}</p>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Users className="h-6 w-6 text-skyblue mx-auto mb-2" />
                <p className="text-sm font-medium">{car.seats} Seats</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Calendar className="h-6 w-6 text-skyblue mx-auto mb-2" />
                <p className="text-sm font-medium capitalize">{car.transmission}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Fuel className="h-6 w-6 text-skyblue mx-auto mb-2" />
                <p className="text-sm font-medium">{car.fuel}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Link to={`/reserve/${car.id}`}>
              <Button className="w-full bg-skyblue hover:bg-skyblue/90 py-6 text-lg">
                Check Availability & Reserve
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
