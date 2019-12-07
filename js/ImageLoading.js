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

	HTGDLogoPic.src = assetPath.Image + "HTGD_Zen_Logo.png";
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
const uiScreenBg = document.createElement("img");
const uiBorder = document.createElement("img");
const assistBorder = document.createElement("img");
const jpFontImg = document.createElement("img");

const characterAtlas = document.createElement("img");
const enemyAtlas = document.createElement("img");
const bossAtlas = document.createElement("img");
const environmentAtlas = document.createElement("img");
const planksAtlas = document.createElement("img");
const backWallAtlas = document.createElement("img");
const upgradeAtlas = document.createElement("img");

const waterfallPainting = document.createElement("img");

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
const basicEnemyJumpKick = document.createElement("canvas");
const basicEnemyHKick = document.createElement("canvas");

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
const yellowEnemyJumpKick = document.createElement("canvas");
const yellowEnemyHKick = document.createElement("canvas");

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
const tanEnemyJumpKick = document.createElement("canvas");
const tanEnemyHKick = document.createElement("canvas");

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
const brownEnemyJumpKick = document.createElement("canvas");
const brownEnemyHKick = document.createElement("canvas");

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
const redEnemyJumpKick = document.createElement("canvas");
const redEnemyHKick = document.createElement("canvas");

const yellowBossIdle = document.createElement("canvas");
const yellowBossWalk = document.createElement("canvas");
const yellowBossDash = document.createElement("canvas");
//Dash uses 1 frame from yellowBossJump
const yellowBossCrouch = document.createElement("canvas");
const yellowBossPunch = document.createElement("canvas");
const yellowBossKick = document.createElement("canvas");
const yellowBossBlock = document.createElement("canvas");
const yellowBossSweep = document.createElement("canvas");
const yellowBossC_Punch = document.createElement("canvas");
const yellowBossJump = document.createElement("canvas");
const yellowBossJ_Punch = document.createElement("canvas");
const yellowBossJ_Kick = document.createElement("canvas");
const yellowBossH_Kick = document.createElement("canvas");
const yellowBossKnockback = document.createElement("canvas");


let redYellowBossIdle = null;
let redYellowBossWalk = null;
let redYellowBossDash = null;
let redYellowBossPunch = null;
let redYellowBossKick = null;
let redYellowBossCrouch = null;
let redYellowBossCrouchPunch = null;
let redYellowBossSweep = null;
let redYellowBossJump = null;
let redYellowBossJ_Kick = null;
let redYellowBossH_Kick = null;
let redYellowBossKnockback = null;
let redYellowBossBlock = null;

const tanBossIdle = document.createElement("canvas");
const tanBossWalk = document.createElement("canvas");
const tanBossDash = document.createElement("canvas");
const tanBossPunch = document.createElement("canvas");
const tanBossKick = document.createElement("canvas");
const tanBossCrouch = document.createElement("canvas");
const tanBossCrouchPunch = document.createElement("canvas");
const tanBossSweep = document.createElement("canvas");
const tanBossJump = document.createElement("canvas");
const tanBossH_Kick = document.createElement("canvas");
const tanBossKnockback = document.createElement("canvas");
const tanBossBlock = document.createElement("canvas");

let redTanBossIdle = null;
let redTanBossWalk = null;
let redTanBossDash = null;
let redTanBossPunch = null;
let redTanBossKick = null;
let redTanBossCrouch = null;
let redTanBossCrouchPunch = null;
let redTanBossSweep = null;
let redTanBossJump = null;
let redTanBossH_Kick = null;
let redTanBossKnockback = null;
let redTanBossBlock = null;

const brownBossIdle = document.createElement("canvas");
const brownBossWalk = document.createElement("canvas");
const brownBossDash = document.createElement("canvas");
const brownBossPunch = document.createElement("canvas");
const brownBossKick = document.createElement("canvas");
const brownBossCrouch = document.createElement("canvas");
const brownBossCrouchPunch = document.createElement("canvas");
const brownBossSweep = document.createElement("canvas");
const brownBossJump = document.createElement("canvas");
const brownBossH_Kick = document.createElement("canvas");
const brownBossKnockback = document.createElement("canvas");
const brownBossBlock = document.createElement("canvas");

let redBrownBossIdle = null;
let redBrownBossWalk = null;
let redBrownBossDash = null;
let redBrownBossPunch = null;
let redBrownBossKick = null;
let redBrownBossCrouch = null;
let redBrownBossCrouchPunch = null;
let redBrownBossSweep = null;
let redBrownBossJump = null;
let redBrownBossH_Kick = null;
let redBrownBossKnockback = null;
let redBrownBossBlock = null;

const redBossIdle = document.createElement("canvas");
const redBossWalk = document.createElement("canvas");
const redBossDash = document.createElement("canvas");
const redBossPunch = document.createElement("canvas");
const redBossKick = document.createElement("canvas");
const redBossCrouch = document.createElement("canvas");
const redBossCrouchPunch = document.createElement("canvas");
const redBossSweep = document.createElement("canvas");
const redBossJump = document.createElement("canvas");
const redBossH_Kick = document.createElement("canvas");
const redBossKnockback = document.createElement("canvas");
const redBossBlock = document.createElement("canvas");

let redRedBossIdle = null;
let redRedBossWalk = null;
let redRedBossDash = null;
let redRedBossPunch = null;
let redRedBossKick = null;
let redRedBossCrouch = null;
let redRedBossCrouchPunch = null;
let redRedBossSweep = null;
let redRedBossJump = null;
let redRedBossH_Kick = null;
let redRedBossKnockback = null;
let redRedBossBlock = null;

