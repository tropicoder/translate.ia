import { languages } from "@/constants/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTitle = () => {
  const languageLabels = languages
    .map((item) => item.label)
    .reduce((acc, label, index, array) => {
      if (index === array.length - 1) {
        return `${acc} & ${label}`;
      }
      return index === 0 ? label : `${acc}, ${label}`;
    }, "");

  return "Traducteur " + languageLabels;
};
