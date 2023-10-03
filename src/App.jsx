import {useState} from "react";
import reactLogo from "./assets/react.svg";
import {invoke} from "@tauri-apps/api/tauri";
import {dialog, fs} from "@tauri-apps/api";
import "./App.css";
import {Button} from "@mui/material";

function App() {
    const [path, setPath] = useState("");
    const [content, setContent] = useState("");
    const [length, setLength] = useState(0);
    const interval = setInterval(async () => {
        let fileContent = await fs.readTextFile(path);
        setContent(fileContent);
    }, 1000);

    async function log(content) {
        await invoke("log", {content});
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
            <button type="button" onClick={handleOpen}>Open file</button>
            <Button variant="contained" onClick={handleOpen}>Open file</Button>
            <pre>{content}</pre>
        </>
    );
}

export default App;