const blackBossIdle = document.createElement("canvas");
const blackBossWalk = document.createElement("canvas");
const blackBossDash = document.createElement("canvas");
const blackBossPunch = document.createElement("canvas");
const blackBossKick = document.createElement("canvas");
const blackBossCrouch = document.createElement("canvas");
const blackBossCrouchPunch = document.createElement("canvas");
const blackBossSweep = document.createElement("canvas");
const blackBossJump = document.createElement("canvas");
const blackBossH_Kick = document.createElement("canvas");
const blackBossKnockback = document.createElement("canvas");
const blackBossBlock = document.createElement("canvas");

let redBlackBossIdle = null;
let redBlackBossWalk = null;
let redBlackBossDash = null;
let redBlackBossPunch = null;
let redBlackBossKick = null;
let redBlackBossCrouch = null;
let redBlackBossCrouchPunch = null;
let redBlackBossSweep = null;
let redBlackBossJump = null;
let redBlackBossH_Kick = null;
let redBlackBossKnockback = null;
let redBlackBossBlock = null;

const playerIdleWhite = document.createElement("canvas");
const playerIdleYellow = document.createElement("canvas");
const playerIdleTan = document.createElement("canvas");
const playerIdleBrown = document.createElement("canvas");
const playerIdleRed = document.createElement("canvas");
const playerIdleBlack = document.createElement("canvas");

let redPlayerIdleWhite = null;
let redPlayerIdleYellow = null;
let redPlayerIdleTan = null;
let redPlayerIdleBrown = null;
let redPlayerIdleRed = null;
let redPlayerIdleBlack = null;

const playerWalkWhite = document.createElement("canvas");
const playerWalkYellow = document.createElement("canvas");
const playerWalkTan = document.createElement("canvas");
const playerWalkBrown = document.createElement("canvas");
const playerWalkRed = document.createElement("canvas");
const playerWalkBlack = document.createElement("canvas");

let redPlayerWalkWhite = null;
let redPlayerWalkYellow = null;
let redPlayerWalkTan = null;
let redPlayerWalkBrown = null;
let redPlayerWalkRed = null;
let redPlayerWalkBlack = null;

const playerBlockWhite = document.createElement("canvas");
const playerBlockYellow = document.createElement("canvas");
const playerBlockTan = document.createElement("canvas");
const playerBlockBrown = document.createElement("canvas");
const playerBlockRed = document.createElement("canvas");
const playerBlockBlack = document.createElement("canvas");

let redPlayerBlockWhite = null;
let redPlayerBlockYellow = null;
let redPlayerBlockTan = null;
let redPlayerBlockBrown = null;
let redPlayerBlockRed = null;
let redPlayerBlockBlack = null;

const playerCrouchWhite = document.createElement("canvas");
const playerCrouchYellow = document.createElement("canvas");
const playerCrouchTan = document.createElement("canvas");
const playerCrouchBrown = document.createElement("canvas");
const playerCrouchRed = document.createElement("canvas");
const playerCrouchBlack = document.createElement("canvas");

let redPlayerCrouchWhite = null;
let redPlayerCrouchYellow = null;
let redPlayerCrouchTan = null;
let redPlayerCrouchBrown = null;
let redPlayerCrouchRed = null;
let redPlayerCrouchBlack = null;

const playerPunchWhite = document.createElement("canvas");
const playerPunchYellow = document.createElement("canvas");
const playerPunchTan = document.createElement("canvas");
const playerPunchBrown = document.createElement("canvas");
const playerPunchRed = document.createElement("canvas");
const playerPunchBlack = document.createElement("canvas");

let redPlayerPunchWhite = null;
let redPlayerPunchYellow = null;
let redPlayerPunchTan = null;
let redPlayerPunchBrown = null;
let redPlayerPunchRed = null;
let redPlayerPunchBlack = null;

const playerKickWhite = document.createElement("canvas");
const playerKickYellow = document.createElement("canvas");
const playerKickTan = document.createElement("canvas");
const playerKickBrown = document.createElement("canvas");
const playerKickRed = document.createElement("canvas");
const playerKickBlack = document.createElement("canvas");

let redPlayerKickWhite = null;
let redPlayerKickYellow = null;
let redPlayerKickTan = null;
let redPlayerKickBrown = null;
let redPlayerKickRed = null;
let redPlayerKickBlack = null;

const playerSweepWhite = document.createElement("canvas");
const playerSweepYellow = document.createElement("canvas");
const playerSweepTan = document.createElement("canvas");
const playerSweepBrown = document.createElement("canvas");
const playerSweepRed = document.createElement("canvas");
const playerSweepBlack = document.createElement("canvas");

let redPlayerSweepWhite = null;
let redPlayerSweepYellow = null;
let redPlayerSweepTan = null;
let redPlayerSweepBrown = null;
let redPlayerSweepRed = null;
let redPlayerSweepBlack = null;

const playerKnockbackWhite = document.createElement("canvas");
const playerKnockbackYellow = document.createElement("canvas");
const playerKnockbackTan = document.createElement("canvas");
const playerKnockbackBrown = document.createElement("canvas");
const playerKnockbackRed = document.createElement("canvas");
const playerKnockbackBlack = document.createElement("canvas");

let redPlayerKnockbackWhite = null;
let redPlayerKnockbackYellow = null;
let redPlayerKnockbackTan = null;
let redPlayerKnockbackBrown = null;
let redPlayerKnockbackRed = null;
let redPlayerKnockbackBlack = null;

const playerJumpWhite = document.createElement("canvas");
const playerJumpYellow = document.createElement("canvas");
const playerJumpTan = document.createElement("canvas");
const playerJumpBrown = document.createElement("canvas");
const playerJumpRed = document.createElement("canvas");
const playerJumpBlack = document.createElement("canvas");

