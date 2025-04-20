
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddDriverForm } from "./AddDriverForm";

export function AddDriverModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-2">
          <Button className="bg-fleet-500 hidden md:flex">
            <Plus size={16} className="mr-2" />
            Add Driver | เพิ่มคนขับ
          </Button>
          <Button className="bg-fleet-500 md:hidden" size="icon">
            <Plus size={16} />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Driver | เพิ่มคนขับใหม่</DialogTitle>
        </DialogHeader>
        <AddDriverForm />
      </DialogContent>
    </Dialog>
  );
}
