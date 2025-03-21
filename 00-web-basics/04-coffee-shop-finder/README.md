# Coffee Spot Finder
A simple web app that enables users search coffee shops with high ratings using OpenStreetMap.
The app has been built using TypeScript, React as the frontend framework, Vite as the build tool and deployment server, Tailwind CSS and PostCSS as the Tailwind processor.
The app uses the Wilson Score Confidence Interval algorithm for ranking coffee shops.
Disclaimer: Do not use the code in this project in a production environment because it uses OpenStreetMap. It is not comprehensive like Google Maps and it does not include ratings and reviews. The ratings in the project have been randomly generated for display purposes. In a production environemnt, consider integrating with a review API like Yelp or Google Places for real ratings.

## Installation
To run the app, start the development server and run the command:
`npm run dev`