let redPlayerJumpWhite = null;
let redPlayerJumpYellow = null;
let redPlayerJumpTan = null;
let redPlayerJumpBrown = null;
let redPlayerJumpRed = null;
let redPlayerJumpBlack = null;

const playerJ_KickWhite = document.createElement("canvas");
const playerJ_KickYellow = document.createElement("canvas");
const playerJ_KickTan = document.createElement("canvas");
const playerJ_KickBrown = document.createElement("canvas");
const playerJ_KickRed = document.createElement("canvas");
const playerJ_KickBlack = document.createElement("canvas");

let redPlayerJ_KickWhite = null;
let redPlayerJ_KickYellow = null;
let redPlayerJ_KickTan = null;
let redPlayerJ_KickBrown = null;
let redPlayerJ_KickRed = null;
let redPlayerJ_KickBlack = null;

const playerH_KickWhite = document.createElement("canvas");
const playerH_KickYellow = document.createElement("canvas");
const playerH_KickTan = document.createElement("canvas");
const playerH_KickBrown = document.createElement("canvas");
const playerH_KickRed = document.createElement("canvas");
const playerH_KickBlack = document.createElement("canvas");

let redPlayerH_KickWhite = null;
let redPlayerH_KickYellow = null;
let redPlayerH_KickTan = null;
let redPlayerH_KickBrown = null;
let redPlayerH_KickRed = null;
let redPlayerH_KickBlack = null;


const wooshDashPlayerPic = document.createElement("canvas");
const wooshDashPlayerLPic = document.createElement("canvas");
const wooshDashEnemyPic = document.createElement("canvas");
const wooshDashEnemyLPic = document.createElement("canvas");

const bambooDark = document.createElement("canvas");
const bambooLight = document.createElement("canvas");
const waterfallSheet = document.createElement("canvas");
const spear = document.createElement("canvas");
const statue = document.createElement("canvas");
const carpet = document.createElement("canvas");
const carpet2 = document.createElement("canvas");
const wallArtSnake = document.createElement("canvas");
const wallArtLeopard = document.createElement("canvas");
const wallArtCrane = document.createElement("canvas");
const wallArtTiger = document.createElement("canvas");
const wallArtDragon = document.createElement("canvas");
const painting = document.createElement("canvas");
const roofTileBottom = document.createElement("canvas");
const wallGradient = document.createElement("canvas");
const table = document.createElement("canvas");
const lamp = document.createElement("canvas");
const titleScreenBird = document.createElement("canvas");
const HTGDpainting = document.createElement("canvas");
const selector = document.createElement("canvas");
const wooshHurtPic = document.createElement("canvas");
const wooshKnockoutPic = document.createElement("canvas");
const smokeSprite = document.createElement("canvas");
const starSprite = document.createElement("canvas");
const shadowSprite = document.createElement("canvas");
const dustSprite = document.createElement("canvas");
const sparkSprite = document.createElement("canvas");
const lvl1Column = document.createElement("canvas");
const lvl2Column = document.createElement("canvas");
const lvl3Column = document.createElement("canvas");
const lvl4Column = document.createElement("canvas");
const lvl5Column = document.createElement("canvas");
const roofTileTop = document.createElement("canvas");
const tempLeftWall = document.createElement("canvas");
const tempRightWall = document.createElement("canvas");
const wooshKickPic = document.createElement("canvas");
const wooshKickPic2 = document.createElement("canvas");
const wooshPunchPic = document.createElement("canvas");
const titleBlock = document.createElement("canvas");
const temple = document.createElement("canvas");
const templeDark = document.createElement("canvas");

const roofboardSheet = document.createElement("canvas");
const roofboardSheetWhite = document.createElement("canvas");
const roofboardSheetGreen = document.createElement("canvas");
const roofboardSheetBlue = document.createElement("canvas");
const roofboardSheetRed = document.createElement("canvas");
const floorboardSheet = document.createElement("canvas");

const windowedWall = document.createElement("canvas");
const tiledWallScroll = document.createElement("canvas");
const wallScrollTiger = document.createElement("canvas");
const wallScrollCrane = document.createElement("canvas");
const wallScrollSnake = document.createElement("canvas");
const wallScrollLeopard = document.createElement("canvas");
const wallScrollDragon = document.createElement("canvas");
const tiledWall = document.createElement("canvas");

const yellowPresentation = document.createElement("canvas");
const tanPresentation = document.createElement("canvas");
const brownPresentation = document.createElement("canvas");
const redPresentation = document.createElement("canvas");
const blackPresentation = document.createElement("canvas");

const decorationSpritesheet = document.createElement("img");
const blueVaseStrip = document.createElement("img");
const rock = document.createElement("img");
const tree = document.createElement("img");

const leftMoveSprite = document.createElement("img");
const rightMoveSprite = document.createElement("img");
const jumpSprite = document.createElement("img");
const punchSprite = document.createElement("img");
const kickSprite = document.createElement("img");
const crouchSprite = document.createElement("img");
const dashSprite = document.createElement("img");
const hourglassAnimation = document.createElement("img");

let picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
	picsToLoad--;
	if (picsToLoad == 0) { // last image loaded?
		initializeCanvasFromAtlas(wooshDashPlayerPic, wooshDashPlayerPicData, characterAtlas);
		initializeCanvasFromAtlas(wooshDashPlayerLPic, wooshDashPlayerLPicData, characterAtlas);
		initializeCanvasFromAtlas(wooshDashEnemyPic, wooshDashEnemyPicData, enemyAtlas);
		initializeCanvasFromAtlas(wooshDashEnemyLPic, wooshDashEnemyLPicData, enemyAtlas);

		initializeCanvasFromAtlas(bambooLight, bambooLightData, environmentAtlas);
		initializeCanvasFromAtlas(waterfallSheet, waterfallSheetData, environmentAtlas);
		initializeCanvasFromAtlas(spear, spearData, environmentAtlas);
		initializeCanvasFromAtlas(statue, statueData, environmentAtlas);
		initializeCanvasFromAtlas(carpet, carpetData, environmentAtlas);
		initializeCanvasFromAtlas(carpet2, carpet2Data, environmentAtlas);
		initializeCanvasFromAtlas(wallArtSnake, wallArtSnakeData, environmentAtlas);
		initializeCanvasFromAtlas(wallArtLeopard, wallArtLeopardData, environmentAtlas);
		initializeCanvasFromAtlas(wallArtCrane, wallArtCraneData, environmentAtlas);
		initializeCanvasFromAtlas(wallArtTiger, wallArtTigerData, environmentAtlas);
		initializeCanvasFromAtlas(wallArtDragon, wallArtDragonData, environmentAtlas);
		initializeCanvasFromAtlas(painting, paintingData, environmentAtlas);
		initializeCanvasFromAtlas(roofTileBottom, roofTileBottomData, environmentAtlas);
		initializeCanvasFromAtlas(wallGradient, wallGradientData, environmentAtlas);
		initializeCanvasFromAtlas(table, tableData, environmentAtlas);
		initializeCanvasFromAtlas(lamp, lampData, environmentAtlas);
		initializeCanvasFromAtlas(titleScreenBird, titleScreenBirdData, environmentAtlas);
		initializeCanvasFromAtlas(HTGDpainting, HTGDpaintingData, environmentAtlas);
		initializeCanvasFromAtlas(selector, selectorData, environmentAtlas);
		initializeCanvasFromAtlas(wooshHurtPic, wooshHurtPicData, environmentAtlas);
		initializeCanvasFromAtlas(wooshKnockoutPic, wooshKnockoutPicData, environmentAtlas);
		initializeCanvasFromAtlas(smokeSprite, smokeSpriteData, environmentAtlas);
		initializeCanvasFromAtlas(starSprite, starSpriteData, environmentAtlas);
		initializeCanvasFromAtlas(shadowSprite, shadowSpriteData, environmentAtlas);
		initializeCanvasFromAtlas(dustSprite, dustSpriteData, environmentAtlas);
		initializeCanvasFromAtlas(sparkSprite, sparkSpriteData, environmentAtlas);
		initializeCanvasFromAtlas(lvl1Column, lvl1ColumnData, environmentAtlas);
		initializeCanvasFromAtlas(lvl2Column, lvl2ColumnData, environmentAtlas);
		initializeCanvasFromAtlas(lvl3Column, lvl3ColumnData, environmentAtlas);
		initializeCanvasFromAtlas(lvl4Column, lvl4ColumnData, environmentAtlas);
		initializeCanvasFromAtlas(lvl5Column, lvl5ColumnData, environmentAtlas);
		initializeCanvasFromAtlas(roofTileTop, roofTileTopData, environmentAtlas);
		initializeCanvasFromAtlas(tempLeftWall, tempLeftWallData, environmentAtlas);
		initializeCanvasFromAtlas(tempRightWall, tempRightWallData, environmentAtlas);
		initializeCanvasFromAtlas(wooshKickPic, wooshKickPicData, environmentAtlas);
		initializeCanvasFromAtlas(wooshKickPic2, wooshKickPic2Data, environmentAtlas);
		initializeCanvasFromAtlas(wooshPunchPic, wooshPunchPicData, environmentAtlas);
		initializeCanvasFromAtlas(titleBlock, titleBlockData, environmentAtlas);
		initializeCanvasFromAtlas(temple, templeData, environmentAtlas);
		initializeCanvasFromAtlas(templeDark, templeDarkData, environmentAtlas);

		initializeCanvasFromAtlas(roofboardSheet, roofboardSheetData, planksAtlas);
		initializeCanvasFromAtlas(roofboardSheetWhite, roofboardSheetWhiteData, planksAtlas);
		initializeCanvasFromAtlas(roofboardSheetGreen, roofboardSheetGreenData, planksAtlas);
		initializeCanvasFromAtlas(roofboardSheetBlue, roofboardSheetBlueData, planksAtlas);
		initializeCanvasFromAtlas(roofboardSheetRed, roofboardSheetRedData, planksAtlas);
		initializeCanvasFromAtlas(floorboardSheet, floorboardSheetData, planksAtlas);

		initializeCanvasFromAtlas(wallScrollTiger, wallScrollTigerData, backWallAtlas);
		initializeCanvasFromAtlas(wallScrollCrane, wallScrollCraneData, backWallAtlas);
		initializeCanvasFromAtlas(wallScrollSnake, wallScrollSnakeData, backWallAtlas);
		initializeCanvasFromAtlas(wallScrollLeopard, wallScrollLeopardData, backWallAtlas);
		initializeCanvasFromAtlas(wallScrollDragon, wallScrollDragonData, backWallAtlas);
		initializeCanvasFromAtlas(tiledWallScroll, tiledWallScrollData, backWallAtlas);
		initializeCanvasFromAtlas(tiledWall, tiledWallData, backWallAtlas);
		initializeCanvasFromAtlas(windowedWall, windowedWallData, backWallAtlas);

		initializeCanvasFromAtlas(yellowPresentation, yellowPresentationData, upgradeAtlas);
		initializeCanvasFromAtlas(tanPresentation, tanPresentationData, upgradeAtlas);
		initializeCanvasFromAtlas(brownPresentation, brownPresentationData, upgradeAtlas);
		initializeCanvasFromAtlas(redPresentation, redPresentationData, upgradeAtlas);
		initializeCanvasFromAtlas(blackPresentation, blackPresentationData, upgradeAtlas);

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
		// atlases
		{ imgName: characterAtlas, theFile: "CharacterAtlas.png" },
		{ imgName: enemyAtlas, theFile: "EnemyAtlas.png" },
		{ imgName: bossAtlas, theFile: "BossAtlas.png" },
		{ imgName: environmentAtlas, theFile: "EnvironmentAtlas.png" },
		{ imgName: planksAtlas, theFile: "PlanksAtlas.png" },
		{ imgName: backWallAtlas, theFile: "BackWallAtlas.png" },
		{ imgName: upgradeAtlas, theFile: "UpgradeAtlas.png" },
		
		// backgrounds
		{ imgName: uiScreenBg, theFile: "UI_BG.png"},
		{ imgName: uiBorder, theFile: "UI_Border.png"},
		{ imgName: assistBorder, theFile: "Vert_Menu_Block.png"},
		{ imgName: titleScreenBG, theFile: "title_screen_bg.png"},
		{ imgName: titleImage, theFile: "title_screen_ktname.png"},
		{ imgName: titleScreenDecore, theFile: "title_screen_decor.png"},
		{ imgName: decorationSpritesheet, theFile: "decorations.png"},
		{ imgName: blueVaseStrip, theFile: "BrokenBlueVaseStrip.png"},
		{ imgName: waterfallPainting, theFile: "waterfall_painting.png"},

		// UI
		{ imgName: jpFontImg, theFile: "JPFont_Light.png"},
		{ imgName: hourglassAnimation, theFile: "hourglassStrip.png"},

		{ imgName: leftMoveSprite, theFile: "left.png"},
		{ imgName: rightMoveSprite, theFile: "right.png"},
		{ imgName: jumpSprite, theFile: "jump.png"},
		{ imgName: punchSprite, theFile: "punch.png"},
		{ imgName: kickSprite, theFile: "kick.png"},
		{ imgName: crouchSprite, theFile: "crouch.png"},
		{ imgName: dashSprite, theFile: "dash.png"},
	];

	picsToLoad = imageList.length;

	for (let i = 0; i < imageList.length; i++) {

		beginLoadingImage(imageList[i].imgName, imageList[i].theFile);

	} // end of for imageList

} // end of function loadImages

