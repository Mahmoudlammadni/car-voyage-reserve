
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllCars } from "@/services/carService";
import CarCard from "@/components/cars/CarCard";

const HomePage: React.FC = () => {
  const { data: cars, isLoading } = useQuery({
    queryKey: ['featuredCars'],
    queryFn: getAllCars,
  });

  // Get first 3 cars for featured section
  const featuredCars = cars?.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80"
            alt="Luxury car"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Experience Luxury on Wheels
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Reserve premium vehicles for your journey. Drive in style with our exclusive fleet of luxury cars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/cars">
                <Button className="bg-skyblue hover:bg-skyblue/90 text-white px-8 py-6 text-lg">
                  Browse Cars
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-lightgray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose LuxeDrive</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-skyblue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-skyblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Selection</h3>
              <p className="text-gray-600">
                Handpicked luxury vehicles to suit your style and needs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-skyblue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-skyblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
              <p className="text-gray-600">
                Drive with confidence knowing you're covered by our comprehensive insurance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-skyblue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-skyblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Simple reservation process with real-time availability.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-skyblue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-skyblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer service for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Cars</h2>
            <Link to="/cars" className="text-skyblue hover:text-skyblue/80 flex items-center">
              View all cars
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-skyblue border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading featured cars...</p>
            </div>
          ) : (
            <div className="car-grid">
              {featuredCars?.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Luxury Experience?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Join LuxeDrive today and experience the thrill of driving premium vehicles. Create an account to start booking.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register">
              <Button className="bg-skyblue hover:bg-skyblue/90 text-white px-8 py-6 text-lg">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/cars">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Browse Cars
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
