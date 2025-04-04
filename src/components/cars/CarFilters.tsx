
import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCarCategories } from "@/services/carService";

interface CarFiltersProps {
  onSearch: (query: string, category: string) => void;
}

const CarFilters: React.FC<CarFiltersProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const fetchedCategories = await getCarCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = () => {
    onSearch(query, category);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Input
            placeholder="Search by make or model..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="w-full md:w-48">
          <Select
            value={category}
            onValueChange={setCategory}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleSearch} className="bg-skyblue hover:bg-skyblue/90">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
    </div>
  );
};

export default CarFilters;
