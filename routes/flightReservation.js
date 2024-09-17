import express from 'express';

import {
getAllFlightReservationsFromDb,
clearAllFlightReservationsFromDb,
createFlightReservationFromDb,
deleteFlightReservationFromDb,
getFlightReservationFromDb,
} from "../controllers/flightReservation.js";
const router = express.Router();
// get
router.get("/", getAllFlightReservationsFromDb); 
router.get("/:id", getFlightReservationFromDb); 

//post
router.post("/", createFlightReservationFromDb); 

//delete
router.delete("/", clearAllFlightReservationsFromDb); 
router.delete("/:id", deleteFlightReservationFromDb); 


export default router; // Default export ile router'ı export edin
