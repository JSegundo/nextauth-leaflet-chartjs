import type { Config } from "tailwindcss"

const config = {
  daisyui: {
    // themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    //lemonade, dark , forest, winter, corporate, aqua,emerald
    darkTheme: "forest", // name of one of the included themes for dark mode
    themes: [
      "light",
      "dark",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
      {
        winter: {
          "color-scheme": "light",
          primary: "oklch(56.86% 0.255 257.57)",
          secondary: "#463AA2",
          accent: "#C148AC",
          neutral: "#021431",
          "base-100": "oklch(100% 0 0)",
          "base-200": "#F2F7FF",
          "base-300": "#E3E9F4",
          "base-content": "#394E6A",
          info: "#93E7FB",
          success: "#81CFD1",
          warning: "#EFD7BB",
          error: "#E58B8B",
        },
        forest: {
          "color-scheme": "light",
          primary: "#1eb854",
          "primary-content": "#000000",
          secondary: "#1DB88E",
          accent: "#1DB8AB",
          neutral: "#19362D",
          "base-100": "white",
          "--rounded-btn": "1.9rem",
        },
      },
      // {
      //   dark: {
      //     "color-scheme": "dark",
      //     primary: "#373737",
      //     secondary: "#373737",
      //     accent: "#373737",
      //     "base-100": "#000000",
      //     "base-200": "#141414",
      //     "base-300": "#262626",
      //     "base-content": "#d6d6d6",
      //     neutral: "#373737",
      //     info: "#0000ff",
      //     success: "#008000",
      //     warning: "#ffff00",
      //     error: "#ff0000",
      //     "--rounded-box": "0",
      //     "--rounded-btn": "0",
      //     "--rounded-badge": "0",
      //     "--animation-btn": "0",
      //     "--animation-input": "0",
      //     "--btn-focus-scale": "1",
      //     "--tab-radius": "0",
      //   },
    ],
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./@/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
} satisfies Config

export default config
