// bs-config.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const os = require("os");

module.exports = {
  proxy: os.platform() === "win32"
    ? "http://food"
    : "http://localhost:8888/Food_dist/", // твой сайт через OSPanel/MAMP
  files: [
    "**/*.php",
    "**/*.css",
    "**/*.js",
    "**/*.html"
  ],
  middleware: function (req, res, next) {
    // проксируем все запросы к /api на json-server
    if (req.url.startsWith('/api')) {
      return createProxyMiddleware({
        target: 'http://localhost:3002', // json-server
        changeOrigin: true,
        logLevel: 'debug'
      })(req, res, next);
    }
    next();
  }
};
