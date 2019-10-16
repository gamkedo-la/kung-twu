const AudioBus = {
	SFX: "SFX",
	MUSIC: "MUSIC",
	NONE: "NONE"
}; Object.freeze(AudioBus);

const soundSpriteConfigs = [
		{
			key: "1_UP",
			filepath: "../../audio/1_UP",
			baseVolume: .5,
			audioBus: AudioBus.SFX,
			isLoop: false,
			maxInstances: 2,
			fadeOutTime: 0
		},
		{
			key: "TitleBGM",
			filepath: "../../audio/gameplayMusicV1",
			baseVolume: .5,
			audioBus: AudioBus.MUSIC,
			isLoop: true,
			maxInstances: 2,
			fadeOutTime: 1.5
		},		
		{
			key: "LevelBGM",
			filepath: "../../audio/DragonPulse",
			baseVolume: .5,
			audioBus: AudioBus.MUSIC,
			isLoop: true,
			maxInstances: 2,
			fadeOutTime: 1.5
		}
	];

const sounds = new SoundManager();

sounds.addSounds(soundSpriteConfigs);
