/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
              "primary": "#e6c888",
              "on-primary": "#3d2e00",
              "primary-container": "#584400",
              "on-primary-container": "#ffeaaf",
              "secondary": "#b8ccb6",
              "on-secondary": "#233423",
              "tertiary": "#d4c8b2",
              "on-tertiary": "#363020",
              "surface": "#121412",
              "surface-variant": "#414942",
              "on-surface": "#e2e3de",
              "on-surface-variant": "#c1c9c0",
              "outline": "#8c938d",
              "outline-variant": "#414942",
              "surface-container-lowest": "#0d0f0d",
              "surface-container-low": "#1a1c1a",
              "surface-container": "#1e201e",
              "surface-container-high": "#282a28",
              "surface-container-highest": "#333532",
              "surface-bright": "#383a37"
      },
      "borderRadius": {
              "DEFAULT": "0.25rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "full": "9999px",
              "2xl": "1rem",
              "3xl": "1.5rem"
      },
      "spacing": {
              "lg": "24px",
              "sm": "8px",
              "xl": "32px",
              "gutter": "16px",
              "md": "16px",
              "base": "8px",
              "xs": "4px",
              "margin": "24px"
      },
      "fontFamily": {
              "body-lg": [
                      "Manrope"
              ],
              "body-md": [
                      "Manrope"
              ],
              "label-md": [
                      "Manrope"
              ],
              "headline-lg": [
                      "Eb Garamond"
              ],
              "headline-md": [
                      "Eb Garamond"
              ],
              "script": ["'Great Vibes'", "cursive"]
      },
      "fontSize": {
              "body-lg": [
                      "18px",
                      {
                              "lineHeight": "28px",
                              "fontWeight": "400"
                      }
              ],
              "body-md": [
                      "16px",
                      {
                              "lineHeight": "24px",
                              "fontWeight": "400"
                      }
              ],
              "label-md": [
                      "14px",
                      {
                              "lineHeight": "20px",
                              "letterSpacing": "0.02em",
                              "fontWeight": "600"
                      }
              ],
              "headline-lg": [
                      "40px",
                      {
                              "lineHeight": "48px",
                              "fontWeight": "500"
                      }
              ],
              "headline-md": [
                      "32px",
                      {
                              "lineHeight": "40px",
                              "fontWeight": "500"
                      }
              ]
      },
      "boxShadow": {
          "premium-card": "0 10px 40px -10px rgba(0, 0, 0, 0.5)",
          "premium-btn": "0 4px 14px 0 rgba(230, 200, 136, 0.3)",
          "glow": "0 0 30px rgba(230, 200, 136, 0.15)"
      }
    },
  },
  plugins: [],
}
