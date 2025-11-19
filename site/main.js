window.editor = {};

editor.closeModal = () => {
    document.body.style.setProperty("--modal-interaction", "none");
    document.body.style.setProperty("--modal-opacity", "0%");
}