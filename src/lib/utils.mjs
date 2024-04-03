import NewMediaWindow from "./components/NewMediaWindow.svelte"
export function openNewMediaWindow(){
    new NewMediaWindow({
        target: document.getElementById("collections-area"),
    });
}