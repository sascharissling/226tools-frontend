import fs from "fs";
import fetch from "node-fetch";

const SHEET_URL =
  "https://sheets.googleapis.com/v4/spreadsheets/1yLtxUETnuF3UZLmypYkAK6Vj4PE9Fo_BT-WsA4oE_YU/values/Race-Catalog?key=AIzaSyC9s2sNhwUZOUXJfnyt-cD4k4nUyY-3HBs";

const fetchData = async () => {
  const response = await fetch(SHEET_URL);
  const data = await response.json();
  return data.values;
};

const geocodeLocation = async (location) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`
  );
  const data = await response.json();
  if (data.length > 0) {
    const { lat, lon } = data[0];
    return [parseFloat(lon), parseFloat(lat)];
  }
  return null;
};

const fetchAndStoreEvents = async () => {
  const data = await fetchData();
  const events = [];

  for (const row of data.slice(1)) {
    const location = row[7]; // Assuming the location is in the 8th column
    const coordinates = await geocodeLocation(location);
    if (coordinates) {
      console.log(`Geocoded ${location}: ${coordinates}`);
      events.push({
        name: row[0], // Assuming the event name is in the 1st column
        location,
        coordinates,
        data: row, // Include the entire row of data
      });
    } else {
      console.log(`Failed to geocode location: ${location}`);
    }
  }

  fs.writeFileSync("events.json", JSON.stringify(events, null, 2));
  console.log("Events data written to events.json");
};

fetchAndStoreEvents();
