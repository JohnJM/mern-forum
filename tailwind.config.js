module.exports = {
    //remove unused
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'media', 
    theme: {
      minWidth : {
        '0': '0',
        '250': '250px'
      },
      extend: {},
    },
    variants: {
      extend: {
        opacity: ['disabled'],
        cursor: ['disabled']
      },
    },
    plugins: [],
  }