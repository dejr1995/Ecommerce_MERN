module.exports = {
  apps: [
    {
      name: "server_ecommerce_oficial",
      script: "server.js",
      instances: 1,
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
