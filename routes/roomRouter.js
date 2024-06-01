import express from 'express';
import { home, addRoommates, getRoommates } from '../controller/roomControl.js'
import { getGastos } from '../controller/spentControl.js'

const router = express.Router();

router.get('/', home)

router.post('/roommate', addRoommates);

router.get("/roommates", getRoommates);

router.get("/gastos", getGastos);


export default router