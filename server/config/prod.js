// keys.js - Production. figure out what keys to return

// module.exports = {
//   googleClientID: process.env.GOOGLE_CLIENT_ID,
//   googleSecret: process.env.GOOGLE_CLIENT_SECRET,
//   mongoURI: process.env.MONGO_URI,
//   cookieKey: process.env.COOKIE_KEY,
// };  googleClientID:
//"752582594622-49pl5e19d5dfmdd4gsu6qfa770hqqq6f.apps.googleusercontent.com",

// PRODUCTION
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
};
