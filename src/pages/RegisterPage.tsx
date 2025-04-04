
import React from "react";
import AuthForm from "@/components/auth/AuthForm";

const RegisterPage: React.FC = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-md mx-auto">
        <AuthForm type="register" />
      </div>
    </div>
  );
};

export default RegisterPage;
