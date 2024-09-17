// modelller birer tablo gibi düşünülebilir.
import mongoose  from "mongoose";
import { v4, }   from "uuid";

const { Schema } = mongoose;

const FlightReservationSchema = new Schema(
  {
    
  },
  { timestamps: true }
);
const FlightReservation = mongoose.model('FlightReservation', FlightReservationSchema);

export default FlightReservation; // default olarak export edilmelidir