# Routes for the API

## Users

1. `GET - api/users/:id` - Get a user by id
2. `GET - api/users/` - Get all users
3. `PUT - api/users/` - Add information to a user (`user_name`, `first_name`, `last_name`)

## Auth

1. `POST - api/auth/login` - Login a user (`email`, `password`)
2. `POST - api/auth/register` - Register a user (`email`, `password`)

## Articles

1. `GET - api/articles/:id/article` - Get an article by id, return an `HTML` page
2. `GET - api/articles/:id` - Get an article by id (database object include title etc.)
3. `POST - api/articles/` - Add an article (`title`, `content`, `writer_id`)
4. `GET - api/articles` and optional `title=<title>` or `user_id=<user_id>` - Get all articles, Get an article with title like <title>, Get an articles by writer id.
5. `PUT - api/articles/:id/article` - update the file
6. `PUT - api/articles/:d` - update the database object


## Comments

1. `GET - api/comments?user_id=<user_id>` - Get an comments by user id.


## Likes

1. `POST - api/likes/:article_id` - add a like to the article
2. `DELETE - api/likes/:article_id` - remove a like from the article
3. `GET - api/likes/:article_id/count` - get the number of likes for an article
4. `GET - api/likes/:user_id/count` - get all the count a user has liked
5. `GET - api/likes/count` - get the count of likes across all articles