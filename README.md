# CineTrends 🎬   [View Demo](https://vishnub123/github.io/cine_trends/)

CineTrends is a modern React web application that helps you discover trending and popular movies, search for your favorites, and see what’s hot right now. It uses [The Movie Database (TMDB)](https://www.themoviedb.org/) API for movie data and [Appwrite](https://appwrite.io/) for tracking trending searches.

## Features

- 🔍 **Search Movies:** Instantly search for movies by title.
- 📈 **Trending Movies:** See which movies are trending based on user searches.
- 🎞️ **Popular Movies:** Browse a list of the most popular movies.
- ⭐ **Movie Details:** View ratings, release year, language, and posters.
- ☁️ **Appwrite Integration:** Trending movies are tracked and updated in real-time using Appwrite database.

## Tech Stack

- **Frontend:** React, Vite
- **Styling:** Tailwind CSS (or your preferred CSS framework)
- **APIs:** TMDB API, Appwrite Database
- **Deployment:** GitHub Pages

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/vishnub123/cine_trends.git
cd cine_trends
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add:

```
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

### 4. Run the app locally

```sh
npm run dev
```

### 5. Build for production

```sh
npm run build
```

### 6. Deploy to GitHub Pages

```sh
npm run deploy
```

## Project Structure

```
src/
  components/
    MovieCard.jsx
    Search.jsx
    Spinner.jsx
  App.jsx
  appwrite.js
public/
  hero.png
  star.svg
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

**Enjoy discovering movies with CineTrends!**
