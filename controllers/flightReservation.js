import flightReservation  from "../models/flightReservation.js";

export const getAllFlightReservationsFromDb = async (req, res) => {
  try {
    const flights = await flightReservation.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getFlightReservationFromDb = async (req, res) => {
  const id = req.params.id;
  try {
    const flight = await flightReservation.findById(id);
    res.status(200).json(flight);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createFlightReservationFromDb = async (req, res) => {

  const newFlightReservation = new flightReservation({
  
  });

  console.log("this is new FlightReservation : \n " + newFlightReservation);
  try {
    await newFlightReservation.save();
    res.status(201).json(newFlightReservation);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log(error);
  }
};
export const clearAllFlightReservationsFromDb = async (req, res) => {
  try {
    await flightReservation.deleteMany();
    res.status(200).json({ message: "All FlightReservations deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteFlightReservationFromDb = async (req, res) => {
  const id = req.params.id;
  try {
    await flightReservation.findByIdAndDelete(id);
    res.status(200).json({ message: "FlightReservation deleted " + id });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


