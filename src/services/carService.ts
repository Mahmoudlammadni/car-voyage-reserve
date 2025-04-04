
import { formatISO } from "date-fns";

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  category: string;
  seats: number;
  transmission: "automatic" | "manual";
  fuel: string;
  features: string[];
  imageUrl: string;
  description: string;
};

export type Reservation = {
  id: string;
  carId: string;
  userId: string;
  userName: string;
  userEmail: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "approved" | "declined";
  createdAt: string;
};

// Sample car data
const cars: Car[] = [
  {
    id: "1",
    make: "BMW",
    model: "X5",
    year: 2023,
    price: 125,
    category: "SUV",
    seats: 5,
    transmission: "automatic",
    fuel: "Hybrid",
    features: ["Leather seats", "Panoramic roof", "Navigation", "Bluetooth", "Heated seats"],
    imageUrl: "https://images.unsplash.com/photo-1501066927591-314112b5888e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Experience luxury with the new BMW X5. This premium SUV offers comfort, style, and cutting-edge technology for an unforgettable driving experience."
  },
  {
    id: "2",
    make: "Mercedes-Benz",
    model: "S-Class",
    year: 2023,
    price: 200,
    category: "Sedan",
    seats: 5,
    transmission: "automatic",
    fuel: "Hybrid",
    features: ["Leather seats", "Massage seats", "Voice control", "360° camera", "Ambient lighting"],
    imageUrl: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2052&q=80",
    description: "The pinnacle of luxury, the S-Class combines exquisite design with state-of-the-art technology to deliver the ultimate driving experience."
  },
  {
    id: "3",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 150,
    category: "Electric",
    seats: 5,
    transmission: "automatic",
    fuel: "Electric",
    features: ["Autopilot", "Glass roof", "Quick charging", "Smart summon", "Sentry mode"],
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "The future of driving is here with the Tesla Model 3. Zero emissions, cutting-edge technology, and exceptional performance."
  },
  {
    id: "4",
    make: "Porsche",
    model: "911",
    year: 2023,
    price: 300,
    category: "Sports",
    seats: 2,
    transmission: "automatic",
    fuel: "Gasoline",
    features: ["Sport seats", "Sport exhaust", "Launch control", "Sport Chrono package", "Adaptive suspension"],
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Experience the legendary Porsche 911, an icon of performance and design that has set the standard for sports cars for generations."
  },
  {
    id: "5",
    make: "Audi",
    model: "e-tron GT",
    year: 2023,
    price: 175,
    category: "Electric",
    seats: 4,
    transmission: "automatic",
    fuel: "Electric",
    features: ["Virtual cockpit", "Matrix LED lights", "Bang & Olufsen sound", "Air suspension", "Four-wheel steering"],
    imageUrl: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "The Audi e-tron GT combines electric performance with stunning design for an eco-friendly luxury driving experience."
  },
  {
    id: "6",
    make: "Range Rover",
    model: "Sport",
    year: 2023,
    price: 185,
    category: "SUV",
    seats: 5,
    transmission: "automatic",
    fuel: "Hybrid",
    features: ["Off-road capability", "Meridian audio", "Adjustable air suspension", "Terrain Response", "Head-up display"],
    imageUrl: "https://images.unsplash.com/photo-1547245324-d777c6f09808?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Luxury meets capability with the Range Rover Sport, offering supreme comfort on-road and unmatched performance off-road."
  }
];

// Sample reservations (empty initially)
let reservations: Reservation[] = [];

// Get all cars
export const getAllCars = async (): Promise<Car[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return cars;
};

// Get car by ID
export const getCarById = async (id: string): Promise<Car | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return cars.find(car => car.id === id);
};

// Filter cars by search criteria
export const searchCars = async (query: string, category?: string): Promise<Car[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filtered = [...cars];
  
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filtered = filtered.filter(car => 
      car.make.toLowerCase().includes(lowercaseQuery) || 
      car.model.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  if (category && category !== "All") {
    filtered = filtered.filter(car => car.category === category);
  }
  
  return filtered;
};

// Check car availability for specific dates
export const checkCarAvailability = async (
  carId: string, 
  startDate: Date, 
  endDate: Date
): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const carReservations = reservations.filter(
    res => res.carId === carId && res.status !== "declined"
  );
  
  const start = startDate.getTime();
  const end = endDate.getTime();
  
  // Check if there are any overlapping reservations
  return !carReservations.some(reservation => {
    const resStart = new Date(reservation.startDate).getTime();
    const resEnd = new Date(reservation.endDate).getTime();
    
    return (
      (start >= resStart && start <= resEnd) || // Start date within existing reservation
      (end >= resStart && end <= resEnd) || // End date within existing reservation
      (start <= resStart && end >= resEnd) // Existing reservation within selected dates
    );
  });
};

// Create a new reservation
export const createReservation = async (
  carId: string,
  userId: string,
  userName: string,
  userEmail: string,
  startDate: Date,
  endDate: Date
): Promise<Reservation> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const car = await getCarById(carId);
  if (!car) {
    throw new Error("Car not found");
  }
  
  // Calculate total price (days * daily rate)
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = car.price * days;
  
  const newReservation: Reservation = {
    id: Date.now().toString(),
    carId,
    userId,
    userName,
    userEmail,
    startDate: formatISO(startDate),
    endDate: formatISO(endDate),
    totalPrice,
    status: "pending",
    createdAt: formatISO(new Date())
  };
  
  reservations.push(newReservation);
  return newReservation;
};

// Get all reservations (admin only)
export const getAllReservations = async (): Promise<Reservation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...reservations].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Get user reservations
export const getUserReservations = async (userId: string): Promise<Reservation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return reservations
    .filter(res => res.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Update reservation status (admin only)
export const updateReservationStatus = async (
  reservationId: string, 
  status: "approved" | "declined"
): Promise<Reservation> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const index = reservations.findIndex(res => res.id === reservationId);
  if (index === -1) {
    throw new Error("Reservation not found");
  }
  
  reservations[index] = {
    ...reservations[index],
    status
  };
  
  return reservations[index];
};

// Get car categories
export const getCarCategories = async (): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const categories = Array.from(new Set(cars.map(car => car.category)));
  return categories;
};
