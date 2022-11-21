if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use (notFound);
app.use(errorHandler);

module.exports = app;


// if (process.env.USER) require("dotenv").config();
// const express = require("express");
// const app = express();

// const commentsRouter = require("./comments/comments.router");
// const postsRouter = require("./posts/posts.router");
// const usersRouter = require("./users/users.router");
// const notFound = require("./errors/notFound");
// const errorHandler = require("./errors/errorHandler");

// app.use(express.json());

// app.use("/comments", commentsRouter);
// app.use("/posts", postsRouter);
// app.use("/users", usersRouter);

// app.use(notFound);
// app.use(errorHandler);

// module.exports = app;
