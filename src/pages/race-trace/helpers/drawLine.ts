import { FitFileData } from "fit-file-parser";

export const clearCanvas = (
  ctx: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement | null,
) => {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const calculateSimplifyTolerance = (numRecords: number): number => {
  if (numRecords < 500) {
    return 0.0001;
  } else if (numRecords < 1000) {
    return 0.0002;
  } else if (numRecords < 2000) {
    return 0.0005;
  } else if (numRecords < 5000) {
    return 0.001;
  } else if (numRecords < 10000) {
    return 0.002;
  } else {
    return 0.004;
  }
};
export const drawLine = (
  data: FitFileData[],
  colors: string[],
  ctx: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement | null,
) => {
  if (!ctx || !canvas) return;

  clearCanvas(ctx, canvas);

  data.forEach((fitFileData, fileIndex) => {
    let records = fitFileData.records;


    // Calculate simplify tolerance based on the number of records
    const simplifyTolerance = calculateSimplifyTolerance(records.length);
    console.log(fitFileData.laps[0].sport,records.length,simplifyTolerance,colors[fileIndex]);

    // Simplify the route before drawing
    records = simplifyRoute(records, simplifyTolerance);

    // Find the bounding box (min/max latitude and longitude)
    const lats = records.map((record) => record.position_lat).filter(Boolean);
    const lons = records.map((record) => record.position_long).filter(Boolean);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    // Add padding to avoid drawing right at the edge of the canvas
    const padding = 20;

    // Calculate the scale factors to map lat/long to canvas size
    const scaleX = (canvas.width - 2 * padding) / (maxLon - minLon);
    const scaleY = (canvas.height - 2 * padding) / (maxLat - minLat);

    ctx.lineWidth = 5;

    for (let i = 0; i < records.length - 1; i++) {
      const currentRecord = records[i];
      const nextRecord = records[i + 1];

      const x1 = padding + (currentRecord.position_long - minLon) * scaleX;
      const y1 = padding + (maxLat - currentRecord.position_lat) * scaleY;

      const x2 = padding + (nextRecord.position_long - minLon) * scaleX;
      const y2 = padding + (maxLat - nextRecord.position_lat) * scaleY;

      if (i === 0) {
        ctx.beginPath();
        ctx.arc(x1, y1, 5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = colors[fileIndex];
        ctx.fill();
        ctx.moveTo(x1, y1); // Move to the start point again to avoid drawing a line from the center of the circle
      }

      // Draw the line
      ctx.strokeStyle = colors[fileIndex];
      ctx.lineTo(x2, y2);

      // Draw end point (rectangle) for the last record
      if (i === records.length - 2) {
        ctx.stroke();
        ctx.beginPath();
        ctx.rect(x2 - 2, y2 - 2, 6, 6);
        ctx.fillStyle = colors[fileIndex];
        ctx.fill();
      }
    }

    ctx.stroke();
  });
};

// Douglas-Peucker Algorithm Implementation
function getPerpendicularDistance(point, lineStart, lineEnd) {
  const x0 = point.position_long;
  const y0 = point.position_lat;
  const x1 = lineStart.position_long;
  const y1 = lineStart.position_lat;
  const x2 = lineEnd.position_long;
  const y2 = lineEnd.position_lat;

  const numerator = Math.abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1);
  const denominator = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
  return numerator / denominator;
}

function simplifyDouglasPeucker(points, tolerance) {
  if (points.length <= 2) {
    return points;  // If there are only two points, we cannot simplify further.
  }

  // Find the point with the maximum distance
  let maxDistance = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const distance = getPerpendicularDistance(points[i], points[0], points[points.length - 1]);
    if (distance > maxDistance) {
      index = i;
      maxDistance = distance;
    }
  }

  // If the maximum distance is greater than the tolerance, recursively simplify
  if (maxDistance > tolerance) {
    // Recursive call
    const left = simplifyDouglasPeucker(points.slice(0, index + 1), tolerance);
    const right = simplifyDouglasPeucker(points.slice(index), tolerance);

    // Return the concatenated result, without duplicating the middle point
    return left.slice(0, -1).concat(right);
  } else {
    // If the maximum distance is less than the tolerance, return the endpoints
    return [points[0], points[points.length - 1]];
  }
}

// Main simplifyRoute function to simplify the route data
function simplifyRoute(records: FitFileRecord[], tolerance: number) {
  // Assuming each record contains position_lat and position_long
  return simplifyDouglasPeucker(records, tolerance);
}
