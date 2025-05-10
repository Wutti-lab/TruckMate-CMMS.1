
export interface Advertisement {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  link: string;
  active: boolean;
  image?: string;
}

export const colorOptions = [
  { value: "bg-gradient-to-r from-sky-400 to-blue-500", label: "สีฟ้า" },
  { value: "bg-gradient-to-r from-amber-300 to-orange-500", label: "สีส้ม" },
  { value: "bg-gradient-to-r from-green-400 to-emerald-600", label: "สีเขียว" },
  { value: "bg-gradient-to-r from-purple-400 to-pink-500", label: "สีม่วง" },
  { value: "bg-gradient-to-r from-red-400 to-rose-500", label: "สีแดง" }
];
