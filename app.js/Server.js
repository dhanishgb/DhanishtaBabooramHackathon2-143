const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // PostgreSQL client for Node.js
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Connect to Neon DB
const pool = new Pool({
    connectionString: 'postgresql://class143_owner:BThOV0lZb3YU@ep-holy-lab-a2xm39f8.eu-central-1.aws.neon.tech/Recipe_App?sslmode=require', // Replace with your Neon DB connection string
    ssl: { rejectUnauthorized: false } // Ensure secure connection
});

// Test database connection
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to Neon DB:', err);
    } else {
        console.log('Connected to Neon DB');
    }
});

// Routes
const recipeRoutes = require('./routes/recipe');
app.use('/recipes', recipeRoutes(pool)); // Pass pool to routes for database access

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

