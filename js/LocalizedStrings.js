//Localized Strings
const Language = {
	English:"English",
	Spanish:"Spanish",
	Japanese:"Japanese",
	French:"French"
};

const STRINGS_KEY = {
	Help:"[H] for Help",
	Credits:"[C] for Credits",
	Settings:"[S] for Settings",
	Play:"[Enter] to Play",
	MusicVolume:"Music Volume",
	SFXVolume:"SFX Volume",
	Loading:"Loading",
	Paused:"Paused",
	Title:"Title",
	Subtitle:"Subtitle",
	English:"English",
	Spanish:"Spanish",
	Japanese:"Japanese",
	French:"French",
	EnterToReturn:"EnterToReturn",
	HowToPlay:"HowToPlay",
	Muted:"Muted",
	Back:"Back",
	HelpScreenTitle:"Help Title",
	SettingsScreenTitle:"Settings Title",
	CreditsScreenTitle:"Credits Title"
};

function getLocalizedStringForKey(key) {
	return userStrings[currentLanguage][key];
}

const userStrings = {
	English: {
		[STRINGS_KEY.Help]:"[H] for Help",
		[STRINGS_KEY.Credits]:"[C] for Credits",
		[STRINGS_KEY.Settings]:"[S] for Settings",
		[STRINGS_KEY.Play]:"[SPACE] to Play",
		[STRINGS_KEY.MusicVolume]:"Music Volume",
		[STRINGS_KEY.SFXVolume]:"SFX Volume",
		[STRINGS_KEY.Loading]:"LOADING...",
		[STRINGS_KEY.Paused]:"- P A U S E D -",
		[STRINGS_KEY.Title]:"Kung Twu",
		[STRINGS_KEY.Subtitle]:"A Martial Arts Tale",
		[STRINGS_KEY.English]:"English",
		[STRINGS_KEY.Spanish]:"Español",
		[STRINGS_KEY.French]:"Français",
		[STRINGS_KEY.Japanese]:"にほんご",
		[STRINGS_KEY.EnterToReturn]:"Press [ENTER] to Return",
		[STRINGS_KEY.HowToPlay]:"How to Play",
		[STRINGS_KEY.Muted]:"Muted",
		[STRINGS_KEY.Back]:"Back",
		[STRINGS_KEY.HelpScreenTitle]:"HELP",
		[STRINGS_KEY.SettingsScreenTitle]:"SETTINGS",
		[STRINGS_KEY.CreditsScreenTitle]:"CREDITS"
	},
    
	Spanish: {
		[STRINGS_KEY.Help]:"[H] Ayuda",
		[STRINGS_KEY.Credits]:"[C] Créditos",
		[STRINGS_KEY.Settings]:"[S] Configuraciones",
		[STRINGS_KEY.Play]:"[SPACE] Jugar",
		[STRINGS_KEY.MusicVolume]:"Volumen de la Música",
		[STRINGS_KEY.SFXVolume]:"Volumen de SFX",
		[STRINGS_KEY.Loading]:"CARGANDO...",
		[STRINGS_KEY.Paused]:"- P A U S A D O -",
		[STRINGS_KEY.Title]:"Kung Twu",
		[STRINGS_KEY.Subtitle]:"Un Cuento de Artes Marciales",
		[STRINGS_KEY.English]:"English",
		[STRINGS_KEY.Spanish]:"Español",
		[STRINGS_KEY.Japanese]:"にほんご",
		[STRINGS_KEY.French]:"Français",
		[STRINGS_KEY.EnterToReturn]:"Presiona [Enter] para Regresar",
		[STRINGS_KEY.HowToPlay]:"Cómo Jugar",
		[STRINGS_KEY.Muted]:"Silenciado",
		[STRINGS_KEY.Back]:"[BACK]",
		[STRINGS_KEY.HelpScreenTitle]:"[HELP]",
		[STRINGS_KEY.SettingsScreenTitle]:"[SETTINGS]",
		[STRINGS_KEY.CreditsScreenTitle]:"[CREDITS]"
	},

	Japanese: {
		[STRINGS_KEY.Help]:"[H] てつだい",
		[STRINGS_KEY.Credits]:"[C] クレジット",
		[STRINGS_KEY.Settings]:"[S] せってい",
		[STRINGS_KEY.Play]:"[SPACE] あそび",
		[STRINGS_KEY.MusicVolume]:"BGMのおんりょう",
		[STRINGS_KEY.SFXVolume]:"こうかおんのおんりょう",
		[STRINGS_KEY.Loading]:"LOADING...",
		[STRINGS_KEY.Paused]:"- き ゅ う し -",
		[STRINGS_KEY.Title]:"Kung Twu",
		[STRINGS_KEY.Subtitle]:"A Martial Arts Tale",
		[STRINGS_KEY.English]:"English",
		[STRINGS_KEY.Spanish]:"Español",
		[STRINGS_KEY.Japanese]:"にほんご",
		[STRINGS_KEY.French]:"Français",
		[STRINGS_KEY.EnterToReturn]:"Press [ENTER] to Return",
		[STRINGS_KEY.HowToPlay]:"あそびかた",
		[STRINGS_KEY.Muted]:"ミュート",
		[STRINGS_KEY.Back]:"まえのがめんにもどす",
		[STRINGS_KEY.HelpScreenTitle]:"てつだい",
		[STRINGS_KEY.SettingsScreenTitle]:"せってい",
		[STRINGS_KEY.CreditsScreenTitle]:"クレジット"
	},

	French: {
		[STRINGS_KEY.Help]:"[H] for Help",
		[STRINGS_KEY.Credits]:"[C] for Credits",
		[STRINGS_KEY.Settings]:"[S] for Settings",
		[STRINGS_KEY.Play]:"[SPACE] to Play",
		[STRINGS_KEY.MusicVolume]:"Music Volume",
		[STRINGS_KEY.SFXVolume]:"SFX Volume",
		[STRINGS_KEY.Loading]:"LOADING...",
		[STRINGS_KEY.Paused]:"- P A U S E D -",
		[STRINGS_KEY.Title]:"Kung Twu",
		[STRINGS_KEY.Subtitle]:"A Martial Arts Tale",
		[STRINGS_KEY.English]:"English",
		[STRINGS_KEY.Spanish]:"Español",
		[STRINGS_KEY.Japanese]:"にほんご",
		[STRINGS_KEY.French]:"Français",
		[STRINGS_KEY.EnterToReturn]:"Press [ENTER] to Return",
		[STRINGS_KEY.HowToPlay]:"How to Play",
		[STRINGS_KEY.Muted]:"Muted",
		[STRINGS_KEY.Back]:"Back",
		[STRINGS_KEY.HelpScreenTitle]:"HELP",
		[STRINGS_KEY.SettingsScreenTitle]:"SETTINGS",
		[STRINGS_KEY.CreditsScreenTitle]:"CREDITS"
	}
};