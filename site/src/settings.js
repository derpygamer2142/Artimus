editor.settings = {
    theme: "default",
    maxHistory: 10,
    preferredFormat: "png"
};

editor.saveSettings = () => localStorage.setItem("settings", JSON.stringify(editor.settings));

editor.settingDefs = {
    general: [
        {type: "dropdown", target: editor.settings, key: "theme", items: [
            "default",
            "dark"
        ], onchange: (value) => {
            if (!editor.themes[value]) value = "default";

            const theme = editor.themes[value];
            for (let item in theme) { document.body.style.setProperty(`--${item}`, theme[item]); }
            for (let workspaceID in artimus.activeWorkspaces) { artimus.activeWorkspaces[workspaceID].refreshGridPattern(); }

            editor.saveSettings();
        }},
        {type: "int", target: editor.settings, key: "maxHistory", min: 1, max: 50, onchange: (value) => {
            artimus.maxHistory = value;
            editor.saveSettings();
        }},
        {type: "dropdown", target: editor.settings, key: "preferredFormat", items: Object.keys(artimus.extensionToMIME), onchange: () => {
            editor.saveSettings();
        }}
    ]
};


if (localStorage.getItem("settings")) {
    Object.assign(editor.settings, JSON.parse(localStorage.getItem("settings")));

    for (let category in editor.settingDefs) {
        for (let item in editor.settingDefs[category]) {
            const setting = editor.settingDefs[category][item];

            setting.onchange(editor.settings[setting.key]);
        }
    }
}

editor.settingsPage = () => {
    //Do some cool stuff
    new editor.modal(
        artimus.translate("title", "modal.newFile"), 
        editor.settingDefs.general, 
        { translationContext: "settings" }
    );
}