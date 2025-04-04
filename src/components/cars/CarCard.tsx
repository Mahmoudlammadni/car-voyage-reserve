
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, Zap } from "lucide-react";
import { Car } from "@/services/carService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Card className="overflow-hidden hover-lift transition-shadow hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.imageUrl}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        <Badge className="absolute top-2 right-2 bg-skyblue text-white">
          ${car.price}/day
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold mb-1 text-navy">
              {car.make} {car.model}
            </h3>
            <p className="text-sm text-gray-500">{car.year}</p>
          </div>
          <Badge variant="outline" className="text-xs">{car.category}</Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-2 my-4">
          <div className="flex flex-col items-center text-center">
            <Users className="h-5 w-5 text-gray-500 mb-1" />
            <span className="text-xs text-gray-600">{car.seats} Seats</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Calendar className="h-5 w-5 text-gray-500 mb-1" />
            <span className="text-xs text-gray-600">{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Zap className="h-5 w-5 text-gray-500 mb-1" />
            <span className="text-xs text-gray-600">{car.fuel}</span>
          </div>
        </div>
        
        <div className="space-y-3 mt-4">
          <p className="text-sm text-gray-500 line-clamp-2">
            {car.description}
          </p>
          
          <div className="flex space-x-2">
            <Link to={`/cars/${car.id}`} className="flex-1">
              <Button variant="outline" className="w-full">View Details</Button>
            </Link>
            <Link to={`/reserve/${car.id}`} className="flex-1">
              <Button className="w-full bg-skyblue hover:bg-skyblue/90">Reserve Now</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
