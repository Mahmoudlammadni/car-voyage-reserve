
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle, Car, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-navy text-white py-4 shadow-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <Car className="mr-2 h-8 w-8 text-skyblue" />
            <span className="text-white">Luxe<span className="text-skyblue">Drive</span></span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-skyblue transition-colors">Home</Link>
            <Link to="/cars" className="hover:text-skyblue transition-colors">Cars</Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <UserCircle className="h-6 w-6 text-skyblue" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56" sideOffset={5}>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">My Reservations</Link>
                  </DropdownMenuItem>
                  
                  {isAdmin() && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:text-skyblue">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-skyblue hover:bg-skyblue/90 text-white">Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="block py-2 hover:text-skyblue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/cars" 
                className="block py-2 hover:text-skyblue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Cars
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="block py-2 hover:text-skyblue transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Reservations
                  </Link>
                  
                  {isAdmin() && (
                    <Link 
                      to="/admin" 
                      className="block py-2 hover:text-skyblue transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block py-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-700">
                  <Link 
                    to="/login" 
                    className="block py-2 hover:text-skyblue transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link 
                    to="/register" 
                    className="block py-2 bg-skyblue text-white px-4 rounded text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
