# Library API - Books Resource

Base URL: `/api`

## Endpoints

### 1. List all books
- **Method:** GET
- **Path:** /books
- **Description:** Retrieve a list of all books in the library.
- **Success Status:** 200 OK

### 2. Get one book by ID
- **Method:** GET
- **Path:** /books/{id}
- **Description:** Retrieve details of a single book by its ID.
- **Success Status:** 200 OK

### 3. Create a new book
- **Method:** POST
- **Path:** /books
- **Description:** Add a new book to the library.
- **Request Body:**
  ```json
  {
    "title": "Things Fall Apart",
    "author": "Chinua Achebe",
    "isbn": "9780385474542",
    "publishedYear": 1958
  }
