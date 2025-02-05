let currentMood = '';

document.querySelectorAll('.mood-btn').forEach(button => {
    button.addEventListener('click', () => {
        currentMood = button.dataset.mood;
        getRecipe(currentMood);
    });
});

document.getElementById('new-recipe').addEventListener('click', () => {
    getRecipe(currentMood);
});

function getRecipe(mood) {
    fetch(`/api/recipe/${mood}`)
        .then(response => response.json())
        .then(recipe => {
            document.getElementById('recipe-display').classList.remove('hidden');
            document.getElementById('recipe-name').textContent = recipe.name;
            document.getElementById('recipe-ingredients').textContent = recipe.ingredients;
            document.getElementById('recipe-instructions').textContent = recipe.instructions;
            document.getElementById('recipe-prep-time').textContent = recipe.prepTime;
            document.getElementById('recipe-cook-time').textContent = recipe.cookTime;
            document.getElementById('recipe-difficulty').textContent = recipe.difficulty;
            document.getElementById('recipe-tips').textContent = recipe.tips;
            document.getElementById('recipe-servings').textContent = recipe.servings;
        })
        .catch(error => console.error('Error:', error));
} 