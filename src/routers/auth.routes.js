import { Router } from 'express';
import { httpRegister, httpLogin } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', httpRegister);
router.post('/login', httpLogin);

export default router;