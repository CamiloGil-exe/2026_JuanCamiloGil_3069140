/**
*Author: 	DIEGO CASALLAS
*Date:		01/01/2026  
*Description:	Application setup for the API - NODEJS
**/
import express from 'express';
import cors from 'cors';
import userRoutes from '../routes/user.routes.js';
import userStatusRoutes from '../routes/userStatus.routes.js';
import roleRoutes from '../routes/role.routes.js';
import userApiRoutes from '../routes/apiUser.routes.js';
import roleModulesRoutes from '../routes/role_modules.routes.js';
import modulesRoutes from '../routes/modules.routes.js';       
import profilesRoutes from '../routes/profiles.routes.js';      

// Create an instance of the Express application
const app = express();

// Define the base path for the API
const NAME_API = '/api_v1';

// Middleware to handle JSON
app.use(express.json());
app.use(cors());

// Routes for the API
app.use(NAME_API, userRoutes);
app.use(NAME_API, userStatusRoutes);
app.use(NAME_API, roleRoutes);
app.use(NAME_API, userApiRoutes);
app.use(NAME_API, roleModulesRoutes);
app.use(NAME_API, modulesRoutes);   // ✅ NUEVO
app.use(NAME_API, profilesRoutes);  // ✅ NUEVO

// Handle 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint 404, not found'
  });
});

export default app;