
import axios from 'axios'
// Flights  API CONSTS
const flight_api_url = "https://api.schiphol.nl/public-flights/flights";
// parametreleri 
export const getFlights= async (req, res) => {
  try {
    let _flightDirection ='';
    let _route ='';
    const { flightdate, arrival, departure, returnDate, tripType } = req.query;
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
        scheduleDate: flightdate, // Uçuş tarihi
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
        scheduleDate: flightdate, // Uçuş tarihi
        flightDirection:_flightDirection,
        route:_route
      },
    }
    const settings  = _flightDirection == ''?settingsWithoutDirection:settingsWithDirection;
    // Gidiş uçuşunu sorgula (her iki seçenek için ortak)
    const outboundResponse = await axios.get(flight_api_url, settings);

    // Yanıtlar için listeyi başlat
    let flightResults = {
      outbound: outboundResponse.data,
    };

    // // Eğer gidiş-dönüş ise (round trip) dönüş uçuşunu da sorgula
    // if (tripType === 'roundTrip' && returnDate) {
    //   const returnResponse = await axios.get(flight_api_url, {
    //     headers: {
    //       app_id: process.env.APP_ID, 
    //       app_key: process.env.APP_KEY,
    //       resourceversion: "v4",
    //       Accept: "application/json",
    //     },
    //     params: {
    //       scheduleDate: returnDate, // Dönüş uçuş tarihi
    //       flightDirection: 'D', // Giden uçuşlar (kalkış AMS'den olacak)
         
    //     },
    //   });

    //   // Dönüş uçuşlarını yanıt listesine ekle
    //   flightResults.return = returnResponse.data;
    // }

    // Sonuçları döndür
    res.status(200).json(outboundResponse.data);
  } catch (error) {
    console.error("Error fetching flight data:", error);
    res.status(404).json({ message: error.message });
  }
};
