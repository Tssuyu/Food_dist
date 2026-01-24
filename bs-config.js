// bs-config.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  proxy: "http://food", // твой сайт через OSPanel
  files: [
    "**/*.php",
    "**/*.css",
    "**/*.js",
    "**/*.html",
    "db.json"
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
