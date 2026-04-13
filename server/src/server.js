


const app = require("./app");
const connectDB = require("./config/db");
const env = require("./config/env");

const startServer = async () => {
  await connectDB();

  // Bind to 0.0.0.0 so collaborators on the same network can reach the API
  app.listen(env.port, "0.0.0.0", () => {
    console.log(`\n🚀 Server running on port ${env.port}`);
    console.log(`   Local:   http://localhost:${env.port}/api/v1`);
    console.log(`   Network: http://<your-ip>:${env.port}/api/v1`);
    console.log(`   Env:     ${env.nodeEnv}\n`);
  });
};

startServer();