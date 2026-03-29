# Лабораторна робота №4
## Тема: Автентифікація та авторизація

---

## 1. Модель користувача

User:
- id
- email
- password (hash)
- role

Role:
- USER
- ADMIN

Паролі зберігаються у вигляді хешу (bcrypt).

---

## 2. Реєстрація (Sign Up)

```js
const bcrypt = require('bcrypt');

async function register(email, password) {
  const hash = await bcrypt.hash(password, 10);
  return { email, password: hash };
}
const jwt = require('jsonwebtoken');

function login(user) {
  const token = jwt.sign(
    { id: user.id, role: user.role },
    "secret",
    { expiresIn: "1h" }
  );
  return token;
}
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).send("Unauthorized");

  try {
    const user = jwt.verify(token, "secret");
    req.user = user;
    next();
  } catch {
    return res.status(401).send("Invalid token");
  }
}
function adminOnly(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).send("Forbidden");
  }
  next();
}
