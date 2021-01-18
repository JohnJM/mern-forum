module.exports = {
    //remove unused
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'media', 
    theme: {

      filter: {
        'none': 'none',
        'hue-rotate': 'hue-rotate(3.142rad)',
      },
      extend:{
        colors: {
          "primary": "var(--primary)",
          "secondary": "var(--secondary)"
        },
        borderWidth: {
        '3': '3px'
        }
      },
      minWidth : {
        '0': '0',
        '250': '250px'
      },
      maxWidth : {
        '800': '800px'
      }
    },

    variants: {
      filter: ['responsive'],
      backdropFilter: ['responsive'],

      extend: {
        opacity: ['disabled'],
        cursor: ['disabled'],
        pointerEvents: ['disabled']
      },
    },
    plugins: [
      require('tailwindcss-filters'),
      require('tailwind-hamburgers')
    ]
  }