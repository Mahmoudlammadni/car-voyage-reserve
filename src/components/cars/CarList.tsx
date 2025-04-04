
import React from "react";
import { Car } from "@/services/carService";
import CarCard from "./CarCard";
import { Skeleton } from "@/components/ui/skeleton";

interface CarListProps {
  cars: Car[];
  loading: boolean;
}

const CarList: React.FC<CarListProps> = ({ cars, loading }) => {
  if (loading) {
    return (
      <div className="car-grid mt-8">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex space-x-4 pt-2">
                  <Skeleton className="h-10 w-1/2" />
                  <Skeleton className="h-10 w-1/2" />
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600">No cars found</h3>
        <p className="text-gray-500 mt-2">
          Try adjusting your search criteria or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="car-grid mt-8">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
