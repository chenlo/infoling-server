import express from 'express';
const router = express.Router();
import { save } from '../controllers/novedad-bibliografica'

router.post("/novedad-bibliografica", save)

module.exports = router;
