import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("strictQuery", false);
const app = express();

// Environment variables
const username = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DBNAME || "flight-reservation-db";
const connectionURL = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@flight-reservation-clus.olpac.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=flight-reservation-cluster`;

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());


// Default route
app.get("/", (req, res) => {
  res.send("Server is working!");
});
// Flight Reservation Routes
import flightReservationRoutes from './routes/flightReservation.js';

app.use("/flight-reservation/", flightReservationRoutes); 

// Flight Reservation Routes
import flights from './routes/flightsApi.js';

app.use("/flights/", flights); 






// MongoDB connection
mongoose.connect(connectionURL, {
  useUnifiedTopology: true, // Daha güncel bir opsiyon
});

mongoose.connection
  .once("open", () => {
    console.log("Connected to the database");
  })
  .on("error", (error) => {
    console.log("Connection error:", error);
  });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
