import fs from "fs";

// Function to read and parse JSON data
function readJSONFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading or parsing the file:", err);
    return null;
  }
}

// Function to extract and print relevant information
function extractEventData(jsonData) {
  if (!jsonData) return;

  return jsonData.map((event) => {
    const { date, ...rest } = event;
    return {
      ...rest,
      date: date.replace(/[\d\s]/g, ""),
    };
  });
}

// Main execution
const filePath = "./src/pages/events-map/events.json";
const jsonData = readJSONFile(filePath);
fs.writeFileSync(
  "cleaned_output.json",
  JSON.stringify(extractEventData(jsonData), null, 2),
);
