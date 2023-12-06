export const configuration = {
	encoding: "windows1252", // Currently ignored
	modPath: "E:/Steam/steamapps/common/Stalker GAMMA MO2/mods/ZZZ- Saint's Custom UI Patcher Input",
	modUserInterfaceFilePatterns: [
		"actor_menu",
		"message_box",
		"pda",
		"talk",
		"ui_inventory",
		"ui_keybinding",
		"ui_mcm",
		"ui_mm_main",
		"ui_mm_faction_select",
		"ui_mm_load_dlg",
		"ui_mm_save_dlg",
		"ui_options",
		"ui_workshop"
	],
	modUserInterfaceElementPatterns: ["button", "btn", "cap", "list", "block", "caption", "rank", "name", "community", "money", "weight", "price"],
	modUserInterfaceFileEnding: "xml",
	lineHeightByFont: {
		graffiti22: 24,
		letterica18: 20,
		letterica16: 18
	}
}
