import express from 'express';
const router = express.Router();
import { register } from '../controllers/auth.js'
import { login } from '../controllers/auth.js'
import { logout } from '../controllers/auth.js'

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)

module.exports = router;

