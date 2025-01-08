const { defineConfig } = require("cypress");
const { spawn } = require("child_process");
let server;
let baseUrl;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Add the code coverage task
      require('@cypress/code-coverage/task')(on, config);

      // Define custom tasks for starting and stopping the server
      on("task", {
        startServer() {
          return new Promise((resolve, reject) => {
            // Check if the server is already running
            if (server) {
              resolve(baseUrl);
            }

            // Start the server with `nyc` and the `index-test.js` file
            server = spawn("node", ["-r", "nyc", "index-test.js"]);

            // Capture the output of the server process
            server.stdout.on("data", (data) => {
              console.log(data.toString()); // Log the output for debugging
              if (data.toString().includes("Demo project at:")) {
                const baseUrlPrefix = "Demo project at: ";
                const startIndex = data.toString().indexOf(baseUrlPrefix);
                if (startIndex !== -1) {
                  baseUrl = data.toString().substring(startIndex + baseUrlPrefix.length).trim();
                  resolve(baseUrl); // Resolve with the baseUrl
                }
              }
            });

            // Handle errors from the server
            server.stderr.on("data", (data) => {
              reject(data);
            });
          });
        },

        // Stop the server when the tests are done
        stopServer() {
          if (server) {
            server.kill(); // Kill the server process
          }
          return null;
        },
      });

      // Return the updated config
      return config;
    },
  },
});
