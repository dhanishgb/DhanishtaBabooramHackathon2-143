module.exports = (pool) => {
    return {
        // Fetch all recipes
        getAllRecipes: async () => {
            try {
                const result = await pool.query('SELECT * FROM recipes ORDER BY created_at DESC');
                return result.rows;
            } catch (err) {
                console.error('Error fetching recipes:', err);
                throw err;
            }
        },

        // Fetch a single recipe by ID
        getRecipeById: async (id) => {
            try {
                const result = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
                return result.rows[0];
            } catch (err) {
                console.error('Error fetching recipe:', err);
                throw err;
            }
        },

        // Add a new recipe
        addRecipe: async (title, ingredients, instructions) => {
            try {
                const result = await pool.query(
                    'INSERT INTO recipes (title, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *',
                    [title, ingredients, instructions]
                );
                return result.rows[0];
            } catch (err) {
                console.error('Error adding recipe:', err);
                throw err;
            }
        },

        // Update a recipe by ID
        updateRecipe: async (id, title, ingredients, instructions) => {
            try {
                const result = await pool.query(
                    'UPDATE recipes SET title = $1, ingredients = $2, instructions = $3 WHERE id = $4 RETURNING *',
                    [title, ingredients, instructions, id]
                );
                return result.rows[0];
            } catch (err) {
                console.error('Error updating recipe:', err);
                throw err;
            }
        },

        // Delete a recipe by ID
        deleteRecipe: async (id) => {
            try {
                await pool.query('DELETE FROM recipes WHERE id = $1', [id]);
                return { message: 'Recipe deleted successfully' };
            } catch (err) {
                console.error('Error deleting recipe:', err);
                throw err;
            }
        }
    };
};
