
import React from "react";
import AuthForm from "@/components/auth/AuthForm";

const LoginPage: React.FC = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-md mx-auto">
        <AuthForm type="login" />
      </div>
    </div>
  );
};

export default LoginPage;
