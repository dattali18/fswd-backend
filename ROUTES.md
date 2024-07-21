# Routes for the API

## Users

1. `GET - api/users/:id` - Get a user by id
2. `GET - api/users/` - Get all users
3. `PUT - api/users/` - Add information to a user (`user_name`, `first_name`, `last_name`)

## Auth

1. `POST - api/auth/login` - Login a user (`email`, `password`)
2. `POST - api/auth/register` - Register a user (`email`, `password`)

## Articles

1. `GET - api/articles/:id` - Get an article by id, return an `HTML` page