import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;

const FlightReservationSchema = new Schema(
  {
    id: { type: String, default: uuidv4 }, // Unique flight ID
    lastUpdatedAt: { type: Date, required: false }, // Using Date for time fields
    actualLandingTime: { type: Date, required: false },
    estimatedLandingTime: { type: Date , required: false,  },
    expectedTimeOnBelt: { type: Date, required: false },
    flightDirection: { type: String, required: false }, // "A" or "D"
    flightName: { type: String, required: false },
    flightNumber: { type: Number, required: false },
    isOperationalFlight: { type: Boolean, required: false },
    mainFlight: { type: String, required: false },
    prefixIATA: { type: String, required: false },
    prefixICAO: { type: String, required: false },
    airlineCode: { type: Number, required: false },
    serviceType: { type: String, required: false },
    terminal: { type: Number, required: false },
    schemaVersion: { type: String, required: false },

    // Nested documents for objects like aircraftType, baggageClaim, and publicFlightState
    aircraftType: {
      iataMain: { type: String, required: false },
      iataSub: { type: String, required: false },
    },
    baggageClaim: {
      belts: [{ type: String, required: false }], // Array of belts
    },
    publicFlightState: {
      flightStates: [{ type: String, required: false }],
    },
    route: {
      destinations: [{ type: String, required: false }], // Array of destinations
      eu: { type: String, required: false }, // "Y" or "N"
      visa: { type: Boolean, required: false },
    },
    scheduleDateTime: { type: Date, required: false },
    scheduleDate: { type: String, required: false },
    scheduleTime: { type: String, required: false },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Create model
const FlightReservation = mongoose.model("FlightReservation", FlightReservationSchema);

export default FlightReservation;
