
import axios from 'axios'
// Flights  API CONSTS
const flight_api_url = "https://api.schiphol.nl/public-flights/flights";
// parametreleri 
export const getFlights= async (req, res) => {
  try {
    let _flightDirection ='';
    let _route ='';
    const { flightDate, arrival, departure, returnDate, tripType } = req.query;
     if(departure=='AMS')
      {
        _route = arrival;
        _flightDirection = 'D'
      }
      else if(arrival=='AMS')
     {
      _route = departure;
      _flightDirection = 'A'
     }
     
    const settingsWithoutDirection = {
      headers: {
        app_id : process.env.FLIGHT_APP_ID , // .env dosyasından al
        app_key :  process.env.FLIGHT_APP_KEY,// .env dosyasından al
        resourceversion: "v4",
        Accept: "application/json",
      },
      params: {
        scheduleDate: flightDate, // Uçuş tarihi
      },
    }
     const settingsWithDirection = {
      headers: {
        app_id : process.env.FLIGHT_APP_ID , // .env dosyasından al
        app_key :  process.env.FLIGHT_APP_KEY,// .env dosyasından al
        resourceversion: "v4",
        Accept: "application/json",
      },
      params: {
        scheduleDate: flightDate, // Uçuş tarihi
        flightDirection:_flightDirection,
        route:_route
      },
    }
    const settings  = _flightDirection == ''?settingsWithoutDirection:settingsWithDirection;
    const outboundResponse = await axios.get(flight_api_url, settings);
    res.status(200).json(outboundResponse.data);
  } catch (error) {
    console.error("Error fetching flight data:", error);
    res.status(404).json({ message: error.message });
  }
};
