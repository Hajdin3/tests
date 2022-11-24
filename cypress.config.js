const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://test:ts3@dev.tender-service.co.uk/',
    defaultCommandTimeout: 10000,
      watchForFileChanges: false,
      viewportWidth:1280,
      failOnStatusCode: false,
      retries: {
        runMode: 1,
        openMode: 1
      }
  }
})


// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       baseUrl: 'http://test:ts3@dev.tender-service.co.uk'
//       defaultCommandTimeout: 10000
//       watchForFileChanges: false
//       chromeWebSecurity: false
//       viewportHeight: 720
//       viewportWidth:1280
//       retries: {
//         runMode: 1
//         openMode: 1
//       }
//       // implement node event listeners here
      
//     },
//   },
// });
