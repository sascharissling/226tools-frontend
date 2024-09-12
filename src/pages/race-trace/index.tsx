import { ChangeEvent, useEffect, useRef, useState } from "react";
import FitParser, { FitFileData } from "fit-file-parser";
import { drawLine } from "./helpers/drawLine.ts";
import { Section } from "../../components/section";

const RaceTracePage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [data, setData] = useState<FitFileData | null>(null);
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
          const fitParser = new FitParser();

          fitParser.parse(e.target.result as ArrayBuffer, (error, data) => {
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

  useEffect(() => {
    if (data && data.records && canvasRef) {
      drawLine(data.records, canvasRef);
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
      <Section $hasBackground $hasBorder>
        <div>
          <input type="file" onChange={handleFileChange} accept={".fit"} />
          <button onClick={onFileUpload}>Upload!</button>
          <progress value={progress} max="100"></progress>

          {data && <canvas ref={canvasRef} width={400} height={300} />}
        </div>
      </Section>
    </main>
  );
};

export default RaceTracePage;
