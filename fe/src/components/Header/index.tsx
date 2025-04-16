import { Bell } from "lucide-react";
import { Button } from "../ui/button";

export interface HeaderProps {
  title: string;
  description?: string;
}

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        {description && (
          <span className="md:text-sm text-xs">{description}</span>
        )}
      </div>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full"></span>
      </Button>
    </div>
  );
};