function initializePlayerWhite() {
	initializeCanvasFromAtlas(playerIdleWhite, playerIdleWhiteData, characterAtlas);
	initializeCanvasFromAtlas(playerWalkWhite, playerWalkWhiteData, characterAtlas);
	initializeCanvasFromAtlas(playerBlockWhite, playerBlockWhiteData, characterAtlas);
	initializeCanvasFromAtlas(playerCrouchWhite, playerCrouchWhiteData, characterAtlas);
	initializeCanvasFromAtlas(playerKickWhite, playerKickWhiteData, characterAtlas);
	initializeCanvasFromAtlas(playerPunchWhite, playerPunchWhiteData, characterAtlas);
	initializeCanvasFromAtlas(playerSweepWhite, playerSweepWhiteData, characterAtlas); 
	initializeCanvasFromAtlas(playerKnockbackWhite, playerKnockbackWhiteData, characterAtlas);
	initializeCanvasFromAtlas(playerJumpWhite, playerJumpWhiteData, characterAtlas);
	initializeCanvasFromAtlas(playerJ_KickWhite, playerJ_KickWhiteData, characterAtlas);
	initializeCanvasFromAtlas(playerH_KickWhite, playerH_KickWhiteData, characterAtlas);
}

function initializePlayerYellow() {
	initializeCanvasFromAtlas(playerIdleYellow, playerIdleYellowData, characterAtlas);
	initializeCanvasFromAtlas(playerWalkYellow, playerWalkYellowData, characterAtlas);
	initializeCanvasFromAtlas(playerBlockYellow, playerBlockYellowData, characterAtlas);
	initializeCanvasFromAtlas(playerCrouchYellow, playerCrouchYellowData, characterAtlas);
	initializeCanvasFromAtlas(playerKickYellow, playerKickYellowData, characterAtlas);
	initializeCanvasFromAtlas(playerPunchYellow, playerPunchYellowData, characterAtlas);
	initializeCanvasFromAtlas(playerSweepYellow, playerSweepYellowData, characterAtlas); 
	initializeCanvasFromAtlas(playerKnockbackYellow, playerKnockbackYellowData, characterAtlas);
	initializeCanvasFromAtlas(playerJumpYellow, playerJumpYellowData, characterAtlas);
	initializeCanvasFromAtlas(playerJ_KickYellow, playerJ_KickYellowData, characterAtlas);
	initializeCanvasFromAtlas(playerH_KickYellow, playerH_KickYellowData, characterAtlas);
}

function initializePlayerTan() {
	initializeCanvasFromAtlas(playerIdleTan, playerIdleTanData, characterAtlas);
	initializeCanvasFromAtlas(playerWalkTan, playerWalkTanData, characterAtlas);
	initializeCanvasFromAtlas(playerBlockTan, playerBlockTanData, characterAtlas);
	initializeCanvasFromAtlas(playerCrouchTan, playerCrouchTanData, characterAtlas);
	initializeCanvasFromAtlas(playerKickTan, playerKickTanData, characterAtlas);
	initializeCanvasFromAtlas(playerPunchTan, playerPunchTanData, characterAtlas);
	initializeCanvasFromAtlas(playerSweepTan, playerSweepTanData, characterAtlas); 
	initializeCanvasFromAtlas(playerKnockbackTan, playerKnockbackTanData, characterAtlas);
	initializeCanvasFromAtlas(playerJumpTan, playerJumpTanData, characterAtlas);
	initializeCanvasFromAtlas(playerJ_KickTan, playerJ_KickTanData, characterAtlas);
	initializeCanvasFromAtlas(playerH_KickTan, playerH_KickTanData, characterAtlas);
}

