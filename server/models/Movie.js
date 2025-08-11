const moongoose = require("mongoose");

const movieSchema = new moongoose.Schema({
  imdbID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  imdbRating: Number,
  userRating: Number,
  year: Number,
  duration: Number,
  actors: [String],
  director: String,
  poster: String,
  watched: { type: Boolean, default: false },
});

module.exports = moongoose.model("Movie", movieSchema);
