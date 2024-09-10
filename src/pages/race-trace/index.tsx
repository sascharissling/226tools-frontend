import styled from "styled-components";
import { ChangeEvent, useEffect, useRef, useState } from "react";
// @ts-expect-error - no types available
import FitParser from "fit-file-parser";

const RaceTracePage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [localFileURL, setLocalFileURL] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [data, setData] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    setFiles(Array.from(event.target.files || []));
  };

  const onFileUpload = async () => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setProgress(progress);
        }
      };

      reader.onload = (e) => {
        if (e.target?.result) {
          setLocalFileURL(e.target.result as string);

          const fitParser = new FitParser({
            force: true,
            speedUnit: "km/h",
            lengthUnit: "m",
            temperatureUnit: "celsius",
            elapsedRecordField: true,
            mode: "list",
          });

          fitParser.parse(e.target.result, (error: any, data: any) => {
            if (error) {
              console.error(error);
            } else {
              console.log(data);
              setData(data);
            }
          });
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const drawLine = (records: any[]) => {
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

    // console.log("ScaleX:", scaleX, "ScaleY:", scaleY);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "blue"; // Set stroke color for better visibility
    ctx.lineWidth = 2; // Set line width for better visibility

    // Draw the line
    records.forEach((record, index) => {
      // Normalize the lat/long to canvas coordinates
      const x = padding + (record.position_long - minLonAdjusted) * scaleX;
      const y =
        canvas.height -
        (padding + (record.position_lat - minLatAdjusted) * scaleY); // Invert Y to match canvas coordinates

      // console.log(`Point ${index}: X = ${x}, Y = ${y}`);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  };

  useEffect(() => {
    if (data && data.records) {
      drawLine(data.records);
    }
  }, [data]);

  return (
    <main>
      <Section>
        <h1>Race Trace</h1>
        <p>
          Make your own beautiful Race Memory by uploading your own fit files to
          receive your actual accomplishment in a personalized map.
          <br />
          <br />
          You can choose your preferred form factor and then print it with
          whatever service you prefer in your own country.
        </p>
      </Section>
      <Section>
        <h2>Upload your Fit File(s)</h2>
        <p>
          Upload your fit files to create your raw map. You can upload multiple
          files at once. If you only upload a single file, the map will be
          created with the data from that file.
          <br />
          <br />
          We will show you the map in the preview below.
        </p>
      </Section>
      <input type="file" onChange={handleFileChange} accept={".fit"} />
      <button onClick={onFileUpload}>Upload!</button>
      <progress value={progress} max="100"></progress>
      {localFileURL && (
        <div>
          <h3>Local File Preview:</h3>
          <a href={localFileURL} download="uploaded-file">
            Download File
          </a>
        </div>
      )}
      {data && (
        <div>
          <h3>File Data:</h3>
          <pre>{JSON.stringify(data)}</pre>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        style={{ border: "1px solid black" }}
      />
    </main>
  );
};

export default RaceTracePage;

const Section = styled.section`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.whiteLighter};
`;
