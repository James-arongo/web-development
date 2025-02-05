
## Usage

1. Select your current mood from the available options:
   - Happy 😊
   - Sad 😢
   - Stressed 😰
   - Tired 😴

2. View the recommended recipe, including:
   - Ingredients list with measurements
   - Step-by-step preparation instructions
   - Cooking time and difficulty level
   - Serving size
   - Pro tips for best results

3. If you don't like the suggested recipe, click "Get Another Recipe" for a different option matching your mood.

## Database Structure

The app uses SQLite with the following schema:
sql
CREATE TABLE recipes (
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
);


## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request


## Future Enhancements

- [ ] Add user accounts and favorite recipes
- [ ] Include recipe ratings and reviews
- [ ] Add recipe categories and filters
- [ ] Include recipe images
- [ ] Add dietary restrictions options
- [ ] Implement recipe sharing functionality
