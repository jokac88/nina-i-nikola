// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: true
  },
  ssr: false,
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/nina-i-nikola/' : '/',
    buildAssetsDir: 'assets',
    head: {
      title: 'Nina i Nikola',
      meta: [
        {
          name: 'description',
          content: 'Nina i Nikola'
        },
        {
          name: 'keywords',
          content: 'Nina, Nikola'
        },
        {
          name: 'theme-color',
          content: '#577567'
        }
      ],
      link: [
        {
          rel: "preconnect",
          href:
            "https://fonts.googleapis.com"
        },
        {
          rel: "preconnect",
          href:
            "https://fonts.gstatic.com"
        },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Roboto+Slab:wght@400;500;700&display=swap"
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: 'favicon.ico'
        }
      ],
      noscript: [
        {
          innerHTML: 'JavaScript is required'
        }
      ]
    },
  },
  css: ['@/assets/scss/main.scss']
});
