import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tomato: { 50:"#fff5f3",100:"#ffe4dd",400:"#ff7a5c",500:"#ef5a3c",600:"#d8432a",700:"#b3331e" },
        leaf:   { 50:"#f1faf0",100:"#dff3dc",400:"#6cbf63",500:"#4ea845",600:"#3a8a33",700:"#2d6b28" },
        cream:  { 50:"#fffaf0",100:"#fdf2dc",200:"#f7e4bd" },
        sky:    { 50:"#eff8ff",100:"#dceeff",200:"#bcdcfb" },
        peach:  { 50:"#fff4ec",100:"#ffe2cf",200:"#ffd1b3" },
        lilac:  { 50:"#f6f0ff",100:"#e8dcff",200:"#d6c2fb" },
        ink:    { 800:"#2b2118",900:"#1a130c" },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: { "0%,100%":{transform:"translateY(0)"},"50%":{transform:"translateY(-6px)"} },
        pulseRing: {
          "0%":   { transform:"scale(0.95)", opacity:"0.7" },
          "70%":  { transform:"scale(1.4)",  opacity:"0" },
          "100%": { transform:"scale(1.4)",  opacity:"0" },
        },
        fadeUp: { "0%":{opacity:"0",transform:"translateY(16px)"},"100%":{opacity:"1",transform:"translateY(0)"} },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        pulseRing: "pulseRing 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
        fadeUp: "fadeUp 0.7s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