function initializePlayerBrown() {
	initializeCanvasFromAtlas(playerIdleBrown, playerIdleBrownData, characterAtlas);
	initializeCanvasFromAtlas(playerWalkBrown, playerWalkBrownData, characterAtlas);
	initializeCanvasFromAtlas(playerBlockBrown, playerBlockBrownData, characterAtlas);
	initializeCanvasFromAtlas(playerCrouchBrown, playerCrouchBrownData, characterAtlas);
	initializeCanvasFromAtlas(playerKickBrown, playerKickBrownData, characterAtlas);
	initializeCanvasFromAtlas(playerPunchBrown, playerPunchBrownData, characterAtlas);
	initializeCanvasFromAtlas(playerSweepBrown, playerSweepBrownData, characterAtlas); 
	initializeCanvasFromAtlas(playerKnockbackBrown, playerKnockbackBrownData, characterAtlas);
	initializeCanvasFromAtlas(playerJumpBrown, playerJumpBrownData, characterAtlas);
	initializeCanvasFromAtlas(playerJ_KickBrown, playerJ_KickBrownData, characterAtlas);
	initializeCanvasFromAtlas(playerH_KickBrown, playerH_KickBrownData, characterAtlas);
}

function initializePlayerRed() {
	initializeCanvasFromAtlas(playerIdleRed, playerIdleRedData, characterAtlas);
	initializeCanvasFromAtlas(playerWalkRed, playerWalkRedData, characterAtlas);
	initializeCanvasFromAtlas(playerBlockRed, playerBlockRedData, characterAtlas);
	initializeCanvasFromAtlas(playerCrouchRed, playerCrouchRedData, characterAtlas);
	initializeCanvasFromAtlas(playerKickRed, playerKickRedData, characterAtlas);
	initializeCanvasFromAtlas(playerPunchRed, playerPunchRedData, characterAtlas);
	initializeCanvasFromAtlas(playerSweepRed, playerSweepRedData, characterAtlas); 
	initializeCanvasFromAtlas(playerKnockbackRed, playerKnockbackRedData, characterAtlas);
	initializeCanvasFromAtlas(playerJumpRed, playerJumpRedData, characterAtlas);
	initializeCanvasFromAtlas(playerJ_KickRed, playerJ_KickRedData, characterAtlas);
	initializeCanvasFromAtlas(playerH_KickRed, playerH_KickRedData, characterAtlas);
}

function initializePlayerBlack() {
	initializeCanvasFromAtlas(playerIdleBlack, playerIdleBlackData, characterAtlas);
	initializeCanvasFromAtlas(playerWalkBlack, playerWalkBlackData, characterAtlas);
	initializeCanvasFromAtlas(playerBlockBlack, playerBlockBlackData, characterAtlas);
	initializeCanvasFromAtlas(playerCrouchBlack, playerCrouchBlackData, characterAtlas);
	initializeCanvasFromAtlas(playerKickBlack, playerKickBlackData, characterAtlas);
	initializeCanvasFromAtlas(playerPunchBlack, playerPunchBlackData, characterAtlas);
	initializeCanvasFromAtlas(playerSweepBlack, playerSweepBlackData, characterAtlas); 
	initializeCanvasFromAtlas(playerKnockbackBlack, playerKnockbackBlackData, characterAtlas);
	initializeCanvasFromAtlas(playerJumpBlack, playerJumpBlackData, characterAtlas);
	initializeCanvasFromAtlas(playerJ_KickBlack, playerJ_KickBlackData, characterAtlas);
	initializeCanvasFromAtlas(playerH_KickBlack, playerH_KickBlackData, characterAtlas);
}

function initializeBasicWhite() {
	initializeCanvasFromAtlas(basicEnemyIdle, basicEnemyIdleData, enemyAtlas);
	initializeCanvasFromAtlas(basicEnemyWalk, basicEnemyWalkData, enemyAtlas);
	initializeCanvasFromAtlas(basicEnemyKick, basicEnemyKickData, enemyAtlas);
	initializeCanvasFromAtlas(basicEnemyPunch, basicEnemyPunchData, enemyAtlas);
	initializeCanvasFromAtlas(basicEnemyCrouch, basicEnemyCrouchData, enemyAtlas);
	initializeCanvasFromAtlas(basicEnemyDash, basicEnemyDashData, enemyAtlas);
	initializeCanvasFromAtlas(basicEnemyJump, basicEnemyJumpData, enemyAtlas);
	initializeCanvasFromAtlas(basicEnemyBlock, basicEnemyBlockData, enemyAtlas);
	initializeCanvasFromAtlas(basicEnemyKnockback, basicEnemyKnockbackData, enemyAtlas);
	initializeCanvasFromAtlas(basicEnemySweep, basicEnemySweepData, enemyAtlas);
	initializeCanvasFromAtlas(basicEnemyJumpKick, basicEnemyJumpKickData, enemyAtlas);
	initializeCanvasFromAtlas(basicEnemyHKick, basicEnemyHKickData, enemyAtlas);
}

