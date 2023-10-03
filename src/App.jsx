import {useState} from "react";
import reactLogo from "./assets/react.svg";
import {invoke} from "@tauri-apps/api/tauri";
import {dialog, fs} from "@tauri-apps/api";
import "./App.css";

function App() {
    const [path, setPath] = useState("");
    const [content, setContent] = useState("");

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
                try {
                    const fileContent = await fs.readTextFile(result);
                    setContent(fileContent);
                } catch (error) {
                    await log(error);
                }
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
        </>
    );
}

export default App;
