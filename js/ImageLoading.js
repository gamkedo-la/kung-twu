//Image Loading
let shouldShowStartImage = false;
let finishedLoading = false;

function showStartImage() {
	if(shouldShowStartImage) {
		canvasContext.drawImage(startImagePic, 0, 0);
		loadingDoneSoStartGame();
	} else {
		shouldShowStartImage = true;
	}

}

//-----Load the Gamkedo Logo-----//
const HTGDLogoPic = document.createElement("img");
function loadGamkedoLogo() {
	HTGDLogoPic.onload = function() {
		//Begin loading the Start Image
		loadStartImagePic();

		//Show the HTGD Logo Image for 1 second
		setTimeout(function() {
			kenBurnsAffect();
		}, 25);
	};

	HTGDLogoPic.src = assetPath.Image + "HTGDLogo.png";
}

let kenBurns = 0;
function kenBurnsAffect() {
	kenBurns++;
	if(kenBurns < 40) {
		setTimeout(function() {
			kenBurnsAffect();
		}, 25);
		canvasContext.drawImage(HTGDLogoPic,
			0, 0, HTGDLogoPic.width, HTGDLogoPic.height,
			-kenBurns, -kenBurns, HTGDLogoPic.width + (2 * kenBurns), HTGDLogoPic.height + (2 * kenBurns));
	} else {
		setTimeout(function() {
			showStartImage();
		}, 25);
	}
}

//-----Load the title screen image-----//
const startImagePic = document.createElement("img");
function loadStartImagePic() {
	startImagePic.onload = function() {
		//Show the Start Image if ready
		showStartImage();

		//Begin Loading remaining images
		loadImages();
	};

	startImagePic.src = assetPath.Image + "title_screen_bg.png";
}

//-----Load the rest of the game images----//
const titleScreenBG = document.createElement("img");
const titleImage = document.createElement("img");
const titleScreenDecore = document.createElement("img");
const titleBlock = document.createElement("img");
const titleScreenBird = document.createElement("img");
const selector = document.createElement("img");
const uiScreenBg = document.createElement("img");
const uiBorder = document.createElement("img");
const windowedWall = document.createElement("img");
const tiledWallScroll = document.createElement("img");
const wallScrollTiger = document.createElement("img");
const wallScrollCrane = document.createElement("img");
const wallScrollSnake = document.createElement("img");
const wallScrollLeopard = document.createElement("img");
const wallScrollDragon = document.createElement("img");
const tiledWall = document.createElement("img");
const tempRightWall = document.createElement("img");
const wallGradient = document.createElement("img");
const jpFontImg = document.createElement("img");
const roofTileTop = document.createElement("img");
const roofboardSheet = document.createElement("img");
const roofTileBottom = document.createElement("img");
const floorboardSheet = document.createElement("img");
const lvl1Column = document.createElement("img");
const lvl2Column = document.createElement("img");
const lvl3Column = document.createElement("img");
const lvl4Column = document.createElement("img");
const yellowPresentation = document.createElement("img");
const tanPresentation = document.createElement("img");
const brownPresentation = document.createElement("img");
const redPresentation = document.createElement("img");
const blackPresentation = document.createElement("img");

const characterAtlas = document.createElement("img");
const bossAtlas = document.createElement("img");

const basicEnemyIdle = document.createElement("canvas");
const basicEnemyWalk = document.createElement("canvas");
const basicEnemyKick = document.createElement("canvas");
const basicEnemyPunch = document.createElement("canvas");
const basicEnemyCrouch = document.createElement("canvas");
const basicEnemyDash = document.createElement("canvas");
const basicEnemyJump = document.createElement("canvas");
const basicEnemyBlock = document.createElement("canvas");
const basicEnemyKnockback = document.createElement("canvas");
const basicEnemySweep = document.createElement("canvas");

const yellowEnemyIdle = document.createElement("canvas");
const yellowEnemyWalk = document.createElement("canvas");
const yellowEnemyKick = document.createElement("canvas");
const yellowEnemyPunch = document.createElement("canvas");
const yellowEnemyCrouch = document.createElement("canvas");
const yellowEnemyDash = document.createElement("canvas");
const yellowEnemyJump = document.createElement("canvas");
const yellowEnemyBlock = document.createElement("canvas");
const yellowEnemyKnockback = document.createElement("canvas");
const yellowEnemySweep = document.createElement("canvas");