function initializeBasicYellow() {
	initializeCanvasFromAtlas(yellowEnemyIdle, yellowEnemyIdleData, enemyAtlas);
	initializeCanvasFromAtlas(yellowEnemyWalk, yellowEnemyWalkData, enemyAtlas);
	initializeCanvasFromAtlas(yellowEnemyKick, yellowEnemyKickData, enemyAtlas);
	initializeCanvasFromAtlas(yellowEnemyPunch, yellowEnemyPunchData, enemyAtlas);
	initializeCanvasFromAtlas(yellowEnemyCrouch, yellowEnemyCrouchData, enemyAtlas);
	initializeCanvasFromAtlas(yellowEnemyDash, yellowEnemyDashData, enemyAtlas);
	initializeCanvasFromAtlas(yellowEnemyJump, yellowEnemyJumpData, enemyAtlas);
	initializeCanvasFromAtlas(yellowEnemyBlock, yellowEnemyBlockData, enemyAtlas);
	initializeCanvasFromAtlas(yellowEnemyKnockback, yellowEnemyKnockbackData, enemyAtlas);
	initializeCanvasFromAtlas(yellowEnemySweep, yellowEnemySweepData, enemyAtlas);
	initializeCanvasFromAtlas(yellowEnemyJumpKick, yellowEnemyJumpKickData, enemyAtlas);
	initializeCanvasFromAtlas(yellowEnemyHKick, yellowEnemyHKickData, enemyAtlas);
}

function initializeBasicTan() {
	initializeCanvasFromAtlas(tanEnemyIdle, tanEnemyIdleData, enemyAtlas);
	initializeCanvasFromAtlas(tanEnemyWalk, tanEnemyWalkData, enemyAtlas);
	initializeCanvasFromAtlas(tanEnemyKick, tanEnemyKickData, enemyAtlas);
	initializeCanvasFromAtlas(tanEnemyPunch, tanEnemyPunchData, enemyAtlas);
	initializeCanvasFromAtlas(tanEnemyCrouch, tanEnemyCrouchData, enemyAtlas);
	initializeCanvasFromAtlas(tanEnemyDash, tanEnemyDashData, enemyAtlas);
	initializeCanvasFromAtlas(tanEnemyJump, tanEnemyJumpData, enemyAtlas);
	initializeCanvasFromAtlas(tanEnemyBlock, tanEnemyBlockData, enemyAtlas);
	initializeCanvasFromAtlas(tanEnemyKnockback, tanEnemyKnockbackData, enemyAtlas);
	initializeCanvasFromAtlas(tanEnemySweep, tanEnemySweepData, enemyAtlas);
	initializeCanvasFromAtlas(tanEnemyJumpKick, tanEnemyJumpKickData, enemyAtlas);
	initializeCanvasFromAtlas(tanEnemyHKick, tanEnemyHKickData, enemyAtlas);
}

function initializeBasicBrown() {
	initializeCanvasFromAtlas(brownEnemyIdle, brownEnemyIdleData, enemyAtlas);
	initializeCanvasFromAtlas(brownEnemyWalk, brownEnemyWalkData, enemyAtlas);
	initializeCanvasFromAtlas(brownEnemyKick, brownEnemyKickData, enemyAtlas);
	initializeCanvasFromAtlas(brownEnemyPunch, brownEnemyPunchData, enemyAtlas);
	initializeCanvasFromAtlas(brownEnemyCrouch, brownEnemyCrouchData, enemyAtlas);
	initializeCanvasFromAtlas(brownEnemyDash, brownEnemyDashData, enemyAtlas);
	initializeCanvasFromAtlas(brownEnemyJump, brownEnemyJumpData, enemyAtlas);
	initializeCanvasFromAtlas(brownEnemyBlock, brownEnemyBlockData, enemyAtlas);
	initializeCanvasFromAtlas(brownEnemyKnockback, brownEnemyKnockbackData, enemyAtlas);
	initializeCanvasFromAtlas(brownEnemySweep, brownEnemySweepData, enemyAtlas);
	initializeCanvasFromAtlas(brownEnemyJumpKick, brownEnemyJumpKickData, enemyAtlas);
	initializeCanvasFromAtlas(brownEnemyHKick, brownEnemyHKickData, enemyAtlas);
}

function initializeBasicRed() {
	initializeCanvasFromAtlas(redEnemyIdle, redEnemyIdleData, enemyAtlas);
	initializeCanvasFromAtlas(redEnemyWalk, redEnemyWalkData, enemyAtlas);
	initializeCanvasFromAtlas(redEnemyKick, redEnemyKickData, enemyAtlas);
	initializeCanvasFromAtlas(redEnemyPunch, redEnemyPunchData, enemyAtlas);
	initializeCanvasFromAtlas(redEnemyCrouch, redEnemyCrouchData, enemyAtlas);
	initializeCanvasFromAtlas(redEnemyDash, redEnemyDashData, enemyAtlas);
	initializeCanvasFromAtlas(redEnemyJump, redEnemyJumpData, enemyAtlas);
	initializeCanvasFromAtlas(redEnemyBlock, redEnemyBlockData, enemyAtlas);
	initializeCanvasFromAtlas(redEnemyKnockback, redEnemyKnockbackData, enemyAtlas);
	initializeCanvasFromAtlas(redEnemySweep, redEnemySweepData, enemyAtlas);
	initializeCanvasFromAtlas(redEnemyJumpKick, redEnemyJumpKickData, enemyAtlas);
	initializeCanvasFromAtlas(redEnemyHKick, redEnemyHKickData, enemyAtlas);
}

