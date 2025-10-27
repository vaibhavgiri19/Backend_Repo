const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let movies = [];

app.post("/api/movies", (req, res) => {
  const { movieTitle, director, reviewText, rating, genres } = req.body;

  if (!movieTitle || !director || !reviewText || rating === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (rating < 1 || rating > 10) {
    return res.status(400).json({ error: "Rating must be between 1 and 10" });
  }

  const duplicate = movies.find((m) => m.movieTitle === movieTitle);
  if (duplicate) {
    return res.status(400).json({ error: "Movie already reviewed" });
  }

  const newMovie = {
    id: Date.now(),
    movieTitle,
    director,
    reviewText,
    rating,
    genres: genres || [],
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  movies.push(newMovie);
  res.status(201).json({ message: "Review added!", data: newMovie });
});

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

app.put("/api/movies/:id", (req, res) => {
  const { id } = req.params;
  const { reviewText, rating, genres } = req.body;

  const movie = movies.find((m) => m.id == id);
  if (!movie) return res.status(404).json({ error: "Movie not found" });

  if (rating && (rating < 1 || rating > 10)) {
    return res.status(400).json({ error: "Rating must be between 1 and 10" });
  }

  if (reviewText) movie.reviewText = reviewText;
  if (rating) movie.rating = rating;
  if (genres) movie.genres = genres;

  res.json({ message: "Review updated!", data: movie });
});

app.delete("/api/movies/:id", (req, res) => {
  const { id } = req.params;

  const index = movies.findIndex((m) => m.id == id);
  if (index === -1) return res.status(404).json({ error: "Movie not found" });

  movies.splice(index, 1);
  res.json({ message: "Review deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
