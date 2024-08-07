# Routes for the API

## Users

1. `GET - api/users/:id`
    * `@desc` - Get a user by id
    * `@param` `id` - the id of the user
    * `@return` - the user object
2. `GET - api/users/`
    * `@desc` - Get all users
    * `@return` - an array of user objects
3. `PUT - api/users/`
    * `@desc` - Add information to a user
    * `@param` `user_name` - the user name of the user
    * `@param` `first_name` - the first name of the user
    * `@param` `last_name` - the last name of the user
    * `@return` - the user object

## Auth

1. `POST - api/auth/login`
    * `@desc` - Login a user
    * `@param` `email` - the email of the user
    * `@param` `password` - the password of the user
    * `@return` - a jwt token
2. `POST - api/auth/register`
    * `@desc` - Register a user
    * `@param` `email` - the email of the user
    * `@param` `password` - the password of the user
    * `@return` - the object of the user

## Articles

1. `GET - api/articles/:id/article`
    * `@desc` - Get an article by id, return an `Markdown` file.
    * `@param-url` `id` - the id of the article
    * `@return` - the article file
2. `GET - api/articles/:id`
    * `@desc` - Get an article by id
    * `@param-url` `id` - the id of the article
    * `@return` - the article object
3. `POST - api/articles/`
    * `@desc` - Add an article
    * `@param-body` `title` - the title of the article
    * `@param-body` `content` - the content of the article
    * `@param-body` `writer_id` - the id of the writer
    * `@return` - the article object
4. `GET - api/articles/?title=<title>&page=<page>&per_page=<per_page>`
    * `@desc` - Get an article by title
    * `@param-query` `title` - the title of the article
    * `@param-query` `page` - the page number
    * `@param-query` `per_page` - the number of articles per page
    * `@return` - an array of article objects
5. `PUT - api/articles/:id/article`
    * `@desc` - Update the article file
    * `@param-url` `id` - the id of the article
    * `@param-body` `content`
    * `@return` - the article object
6. `PUT - api/articles/:id`
    * `@desc` - Update an article by id
    * `@param-url` `id` - the id of the article
    * `@param-body` `title` - the title of the article
    * `@return` - the article object

## Likes

1. `POST - api/likes/:article_id`
    * `@desc` - add a like to the article
    * `@param-url` `article_id` - the id of the article
    * `@return` - the like object
2. `DELETE - api/likes/:article_id`
    * `@desc` - remove a like from the article
    * `@param-url` `article_id` - the id of the article
    * `@return` - the like object
3. `GET - api/likes/:article_id/count`
    * `@desc` - get the number of likes for an article
    * `@param-url` `article_id` - the id of the article
    * `@return` - the number of likes
4. `GET - api/likes/:user_id/count`
    * `@desc` - get the number of likes for a user
    * `@param-url` `user_id` - the id of the user
    * `@return` - the number of likes
5. `GET - api/likes/count`
    * `@desc` - get the count of likes across all articles
    * `@return` - the number of likes


## Comments

to be continued...