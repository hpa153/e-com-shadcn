import { LucideIcon } from "lucide-react";

export interface ProProps {
  name: string;
  icon: LucideIcon;
  description: string;
}

const AdvertiserCard = ({ item }: { item: ProProps }) => {
  return (
    <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
      <div className="md:flex-shrink-0 flex justify-center">
        <div className="h-16 w-16 flex items-center justify-center rounded-full bg-orange-200 text-orange-800">
          {<item.icon className="w-1/3 h-1/3" />}
        </div>
      </div>
      <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
        <h3 className="text-base font-medium text-orange-900">{item.name}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
      </div>
    </div>
  );
};

export default AdvertiserCard;
