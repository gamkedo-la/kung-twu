// Localized Strings

// Refer to Polyglot db for common words (but please translate by hand):
// https://docs.google.com/spreadsheets/d/17f0dQawb-s_Fd7DHgmVvJoEGDMH_yoSd8EYigrb0zmM/edit#gid=310116733

const Language = {
	English:"English",
	Spanish:"Spanish",
	Japanese:"Japanese",
	French:"French",
	Russian:"Russian",
	Polish:"Polish"
};

const STRINGS_KEY = {
	Help:"[H] for Help",
	Credits:"[C] for Credits",
	Settings:"[S] for Settings",
	Play:"[Enter] to Play",
	Assist:"[Z] for Assist Mode",
	MusicVolume:"Music Volume",
	SFXVolume:"SFX Volume",
	Loading:"Loading",
	Paused:"Paused",
	Controls:"Controls",
	Quit:"Quit",
	Continue:"Continue",
	End:"End",
	Done:"Done",
	Title:"Title",
	Subtitle:"Subtitle",
	English:"English",
	Spanish:"Spanish",
	Japanese:"Japanese",
	French:"French",
	Russian:"Russian",
	Polish:"Polish",
	EnterToReturn:"EnterToReturn",
	HowToPlay:"HowToPlay",
	Muted:"Muted",
	Back:"[ESC] Back",
	Resume:"Resume",
	HelpScreenTitle:"Help Title",
	HelpScreenContents:"Help Screen Contents",
	AssistSceneTitle: "Assist Title",
	SettingsScreenTitle:"Settings Title",
	CreditsScreenTitle:"Credits Title",
	GameOverTitle:"GameOverTitle",
	HighScore:"HighScore",
	Score:"Score",
	Health:"Health",
	Time:"Time",
	Level:"Level",
	Level1:"Level1",
	Level2:"Level2",
	Level3:"Level3",
	Level4:"Level4",
	Level5:"Level5",
	HowToDash:"HowToDash",
	HowToSweep:"HowToSweep",
	HowToJ_Kick:"HowToJ_Kick",
	HowToH_Kick:"HowToH_Kick",
	EndGameMessage:"EndGameMessage",
	Boss:"Boss",
	BeltWhite:"beltWhite",
	BeltYellow:"beltYellow",
	BeltTan:"beltTan",
	BeltBrown:"beltBrown",
	BeltRed:"beltRed",
	BeltBlack:"beltBlack",
	MaxHealth:"maxHealth",
	StartBelt:"startBelt",
	StartLevel:"startLevel"
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
		[STRINGS_KEY.Assist]:"[Z] for Assist Mode",
		[STRINGS_KEY.MusicVolume]:"Music Volume",
		[STRINGS_KEY.SFXVolume]:"SFX Volume",
		[STRINGS_KEY.Loading]:"LOADING...",
		[STRINGS_KEY.Paused]:"- P A U S E D -",
		[STRINGS_KEY.Controls]:"[C] Controls",
		[STRINGS_KEY.Quit]:"[Q] Quit",
		[STRINGS_KEY.Continue]:"[C] Continue",		
		[STRINGS_KEY.End]:"[E] End",
		[STRINGS_KEY.Done]:"Done",
		[STRINGS_KEY.Title]:"Kung Twu",
		[STRINGS_KEY.Subtitle]:"A Martial Arts Tale",
		[STRINGS_KEY.English]:"English",
		[STRINGS_KEY.Spanish]:"Español",
		[STRINGS_KEY.French]:"Français",
		[STRINGS_KEY.Japanese]:"にほんご",
		[STRINGS_KEY.Russian]:"Русский",
		[STRINGS_KEY.Polish]:"Polski",
		[STRINGS_KEY.EnterToReturn]:"Press [ENTER] to Return",
		[STRINGS_KEY.HowToPlay]:"How to Play",
		[STRINGS_KEY.Muted]:"Muted",
		[STRINGS_KEY.Back]:"[ESC] Back",
		[STRINGS_KEY.Resume]:"[ESC] Resume",
		[STRINGS_KEY.HelpScreenTitle]:"HELP",
		[STRINGS_KEY.AssistSceneTitle]:"ASSIST MODE",
		[STRINGS_KEY.SettingsScreenTitle]:"SETTINGS",
		[STRINGS_KEY.CreditsScreenTitle]:"CREDITS",
		[STRINGS_KEY.GameOverTitle]:"GAME OVER",
		[STRINGS_KEY.HighScore]:"HIGH SCORE:",
		[STRINGS_KEY.Score]:"SCORE:",
		[STRINGS_KEY.Health]:"HEALTH:",
		[STRINGS_KEY.Time]:"TIME:",
		[STRINGS_KEY.Level]:"LEVEL:",
		[STRINGS_KEY.Level1]:"Tiger",
		[STRINGS_KEY.Level2]:"Crane",
		[STRINGS_KEY.Level3]:"Leopard",
		[STRINGS_KEY.Level4]:"Snake",
		[STRINGS_KEY.Level5]:"Dragon",
		[STRINGS_KEY.BeltWhite]:"White",
		[STRINGS_KEY.BeltYellow]:"Yellow",
		[STRINGS_KEY.BeltTan]:"Tan",
		[STRINGS_KEY.BeltBrown]:"Brown",
		[STRINGS_KEY.BeltRed]:"Red",
		[STRINGS_KEY.BeltBlack]:"Black",
		[STRINGS_KEY.MaxHealth]:"Max Health",
		[STRINGS_KEY.StartBelt]:"Start Belt",
		[STRINGS_KEY.StartLevel]:"Start Level",
		[STRINGS_KEY.HelpScreenContents]:"[ARROWS or WASD] Move\n[UP or C] Jump\n[G or X] Punch\n[H or X] Kick\n[V] Block\n[P] Pause\n[Esc] Menu",
		[STRINGS_KEY.HowToDash]:"[SPACE] to Dash back from rivals",
		[STRINGS_KEY.HowToSweep]:"Kick while Crouching to Leg Sweep rivals",
		[STRINGS_KEY.HowToJ_Kick]:"Kick while Jumping to Jump Kick",
		[STRINGS_KEY.HowToH_Kick]:"Kick while Dashing to Helicopter Kick",
		[STRINGS_KEY.EndGameMessage]:"Congratulations! You have achieved\nenlightenment go forth\nand teach what you\nhave learned.",
		[STRINGS_KEY.Boss]:"Shīfù",//This refers to a Kung Fu Teacher or Master
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
		[STRINGS_KEY.Polish]:"Polski",
		[STRINGS_KEY.EnterToReturn]:"Presiona [Enter] para Regresar",
		[STRINGS_KEY.HowToPlay]:"Cómo Jugar",
		[STRINGS_KEY.Muted]:"Silenciado",
		[STRINGS_KEY.Back]:"[ESC] Retroceder",
		[STRINGS_KEY.HelpScreenTitle]:"[HELP]",
		[STRINGS_KEY.HelpScreenContents]:"",
		[STRINGS_KEY.SettingsScreenTitle]:"[SETTINGS]",
		[STRINGS_KEY.CreditsScreenTitle]:"[CREDITS]",

		[STRINGS_KEY.Score]:"SCORE:",
		[STRINGS_KEY.Health]:"HEALTH:",
		[STRINGS_KEY.Time]:"TIME:",
		[STRINGS_KEY.Level]:"LEVEL:",
		[STRINGS_KEY.Level1]:"Tiger",
		[STRINGS_KEY.Level2]:"Crane",
		[STRINGS_KEY.Level3]:"Leopard",
		[STRINGS_KEY.Level4]:"Snake",
		[STRINGS_KEY.Level5]:"Dragon",
		[STRINGS_KEY.HelpScreenContents]:"[ARROWS] Move\n[UP or C] Jump\n[G or X] Punch\n[H or X] Kick\n[V] Block\n[P] Pause\n[Esc] Menu",
		[STRINGS_KEY.Resume]:"[ESC] Resume",
		[STRINGS_KEY.Controls]:"[C] Controls",
		[STRINGS_KEY.Quit]:"[Q] Quit",
		[STRINGS_KEY.Continue]:"[C] Continue",		
		[STRINGS_KEY.End]:"[E] End",
		[STRINGS_KEY.GameOverTitle]:"GAME OVER",
		[STRINGS_KEY.HighScore]:"HIGH SCORE:",
		[STRINGS_KEY.Done]:"Done",
		[STRINGS_KEY.HowToDash]:"[SPACE] to Dash back from rivals",
		[STRINGS_KEY.HowToSweep]:"Kick while Crouching to Leg Sweep rivals",
		[STRINGS_KEY.HowToJ_Kick]:"Kick while Jumping to Jump Kick",
		[STRINGS_KEY.HowToH_Kick]:"Kick while Dashing to Helicopter Kick",
		[STRINGS_KEY.EndGameMessage]:"Congratulations! You have achieved\nenlightenment go forth\nand teach what you\nhave learned.",
		[STRINGS_KEY.Boss]:"Shīfù",//This refers to a Kung Fu Teacher or Master
		[STRINGS_KEY.AssistSceneTitle]:"ASSIST MODE",
		[STRINGS_KEY.Assist]:"[Z] for Assist Mode",
		[STRINGS_KEY.BeltWhite]:"White",
		[STRINGS_KEY.BeltYellow]:"Yellow",
		[STRINGS_KEY.BeltTan]:"Tan",
		[STRINGS_KEY.BeltBrown]:"Brown",
		[STRINGS_KEY.BeltRed]:"Red",
		[STRINGS_KEY.BeltBlack]:"Black",
		[STRINGS_KEY.MaxHealth]:"Max Health",
		[STRINGS_KEY.StartBelt]:"Start Belt",
		[STRINGS_KEY.StartLevel]:"Start Level"
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
		// see https://twitter.com/McFunkypants/status/1172283461559734272
		[STRINGS_KEY.Subtitle]:"ぶげいでん", //"武芸伝", alternately: 武伝 or 武道伝説 or 武芸伝　（ぶげいでん）
		[STRINGS_KEY.English]:"English",
		[STRINGS_KEY.Spanish]:"Español",
		[STRINGS_KEY.Japanese]:"にほんご",
		[STRINGS_KEY.French]:"Français",
		[STRINGS_KEY.Russian]:"Русский",
		[STRINGS_KEY.Polish]:"Polski",
		[STRINGS_KEY.EnterToReturn]:"Press [ENTER] to Return",
		[STRINGS_KEY.HowToPlay]:"あそびかた",
		[STRINGS_KEY.Muted]:"ミュート",
		[STRINGS_KEY.Back]:"[ESC] まえのがめんにもどす",
		[STRINGS_KEY.HelpScreenTitle]:"てつだい",
		[STRINGS_KEY.HelpScreenContents]:"",
		[STRINGS_KEY.SettingsScreenTitle]:"せってい",
		[STRINGS_KEY.CreditsScreenTitle]:"クレジット",
		[STRINGS_KEY.Score]:"とくてん:",
		[STRINGS_KEY.Health]:"けんこ:",
		[STRINGS_KEY.Time]:"じかん:",
		[STRINGS_KEY.Level]:"レーベル:",
		[STRINGS_KEY.Level1]:"トラ",
		[STRINGS_KEY.Level2]:"つる",
		[STRINGS_KEY.Level3]:"ヒョウ",
		[STRINGS_KEY.Level4]:"ヘビ",
		[STRINGS_KEY.Level5]:"りゅう",
		[STRINGS_KEY.HelpScreenContents]:"[ARROWS] うごく\n[UP or C] ジャンプ\n[G or X] パンチ\n[H or X] キック\n[V] ブロック\n[P] ポーズ\n[Esc] メニュー",
		[STRINGS_KEY.Resume]:"[ESC] つづく",
		[STRINGS_KEY.Controls]:"[C] コントロール",
		[STRINGS_KEY.Quit]:"[Q] ゲームをやめる",

		[STRINGS_KEY.Continue]:"[C] やりなおす",		
		[STRINGS_KEY.End]:"[E] おわり",
		[STRINGS_KEY.GameOverTitle]:"GAME OVER",
		[STRINGS_KEY.HighScore]:"HIGH SCORE:",
		[STRINGS_KEY.Done]:"かんりょう",
		[STRINGS_KEY.HowToDash]:"[SPACE] to Dash back from rivals",
		[STRINGS_KEY.HowToSweep]:"Kick while Crouching to Leg Sweep rivals",
		[STRINGS_KEY.HowToJ_Kick]:"Kick while Jumping to Jump Kick",
		[STRINGS_KEY.HowToH_Kick]:"Kick while Dashing to Helicopter Kick",
		[STRINGS_KEY.EndGameMessage]:"Congratulations! You have achieved\nenlightenment go forth\nand teach what you\nhave learned.",
		[STRINGS_KEY.Boss]:"Shīfù",//This refers to a Kung Fu Teacher or Master
		[STRINGS_KEY.AssistSceneTitle]:"ASSIST MODE",
		[STRINGS_KEY.Assist]:"[Z] for Assist Mode",
		[STRINGS_KEY.BeltWhite]:"White",
		[STRINGS_KEY.BeltYellow]:"Yellow",
		[STRINGS_KEY.BeltTan]:"Tan",
		[STRINGS_KEY.BeltBrown]:"Brown",
		[STRINGS_KEY.BeltRed]:"Red",
		[STRINGS_KEY.BeltBlack]:"Black",
		[STRINGS_KEY.MaxHealth]:"Max Health",
		[STRINGS_KEY.StartBelt]:"Start Belt",
		[STRINGS_KEY.StartLevel]:"Start Level"
	},

	French: {
		[STRINGS_KEY.Help]:"[H] Aide",
		[STRINGS_KEY.Credits]:"[C] Crédits",
		[STRINGS_KEY.Settings]:"[S] Options",
		[STRINGS_KEY.Play]:"[SPACE] Jouer",
		[STRINGS_KEY.MusicVolume]:"Volume de la musique",
		[STRINGS_KEY.SFXVolume]:"Volume des effets sonores",
		[STRINGS_KEY.Loading]:"CHARGEMENT...",
		[STRINGS_KEY.Paused]:"- P A U S E -",
		[STRINGS_KEY.Title]:"Kung Twu",
		[STRINGS_KEY.Subtitle]:"Un Conte D'Arts Martiaux",
		[STRINGS_KEY.English]:"English",
		[STRINGS_KEY.Spanish]:"Español",
		[STRINGS_KEY.Japanese]:"にほんご",
		[STRINGS_KEY.French]:"Français",
		[STRINGS_KEY.Russian]:"Русский",
		[STRINGS_KEY.Polish]:"Polski",
		[STRINGS_KEY.EnterToReturn]:"Appuyez sur [ENTER] pour revenir",
		[STRINGS_KEY.HowToPlay]:"Comment Jouer",
		[STRINGS_KEY.Muted]:"Mode Silencieux",
		[STRINGS_KEY.Back]:"[ESC] Retour",
		[STRINGS_KEY.HelpScreenTitle]:"AIDE",
		[STRINGS_KEY.HelpScreenContents]:"",
		[STRINGS_KEY.SettingsScreenTitle]:"OPTIONS",
		[STRINGS_KEY.CreditsScreenTitle]:"CRÉDITS",

		[STRINGS_KEY.Score]:"SCORE:",
		[STRINGS_KEY.Health]:"HEALTH:",
		[STRINGS_KEY.Time]:"TIME:",
		[STRINGS_KEY.Level]:"LEVEL:",
		[STRINGS_KEY.Level1]:"Tiger",
		[STRINGS_KEY.Level2]:"Crane",
		[STRINGS_KEY.Level3]:"Leopard",
		[STRINGS_KEY.Level4]:"Snake",
		[STRINGS_KEY.Level5]:"Dragon",
		[STRINGS_KEY.HelpScreenContents]:"[ARROWS] Move\n[UP or C] Jump\n[G or X] Punch\n[H or X] Kick\n[V] Block\n[P] Pause\n[Esc] Menu",
		[STRINGS_KEY.Resume]:"[ESC] Resume",
		[STRINGS_KEY.Controls]:"[C] Controls",
		[STRINGS_KEY.Quit]:"[Q] Quit",
		[STRINGS_KEY.Continue]:"[C] Continue",		
		[STRINGS_KEY.End]:"[E] End",
		[STRINGS_KEY.GameOverTitle]:"GAME OVER",
		[STRINGS_KEY.HighScore]:"HIGH SCORE:",
		[STRINGS_KEY.Done]:"Done",
		[STRINGS_KEY.HowToDash]:"[SPACE] to Dash back from rivals",
		[STRINGS_KEY.HowToSweep]:"Kick while Crouching to Leg Sweep rivals",
		[STRINGS_KEY.HowToJ_Kick]:"Kick while Jumping to Jump Kick",
		[STRINGS_KEY.HowToH_Kick]:"Kick while Dashing to Helicopter Kick",
		[STRINGS_KEY.EndGameMessage]:"Congratulations! You have achieved\nenlightenment go forth\nand teach what you\nhave learned.",
		[STRINGS_KEY.Boss]:"Shīfù",//This refers to a Kung Fu Teacher or Master
		[STRINGS_KEY.AssistSceneTitle]:"ASSIST MODE",
		[STRINGS_KEY.Assist]:"[Z] for Assist Mode",
		[STRINGS_KEY.BeltWhite]:"White",
		[STRINGS_KEY.BeltYellow]:"Yellow",
		[STRINGS_KEY.BeltTan]:"Tan",
		[STRINGS_KEY.BeltBrown]:"Brown",
		[STRINGS_KEY.BeltRed]:"Red",
		[STRINGS_KEY.BeltBlack]:"Black",
		[STRINGS_KEY.MaxHealth]:"Max Health",
		[STRINGS_KEY.StartBelt]:"Start Belt",
		[STRINGS_KEY.StartLevel]:"Start Level"
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
		[STRINGS_KEY.Polish]:"Polski",
		[STRINGS_KEY.EnterToReturn]:"Нажмите [ENTER], чтобы вернуться назад",
		[STRINGS_KEY.HowToPlay]:"Как играть",
		[STRINGS_KEY.Muted]:"Без звука",
		[STRINGS_KEY.Back]:"[ESC] Вернуться",
		[STRINGS_KEY.HelpScreenTitle]:"ПОМОЩЬ",
		[STRINGS_KEY.HelpScreenContents]:"",
		[STRINGS_KEY.SettingsScreenTitle]:"ОПЦИИ",
		[STRINGS_KEY.CreditsScreenTitle]:"ТИТРЫ",

		[STRINGS_KEY.Score]:"SCORE:",
		[STRINGS_KEY.Health]:"HEALTH:",
		[STRINGS_KEY.Time]:"TIME:",
		[STRINGS_KEY.Level]:"LEVEL:",
		[STRINGS_KEY.Level1]:"Tiger",
		[STRINGS_KEY.Level2]:"Crane",
		[STRINGS_KEY.Level3]:"Leopard",
		[STRINGS_KEY.Level4]:"Snake",
		[STRINGS_KEY.Level5]:"Dragon",
		[STRINGS_KEY.HelpScreenContents]:"[ARROWS] Move\n[UP or C] Jump\n[G or X] Punch\n[H or X] Kick\n[V] Block\n[P] Pause\n[Esc] Menu",
		[STRINGS_KEY.Resume]:"[ESC] Resume",
		[STRINGS_KEY.Controls]:"[C] Controls",
		[STRINGS_KEY.Quit]:"[Q] Quit",
		[STRINGS_KEY.Continue]:"[C] Continue",		
		[STRINGS_KEY.End]:"[E] End",
		[STRINGS_KEY.GameOverTitle]:"GAME OVER",
		[STRINGS_KEY.HighScore]:"HIGH SCORE:",
		[STRINGS_KEY.Done]:"Done",
		[STRINGS_KEY.HowToDash]:"[SPACE] to Dash back from rivals",
		[STRINGS_KEY.HowToSweep]:"Kick while Crouching to Leg Sweep rivals",
		[STRINGS_KEY.HowToJ_Kick]:"Kick while Jumping to Jump Kick",
		[STRINGS_KEY.HowToH_Kick]:"Kick while Dashing to Helicopter Kick",
		[STRINGS_KEY.EndGameMessage]:"Congratulations! You have achieved\nenlightenment go forth\nand teach what you\nhave learned.",
		[STRINGS_KEY.Boss]:"Shīfù",//This refers to a Kung Fu Teacher or Master
		[STRINGS_KEY.AssistSceneTitle]:"ASSIST MODE",
		[STRINGS_KEY.Assist]:"[Z] for Assist Mode",
		[STRINGS_KEY.BeltWhite]:"White",
		[STRINGS_KEY.BeltYellow]:"Yellow",
		[STRINGS_KEY.BeltTan]:"Tan",
		[STRINGS_KEY.BeltBrown]:"Brown",
		[STRINGS_KEY.BeltRed]:"Red",
		[STRINGS_KEY.BeltBlack]:"Black",
		[STRINGS_KEY.MaxHealth]:"Max Health",
		[STRINGS_KEY.StartBelt]:"Start Belt",
		[STRINGS_KEY.StartLevel]:"Start Level"
	},
	
	Polish: {
		[STRINGS_KEY.Help]:"[H] Pomoc",
		[STRINGS_KEY.Credits]:"[C] O autorach",
		[STRINGS_KEY.Settings]:"[S] Ustawienia",
		[STRINGS_KEY.Play]:"[SPACE] Start",
		[STRINGS_KEY.MusicVolume]:"Głośność muzyki",
		[STRINGS_KEY.SFXVolume]:"Głośność dźwięków",
		[STRINGS_KEY.Loading]:"ŁADOWANIE...",
		[STRINGS_KEY.Paused]:"- P A U Z A -",
		[STRINGS_KEY.Controls]:"[C] Sterowanie",
		[STRINGS_KEY.Quit]:"[Q] Wyjdź",
		[STRINGS_KEY.Continue]:"[C] Kontynuuj",		
		[STRINGS_KEY.End]:"[E] Koniec",
		[STRINGS_KEY.Title]:"Kung Twu",
		[STRINGS_KEY.Subtitle]:"Opowieść o Sztukach Walki",
		[STRINGS_KEY.English]:"English",
		[STRINGS_KEY.Spanish]:"Español",
		[STRINGS_KEY.French]:"Français",
		[STRINGS_KEY.Japanese]:"にほんご",
		[STRINGS_KEY.Russian]:"Русский",
		[STRINGS_KEY.Polish]:"Polski",
		[STRINGS_KEY.EnterToReturn]:"Naciśnij [ENTER] aby powrócić",
		[STRINGS_KEY.HowToPlay]:"Jak grać",
		[STRINGS_KEY.Muted]:"Wyciszony",
		[STRINGS_KEY.Back]:"[ESC] Wstecz",
		[STRINGS_KEY.Resume]:"[ESC] Kontynuuj",
		[STRINGS_KEY.HelpScreenTitle]:"POMOC",
		[STRINGS_KEY.SettingsScreenTitle]:"USTAWIENIA",
		[STRINGS_KEY.CreditsScreenTitle]:"O AUTORACH",
		[STRINGS_KEY.GameOverTitle]:"KONIEC GRY",
		[STRINGS_KEY.HighScore]:"NAJLEPSZE WYNIKI:",
		[STRINGS_KEY.Score]:"PUNKTY:",
		[STRINGS_KEY.Health]:"ŻYCIE:",
		[STRINGS_KEY.Time]:"CZAS:",
		[STRINGS_KEY.Level]:"POZIOM:",
		[STRINGS_KEY.Level1]:"Tygrys",
		[STRINGS_KEY.Level2]:"Żuraw",
		[STRINGS_KEY.Level3]:"Leopard",
		[STRINGS_KEY.Level4]:"Wąż",
		[STRINGS_KEY.Level5]:"Smok",
		[STRINGS_KEY.HelpScreenContents]:"[STRZAŁKI lub WASD] Poruszanie\n[DO GÓRY lub C] Skok\n[G lub X] Cios\n[H lub X] Kopnięcie\n[V] Blok\n[P] Pauza\n[Esc] Menu",
		[STRINGS_KEY.Done]:"Koniec",
		[STRINGS_KEY.HowToDash]:"Naciśnij [SPACE] aby Odskoczyć od rywali",
		[STRINGS_KEY.HowToSweep]:"Użyj Kopnięcia w trakcie Kucnięcia aby Podciąć rywali",
		[STRINGS_KEY.HowToJ_Kick]:"Użyj Kopnięcia w trakcie Skoku aby wykonać Kopnięcie z Wyskoku",
		[STRINGS_KEY.HowToH_Kick]:"Użyj Kopnięcia w trakcie Odskoku aby wykonać Obrotowe Kopnięcie",
		[STRINGS_KEY.EndGameMessage]:"Gratulacje! Osiągnąłeś oświecenie\nidź teraz i nauczaj\nco sam się\nwłaśnie nauczyłeś.",
		[STRINGS_KEY.Boss]:"Shīfù",//This refers to a Kung Fu Teacher or Master
		[STRINGS_KEY.AssistSceneTitle]:"TRYB ASYSTY",
		[STRINGS_KEY.Assist]:"[Z] Tryb Asysty",
		[STRINGS_KEY.BeltWhite]:"Biały",
		[STRINGS_KEY.BeltYellow]:"Żółty",
		[STRINGS_KEY.BeltTan]:"Jasnobrązowy",
		[STRINGS_KEY.BeltBrown]:"Brązowy",
		[STRINGS_KEY.BeltRed]:"Czerwony",
		[STRINGS_KEY.BeltBlack]:"Czarny",
		[STRINGS_KEY.MaxHealth]:"Maksymalne Życie",
		[STRINGS_KEY.StartBelt]:"Początkowy Pas",
		[STRINGS_KEY.StartLevel]:"Początkowy Poziom"
	}
};