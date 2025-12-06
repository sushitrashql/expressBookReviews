const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer", session({ 
  secret: "fingerprint_customer", 
  resave: true, 
  saveUninitialized: true 
}));

// Middleware de autenticación MEJORADO
app.use("/customer/auth/*", function auth(req, res, next) {
  // Opción 1: Intentar obtener token del header Authorization (Bearer Token)
  let token = null;
  
  if (req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remover 'Bearer '
    }
  }
  
  // Opción 2: Si no hay Bearer token, intentar obtenerlo de la sesión
  if (!token && req.session.authorization) {
    token = req.session.authorization.accessToken;
  }

  if (token) {
    jwt.verify(token, "access", (err, decoded) => {
      if (!err) {
        req.user = decoded; // Guardar el usuario decodificado
        next();
      } else {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running on port " + PORT));