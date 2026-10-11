# Library API - Books Resource
Base URL: /api

## Endpoints
- GET /books - List all books - 200 OK
- GET /books/42 - Get book with id 42 - 200 OK, 404 if not found
- GET /books?author=Rowling - List books by author using query parameter - 200 OK
- POST /books - Create new book - Body: { "title": "Book Title", "author": "Author Name" } - 201 Created
- PUT /books/42 - Replace book 42 completely - Body: { "title": "New Title", "author": "New Author" } - 200 OK
- PATCH /books/42 - Update part of book 42 - Body: { "title": "Updated Title" } - 200 OK
- DELETE /books/42 - Delete book 42 - 204 No Content

## Authentication
- Authorization: Bearer <token> - Header tells server which user is making request
- 401 Unauthorized - When not logged in or token invalid
- 403 Forbidden - When logged in but not allowed

## Errors
- 400 Bad Request - Invalid body
- 404 Not Found - Book id does not exist
- 429 Too Many Requests - Rate limiting

