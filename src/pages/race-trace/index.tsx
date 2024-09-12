import { ChangeEvent, useEffect, useRef, useState } from "react";
import FitParser, { FitFileData } from "fit-file-parser";
import { drawLine, clearCanvas } from "./helpers/drawLine.ts";
import { Section } from "../../components/section";
import dayjs from "dayjs";

const allowedColors = [
  "#FF6F61", // Vivid Coral
  "#FFD166", // Bright Sunflower Yellow
  "#06D6A0", // Energetic Mint Green
  "#118AB2", // Bright Ocean Blue
  "#EF476F", // Bold Pink
  "#073B4C", // Deep Teal
  "#F78C6B", // Vibrant Peach
  "#9C27B0", // Vivid Purple
  "#FFB400", // Bright Orange
  "#3A86FF", // Electric Blue
];

const RaceTracePage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [data, setData] = useState<FitFileData[] | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    setFiles(Array.from(event.target.files || []));
  };

  const handleColorChange = (index: number, color: string) => {
    setColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = color;
      return newColors;
    });
  };

  const onFileUpload = async () => {
    if (files.length > 0) {
      files.forEach((file) => {
        const reader = new FileReader();

        reader.onprogress = (e) => {
          if (e.lengthComputable) {
            const progress = (e.loaded / e.total) * 100;
            setProgress(progress);
          }
        };

        reader.onload = (e) => {
          if (e.target?.result) {
            const fitParser = new FitParser();

            fitParser.parse(e.target.result as ArrayBuffer, (error, data) => {
              if (error) {
                console.error(error);
              } else {
                setData((prevData) =>
                  prevData ? [...prevData, data] : [data],
                );
                setColors((prevColors) => [...prevColors, allowedColors[0]]); // Default color
              }
            });
          }
        };

        reader.readAsArrayBuffer(file);
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setData((prevData) => {
      if (prevData) {
        const newData = prevData.filter((_, i) => i !== index);
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          clearCanvas(ctx, canvasRef.current);
          drawLine(newData, colors, ctx, canvasRef.current);
        }
        return newData.length > 0 ? newData : null;
      }
      return null;
    });
  };

  useEffect(() => {
    if (data && canvasRef && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      drawLine(data, colors, ctx, canvasRef.current);
    }
  }, [data, colors]);

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
      <Section $hasBackground $hasBorder>
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            accept={".fit"}
            multiple
          />
          <button onClick={onFileUpload}>Upload!</button>
          <progress value={progress} max="100"></progress>

          {data && (
            <ul>
              {data.map((fitFileData, index) => (
                <li key={index}>
                  <strong>
                    {" "}
                    {fitFileData.laps[0].sport ?? "Unknown discipline"}{" "}
                  </strong>
                  - Start Time:{" "}
                  {dayjs(fitFileData.activity?.timestamp).format(
                    "HH:mm:ss DD/MM/YYYY",
                  )}
                  <div>
                    {allowedColors.map((color) => (
                      <label key={color} style={{ marginRight: "10px" }}>
                        <input
                          type="radio"
                          name={`color-${index}`}
                          value={color}
                          checked={colors[index] === color}
                          onChange={(e) =>
                            handleColorChange(index, e.target.value)
                          }
                          style={{ display: "none" }}
                        />
                        <span
                          style={{
                            display: "inline-block",
                            width: "20px",
                            height: "20px",
                            backgroundColor: color,
                            borderRadius: "50%",
                            border:
                              colors[index] === color
                                ? "1px solid #fff"
                                : "1px solid #000",
                            boxShadow:
                              colors[index] === color
                                ? "0 0 0 2px #000"
                                : "none",
                            cursor: "pointer",
                          }}
                        ></span>
                      </label>
                    ))}
                  </div>
                  <button onClick={() => handleRemoveFile(index)}>
                    remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {data && <canvas ref={canvasRef} width={400} height={300} />}
        </div>
      </Section>
    </main>
  );
};

export default RaceTracePage;