const tanEnemyIdle = document.createElement("canvas");
const tanEnemyWalk = document.createElement("canvas");
const tanEnemyKick = document.createElement("canvas");
const tanEnemyPunch = document.createElement("canvas");
const tanEnemyCrouch = document.createElement("canvas");
const tanEnemyDash = document.createElement("canvas");
const tanEnemyJump = document.createElement("canvas");
const tanEnemyBlock = document.createElement("canvas");
const tanEnemyKnockback = document.createElement("canvas");
const tanEnemySweep = document.createElement("canvas");

const brownEnemyIdle = document.createElement("canvas");
const brownEnemyWalk = document.createElement("canvas");
const brownEnemyKick = document.createElement("canvas");
const brownEnemyPunch = document.createElement("canvas");
const brownEnemyCrouch = document.createElement("canvas");
const brownEnemyDash = document.createElement("canvas");
const brownEnemyJump = document.createElement("canvas");
const brownEnemyBlock = document.createElement("canvas");
const brownEnemyKnockback = document.createElement("canvas");
const brownEnemySweep = document.createElement("canvas");

const redEnemyIdle = document.createElement("canvas");
const redEnemyWalk = document.createElement("canvas");
const redEnemyKick = document.createElement("canvas");
const redEnemyPunch = document.createElement("canvas");
const redEnemyCrouch = document.createElement("canvas");
const redEnemyDash = document.createElement("canvas");
const redEnemyJump = document.createElement("canvas");
const redEnemyBlock = document.createElement("canvas");
const redEnemyKnockback = document.createElement("canvas");
const redEnemySweep = document.createElement("canvas");

const yellowBossIdle = document.createElement("canvas");
const yellowBossWalk = document.createElement("canvas");
const yellowBossPunch = document.createElement("canvas");
const yellowBossKick = document.createElement("canvas");
const yellowBossCrouch = document.createElement("canvas");
const yellowBossCrouchPunch = document.createElement("canvas");
const yellowBossSweep = document.createElement("canvas");
const yellowBossJump = document.createElement("canvas");

const tanBossIdle = document.createElement("canvas");
const tanBossWalk = document.createElement("canvas");
const tanBossPunch = document.createElement("canvas");
const tanBossKick = document.createElement("canvas");
const tanBossCrouch = document.createElement("canvas");
const tanBossCrouchPunch = document.createElement("canvas");
const tanBossSweep = document.createElement("canvas");
const tanBossJump = document.createElement("canvas");

const brownBossIdle = document.createElement("canvas");
const brownBossWalk = document.createElement("canvas");
const brownBossPunch = document.createElement("canvas");
const brownBossKick = document.createElement("canvas");
const brownBossCrouch = document.createElement("canvas");
const brownBossCrouchPunch = document.createElement("canvas");
const brownBossSweep = document.createElement("canvas");
const brownBossJump = document.createElement("canvas");

const redBossIdle = document.createElement("canvas");
const redBossWalk = document.createElement("canvas");
const redBossPunch = document.createElement("canvas");
const redBossKick = document.createElement("canvas");
const redBossCrouch = document.createElement("canvas");
const redBossCrouchPunch = document.createElement("canvas");
const redBossSweep = document.createElement("canvas");
const redBossJump = document.createElement("canvas");

const blackBossIdle = document.createElement("canvas");
const blackBossWalk = document.createElement("canvas");
const blackBossPunch = document.createElement("canvas");
const blackBossKick = document.createElement("canvas");
const blackBossCrouch = document.createElement("canvas");
const blackBossCrouchPunch = document.createElement("canvas");
const blackBossSweep = document.createElement("canvas");
const blackBossJump = document.createElement("canvas");

const playerIdleWhite = document.createElement("canvas");
const playerIdleYellow = document.createElement("canvas");
const playerIdleTan = document.createElement("canvas");
const playerIdleBrown = document.createElement("canvas");
const playerIdleRed = document.createElement("canvas");
const playerIdleBlack = document.createElement("canvas");

