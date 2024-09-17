import express from 'express';

import {
getFlights
} from "../controllers/flightsApi.js";
const router = express.Router();
// get
router.get("/", getFlights); 



export default router; // Default export ile router'ı export edin
