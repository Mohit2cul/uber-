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
- DB connection: ensure `DB_CONNECT` or `MONGO_URI` env var is set and is a valid MongoDB URI (`mongodb://` or `mongodb+srv://`).
curl -X POST http://localhost:3000/users/register \


If anything is unclear or you want the README expanded (examples for error responses, sample tests, or a Postman collection), tell me which additions you want.

## Example Response

Successful registration (`201 Created`):

```json
{
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john@example.com"
        // other user fields, excluding password
    },

Description
- Authenticates an existing captain and returns an authentication token.

Endpoint
- Method: `POST`
- Path: `/captains/login`
- Content-Type: `application/json`

Request body (JSON)
```json
{
  "email": "jane@example.com",      // Required: valid email format
  "password": "secret123"           // Required: min 6 characters
}
```

Validation rules (implemented in `routes/captain.routes.js`)
- `email`: must be a valid email (`express-validator` `.isEmail()`)
- `password`: minimum length 6

Responses

**Success (`200 OK`):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60f7c2b8e1d3c2a5f8e4b456",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

**Validation Error (`400 Bad Request`):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "Invalid email address",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**Invalid Credentials (`401 Unauthorized`):**
```json
{
  "message": "Invalid email or password"
}
```

Implementation notes
- Token is set as a cookie (key: `token`) in the response
- Token is also returned in response body for client-side storage if needed
- The captain object returned excludes the password field (`select: false` in schema)
- Token is signed with `process.env.JWT_SECRET` (see `models/captain.model.js`)

Quick test (curl)
```bash
curl -X POST http://localhost:4000/captains/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"secret123"}'
```
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
  "fullname": { 
    "firstname": "Jane",           // Required: min 3 characters
    "lastname": "Smith"            // Optional
  },
  "email": "jane@example.com",     // Required: valid email format
  "password": "secret123",         // Required: min 6 characters
  "vehicle": {
    "color": "Black",              // Required: min 3 characters
    "plate": "ABC123",             // Required: min 3 characters
    "capacity": 4,                 // Required: integer, min value 1
    "vehicleType": "car"           // Required: one of ['car', 'bike', 'auto']
  }
}
```

Validation rules (implemented in `routes/captain.routes.js`)
- `email`: must be a valid email (`express-validator` `.isEmail()`)
- `fullname.firstname`: minimum length 3
- `password`: minimum length 6
- `vehicle.color`: minimum length 3
- `vehicle.plate`: minimum length 3
- `vehicle.capacity`: must be an integer with minimum value 1
- `vehicle.vehicleType`: must be one of: `car`, `bike`, `auto`

Responses

**Success (`201 Created`):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60f7c2b8e1d3c2a5f8e4b456",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

**Validation Error (`400 Bad Request`):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid email address",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**Duplicate Email (`409 Conflict`):**
```json
{
  "message": "Captain with this email already exists"
}
```

Implementation notes / gotchas
- Password hashing: `captainModel.hashPassword` (in `models/captain.model.js`) is used in the controller before creating the captain.
- Token: created by `captain.generateAuthToken()` (uses `jwt.sign` with `JWT_SECRET`). Ensure `JWT_SECRET` is set in `.env` for development.
- DB connection: ensure `DB_CONNECT` or `MONGO_URI` env var is set and is a valid MongoDB URI (`mongodb://` or `mongodb+srv://`).
- Unlike user registration, this endpoint returns a `409 Conflict` status for duplicate emails.

Quick test (curl)
```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Jane","lastname":"Smith"},"email":"jane@example.com","password":"secret123","vehicle":{"color":"Black","plate":"ABC123","capacity":4,"vehicleType":"car"}}'
```
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

# Captains API — `POST /captains/register`

Description
- Creates a new captain account (driver) and returns an authentication token.

Files
- Route: `routes/captain.routes.js`
- Controller: `controllers/captain.controller.js`
- Service: `services/captain.service.js`
- Model: `models/captain.model.js`

Endpoint
- Method: `POST`
- Path: `/captains/register`
- Content-Type: `application/json`

Request body (JSON)
```json
{
  "fullname": { 
    "firstname": "Jane", 
    "lastname": "Smith" 
  },
  "email": "jane@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

Validation rules (implemented in `routes/captain.routes.js`)
- `email`: must be a valid email (`express-validator` `.isEmail()`)
- `fullname.firstname`: minimum length 3
- `password`: minimum length 6
- `vehicle.color`: minimum length 3
- `vehicle.plate`: minimum length 3
- `vehicle.capacity`: must be an integer with minimum value 1
- `vehicle.vehicleType`: must be one of: `car`, `bike`, `auto`

Responses
- `201 Created` — successful registration. Response body: `{ token, captain }`.
  - `captain` is the saved captain object (note: `password` is `select: false` in the schema, so it won't be returned).
  - `token` is a JWT generated with `process.env.JWT_SECRET` (see `models/captain.model.js`).
- `400 Bad Request` — validation errors. Shape: `{ errors: [ ... ] }` returned from `express-validator`.
- `409 Conflict` — captain with this email already exists. Shape: `{ message: "Captain with this email already exists" }`.
- `5xx` — unexpected server errors.

Implementation notes / gotchas
- Password hashing: `captainModel.hashPassword` (in `models/captain.model.js`) is used in the controller before creating the captain.
- Token: created by `captain.generateAuthToken()` (uses `jwt.sign` with `JWT_SECRET`). Ensure `JWT_SECRET` is set in `.env` for development.
- DB connection: ensure `DB_CONNECT` or `MONGO_URI` env var is set and is a valid MongoDB URI (`mongodb://` or `mongodb+srv://`).
- Unlike user registration, this endpoint returns a `409 Conflict` status for duplicate emails.

Quick test (curl)
```bash
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Jane","lastname":"Smith"},"email":"jane@example.com","password":"secret123","vehicle":{"color":"Black","plate":"ABC123","capacity":4,"vehicleType":"car"}}'
```

## Example Response

Successful registration (`201 Created`):

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "_id": "60f7c2b8e1d3c2a5f8e4b456",
        "fullname": {
            "firstname": "Jane",
            "lastname": "Smith"
        },
        "email": "jane@example.com",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive"
        // other captain fields, excluding password
    }
}
```

## Captains API — `POST /captains/login`

Description
- Authenticates an existing captain and returns an authentication token.
- **Note:** This endpoint is currently a placeholder and returns `501 Not Implemented`.

Endpoint
- Method: `POST`
- Path: `/captains/login`
- Content-Type: `application/json`

Request body (JSON)
```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

Responses
- `501 Not Implemented` — endpoint is not yet implemented. Response body: `{ message: "Not implemented" }`.

Quick test (curl)
```bash
curl -X POST http://localhost:3000/captains/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"secret123"}'
```
