
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminReservationList from "@/components/admin/AdminReservationList";

const AdminPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is admin, redirect if not
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!isAdmin()) {
      navigate("/");
    }
  }, [user, isAdmin, navigate]);
  
  if (!user || !isAdmin()) {
    return null; // Don't render anything while checking permissions
  }

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="reservations">
          <TabsList className="mb-6">
            <TabsTrigger value="reservations">Reservations</TabsTrigger>
            <TabsTrigger value="cars">Car Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reservations">
            <Card>
              <CardHeader>
                <CardTitle>Reservation Management</CardTitle>
                <CardDescription>
                  View and manage all customer reservations. Approve or decline reservation requests.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminReservationList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cars">
            <Card className="p-8">
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold mb-2">Car Management Coming Soon</h3>
                <p className="text-gray-500">This feature is under development.</p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card className="p-8">
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold mb-2">User Management Coming Soon</h3>
                <p className="text-gray-500">This feature is under development.</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
