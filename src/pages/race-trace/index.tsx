import styled from "styled-components";
import { ChangeEvent, useState } from "react";

const RaceTracePage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [localFileURL, setLocalFileURL] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        }
      };

      reader.readAsDataURL(file);
    }
  };

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
      <input type="file" onChange={onFileChange} />
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
