import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      width: {
        modalFormulario: '420px',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        tangerine: 'rgba(242, 140, 40, 1)', 
        sunglow: 'rgba(255, 200, 87, 1)',   
        redPantone: 'rgba(230, 57, 70, 1)',
        sandyBrown: 'rgba(255, 179, 133, 1)',
        flame: 'rgba(227, 86, 35, 1)',
        persianRed: 'rgba(192, 57, 43, 1)',
        gold: 'rgba(255, 215, 0, 1)',     
        
        //bg-categorias
        color1:"rgb(255, 168, 168)",
        color2:"rgb(57, 235, 170)",
        color3:"rgb(255, 236, 143)",
        color4:"rgb(239, 168, 255)",
        color5:"rgb(168, 215, 255)",
        color6:"rgb(129, 255, 129)",
        color7:"rgb(255, 199, 122)",
        color8:"rgb(144, 122, 255)" 
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
