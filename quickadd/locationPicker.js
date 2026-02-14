/*
 * QuickAdd script that prompts the user to pick a location from the 'Locations' folder.
 * Trigger with {{MACRO:Location Picker}}
 * Use {{VALUE:locationLink}} in front matter
 */
module.exports = async ({ app, quickAddApi, variables }) => {
    const categories = {};
    for (const file of app.vault.getFiles()) {
        const parts = file.path.split("/");
        if (parts[0] === "Locations" && parts.length === 3 && file.extension === "md")
            (categories[parts[1]] ??= []).push(file.basename);
    }

    const cats = Object.keys(categories).sort();
    const category = await quickAddApi.suggester(["— Skip —", ...cats], [null, ...cats]);
    if (!category) { variables.locationLink = ""; return "Unknown"; }

    const locs = categories[category].sort();
    const choice = await quickAddApi.suggester(locs, locs);
    if (!choice) { variables.locationLink = ""; return "Unknown"; }

    variables.locationLink = `[[${choice}]]`;
    return choice;
};