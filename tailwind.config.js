import { violet, blackA, grass, mauve } from "@radix-ui/colors";

export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {...violet, ...blackA, ...mauve,'custom-bg-x' : 'rgba(36,45,52,0.5)'},
  }
};

export const plugins = [];
export const darkMode = 'selector';