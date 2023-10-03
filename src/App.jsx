import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { dialog, fs } from "@tauri-apps/api";
import "./App.css";
import { Button } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';

function App() {
  const [path, setPath] = useState("");
  const [content, setContent] = useState("");
  let length = 0;

  const interval = setInterval(async () => {
    const fileContent = await fs.readTextFile(path);
    if (length == 0) {
      length = fileContent.length;
      setContent(fileContent);
    }

    if (length != fileContent.length) {
      length = fileContent.length;
      setContent(fileContent);
    }

  }, 1000);

  async function log(content) {
    await invoke("log", { content });
  }

  async function handleOpen() {
    try {
      const result = await dialog.open({
        multiple: false,
        directory: false,
        filter: "png",
      });

      if (typeof result === "string") {
        setPath(result);
      }
      await log(result);

    } catch (error) {
      await log(error);
    }
  }

  return (
    <>
      <pre>{path}</pre>
      <Button style={{
        margin: "auto",
      }} variant="outlined" startIcon={<FileUploadIcon/>} onClick={handleOpen}>open file</Button>
      <pre>{content}</pre>
    </>
  );
}

export default App;
