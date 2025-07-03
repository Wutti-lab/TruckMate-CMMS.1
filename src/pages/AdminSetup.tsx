import React from "react";
import { Header } from "@/components/layout/Header";
import { CreateAdminAccount } from "@/components/admin/CreateAdminAccount";
import { FunctionList } from "@/components/app/FunctionList";

export default function AdminSetup() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">TruckMate CMMS - Admin Setup</h1>
            <p className="text-muted-foreground">
              Erstellen Sie ein Admin-Konto und sehen Sie alle verfügbaren Funktionen
            </p>
          </div>
          
          <CreateAdminAccount />
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Alle Funktionen in Ihrer App</h2>
            <FunctionList />
          </div>
        </div>
      </main>
    </div>
  );
}