function initializeBossYellow() {
	initializeCanvasFromAtlas(yellowBossIdle, yellowBossIdleData, bossAtlas);
//	makeRedImage(yellowBossIdle, redYellowBossIdle);
	initializeCanvasFromAtlas(yellowBossWalk, yellowBossWalkData, bossAtlas);
	initializeCanvasFromAtlas(yellowBossDash, yellowBossDashData, bossAtlas);
	initializeCanvasFromAtlas(yellowBossKick, yellowBossKickData, bossAtlas);
	initializeCanvasFromAtlas(yellowBossPunch, yellowBossPunchData, bossAtlas);
	initializeCanvasFromAtlas(yellowBossCrouch, yellowBossCrouchData, bossAtlas);
	initializeCanvasFromAtlas(yellowBossSweep, yellowBossSweepData, bossAtlas);
	initializeCanvasFromAtlas(yellowBossJump, yellowBossJumpData, bossAtlas);
	initializeCanvasFromAtlas(yellowBossH_Kick, yellowBossH_KickData, bossAtlas);
	initializeCanvasFromAtlas(yellowBossKnockback, yellowBossKnockbackData, bossAtlas);
	initializeCanvasFromAtlas(yellowBossBlock, yellowBossBlockData, bossAtlas);
}

function initializeBossTan() {
	initializeCanvasFromAtlas(tanBossIdle, tanBossIdleData, bossAtlas);
	initializeCanvasFromAtlas(tanBossWalk, tanBossWalkData, bossAtlas);
	initializeCanvasFromAtlas(tanBossDash, tanBossDashData, bossAtlas);
	initializeCanvasFromAtlas(tanBossKick, tanBossKickData, bossAtlas);
	initializeCanvasFromAtlas(tanBossPunch, tanBossPunchData, bossAtlas);
	initializeCanvasFromAtlas(tanBossCrouch, tanBossCrouchData, bossAtlas);
	initializeCanvasFromAtlas(tanBossSweep, tanBossSweepData, bossAtlas);
	initializeCanvasFromAtlas(tanBossJump, tanBossJumpData, bossAtlas);
	initializeCanvasFromAtlas(tanBossH_Kick, tanBossH_KickData, bossAtlas);
	initializeCanvasFromAtlas(tanBossKnockback, tanBossKnockbackData, bossAtlas);
	initializeCanvasFromAtlas(tanBossBlock, tanBossBlockData, bossAtlas);
}

function initializeBossBrown() {
	initializeCanvasFromAtlas(brownBossIdle, brownBossIdleData, bossAtlas);
	initializeCanvasFromAtlas(brownBossWalk, brownBossWalkData, bossAtlas);
	initializeCanvasFromAtlas(brownBossDash, brownBossDashData, bossAtlas);
	initializeCanvasFromAtlas(brownBossKick, brownBossKickData, bossAtlas);
	initializeCanvasFromAtlas(brownBossPunch, brownBossPunchData, bossAtlas);
	initializeCanvasFromAtlas(brownBossCrouch, brownBossCrouchData, bossAtlas);
	initializeCanvasFromAtlas(brownBossSweep, brownBossSweepData, bossAtlas);
	initializeCanvasFromAtlas(brownBossJump, brownBossJumpData, bossAtlas);
	initializeCanvasFromAtlas(brownBossH_Kick, brownBossH_KickData, bossAtlas);
	initializeCanvasFromAtlas(brownBossKnockback, brownBossKnockbackData, bossAtlas);
	initializeCanvasFromAtlas(brownBossBlock, brownBossBlockData, bossAtlas);
}

function initializeBossRed() {
	initializeCanvasFromAtlas(redBossIdle, redBossIdleData, bossAtlas);
	initializeCanvasFromAtlas(redBossWalk, redBossWalkData, bossAtlas);
	initializeCanvasFromAtlas(redBossDash, redBossDashData, bossAtlas);
	initializeCanvasFromAtlas(redBossKick, redBossKickData, bossAtlas);
	initializeCanvasFromAtlas(redBossPunch, redBossPunchData, bossAtlas);
	initializeCanvasFromAtlas(redBossCrouch, redBossCrouchData, bossAtlas);
	initializeCanvasFromAtlas(redBossSweep, redBossSweepData, bossAtlas);
	initializeCanvasFromAtlas(redBossJump, redBossJumpData, bossAtlas);
	initializeCanvasFromAtlas(redBossH_Kick, redBossH_KickData, bossAtlas);
	initializeCanvasFromAtlas(redBossKnockback, redBossKnockbackData, bossAtlas);
	initializeCanvasFromAtlas(redBossBlock, redBossBlockData, bossAtlas);
}

function initializeBossBlack() {
	initializeCanvasFromAtlas(blackBossIdle, blackBossIdleData, bossAtlas);
	initializeCanvasFromAtlas(blackBossWalk, blackBossWalkData, bossAtlas);
	initializeCanvasFromAtlas(blackBossDash, blackBossDashData, bossAtlas);
	initializeCanvasFromAtlas(blackBossKick, blackBossKickData, bossAtlas);
	initializeCanvasFromAtlas(blackBossPunch, blackBossPunchData, bossAtlas);
	initializeCanvasFromAtlas(blackBossCrouch, blackBossCrouchData, bossAtlas);
	initializeCanvasFromAtlas(blackBossSweep, blackBossSweepData, bossAtlas);
	initializeCanvasFromAtlas(blackBossJump, blackBossJumpData, bossAtlas);
	initializeCanvasFromAtlas(blackBossH_Kick, blackBossH_KickData, bossAtlas);
	initializeCanvasFromAtlas(blackBossKnockback, blackBossKnockbackData, bossAtlas);
	initializeCanvasFromAtlas(blackBossBlock, blackBossBlockData, bossAtlas);
}