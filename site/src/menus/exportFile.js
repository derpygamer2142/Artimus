editor.exportMenu = () => {
    new editor.modal(artimus.translate("title", "modal.exportFile"), (contents, modal) => {
        //Get formats available for export
        const formatMenu = document.createElement("select");
        contents.appendChild(formatMenu);

        for (let format in artimus.extensionToMIME) {
            const option = document.createElement("option");
            //Configure, and if it is the preferred one append the preferred marker
            option.innerText = format;
            if (editor.settings.preferredFormat == format) option.innerText += ` ${artimus.translate("preferred", "modal.exportFile")}`;
            option.value = format;

            formatMenu.appendChild(option);
        }
    }, { width: 60 })
}