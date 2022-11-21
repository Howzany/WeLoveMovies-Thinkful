movie.service.js joined all tables... should only join what I need ...read movielist is from movie table.
<completed>

movie.router separate route... movieId (ask TA if I need
to make separate routes for readTheaters and readReviews)
<ASK TA!> <change readReviews to LIST them!>

knexfile.js need to point to the database url on ElephantSQL <completed>... use DBeaver to test data as well as PostMan to test routes <TBD>

review 35.9 group categories into a nested object in order to edit the theaters.controller.js so that the data from the movies table is nested inside the theaters data. <completed>

review docs/routes/theaters_list.md<ASK TA!>

review docs/routes/ all of the instructions to make sure.
GET /movies?is_showing=true <ASK TA!>

redo the reviews_update.md for reviews.controller.js
<doubleCheck with TA!>

goes into reviews.controller.js something like
async function update(req, res, next) {
// console.log("calling update, input obj=", input);
const updatedPost = {
...req.body.data,
post_id: res.locals.post.post_id,
};
await service
.update(updatedPost)
.then((data) => res.json({ data }))
.catch(next);
}
<check??>

and in the reviews.service.js
function update(updatedPost) {
console.log("In service update, inputobj=", updatedPost);
return knex("posts")
.select("")
.where({ post_id: updatedPost.post_id })
.update(updatedPost, "");
}
<check?>

reviews.controller.js needs to change the update function
to have a res.json that has a nested data.

movie list controller. GET /movies?is_showing=true
<completed>

```

In the event where `is_showing=true` is provided, the route should return _only those movies where the movie is currently showing in theaters._ This means you will need to check the `movies_theaters` table.<completed>
```

```
<completed>

```

Dotenv and create one and put the URL for DB there so that it isn't public
