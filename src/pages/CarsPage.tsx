
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllCars, searchCars } from "@/services/carService";
import CarList from "@/components/cars/CarList";
import CarFilters from "@/components/cars/CarFilters";

const CarsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");

  // Set initial search params from URL
  useEffect(() => {
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    
    if (query) setSearchQuery(query);
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  // Search query
  const { data: cars, isLoading } = useQuery({
    queryKey: ['cars', searchQuery, selectedCategory],
    queryFn: () => 
      searchQuery || selectedCategory !== "All" 
        ? searchCars(searchQuery, selectedCategory !== "All" ? selectedCategory : undefined) 
        : getAllCars(),
  });

  const handleSearch = (query: string, category: string) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    
    // Update URL params
    const params: { q?: string; category?: string } = {};
    if (query) params.q = query;
    if (category !== "All") params.category = category;
    
    setSearchParams(params);
  };

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Our Car Collection</h1>
        
        <CarFilters onSearch={handleSearch} />
        
        <CarList cars={cars || []} loading={isLoading} />
      </div>
    </div>
  );
};

export default CarsPage;
