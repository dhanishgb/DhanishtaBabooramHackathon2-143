const express = require('express');

module.exports = (pool) => {
    const router = express.Router();
    const recipeModel = require('../models/recipe')(pool);

    // Get all recipes
    router.get('/', async (req, res) => {
        try {
            const recipes = await recipeModel.getAllRecipes();
            res.render('index', { recipes });
        } catch (err) {
            console.error('Error fetching recipes:', err);
            res.status(500).send('Internal Server Error');
        }
    });

    // Add a new recipe
    router.post('/', async (req, res) => {
        const { title, ingredients, instructions } = req.body;
        try {
            await recipeModel.addRecipe(title, ingredients, instructions);
            res.redirect('/recipes');
        } catch (err) {
            console.error('Error adding recipe:', err);
            res.status(500).send('Internal Server Error');
        }
    });

    // View a single recipe
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const recipe = await recipeModel.getRecipeById(id);
            if (recipe) {
                res.render('show', { recipe });
            } else {
                res.status(404).send('Recipe Not Found');
            }
        } catch (err) {
            console.error('Error fetching recipe:', err);
            res.status(500).send('Internal Server Error');
        }
    });

    return router;
};
