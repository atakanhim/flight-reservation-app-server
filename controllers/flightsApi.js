
import axios from 'axios'
// Flights  API CONSTS
const flight_api_url = "https://api.schiphol.nl/public-flights/flights";
const app_key =  process.env.FLIGHT_APP_KEY; // API gizli anahtarı
const app_id = process.env.FLIGHT_APP_ID;

// parametreleri 
export const getFlights= async (req, res) => {
  try {
    const { flightdate, origin, destination, returnDate, tripType } = req.query;
    console.log(req.query);
    // Gidiş uçuşunu sorgula (her iki seçenek için ortak)
    const outboundResponse = await axios.get(flight_api_url, {
      headers: {
        app_id : process.env.FLIGHT_APP_ID , // .env dosyasından al
        app_key :  process.env.FLIGHT_APP_KEY,// .env dosyasından al
        resourceversion: "v4",
        Accept: "application/json",
      },
      params: {
        scheduleDate: flightdate, // Uçuş tarihi
        flightDirection: 'D', // Giden uçuşlar (Departures)
        origin: origin , // Kalkış noktası
        destination: destination , // Varış noktası
      },
    });

    // Yanıtlar için listeyi başlat
    let flightResults = {
      outbound: outboundResponse.data,
    };

    // Eğer gidiş-dönüş ise (round trip) dönüş uçuşunu da sorgula
    if (tripType === 'roundTrip' && returnDate) {
      const returnResponse = await axios.get(flight_api_url, {
        headers: {
          app_id: process.env.APP_ID, 
          app_key: process.env.APP_KEY,
          resourceversion: "v4",
          Accept: "application/json",
        },
        params: {
          scheduleDate: returnDate, // Dönüş uçuş tarihi
          flightDirection: 'D', // Giden uçuşlar (kalkış AMS'den olacak)
         
        },
      });

      // Dönüş uçuşlarını yanıt listesine ekle
      flightResults.return = returnResponse.data;
    }

    // Sonuçları döndür
    res.status(200).json(flightResults);
  } catch (error) {
    console.error("Error fetching flight data:", error);
    res.status(404).json({ message: error.message });
  }
};
