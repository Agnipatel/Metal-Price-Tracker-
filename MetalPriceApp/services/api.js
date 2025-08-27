import axios from "axios";

const API_BASE = "https://www.goldapi.io/api";
const API_KEY = "YOUR_API_KEY"; // put from goldapi.io

const client = axios.create({
  baseURL: API_BASE,
  headers: { "x-access-token": API_KEY, "Content-Type": "application/json" },
});

export const fetchMetals = async () => {
  try {
    // goldapi provides endpoints per metal
    const [gold, silver, platinum, palladium] = await Promise.all([
      client.get("/XAU/INR"), // Gold in INR
      client.get("/XAG/INR"), // Silver in INR
      client.get("/XPT/INR"), // Platinum
      client.get("/XPD/INR"), // Palladium
    ]);

    return [
      { name: "Gold", price24k: gold.data.price, time: gold.data.timestamp },
      { name: "Silver", price24k: silver.data.price, time: silver.data.timestamp },
      { name: "Platinum", price24k: platinum.data.price, time: platinum.data.timestamp },
      { name: "Palladium", price24k: palladium.data.price, time: palladium.data.timestamp },
    ];
  } catch (error) {
    throw new Error("Failed to fetch live metal prices.");
  }
};

export const fetchMetalDetails = async (metal: string) => {

  try {
    const { data } = await client.get(`/${metal}/INR`);
    return {
      name: metal,
      today: data.price,
      previousClose: data.prev_close_price,
      previousOpen: data.open_price,
      date: data.date,
      time: data.timestamp,
    };
  } catch (error) {
    throw new Error(`Failed to fetch details for ${metal}.`);
  }
};
