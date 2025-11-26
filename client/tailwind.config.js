module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        smoothDrop: {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        softFade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        softScale: {
          "0%": { opacity: 0, transform: "scale(0.97)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },

        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" }
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        pop: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 }
        },
        glow: {
          "0%": { opacity: 0.2 },
          "50%": { opacity: 0.6 },
          "100%": { opacity: 0.2 }
        },

        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        scaleUp: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },

        slideFade: {
          "0%": { opacity: 0, transform: "translateY(15px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },

        softBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },

        pulseGlow: {
          "0%": { opacity: 0.4, transform: "scale(1)" },
          "50%": { opacity: 0.9, transform: "scale(1.03)" },
          "100%": { opacity: 0.4, transform: "scale(1)" }
        },

        floatXL: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
          "100%": { transform: "translateY(0px)" }
        }
      },

      animation: {
        float: "float 3s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s ease-out forwards",
        pop: "pop 0.3s ease-out forwards",
        glow: "glow 4s ease-in-out infinite",

        fadeIn: "fadeIn 0.5s ease-out forwards",
        scaleUp: "scaleUp 0.4s ease-out forwards",

        slideFade: "slideFade 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        softBounce: "softBounce 3s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.6s ease-in-out infinite",
        floatXL: "floatXL 5s ease-in-out infinite",

        // ⭐ transisi halaman premium
        smoothDrop: "smoothDrop 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards",
        softFade: "softFade 0.7s ease-out forwards",
        softScale: "softScale 0.4s ease-out forwards",
      }
    }
  },
  plugins: [],
};
