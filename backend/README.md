# Users API — `POST /users/register`

Description
- Creates a new user account and returns an authentication token.

Files
- Route: `routes/user.routes.js`
- Controller: `controllers/user.controller.js`
- Service: `services/user.service.js`
- Model: `models/user.model.js`

Endpoint
- Method: `POST`
- Path: `/users/register`
- Content-Type: `application/json`

Request body (JSON)
```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "password": "secret123"
}
```

Validation rules (implemented in `routes/user.routes.js`)
- `email`: must be a valid email (`express-validator` `.isEmail()`)
- `fullname.firstname`: minimum length 3
- `password`: minimum length 6

Responses
- `201 Created` — successful registration. Response body: `{ user, token }`.
  - `user` is the saved user object (note: `password` is `select: false` in the schema, so it won't be returned).
  - `token` is a JWT generated with `process.env.JWT_SECRET` (see `models/user.model.js`).
- `400 Bad Request` — validation errors. Shape: `{ errors: [ ... ] }` returned from `express-validator` (see `user.controller.js`).
- `5xx` — unexpected server errors (e.g. DB unique constraint failure or other exceptions). The project doesn't currently return a custom 409 for duplicate emails.

Implementation notes / gotchas
- Password hashing: `userModel.hashPassword` (in `models/user.model.js`) is used in the controller before creating the user.
- Token: created by `user.generateAuthToken()` (uses `jwt.sign` with `JWT_SECRET`). Ensure `JWT_SECRET` is set in `.env` for development.
- DB connection: ensure `DB_CONNECT` or `MONGO_URI` env var is set and is a valid MongoDB URI (`mongodb://` or `mongodb+srv://`).

Quick test (curl)
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"John","lastname":"Doe"},"email":"john@example.com","password":"secret123"}'
```

Run server (from `backend` folder)
```bash
npm install
node server.js
# or with nodemon
npx nodemon server.js
```

If anything is unclear or you want the README expanded (examples for error responses, sample tests, or a Postman collection), tell me which additions you want.

## Example Response

Successful registration (`201 Created`):

```json
{
    "user": {
        "_id": "60f7c2b8e1d3c2a5f8e4b123",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john@example.com"
        // other user fields, excluding password
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Users API — `POST /users/login`

Description
- Authenticates an existing user and returns an authentication token.

Endpoint
- Method: `POST`
- Path: `/users/login`
- Content-Type: `application/json`

Request body (JSON)
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

Validation rules (implemented in `routes/user.routes.js`)
- `email`: must be a valid email (`express-validator` `.isEmail()`)
- `password`: minimum length 6

Responses
- `200 OK` — successful login. Typical shape: `{ user, token }`.
  - `user` may be the user object (password is not returned because `password.select` is false in schema).
  - `token` is a JWT signed with `process.env.JWT_SECRET` (see `models/user.model.js`).
- `400 Bad Request` — validation errors (`{ errors: [...] }`).
- `401 Unauthorized` — invalid credentials (incorrect email or password).
- `5xx` — unexpected server errors.

Implementation notes
- The route is registered in `routes/user.routes.js` and calls `userController.loginUser`. The `user.model.js` exposes `comparePassword` and `generateAuthToken` which are typically used by the controller to verify credentials and issue a token.

Quick test (curl)
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secret123"}'
```

## Users API — `GET /users/profile`

Description
- Retrieves the authenticated user's profile information.

Endpoint
- Method: `GET`
- Path: `/users/profile`

Authentication
- Required: Yes
- Method: Bearer token in Authorization header or token cookie

Responses
- `200 OK` — successful retrieval. Response body: `{ user }`.
  - `user` is the authenticated user object.
- `401 Unauthorized` — no valid authentication token provided.
- `5xx` — unexpected server errors.

Implementation notes
- Requires authentication via `authMiddleware.authUser`.
- The user object is attached to `req.user` by the auth middleware.

Quick test (curl)
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

## Users API — `GET /users/logout`

Description
- Logs out the authenticated user by invalidating their token.

Endpoint
- Method: `GET`
- Path: `/users/logout`

Authentication
- Required: Yes
- Method: Bearer token in Authorization header or token cookie

Responses
- `200 OK` — successful logout. Response body: `{ message: "Logged out successfully" }`.
- `401 Unauthorized` — no valid authentication token provided.
- `5xx` — unexpected server errors.

Implementation notes
- Requires authentication via `authMiddleware.authUser`.
- Clears the `token` cookie.
- Adds the token to the blacklist collection to prevent reuse.

Quick test (curl)
```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <your_jwt_token>"
```
