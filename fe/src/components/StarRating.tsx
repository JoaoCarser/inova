"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export function StarRating({ value, onChange, max = 5 }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="flex items-center">
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = hoverValue ? starValue <= hoverValue : starValue <= value;

        return (
          <button
            key={index}
            type="button"
            className={cn(
              "p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isFilled ? "text-yellow-400" : "text-gray-300"
            )}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(0)}
            onClick={() => onChange(starValue)}
            aria-label={`${starValue} de ${max} estrelas`}
          >
            <Star className="h-8 w-8 fill-current" strokeWidth={1} />
          </button>
        );
      })}
    </div>
  );
}
