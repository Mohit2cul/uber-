# Uber Clone — Backend API

Node.js + Express backend for the Uber clone project.

## Requirements
- Node.js 18+ (recommended)
- npm (comes with Node.js)
- MongoDB connection string via `DB_CONNECT` or `MONGO_URI`
- `JWT_SECRET` for token signing

## Setup
1. Install dependencies:
   - npm install
2. Create a `.env` file in this folder and set:
   - `PORT=3000` (or any port you prefer)
   - `DB_CONNECT` or `MONGO_URI`
   - `JWT_SECRET`
3. Start the server:
   - npm run dev (if configured) or npm start

## API Endpoints

### Users API — `POST /users/register`

**Description**: Creates a new user account and returns an authentication token.

**Files**
- Route: `routes/user.routes.js`
- Controller: `controllers/user.controller.js`
- Service: `services/user.service.js`
- Model: `models/user.model.js`

**Request body (JSON)**
```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "password": "secret123"
}
```

**Validation rules**
- `email`: valid email (`express-validator` `.isEmail()`)
- `fullname.firstname`: min length 3
- `password`: min length 6

**Responses**
- `201 Created`: `{ user, token }`
- `400 Bad Request`: validation errors
- `409 Conflict`: email already exists

**Quick test (curl)**
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"John","lastname":"Doe"},"email":"john@example.com","password":"secret123"}'
```

---

### Users API — `POST /users/login`

**Description**: Authenticates an existing user and returns an authentication token.

**Request body (JSON)**
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Validation rules**
- `email`: valid email (`express-validator` `.isEmail()`)
- `password`: min length 6

**Responses**
- `200 OK`: `{ user, token }`
- `400 Bad Request`: validation errors
- `401 Unauthorized`: invalid credentials

**Quick test (curl)**
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secret123"}'
```

---

### Users API — `GET /users/profile`

**Description**: Retrieves the authenticated user's profile information.

**Authentication**: Bearer token in `Authorization` header or `token` cookie.

**Responses**
- `200 OK`: `{ user }`
- `401 Unauthorized`: missing/invalid token

**Quick test (curl)**
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

### Users API — `GET /users/logout`

**Description**: Logs out the authenticated user by invalidating their token.

**Authentication**: Bearer token in `Authorization` header or `token` cookie.

**Responses**
- `200 OK`: `{ message: "Logged out successfully" }`
- `401 Unauthorized`: missing/invalid token

**Quick test (curl)**
```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

### Captains API — `POST /captains/register`

**Description**: Creates a new captain (driver) account and returns an authentication token.

**Files**
- Route: `routes/captain.routes.js`
- Controller: `controllers/captain.controller.js`
- Service: `services/captain.service.js`
- Model: `models/captain.model.js`

**Request body (JSON)**
```json
{
  "fullname": { "firstname": "Jane", "lastname": "Smith" },
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

**Validation rules**
- `email`: valid email (`express-validator` `.isEmail()`)
- `fullname.firstname`: min length 3
- `password`: min length 6
- `vehicle.color`: min length 3
- `vehicle.plate`: min length 3
- `vehicle.capacity`: integer, min value 1
- `vehicle.vehicleType`: one of `car`, `bike`, `auto`

**Responses**
- `201 Created`: `{ token, captain }`
- `400 Bad Request`: validation errors
- `409 Conflict`: email already exists

**Quick test (curl)**
```bash
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Jane","lastname":"Smith"},"email":"jane@example.com","password":"secret123","vehicle":{"color":"Black","plate":"ABC123","capacity":4,"vehicleType":"car"}}'
```

---

### Captains API — `POST /captains/login`

**Description**: Authenticates an existing captain and returns an authentication token.

**Request body (JSON)**
```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Responses**
- `200 OK`: `{ token, captain }`
- `400 Bad Request`: validation errors
- `401 Unauthorized`: invalid credentials

**Quick test (curl)**
```bash
curl -X POST http://localhost:3000/captains/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"secret123"}'
```

## Notes
- Tokens are signed with `process.env.JWT_SECRET`.
- Passwords are hashed before storage. Models use `select: false` for password fields.
- Ensure `DB_CONNECT` or `MONGO_URI` is a valid MongoDB URI (`mongodb://` or `mongodb+srv://`).