const playerWalkWhite = document.createElement("canvas");
const playerWalkYellow = document.createElement("canvas");
const playerWalkTan = document.createElement("canvas");
const playerWalkBrown = document.createElement("canvas");
const playerWalkRed = document.createElement("canvas");
const playerWalkBlack = document.createElement("canvas");

const playerWalkBack = document.createElement("img");

const playerPunchWhite = document.createElement("canvas");
const playerPunchYellow = document.createElement("canvas");
const playerPunchTan = document.createElement("canvas");
const playerPunchBrown = document.createElement("canvas");
const playerPunchRed = document.createElement("canvas");
const playerPunchBlack = document.createElement("canvas");

const playerKickWhite = document.createElement("canvas");
const playerKickYellow = document.createElement("canvas");
const playerKickTan = document.createElement("canvas");
const playerKickBrown = document.createElement("canvas");
const playerKickRed = document.createElement("canvas");
const playerKickBlack = document.createElement("canvas");

const playerKnockbackWhite = document.createElement("canvas");
const playerKnockbackYellow = document.createElement("canvas");
const playerKnockbackTan = document.createElement("canvas");
const playerKnockbackBrown = document.createElement("canvas");
const playerKnockbackRed = document.createElement("canvas");
const playerKnockbackBlack = document.createElement("canvas");


const smokeSprite = document.createElement("img");
const starSprite = document.createElement("img");
const wooshPunchPic = document.createElement("img");
const wooshKickPic = document.createElement("img");
const wooshKickPic2 = document.createElement("img");
const wooshHurtPic = document.createElement("img");
const wooshKnockoutPic = document.createElement("img");

const wooshDashPlayerPic = document.createElement("canvas");
const wooshDashPlayerLPic = document.createElement("canvas");

const wooshDashEnemyPic = document.createElement("img");

const wooshDashEnemyLPic = document.createElement("img");
const decorationSpritesheet = document.createElement("img");
const waterfallSheet = document.createElement("img");
const lamp = document.createElement("img");
const temple = document.createElement("img");
const templeDark = document.createElement("img");
const table = document.createElement("img");
const rock = document.createElement("img");
const statue = document.createElement("img");
const spear = document.createElement("img");
const bambooDark = document.createElement("img");
const bambooLight = document.createElement("img");
const tree = document.createElement("img");
const carpet = document.createElement("img");
const carpet2 = document.createElement("img");
const painting = document.createElement("img");

const leftMoveSprite = document.createElement("img");
const rightMoveSprite = document.createElement("img");
const jumpSprite = document.createElement("img");
const punchSprite = document.createElement("img");
const kickSprite = document.createElement("img");
const crouchSprite = document.createElement("img");
const dashSprite = document.createElement("img");
const hourglassSprite = document.createElement("img");

let picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
	picsToLoad--;
	if (picsToLoad == 0) { // last image loaded?
		initializeCanvasFromAtlas(playerIdleWhite, playerIdleWhiteData, characterAtlas);
		initializeCanvasFromAtlas(playerWalkWhite, playerWalkWhiteData, characterAtlas);
		initializeCanvasFromAtlas(playerKickWhite, playerKickWhiteData, characterAtlas);
		initializeCanvasFromAtlas(playerPunchWhite, playerPunchWhiteData, characterAtlas);
		initializeCanvasFromAtlas(playerKnockbackWhite, playerKnockbackWhiteData, characterAtlas);

		initializeCanvasFromAtlas(playerIdleYellow, playerIdleYellowData, characterAtlas);
		initializeCanvasFromAtlas(playerWalkYellow, playerWalkYellowData, characterAtlas);
		initializeCanvasFromAtlas(playerKickYellow, playerKickYellowData, characterAtlas);
		initializeCanvasFromAtlas(playerPunchYellow, playerPunchYellowData, characterAtlas);
		initializeCanvasFromAtlas(playerKnockbackYellow, playerKnockbackYellowData, characterAtlas);

		initializeCanvasFromAtlas(playerIdleTan, playerIdleTanData, characterAtlas);
		initializeCanvasFromAtlas(playerWalkTan, playerWalkTanData, characterAtlas);
		initializeCanvasFromAtlas(playerKickTan, playerKickTanData, characterAtlas);
		initializeCanvasFromAtlas(playerPunchTan, playerPunchTanData, characterAtlas);
		initializeCanvasFromAtlas(playerKnockbackTan, playerKnockbackTanData, characterAtlas);

		initializeCanvasFromAtlas(playerIdleBrown, playerIdleBrownData, characterAtlas);
		initializeCanvasFromAtlas(playerWalkBrown, playerWalkBrownData, characterAtlas);
		initializeCanvasFromAtlas(playerKickBrown, playerKickBrownData, characterAtlas);
		initializeCanvasFromAtlas(playerPunchBrown, playerPunchBrownData, characterAtlas);
		initializeCanvasFromAtlas(playerKnockbackBrown, playerKnockbackBrownData, characterAtlas);

		initializeCanvasFromAtlas(playerIdleRed, playerIdleRedData, characterAtlas);
		initializeCanvasFromAtlas(playerWalkRed, playerWalkRedData, characterAtlas);
		initializeCanvasFromAtlas(playerKickRed, playerKickRedData, characterAtlas);
		initializeCanvasFromAtlas(playerPunchRed, playerPunchRedData, characterAtlas);
		initializeCanvasFromAtlas(playerKnockbackRed, playerKnockbackRedData, characterAtlas);

		initializeCanvasFromAtlas(playerIdleBlack, playerIdleBlackData, characterAtlas);
		initializeCanvasFromAtlas(playerWalkBlack, playerWalkBlackData, characterAtlas);
		initializeCanvasFromAtlas(playerKickBlack, playerKickBlackData, characterAtlas);
		initializeCanvasFromAtlas(playerPunchBlack, playerPunchBlackData, characterAtlas);
		initializeCanvasFromAtlas(playerKnockbackBlack, playerKnockbackBlackData, characterAtlas);

		initializeCanvasFromAtlas(basicEnemyIdle, basicEnemyIdleData, characterAtlas);
		initializeCanvasFromAtlas(basicEnemyWalk, basicEnemyWalkData, characterAtlas);
		initializeCanvasFromAtlas(basicEnemyKick, basicEnemyKickData, characterAtlas);
		initializeCanvasFromAtlas(basicEnemyPunch, basicEnemyPunchData, characterAtlas);
		initializeCanvasFromAtlas(basicEnemyCrouch, basicEnemyCrouchData, characterAtlas);
		initializeCanvasFromAtlas(basicEnemyDash, basicEnemyDashData, characterAtlas);
		initializeCanvasFromAtlas(basicEnemyJump, basicEnemyJumpData, characterAtlas);
		initializeCanvasFromAtlas(basicEnemyBlock, basicEnemyBlockData, characterAtlas);
		initializeCanvasFromAtlas(basicEnemyKnockback, basicEnemyKnockbackData, characterAtlas);
		initializeCanvasFromAtlas(basicEnemySweep, basicEnemySweepData, characterAtlas);

		initializeCanvasFromAtlas(yellowEnemyIdle, yellowEnemyIdleData, characterAtlas);
		initializeCanvasFromAtlas(yellowEnemyWalk, yellowEnemyWalkData, characterAtlas);
		initializeCanvasFromAtlas(yellowEnemyKick, yellowEnemyKickData, characterAtlas);
		initializeCanvasFromAtlas(yellowEnemyPunch, yellowEnemyPunchData, characterAtlas);
		initializeCanvasFromAtlas(yellowEnemyCrouch, yellowEnemyCrouchData, characterAtlas);
		initializeCanvasFromAtlas(yellowEnemyDash, yellowEnemyDashData, characterAtlas);
		initializeCanvasFromAtlas(yellowEnemyJump, yellowEnemyJumpData, characterAtlas);
		initializeCanvasFromAtlas(yellowEnemyBlock, yellowEnemyBlockData, characterAtlas);
		initializeCanvasFromAtlas(yellowEnemyKnockback, yellowEnemyKnockbackData, characterAtlas);
		initializeCanvasFromAtlas(yellowEnemySweep, yellowEnemySweepData, characterAtlas);

		initializeCanvasFromAtlas(tanEnemyIdle, tanEnemyIdleData, characterAtlas);
		initializeCanvasFromAtlas(tanEnemyWalk, tanEnemyWalkData, characterAtlas);
		initializeCanvasFromAtlas(tanEnemyKick, tanEnemyKickData, characterAtlas);
		initializeCanvasFromAtlas(tanEnemyPunch, tanEnemyPunchData, characterAtlas);
		initializeCanvasFromAtlas(tanEnemyCrouch, tanEnemyCrouchData, characterAtlas);
		initializeCanvasFromAtlas(tanEnemyDash, tanEnemyDashData, characterAtlas);
		initializeCanvasFromAtlas(tanEnemyJump, tanEnemyJumpData, characterAtlas);
		initializeCanvasFromAtlas(tanEnemyBlock, tanEnemyBlockData, characterAtlas);
		initializeCanvasFromAtlas(tanEnemyKnockback, tanEnemyKnockbackData, characterAtlas);
		initializeCanvasFromAtlas(tanEnemySweep, tanEnemySweepData, characterAtlas);

		initializeCanvasFromAtlas(brownEnemyIdle, brownEnemyIdleData, characterAtlas);
		initializeCanvasFromAtlas(brownEnemyWalk, brownEnemyWalkData, characterAtlas);
		initializeCanvasFromAtlas(brownEnemyKick, brownEnemyKickData, characterAtlas);
		initializeCanvasFromAtlas(brownEnemyPunch, brownEnemyPunchData, characterAtlas);
		initializeCanvasFromAtlas(brownEnemyCrouch, brownEnemyCrouchData, characterAtlas);
		initializeCanvasFromAtlas(brownEnemyDash, brownEnemyDashData, characterAtlas);
		initializeCanvasFromAtlas(brownEnemyJump, brownEnemyJumpData, characterAtlas);
		initializeCanvasFromAtlas(brownEnemyBlock, brownEnemyBlockData, characterAtlas);
		initializeCanvasFromAtlas(brownEnemyKnockback, brownEnemyKnockbackData, characterAtlas);
		initializeCanvasFromAtlas(brownEnemySweep, brownEnemySweepData, characterAtlas);

		initializeCanvasFromAtlas(redEnemyIdle, redEnemyIdleData, characterAtlas);
		initializeCanvasFromAtlas(redEnemyWalk, redEnemyWalkData, characterAtlas);
		initializeCanvasFromAtlas(redEnemyKick, redEnemyKickData, characterAtlas);
		initializeCanvasFromAtlas(redEnemyPunch, redEnemyPunchData, characterAtlas);
		initializeCanvasFromAtlas(redEnemyCrouch, redEnemyCrouchData, characterAtlas);
		initializeCanvasFromAtlas(redEnemyDash, redEnemyDashData, characterAtlas);
		initializeCanvasFromAtlas(redEnemyJump, redEnemyJumpData, characterAtlas);
		initializeCanvasFromAtlas(redEnemyBlock, redEnemyBlockData, characterAtlas);
		initializeCanvasFromAtlas(redEnemyKnockback, redEnemyKnockbackData, characterAtlas);
		initializeCanvasFromAtlas(redEnemySweep, redEnemySweepData, characterAtlas);

		initializeCanvasFromAtlas(yellowBossIdle, yellowBossIdleData, bossAtlas);
		initializeCanvasFromAtlas(yellowBossWalk, yellowBossWalkData, bossAtlas);
		initializeCanvasFromAtlas(yellowBossKick, yellowBossKickData, bossAtlas);
		initializeCanvasFromAtlas(yellowBossPunch, yellowBossPunchData, bossAtlas);
		initializeCanvasFromAtlas(yellowBossCrouch, yellowBossCrouchData, bossAtlas);
		initializeCanvasFromAtlas(yellowBossSweep, yellowBossSweepData, bossAtlas);
		initializeCanvasFromAtlas(yellowBossJump, yellowBossJumpData, bossAtlas);

		initializeCanvasFromAtlas(tanBossIdle, tanBossIdleData, bossAtlas);
		initializeCanvasFromAtlas(tanBossWalk, tanBossWalkData, bossAtlas);
		initializeCanvasFromAtlas(tanBossKick, tanBossKickData, bossAtlas);
		initializeCanvasFromAtlas(tanBossPunch, tanBossPunchData, bossAtlas);
		initializeCanvasFromAtlas(tanBossCrouch, tanBossCrouchData, bossAtlas);
		initializeCanvasFromAtlas(tanBossSweep, tanBossSweepData, bossAtlas);
		initializeCanvasFromAtlas(tanBossJump, tanBossJumpData, bossAtlas);

		initializeCanvasFromAtlas(brownBossIdle, brownBossIdleData, bossAtlas);
		initializeCanvasFromAtlas(brownBossWalk, brownBossWalkData, bossAtlas);
		initializeCanvasFromAtlas(brownBossKick, brownBossKickData, bossAtlas);
		initializeCanvasFromAtlas(brownBossPunch, brownBossPunchData, bossAtlas);
		initializeCanvasFromAtlas(brownBossCrouch, brownBossCrouchData, bossAtlas);
		initializeCanvasFromAtlas(brownBossSweep, brownBossSweepData, bossAtlas);
		initializeCanvasFromAtlas(brownBossJump, brownBossJumpData, bossAtlas);

		initializeCanvasFromAtlas(redBossIdle, redBossIdleData, bossAtlas);
		initializeCanvasFromAtlas(redBossWalk, redBossWalkData, bossAtlas);
		initializeCanvasFromAtlas(redBossKick, redBossKickData, bossAtlas);
		initializeCanvasFromAtlas(redBossPunch, redBossPunchData, bossAtlas);
		initializeCanvasFromAtlas(redBossCrouch, redBossCrouchData, bossAtlas);
		initializeCanvasFromAtlas(redBossSweep, redBossSweepData, bossAtlas);
		initializeCanvasFromAtlas(redBossJump, redBossJumpData, bossAtlas);

		initializeCanvasFromAtlas(blackBossIdle, blackBossIdleData, bossAtlas);
		initializeCanvasFromAtlas(blackBossWalk, blackBossWalkData, bossAtlas);
		initializeCanvasFromAtlas(blackBossKick, blackBossKickData, bossAtlas);
		initializeCanvasFromAtlas(blackBossPunch, blackBossPunchData, bossAtlas);
		initializeCanvasFromAtlas(blackBossCrouch, blackBossCrouchData, bossAtlas);
		initializeCanvasFromAtlas(blackBossSweep, blackBossSweepData, bossAtlas);
		initializeCanvasFromAtlas(blackBossJump, blackBossJumpData, bossAtlas);

		initializeCanvasFromAtlas(wooshDashPlayerPic, wooshDashPlayerPicData, characterAtlas);
		initializeCanvasFromAtlas(wooshDashPlayerLPic, wooshDashPlayerLPicData, characterAtlas);


		loadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImageAndLaunchIfReady;
	imgVar.src = assetPath.Image + fileName;
}

