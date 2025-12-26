
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const upload = async () => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await axios.post("http://localhost:3001/upload", fd);
    setData(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Delivery Note Generator</h1>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Generate</button>

      {data && (
        <div>
          <h2>Downloads</h2>
          {data.files.map(f => (
            <div key={f}>
              <a href={`http://localhost:3001/download/${f}`}>{f}</a>
            </div>
          ))}
          <a href={`http://localhost:3001/download/${data.zip}`}>Download ZIP</a>
        </div>
      )}
    </div>
  );
}
