import { ChangeEvent, useEffect, useRef, useState } from "react";
import FitParser, { FitFileData } from "fit-file-parser";
import { drawLine, clearCanvas } from "./helpers/drawLine";
import { Section } from "../../components/section";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

import jsPDF from "jspdf";
import Button from "../../components/button";

const allowedColors = [
  "#FF6F61",
  "#FFD166",
  "#06D6A0",
  "#118AB2",
  "#EF476F",
  "#073B4C",
  "#F78C6B",
  "#9C27B0",
  "#FFB400",
  "#3A86FF",
];

const generateDocument = (canvas: HTMLCanvasElement, times: string[]) => {
  const doc = new jsPDF();
  doc.text("Your personalized race map", 20, 30);
  const imgData = canvas.toDataURL("image/png");
  doc.addImage(imgData, "PNG", 20, 40, 160, 120);
  times.forEach((time, index) => {
    doc.text(`Line ${index + 1}: ${time}`, 20, 170 + index * 10);
  });
  doc.save("race_trace.pdf");
};

const RaceTracePage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [data, setData] = useState<FitFileData[] | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFiles(Array.from(event.target.files));
  };

  const handleColorChange = (index: number, color: string) => {
    setColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = color;
      return newColors;
    });
  };

  const handleTimeChange = (index: number, time: string) => {
    setTimes((prevTimes) => {
      const newTimes = [...prevTimes];
      newTimes[index] = time;
      return newTimes;
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
                const totalTime = data.sessions[0].total_elapsed_time ?? 0;
                const formattedTime = dayjs
                  .duration(totalTime, "seconds")
                  .format("HH:mm:ss");
                setData((prevData) =>
                  prevData ? [...prevData, data] : [data]
                );
                setColors((prevColors) => [...prevColors, allowedColors[0]]);
                setTimes((prevTimes) => [...prevTimes, formattedTime]);
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
    if (data && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      drawLine(data, colors, ctx, canvasRef.current);
    }
  }, [data, colors]);

  return (
    <main>
      <Section>
        <h1>Race Trace</h1>
        <p>
          Upload your fit files to create your raw map. You can upload multiple
          files at once.
        </p>
      </Section>
      <Section>
        <input type="file" onChange={handleFileChange} accept=".fit" multiple />
        <Button style="primary" onClick={onFileUpload}>
          Upload!
        </Button>
        <progress value={progress} max="100"></progress>
        {data && (
          <ul>
            {data.map((fitFileData, index) => (
              <li key={index}>
                <strong>
                  {fitFileData.laps[0].sport ?? "Unknown discipline"}
                </strong>
                - Start Time:{" "}
                {dayjs(fitFileData.activity?.timestamp).format(
                  "HH:mm:ss DD/MM/YYYY"
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
                            colors[index] === color ? "0 0 0 2px #000" : "none",
                          cursor: "pointer",
                        }}
                      ></span>
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Total Time"
                  value={times[index]}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                />
                <Button onClick={() => handleRemoveFile(index)}>remove</Button>
              </li>
            ))}
          </ul>
        )}
        {data && <canvas ref={canvasRef} width={400} height={300} />}
        <Button onClick={() => generateDocument(canvasRef.current!, times)}>
          Download PDF
        </Button>
      </Section>
    </main>
  );
};

export default RaceTracePage;
