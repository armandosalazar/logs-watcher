import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { dialog } from "@tauri-apps/api";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [path, setPath] = useState("");

  async function print(content) {
    await invoke("print", { content });
  }

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  async function handleOpen() {
    try {
      const result = await dialog.open({
        multiple: false,
        directory: false,
        filter: "png",
      });
      setPath(result);
      print(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <pre>{path}</pre>

      <button type="button" onClick={handleOpen}>Open file</button>

    </>
  );
}

export default App;
