import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;

const FlightReservationSchema = new Schema(
  {
    id: { type: String, default: uuidv4 }, // Unique flight ID
    lastUpdatedAt: { type: Date, required: true }, // Using Date for time fields
    actualLandingTime: { type: Date, required: true },
    estimatedLandingTime: { type: Date, required: true },
    expectedTimeOnBelt: { type: Date, required: true },
    flightDirection: { type: String, required: true }, // "A" or "D"
    flightName: { type: String, required: true },
    flightNumber: { type: Number, required: true },
    isOperationalFlight: { type: Boolean, required: true },
    mainFlight: { type: String, required: true },
    prefixIATA: { type: String, required: true },
    prefixICAO: { type: String, required: true },
    airlineCode: { type: Number, required: true },
    serviceType: { type: String, required: true },
    terminal: { type: Number, required: true },
    schemaVersion: { type: String, required: true },

    // Nested documents for objects like aircraftType, baggageClaim, and publicFlightState
    aircraftType: {
      iataMain: { type: String, required: true },
      iataSub: { type: String, required: true },
    },
    baggageClaim: {
      belts: [{ type: String, required: true }], // Array of belts
    },
    publicFlightState: {
      flightStates: [{ type: String, required: true }],
    },
    route: {
      destinations: [{ type: String, required: true }], // Array of destinations
      eu: { type: String, required: true }, // "Y" or "N"
      visa: { type: Boolean, required: true },
    },
    scheduleDateTime: { type: Date, required: true },
    scheduleDate: { type: String, required: true },
    scheduleTime: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Create model
const FlightReservation = mongoose.model("FlightReservation", FlightReservationSchema);

export default FlightReservation;
