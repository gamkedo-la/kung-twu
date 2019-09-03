// Localized Strings

// Refer to Polyglot db for common words (but please translate by hand):
// https://docs.google.com/spreadsheets/d/17f0dQawb-s_Fd7DHgmVvJoEGDMH_yoSd8EYigrb0zmM/edit#gid=310116733

const Language = {
	English:"English",
	Spanish:"Spanish",
	Japanese:"Japanese",
	French:"French",
	Russian:"Russian"
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
	Russian:"Russian",
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
		[STRINGS_KEY.Russian]:"Русский",
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
		[STRINGS_KEY.Russian]:"Русский",
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
		[STRINGS_KEY.Russian]:"Русский",
		[STRINGS_KEY.EnterToReturn]:"Press [ENTER] to Return",
		[STRINGS_KEY.HowToPlay]:"あそびかた",
		[STRINGS_KEY.Muted]:"ミュート",
		[STRINGS_KEY.Back]:"まえのがめんにもどす",
		[STRINGS_KEY.HelpScreenTitle]:"てつだい",
		[STRINGS_KEY.SettingsScreenTitle]:"せってい",
		[STRINGS_KEY.CreditsScreenTitle]:"クレジット"
	},

    French: {
		[STRINGS_KEY.Help]:"[H] Aide",
		[STRINGS_KEY.Credits]:"[C] Crédits",
		[STRINGS_KEY.Settings]:"[S] Options",
		[STRINGS_KEY.Play]:"[SPACE] Jouer",
		[STRINGS_KEY.MusicVolume]:"Volume de la musique",
		[STRINGS_KEY.SFXVolume]:"Volume des effets sonores",
		[STRINGS_KEY.Loading]:"CHARGEMENT...",
		[STRINGS_KEY.Paused]:"- PAUSE -",
		[STRINGS_KEY.Title]:"Kung Twu",
		[STRINGS_KEY.Subtitle]:"Un Conte D'Arts Martiaux",
		[STRINGS_KEY.English]:"English",
		[STRINGS_KEY.Spanish]:"Español",
		[STRINGS_KEY.Japanese]:"にほんご",
		[STRINGS_KEY.French]:"Français",
		[STRINGS_KEY.Russian]:"Русский",
		[STRINGS_KEY.EnterToReturn]:"Appuyez sur [ENTER] pour revenir",
		[STRINGS_KEY.HowToPlay]:"Comment Jouer",
		[STRINGS_KEY.Muted]:"Mode Silencieux", // extremely not sure about this one
		[STRINGS_KEY.Back]:"Retour",
		[STRINGS_KEY.HelpScreenTitle]:"AIDE",
		[STRINGS_KEY.SettingsScreenTitle]:"OPTIONS",
		[STRINGS_KEY.CreditsScreenTitle]:"CRÉDITS" // This one could be something like 
	},

	Russian: {
		[STRINGS_KEY.Help]:"[H] Помощь",
		[STRINGS_KEY.Credits]:"[C] Титры",
		[STRINGS_KEY.Settings]:"[S] Опции",
		[STRINGS_KEY.Play]:"[ПРОБЕЛ] Играть",
		[STRINGS_KEY.MusicVolume]:"Громкость музыки",
		[STRINGS_KEY.SFXVolume]:"Громкость эффектов",
		[STRINGS_KEY.Loading]:"ЗАГРУЖАЕТСЯ...",
		[STRINGS_KEY.Paused]:"- П А У З А -",
		[STRINGS_KEY.Title]:"Кунг Ту",
		[STRINGS_KEY.Subtitle]:"Сказание о боевых искусствах",
		[STRINGS_KEY.English]:"English",
		[STRINGS_KEY.Spanish]:"Español",
		[STRINGS_KEY.French]:"Français",
		[STRINGS_KEY.Japanese]:"にほんご",
		[STRINGS_KEY.Russian]:"Русский",
		[STRINGS_KEY.EnterToReturn]:"Нажмите [ENTER], чтобы вернуться назад",
		[STRINGS_KEY.HowToPlay]:"Как играть",
		[STRINGS_KEY.Muted]:"Без звука",
		[STRINGS_KEY.Back]:"Вернуться",
		[STRINGS_KEY.HelpScreenTitle]:"ПОМОЩЬ",
		[STRINGS_KEY.SettingsScreenTitle]:"ОПЦИИ",
		[STRINGS_KEY.CreditsScreenTitle]:"ТИТРЫ"
	}
};