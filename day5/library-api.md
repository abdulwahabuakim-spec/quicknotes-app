# Library API Documentation

Base URL: https://api.library.com

### 1. List all books
- Method: GET
- Path: /books
- Description: Get all books
- Success Status: 200 OK

### 2. Get one book by ID
- Method: GET
- Path: /books/{id}
- Description: Get a single book
- Success Status: 200 OK
- Error Status: 404 Not Found if book does not exist
- Note: fetch does not throw for 404 or 500, must check response.ok

### 3. Create a new book
- Method: POST
- Path: /books
- Description: Add a new book
- Request Body: The request body contains JSON data - example: title Things Fall Apart, author Chinua Achebe, isbn 9780385474542, publishedYear 1958
- Success Status: 201 Created

### 4. Delete a book
- Method: DELETE
- Path: /books/{id}
- Path Example: /notes/42 - This is the RESTful way to delete resource 42
- Description: Delete a book by ID
- Success Status: 200 OK
- Error Status: 404 Not Found

### 5. Authentication
- Header: Authorization: Bearer <token>
- Description: Tells the server which user is making the request
- Error: 401 Unauthorized if token is invalid or user not logged in
- Body note: For POST, JSON goes in the body
- Check note: Always check response.ok because fetch does not throw an error for HTTP error statuses like 404 or 500
- Parse note: Use response.json() to parse

