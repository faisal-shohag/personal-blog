const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    require('path').join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
  ],

  theme: {
    extend: {
      fontFamily: {
        article: "'Georgia Pro Cond', sans-serif",
        head: "head",
        head2: "head2",
        hind: "'Hind Siliguri', sans-serif",
        lato: "'Lato', sans-serif",
        poppins: "'Poppins', sans-serif",
        kalp: "'Kalpurush', sans-serif",
        fold: "'Foldit', cursive"

      },
      //TODO
      //color customization
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
    container: {
      center: true,
      padding: '1rem'
    }
  },

  plugins: [
    require('flowbite/plugin'),
    ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
  ],
  darkMode: 'class',
};

module.exports = config;