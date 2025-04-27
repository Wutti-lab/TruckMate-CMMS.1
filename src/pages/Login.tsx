
import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-fleet-50 to-white p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-fleet-500">TruckMate CMMS</h1>
          <p className="text-gray-600 mt-2">ระบบจัดการยานพาหนะที่ง่ายดาย</p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: "bg-fleet-500 hover:bg-fleet-600",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50"
            }
          }}
          redirectUrl="/dashboard"
          routing="hash"
        />
      </div>
    </div>
  );
}
