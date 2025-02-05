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
      name: 'Festive Chocolate-Dipped Strawberries',
      ingredients: 'Fresh strawberries (1 lb)\nDark chocolate (8 oz)\nWhite chocolate (4 oz)\nColorful sprinkles\nChopped nuts (optional)',
      instructions: 'Preparation:\n1. Wash and dry strawberries thoroughly\n2. Line a baking sheet with parchment paper\n3. Chop chocolates separately\n\nDipping:\n1. Melt dark chocolate in double boiler\n2. Dip strawberries halfway into chocolate\n3. Place on parchment paper\n4. Melt white chocolate\n5. Drizzle over dark chocolate\n\nFinishing:\n1. Sprinkle with toppings while chocolate is wet\n2. Refrigerate for 15 minutes\n3. Arrange on serving plate',
      prepTime: '15 minutes',
      cookTime: '10 minutes',
      difficulty: 'Easy',
      servings: '4-6 servings',
      tips: 'Ensure strawberries are completely dry before dipping.\nDon\'t overheat the chocolate or it will seize.\nStore in refrigerator but serve at room temperature.',
      mood: 'happy'
    },

    // Sad Mood Recipes
    {
      name: 'Comforting Mac and Cheese',
      ingredients: 'Elbow macaroni (1 lb)\nSharp cheddar (2 cups)\nGruyere cheese (1 cup)\nWhole milk (3 cups)\nButter (½ cup)\nFlour (¼ cup)\nBreadcrumbs (1 cup)\nGarlic powder (1 tsp)\nSalt and pepper to taste',
      instructions: 'Preparation:\n1. Boil pasta in salted water\n2. Grate cheeses and combine\n3. Preheat oven to 350°F\n\nSauce Making:\n1. Make roux with butter and flour\n2. Gradually whisk in warm milk\n3. Add cheese and seasonings\n4. Stir until smooth\n\nAssembly:\n1. Combine sauce and pasta\n2. Transfer to baking dish\n3. Top with breadcrumbs\n4. Bake until golden (20-25 mins)',
      prepTime: '20 minutes',
      cookTime: '25 minutes',
      difficulty: 'Intermediate',
      servings: '6-8 servings',
      tips: 'Use room temperature milk for smoother sauce.\nDon\'t overcook the pasta - keep it al dente.\nLet rest for 5 minutes before serving.',
      mood: 'sad'
    },
    {
      name: 'Warm Chocolate Pudding',
      ingredients: 'Dark chocolate (8 oz)\nWhole milk (2 cups)\nCornstarch (3 tbsp)\nSugar (¼ cup)\nVanilla extract (1 tsp)\nSalt (¼ tsp)\nWhipped cream',
      instructions: 'Preparation:\n1. Chop chocolate finely\n2. Whisk cornstarch with ½ cup cold milk\n\nCooking:\n1. Heat remaining milk with sugar\n2. Add chocolate and stir until melted\n3. Whisk in cornstarch mixture\n4. Cook until thickened\n5. Add vanilla and salt\n\nServing:\n1. Pour into serving bowls\n2. Top with whipped cream\n3. Serve warm',
      prepTime: '10 minutes',
      cookTime: '15 minutes',
      difficulty: 'Easy',
      servings: '4 servings',
      tips: 'Use high-quality dark chocolate.\nStir constantly while cooking to prevent lumps.\nCan be reheated gently if made ahead.',
      mood: 'sad'
    },
    {
      name: 'Homestyle Chicken Soup',
      ingredients: 'Whole chicken (3-4 lbs)\nCarrots (3 large)\nCelery (3 stalks)\nOnion (1 large)\nGarlic (4 cloves)\nEgg noodles (8 oz)\nFresh herbs (parsley, thyme)\nSalt and pepper',
      instructions: 'Preparation:\n1. Clean and cut vegetables\n2. Prepare chicken\n3. Chop herbs\n\nCooking:\n1. Simmer chicken with vegetables\n2. Remove chicken and shred\n3. Strain broth\n4. Cook noodles in broth\n5. Return chicken and vegetables\n\nFinishing:\n1. Add fresh herbs\n2. Season to taste\n3. Serve hot',
      prepTime: '30 minutes',
      cookTime: '1 hour 30 minutes',
      difficulty: 'Medium',
      servings: '6-8 servings',
      tips: 'Skim foam from broth for clearer soup.\nDon\'t overcook the noodles.\nFreeze extra portions for later use.',
      mood: 'sad'
    },

    // Stressed Mood Recipes
    {
      name: 'Calming Chamomile Lavender Cookies',
      ingredients: 'All-purpose flour (2 cups)\nButter (1 cup)\nSugar (½ cup)\nChamomile tea (2 bags)\nDried lavender (1 tbsp)\nVanilla extract (1 tsp)\nEggs (1 large)\nSalt (¼ tsp)',
      instructions: 'Preparation:\n1. Grind tea and lavender finely\n2. Cream butter and sugar\n3. Mix dry ingredients\n\nMaking Dough:\n1. Add egg and vanilla to butter mixture\n2. Gradually add dry ingredients\n3. Chill dough for 30 minutes\n\nBaking:\n1. Preheat oven to 350°F\n2. Shape cookies\n3. Bake 12-15 minutes',
      prepTime: '45 minutes',
      cookTime: '15 minutes',
      difficulty: 'Medium',
      servings: '24 cookies',
      tips: 'Don\'t over-grind lavender - it should be subtle.\nRotate baking sheet halfway through.\nStore in airtight container.',
      mood: 'stressed'
    },
    {
      name: 'Anti-Inflammatory Golden Milk',
      ingredients: 'Coconut milk (2 cups)\nTurmeric powder (1 tsp)\nFresh ginger (1 inch)\nCinnamon stick\nBlack pepper (pinch)\nHoney (to taste)\nVanilla extract (½ tsp)',
      instructions: 'Preparation:\n1. Grate fresh ginger\n2. Measure spices\n\nCooking:\n1. Warm coconut milk\n2. Add turmeric and ginger\n3. Add cinnamon and pepper\n4. Simmer 10 minutes\n5. Strain and sweeten\n\nServing:\n1. Pour into mugs\n2. Add honey to taste\n3. Garnish with cinnamon',
      prepTime: '5 minutes',
      cookTime: '15 minutes',
      difficulty: 'Easy',
      servings: '2 servings',
      tips: 'Use full-fat coconut milk for best results.\nAdd black pepper to enhance turmeric benefits.\nCan be made ahead and reheated.',
      mood: 'stressed'
    },
    {
      name: 'Mindful Mediterranean Bowl',
      ingredients: 'Quinoa (1 cup)\nChickpeas (1 can)\nCucumber (1 large)\nCherry tomatoes (1 cup)\nKalamata olives (½ cup)\nFeta cheese (4 oz)\nOlive oil\nLemon juice\nFresh herbs (mint, parsley)',
      instructions: 'Preparation:\n1. Cook quinoa\n2. Drain and rinse chickpeas\n3. Chop vegetables\n\nAssembly:\n1. Season and roast chickpeas\n2. Layer quinoa in bowls\n3. Arrange vegetables\n4. Add olives and feta\n\nDressing:\n1. Mix olive oil and lemon\n2. Add chopped herbs\n3. Drizzle over bowls',
      prepTime: '20 minutes',
      cookTime: '25 minutes',
      difficulty: 'Easy',
      servings: '4 servings',
      tips: 'Rinse quinoa before cooking.\nRoast extra chickpeas for snacking.\nCan be prepared ahead and assembled later.',
      mood: 'stressed'
    },

    // Tired Mood Recipes
    {
      name: 'Energy-Boosting Açai Bowl',
      ingredients: 'Açai powder (2 tbsp)\nFrozen mixed berries (2 cups)\nBanana (1 large)\nAlmond milk (½ cup)\nGranola (½ cup)\nChia seeds (2 tbsp)\nHoney (2 tbsp)\nCoconut flakes (¼ cup)',
      instructions: 'Preparation:\n1. Freeze banana chunks\n2. Measure toppings\n\nBlending:\n1. Blend açai with berries\n2. Add banana and milk\n3. Achieve thick consistency\n\nAssembly:\n1. Pour into chilled bowl\n2. Top with granola\n3. Add seeds and coconut\n4. Drizzle with honey',
      prepTime: '10 minutes',
      cookTime: '5 minutes',
      difficulty: 'Easy',
      servings: '2 servings',
      tips: 'Use frozen fruit for thicker consistency.\nAdd protein powder for extra energy.\nEat immediately for best texture.',
      mood: 'tired'
    },
    {
      name: 'Power-Packed Green Smoothie',
      ingredients: 'Spinach (2 cups)\nKale (1 cup)\nGreen apple (1)\nBanana (1)\nGinger (1 inch)\nLemon juice (1 tbsp)\nCoconut water (1 cup)\nProtein powder (1 scoop)\nChia seeds (1 tbsp)',
      instructions: 'Preparation:\n1. Wash greens thoroughly\n2. Core apple and chop\n3. Peel ginger\n\nBlending:\n1. Blend greens with liquid\n2. Add fruits and ginger\n3. Add protein and seeds\n4. Blend until smooth\n\nServing:\n1. Pour into glasses\n2. Add ice if desired\n3. Drink immediately',
      prepTime: '10 minutes',
      cookTime: '5 minutes',
      difficulty: 'Easy',
      servings: '2 servings',
      tips: 'Use baby spinach for milder flavor.\nFreeze banana for thicker texture.\nAdd more liquid if needed.',
      mood: 'tired'
    },
    {
      name: 'Energizing Breakfast Burrito',
      ingredients: 'Eggs (4 large)\nBlack beans (1 can)\nSweet potato (1 medium)\nBaby spinach (2 cups)\nAvocado (1)\nWhole wheat tortillas (4)\nSalsa (½ cup)\nCheddar cheese (1 cup)',
      instructions: 'Preparation:\n1. Dice sweet potato\n2. Drain and rinse beans\n3. Beat eggs\n\nCooking:\n1. Roast sweet potato cubes\n2. Warm beans with spices\n3. Scramble eggs with spinach\n\nAssembly:\n1. Warm tortillas\n2. Layer ingredients\n3. Add avocado and salsa\n4. Roll tightly\n5. Optional: grill seam-side down',
      prepTime: '15 minutes',
      cookTime: '25 minutes',
      difficulty: 'Medium',
      servings: '4 servings',
      tips: 'Prep sweet potatoes ahead of time.\nDon\'t overfill tortillas.\nWrap in foil to keep warm.',
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