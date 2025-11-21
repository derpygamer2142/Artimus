window.editor = {
    docEdit: {
        width: 256,
        height: 240
    }
};

editor.closeModal = () => {
    document.body.style.setProperty("--modal-interaction", "none");
    document.body.style.setProperty("--modal-opacity", "0%");
}

editor.fileResize = (newFile) => {
    editor.docEdit = {
        width: 256,
        height: 240
    };

    editor.popup.innerHTML = "";
    editor.popup.appendChild(CUGI.createList([
        { type: "header", text: (newFile) ? "New File" : "Resize" },
        { type: "int", text: "width", key: "width", target: editor.docEdit},
        { type: "int", text: "height", key: "height", target: editor.docEdit},
        { type: "button", text: (newFile) ? "create" : "resize", onclick: () => {
            if (newFile) artimus.activeWorkspaces[0].new(editor.docEdit.width, editor.docEdit.height);
            else artimus.activeWorkspaces[0].resize(editor.docEdit.width, editor.docEdit.height);
            editor.closeModal();
        }}
    ]));

    document.body.style.setProperty("--modal-interaction", "all");
    document.body.style.setProperty("--modal-opacity", "100%");
}