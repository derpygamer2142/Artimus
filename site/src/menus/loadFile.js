editor.loadFile = (forced) => {
    //Simple, easy.
    new editor.modal(artimus.translate("title", "modal.loadFile"), (contents, modal) => {

        const loadButton = document.createElement("button");
        const createButon = document.createElement("button");

        loadButton.className = "artimus-button";
        createButon.className = "artimus-button";


        createButon.innerText = artimus.translate("createInstead", "modal.loadFile");
        loadButton.innerText = artimus.translate("load", "modal.loadFile");

        createButon.onclick = () => {
            modal.close();
            editor.newFile(true);
        }
        loadButton.onclick = () => {
            artimus.activeWorkspaces[0].importFromPC().then(() => {
                modal.close();
            });
        };

        contents.appendChild(loadButton);
        contents.appendChild(createButon);

        loadButton.click();
        
    }, { hasClose: !forced, translationContext: "loadFile", width: 25, height: 20 });
}