function initializeCanvasFromAtlas(canvas, data, atlas) {
	canvas.width = data.clipWidth;
	canvas.height = data.clipHeight;
	const context = canvas.getContext("2d");
	context.drawImage(atlas, data.clipX, data.clipY, data.clipWidth, data.clipHeight, 0, 0, data.clipWidth, data.clipHeight);
}

function loadImages() {
	const imageList = [
		// enemies
		{ imgName: characterAtlas, theFile: "CharacterAtlas.png" },
		{ imgName: bossAtlas, theFile: "BossAtlas.png" },

		// backgrounds
		{ imgName: uiScreenBg, theFile: "UI_BG.png"},
		{ imgName: uiBorder, theFile: "UI_Border.png"},
		{ imgName: windowedWall, theFile: "TiledBackgroundWindow.png" },
		{ imgName: tiledWallScroll, theFile: "TiledBackgroundScroll.png" },
		{ imgName: wallScrollTiger, theFile: "TiledBackgroundScroll-Tiger.png" },
		{ imgName: wallScrollCrane, theFile: "TiledBackgroundScroll-Crane.png" },
		{ imgName: wallScrollSnake, theFile: "TiledBackgroundScroll-Snake.png" },
		{ imgName: wallScrollLeopard, theFile: "TiledBackgroundScroll-Leopard.png" },
		{ imgName: wallScrollDragon, theFile: "TiledBackgroundScroll-Dragon.png" },
		{ imgName: tiledWall, theFile: "TiledBackgroundWall.png" },
		{ imgName: tempRightWall, theFile: "TempRightWall.png" },
		{ imgName: roofTileTop, theFile: "RoofBricks.png" },
		{ imgName: roofTileBottom, theFile: "roof-tile-bottom.png" },
		{ imgName: roofboardSheet, theFile: "Roof-Frames.png" },
		{ imgName: floorboardSheet, theFile: "Floor-Frames.png" },
		{ imgName: lvl1Column, theFile: "column_01.png" },
		{ imgName: lvl2Column, theFile: "column_02.png" },
		{ imgName: lvl3Column, theFile: "column_03.png" },
		{ imgName: lvl4Column, theFile: "column_04.png" },
		{ imgName: yellowPresentation, theFile: "YellowBeltPresentation.png" },
		{ imgName: tanPresentation, theFile: "TanBeltPresentation.png" },
		{ imgName: brownPresentation, theFile: "BrownBeltPresentation.png" },
		{ imgName: redPresentation, theFile: "RedBeltPresentation.png" },
		{ imgName: blackPresentation, theFile: "BlackBeltPresentation.png" },
		{ imgName: titleScreenBG, theFile: "title_screen_bg.png"},
		{ imgName: titleImage, theFile: "title_screen_ktname.png"},
		{ imgName: titleScreenDecore, theFile: "title_screen_decor.png"},
		{ imgName: wallGradient, theFile: "wall-gradient.png"},
		{ imgName: decorationSpritesheet, theFile: "decorations.png"},
		{ imgName: waterfallSheet, theFile: "waterfallSheet.png"},
		{ imgName: lamp, theFile: "Lamp.png"},
		{ imgName: temple, theFile: "Temple.png"},
		{ imgName: templeDark, theFile: "TempleTweaked.png"},
		{ imgName: table, theFile: "table.png"},
		{ imgName: rock, theFile: "rock.png"},
		{ imgName: statue, theFile: "Statue.png"},
		{ imgName: spear, theFile: "spear2.png"},
		{ imgName: bambooDark, theFile: "BambooTall.png"},
		{ imgName: bambooLight, theFile: "BambooBrightTall.png"},
		{ imgName: tree, theFile: "Tree.png"},
		{ imgName: carpet, theFile: "carpet.png"},
		{ imgName: carpet2, theFile: "carpet_2.png"},
		{ imgName: painting, theFile: "Painting.png"},

		// player related
		{ imgName: playerWalkBack, theFile: "Player_Walk-Backwards_Condensed.png"},

		{ imgName: wooshPunchPic, theFile: "wooshPunch.png"},
		{ imgName: wooshKickPic, theFile: "wooshKick.png"},
		{ imgName: wooshKickPic2, theFile: "wooshKick2.png"},
		{ imgName: wooshHurtPic, theFile: "wooshHurt.png"},
		{ imgName: wooshKnockoutPic, theFile: "wooshKnockout.png"},
//		{ imgName: wooshDashPlayerPic, theFile: "wooshDashPlayer.png"},
		{ imgName: wooshDashEnemyPic, theFile: "wooshDashEnemy.png"},
//    { imgName: wooshDashPlayerLPic, theFile: "wooshDashPlayerL.png"},
		{ imgName: wooshDashEnemyLPic, theFile: "wooshDashEnemyL.png"},
		{ imgName: smokeSprite, theFile: "smoke.png"},
		{ imgName: starSprite, theFile: "star.png"},

		// UI
		{ imgName: titleBlock, theFile: "title_screen_menu_block.png"},
		{ imgName: titleScreenBird, theFile: "bird_sprite-flap-sheet.png"},
		{ imgName: selector, theFile: "title_screen_yinyang_selector.png"},
		{ imgName: jpFontImg, theFile: "JPFont_Light.png"},
		{ imgName: leftMoveSprite, theFile: "left.png"},
		{ imgName: rightMoveSprite, theFile: "right.png"},
		{ imgName: jumpSprite, theFile: "jump.png"},
		{ imgName: punchSprite, theFile: "punch.png"},
		{ imgName: kickSprite, theFile: "kick.png"},
		{ imgName: crouchSprite, theFile: "crouch.png"},
		{ imgName: dashSprite, theFile: "dash.png"},
		{ imgName: hourglassSprite, theFile: "hourglass.png"},
	];

	picsToLoad = imageList.length;

	for (let i = 0; i < imageList.length; i++) {

		beginLoadingImage(imageList[i].imgName, imageList[i].theFile);

	} // end of for imageList

} // end of function loadImages
