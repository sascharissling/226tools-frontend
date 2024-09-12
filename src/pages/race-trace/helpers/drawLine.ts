import { FitFileData } from "fit-file-parser";
import { MutableRefObject } from "react";

export const drawLine = (
  records: FitFileData["records"],
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Find the bounding box (min/max latitude and longitude)
  const lats = records.map((record) => record.position_lat).filter(Boolean);
  const lons = records.map((record) => record.position_long).filter(Boolean);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);

  // If the range is too small, apply a fallback scaling factor
  const latRange = maxLat - minLat;
  const lonRange = maxLon - minLon;
  const minLatAdjusted = latRange === 0 ? minLat - 0.01 : minLat;
  const maxLatAdjusted = latRange === 0 ? maxLat + 0.01 : maxLat;
  const minLonAdjusted = lonRange === 0 ? minLon - 0.01 : minLon;
  const maxLonAdjusted = lonRange === 0 ? maxLon + 0.01 : maxLon;

  // Add padding to avoid drawing right at the edge of the canvas
  const padding = 20;

  // Calculate the scale factors to map lat/long to canvas size
  const scaleX =
    (canvas.width - 2 * padding) / (maxLonAdjusted - minLonAdjusted);
  const scaleY =
    (canvas.height - 2 * padding) / (maxLatAdjusted - minLatAdjusted);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 5;

  records.forEach((record, index) => {
    const x = padding + (record.position_long - minLonAdjusted) * scaleX;
    const y =
      canvas.height -
      (padding + (record.position_lat - minLatAdjusted) * scaleY);

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
};
