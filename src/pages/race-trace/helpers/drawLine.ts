import { FitFileData } from "fit-file-parser";

export const clearCanvas = (
  ctx: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement | null,
) => {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    const records = fitFileData.records;

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

    ctx.lineWidth = 5;

    for (let i = 0; i < records.length - 1; i++) {
      const currentRecord = records[i];
      const nextRecord = records[i + 1];

      const x1 =
        padding + (currentRecord.position_long - minLonAdjusted) * scaleX;
      const y1 =
        canvas.height -
        (padding + (currentRecord.position_lat - minLatAdjusted) * scaleY);

      const x2 = padding + (nextRecord.position_long - minLonAdjusted) * scaleX;
      const y2 =
        canvas.height -
        (padding + (nextRecord.position_lat - minLatAdjusted) * scaleY);

      // Calculate control points for Bezier curve (midpoint between two points)
      const controlX = (x1 + x2) / 2;
      const controlY = (y1 + y2) / 2;

      if (i === 0) {
        ctx.beginPath();
        ctx.arc(x1, y1, 5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = colors[fileIndex];
        ctx.fill();
        ctx.moveTo(x1, y1); // Move to the start point again to avoid drawing a line from the center of the circle
        // ctx.closePath();
      }

      // Draw the Bezier curve instead of straight line
      ctx.strokeStyle = colors[fileIndex];
      ctx.quadraticCurveTo(x1, y1, controlX, controlY);

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
