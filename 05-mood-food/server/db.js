const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('server/database.sqlite');

// Initialize database
db.serialize(() => {
  // Drop existing table if it exists
  db.run(`DROP TABLE IF EXISTS recipes`);

  // Create recipes table with new schema
  db.run(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL,
      prepTime TEXT NOT NULL,
      cookTime TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      servings TEXT NOT NULL,
      tips TEXT NOT NULL,
      mood TEXT NOT NULL
    )
  `);

  // Insert some sample data
  const sampleRecipes = [
    // Happy Mood Recipes
    {
      name: 'Celebratory Rainbow Pancakes',
      ingredients: 'Flour (2 cups)\nEggs (2 large)\nMilk (1½ cups)\nVanilla extract (1 tsp)\nFood coloring (red, yellow, blue)\nButter (4 tbsp, melted)\nBaking powder (2 tsp)\nSugar (3 tbsp)\nSalt (¼ tsp)\nMaple syrup\nWhipped cream\nFresh berries',
      instructions: 'Preparation:\n1. In a large bowl, whisk together flour, baking powder, sugar, and salt\n2. In another bowl, whisk milk, eggs, melted butter, and vanilla\n3. Combine wet and dry ingredients until just mixed\n4. Divide batter into 4 portions\n5. Add different food coloring to each portion\n\nCooking:\n1. Heat griddle to medium (350°F)\n2. Pour ¼ cup batter for each pancake\n3. Cook until bubbles form (2-3 mins)\n4. Flip and cook other side (1-2 mins)\n\nAssembly:\n1. Stack pancakes, alternating colors\n2. Add whipped cream between layers\n3. Top with fresh berries\n4. Drizzle with warm maple syrup\n5. Serve immediately',
      prepTime: '15 minutes',
      cookTime: '20 minutes',
      difficulty: 'Intermediate',
      servings: '4-6 servings',
      tips: 'Don\'t overmix the batter - some small lumps are okay\nTest the griddle temperature with a small drop of batter\nKeep finished pancakes warm in a 200°F oven while making the rest',
      mood: 'happy'
    },
    {
      name: 'Birthday Cake Smoothie',
      ingredients: 'Vanilla ice cream (2 cups)\nWhole milk (1 cup)\nVanilla extract (1 tsp)\nRainbow sprinkles (¼ cup)\nWhipped cream\nBirthday cake flavoring (½ tsp)\nGraham crackers\nPinch of salt',
      instructions: 'Preparation:\n1. Gather all ingredients\n2. Measure portions accurately\n3. Chill serving glass in freezer\n\nBlending:\n1. Combine ice cream, milk, vanilla, and cake flavoring in blender\n2. Add pinch of salt to enhance flavors\n3. Blend until smooth but still thick\n4. Add half the sprinkles\n5. Pulse briefly to mix\n\nServing:\n1. Remove glass from freezer\n2. Pour smoothie into glass\n3. Top with whipped cream\n4. Garnish with remaining sprinkles\n5. Serve immediately with graham crackers',
      prepTime: '5 minutes',
      cookTime: '5 minutes',
      difficulty: 'Easy',
      servings: '2 servings.',
      tips: 'Use premium vanilla ice cream for best results.\nDon\'t over-blend or smoothie will become too thin.\nServe immediately for best texture',
      mood: 'happy'
    },
    {
      name: 'Festive Fruit Pizza',
      ingredients: 'Sugar cookie dough, cream cheese, powdered sugar, vanilla, assorted fresh fruits (strawberries, kiwi, mandarin oranges, blueberries)',
      instructions: '1. Bake cookie dough in pizza shape\n2. Mix cream cheese frosting\n3. Spread frosting on cooled cookie\n4. Arrange fruits in colorful pattern',
      mood: 'happy'
    },

    // Sad Mood Recipes
    {
      name: 'Ultimate Comfort Mac and Cheese',
      ingredients: 'Macaroni, sharp cheddar, gruyere, mozzarella, butter, flour, milk, breadcrumbs, garlic powder, black pepper',
      instructions: '1. Cook macaroni until al dente\n2. Make roux with butter and flour\n3. Add milk and cheeses\n4. Combine with pasta\n5. Top with breadcrumbs and bake until golden',
      mood: 'sad'
    },
    {
      name: 'Grandma\'s Chicken Soup',
      ingredients: 'Whole chicken, carrots, celery, onion, garlic, egg noodles, fresh dill, bay leaves, chicken broth, salt and pepper',
      instructions: '1. Simmer chicken with vegetables and herbs\n2. Remove chicken and shred\n3. Cook noodles in broth\n4. Combine chicken and vegetables\n5. Season to taste',
      mood: 'sad'
    },
    {
      name: 'Warm Chocolate Pudding',
      ingredients: 'Dark chocolate, milk, cornstarch, sugar, vanilla extract, salt, whipped cream',
      instructions: '1. Heat milk with sugar\n2. Add melted chocolate\n3. Thicken with cornstarch\n4. Cook until smooth\n5. Serve warm with whipped cream',
      mood: 'sad'
    },

    // Stressed Mood Recipes
    {
      name: 'Calming Chamomile Lavender Cookies',
      ingredients: 'Flour, butter, sugar, chamomile tea leaves, dried lavender, vanilla extract, eggs, salt',
      instructions: '1. Cream butter and sugar\n2. Add ground tea and lavender\n3. Mix in dry ingredients\n4. Shape and bake\n5. Cool before serving',
      mood: 'stressed'
    },
    {
      name: 'Anti-Inflammatory Golden Milk Smoothie',
      ingredients: 'Coconut milk, turmeric, ginger, cinnamon, black pepper, honey, banana, mango',
      instructions: '1. Blend all ingredients until smooth\n2. Adjust sweetness with honey\n3. Serve immediately\n4. Garnish with cinnamon',
      mood: 'stressed'
    },
    {
      name: 'Mindful Mediterranean Bowl',
      ingredients: 'Quinoa, chickpeas, cucumber, cherry tomatoes, olives, feta cheese, olive oil, lemon juice, fresh herbs',
      instructions: '1. Cook quinoa\n2. Roast seasoned chickpeas\n3. Chop vegetables\n4. Assemble bowl\n5. Drizzle with dressing',
      mood: 'stressed'
    },

    // Tired Mood Recipes
    {
      name: 'Energy-Boosting Açai Bowl',
      ingredients: 'Açai powder, frozen berries, banana, almond milk, granola, chia seeds, honey, coconut flakes',
      instructions: '1. Blend açai, berries, and banana\n2. Achieve thick consistency\n3. Pour into bowl\n4. Top with granola and seeds\n5. Drizzle with honey',
      mood: 'tired'
    },
    {
      name: 'Power-Packed Green Smoothie',
      ingredients: 'Spinach, kale, green apple, banana, ginger, lemon juice, coconut water, protein powder, chia seeds',
      instructions: '1. Blend greens with coconut water\n2. Add remaining ingredients\n3. Blend until smooth\n4. Add ice if desired',
      mood: 'tired'
    },
    {
      name: 'Energizing Breakfast Burrito',
      ingredients: 'Eggs, black beans, sweet potato, spinach, avocado, whole wheat tortilla, salsa, cheese',
      instructions: '1. Roast diced sweet potato\n2. Scramble eggs with spinach\n3. Warm beans and tortilla\n4. Assemble with avocado and salsa\n5. Roll and serve',
      mood: 'tired'
    }
  ];

  const insert = db.prepare('INSERT OR IGNORE INTO recipes (name, ingredients, instructions, prepTime, cookTime, difficulty, servings, tips, mood) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  sampleRecipes.forEach(recipe => {
    insert.run(
      recipe.name,
      recipe.ingredients,
      recipe.instructions,
      recipe.prepTime,
      recipe.cookTime,
      recipe.difficulty,
      recipe.servings,
      recipe.tips,
      recipe.mood
    );
  });
  insert.finalize();
});

module.exports = db; 