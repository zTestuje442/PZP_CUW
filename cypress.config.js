const { defineConfig } = require("cypress");
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        checkFileExists(filePath) {
          return fs.existsSync(filePath);
        },
      });
    },
  },
});
