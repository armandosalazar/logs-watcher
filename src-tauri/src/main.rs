// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn print(contents: &str) {
    println!("{}", contents);
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn open() -> String {
    // run a command
    // std::process::Command::new("cmd")
    //     .args(&["/C", "start", "https://tauri.studio"])
    //     .spawn()
    //     .expect("failed to execute process");
    std::process::Command::new("bash")
        .args(&["-c", "open https://tauri.studio"])
        .spawn()
        .expect("failed to execute process");

    format!("Hello, {}! You've been greeted from Rust!", "open")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![print, greet, open])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
