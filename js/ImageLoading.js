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

const basicEnemyIdle = document.createElement("canvas");
const basicEnemyWalk = document.createElement("canvas");
const basicEnemyKick = document.createElement("canvas");
const basicEnemyPunch = document.createElement("canvas");
const basicEnemyCrouch = document.createElement("canvas");
const basicEnemyDash = document.createElement("canvas");
const basicEnemyJump = document.createElement("canvas");

const yellowEnemyIdle = document.createElement("canvas");
const yellowEnemyWalk = document.createElement("canvas");
const yellowEnemyKick = document.createElement("canvas");
const yellowEnemyPunch = document.createElement("canvas");
const yellowEnemyCrouch = document.createElement("canvas");
const yellowEnemyDash = document.createElement("canvas");
const yellowEnemyJump = document.createElement("canvas");

const tanEnemyIdle = document.createElement("canvas");
const tanEnemyWalk = document.createElement("canvas");
const tanEnemyKick = document.createElement("canvas");
const tanEnemyPunch = document.createElement("canvas");
const tanEnemyCrouch = document.createElement("canvas");
const tanEnemyDash = document.createElement("canvas");
const tanEnemyJump = document.createElement("canvas");

const brownEnemyIdle = document.createElement("canvas");
const brownEnemyWalk = document.createElement("canvas");
const brownEnemyKick = document.createElement("canvas");
const brownEnemyPunch = document.createElement("canvas");
const brownEnemyCrouch = document.createElement("canvas");
const brownEnemyDash = document.createElement("canvas");
const brownEnemyJump = document.createElement("canvas");

const redEnemyIdle = document.createElement("canvas");
const redEnemyWalk = document.createElement("canvas");
const redEnemyKick = document.createElement("canvas");
const redEnemyPunch = document.createElement("canvas");
const redEnemyCrouch = document.createElement("canvas");
const redEnemyDash = document.createElement("canvas");
const redEnemyJump = document.createElement("canvas");

const yellowBossIdle = document.createElement("img");
const yellowBossWalk = document.createElement("img");
const yellowBossPunch = document.createElement("img");
const yellowBossKick = document.createElement("img");
const yellowBossCrouch = document.createElement("img");
const yellowBossCrouchPunch = document.createElement("img");
const yellowBossSweep = document.createElement("img");

const tanBossIdle = document.createElement("img");
const tanBossWalk = document.createElement("img");
const tanBossPunch = document.createElement("img");
const tanBossKick = document.createElement("img");
const tanBossCrouch = document.createElement("img");
const tanBossCrouchPunch = document.createElement("img");
const tanBossSweep = document.createElement("img");

const brownBossIdle = document.createElement("img");
const brownBossWalk = document.createElement("img");
const brownBossPunch = document.createElement("img");
const brownBossKick = document.createElement("img");
const brownBossCrouch = document.createElement("img");
const brownBossCrouchPunch = document.createElement("img");
const brownBossSweep = document.createElement("img");

const redBossIdle = document.createElement("img");
const redBossWalk = document.createElement("img");
const redBossPunch = document.createElement("img");
const redBossKick = document.createElement("img");
const redBossCrouch = document.createElement("img");
const redBossCrouchPunch = document.createElement("img");
const redBossSweep = document.createElement("img");

const blackBossIdle = document.createElement("img");
const blackBossWalk = document.createElement("img");
const blackBossPunch = document.createElement("img");
const blackBossKick = document.createElement("img");
const blackBossCrouch = document.createElement("img");
const blackBossCrouchPunch = document.createElement("img");
const blackBossSweep = document.createElement("img");

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
const wooshPunchPic = document.createElement("img");
const wooshKickPic = document.createElement("img");
const wooshKickPic2 = document.createElement("img");
const wooshHurtPic = document.createElement("img");
const wooshKnockoutPic = document.createElement("img");
const wooshDashPlayerPic = document.createElement("img");
const wooshDashEnemyPic = document.createElement("img");
const wooshDashPlayerLPic = document.createElement("img");
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

let picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
	picsToLoad--;
	if (picsToLoad == 0) { // last image loaded?
		initializeCanvasFromAtlas(playerIdleWhite, playerIdleWhiteData);
		initializeCanvasFromAtlas(playerWalkWhite, playerWalkWhiteData);
		initializeCanvasFromAtlas(playerKickWhite, playerKickWhiteData);
		initializeCanvasFromAtlas(playerPunchWhite, playerPunchWhiteData);
		initializeCanvasFromAtlas(playerKnockbackWhite, playerKnockbackWhiteData);

		initializeCanvasFromAtlas(playerIdleYellow, playerIdleYellowData);
		initializeCanvasFromAtlas(playerWalkYellow, playerWalkYellowData);
		initializeCanvasFromAtlas(playerKickYellow, playerKickYellowData);
		initializeCanvasFromAtlas(playerPunchYellow, playerPunchYellowData);
		initializeCanvasFromAtlas(playerKnockbackYellow, playerKnockbackYellowData);

		initializeCanvasFromAtlas(playerIdleTan, playerIdleTanData);
		initializeCanvasFromAtlas(playerWalkTan, playerWalkTanData);
		initializeCanvasFromAtlas(playerKickTan, playerKickTanData);
		initializeCanvasFromAtlas(playerPunchTan, playerPunchTanData);
		initializeCanvasFromAtlas(playerKnockbackTan, playerKnockbackTanData);

		initializeCanvasFromAtlas(playerIdleBrown, playerIdleBrownData);
		initializeCanvasFromAtlas(playerWalkBrown, playerWalkBrownData);
		initializeCanvasFromAtlas(playerKickBrown, playerKickBrownData);
		initializeCanvasFromAtlas(playerPunchBrown, playerPunchBrownData);
		initializeCanvasFromAtlas(playerKnockbackBrown, playerKnockbackBrownData);

		initializeCanvasFromAtlas(playerIdleRed, playerIdleRedData);
		initializeCanvasFromAtlas(playerWalkRed, playerWalkRedData);
		initializeCanvasFromAtlas(playerKickRed, playerKickRedData);
		initializeCanvasFromAtlas(playerPunchRed, playerPunchRedData);
		initializeCanvasFromAtlas(playerKnockbackRed, playerKnockbackRedData);

		initializeCanvasFromAtlas(playerIdleBlack, playerIdleBlackData);
		initializeCanvasFromAtlas(playerWalkBlack, playerWalkBlackData);
		initializeCanvasFromAtlas(playerKickBlack, playerKickBlackData);
		initializeCanvasFromAtlas(playerPunchBlack, playerPunchBlackData);
		initializeCanvasFromAtlas(playerKnockbackBlack, playerKnockbackBlackData);

		initializeCanvasFromAtlas(basicEnemyIdle, basicEnemyIdleData);
		initializeCanvasFromAtlas(basicEnemyWalk, basicEnemyWalkData);
		initializeCanvasFromAtlas(basicEnemyKick, basicEnemyKickData);
		initializeCanvasFromAtlas(basicEnemyPunch, basicEnemyPunchData);
		initializeCanvasFromAtlas(basicEnemyCrouch, basicEnemyCrouchData);
		initializeCanvasFromAtlas(basicEnemyDash, basicEnemyDashData);
		initializeCanvasFromAtlas(basicEnemyJump, basicEnemyJumpData);

		initializeCanvasFromAtlas(yellowEnemyIdle, yellowEnemyIdleData);
		initializeCanvasFromAtlas(yellowEnemyWalk, yellowEnemyWalkData);
		initializeCanvasFromAtlas(yellowEnemyKick, yellowEnemyKickData);
		initializeCanvasFromAtlas(yellowEnemyPunch, yellowEnemyPunchData);
		initializeCanvasFromAtlas(yellowEnemyCrouch, yellowEnemyCrouchData);
		initializeCanvasFromAtlas(yellowEnemyDash, yellowEnemyDashData);
		initializeCanvasFromAtlas(yellowEnemyJump, yellowEnemyJumpData);

		initializeCanvasFromAtlas(tanEnemyIdle, tanEnemyIdleData);
		initializeCanvasFromAtlas(tanEnemyWalk, tanEnemyWalkData);
		initializeCanvasFromAtlas(tanEnemyKick, tanEnemyKickData);
		initializeCanvasFromAtlas(tanEnemyPunch, tanEnemyPunchData);
		initializeCanvasFromAtlas(tanEnemyCrouch, tanEnemyCrouchData);
		initializeCanvasFromAtlas(tanEnemyDash, tanEnemyDashData);
		initializeCanvasFromAtlas(tanEnemyJump, tanEnemyJumpData);

		initializeCanvasFromAtlas(brownEnemyIdle, brownEnemyIdleData);
		initializeCanvasFromAtlas(brownEnemyWalk, brownEnemyWalkData);
		initializeCanvasFromAtlas(brownEnemyKick, brownEnemyKickData);
		initializeCanvasFromAtlas(brownEnemyPunch, brownEnemyPunchData);
		initializeCanvasFromAtlas(brownEnemyCrouch, brownEnemyCrouchData);
		initializeCanvasFromAtlas(brownEnemyDash, brownEnemyDashData);
		initializeCanvasFromAtlas(brownEnemyJump, brownEnemyJumpData);

		initializeCanvasFromAtlas(redEnemyIdle, redEnemyIdleData);
		initializeCanvasFromAtlas(redEnemyWalk, redEnemyWalkData);
		initializeCanvasFromAtlas(redEnemyKick, redEnemyKickData);
		initializeCanvasFromAtlas(redEnemyPunch, redEnemyPunchData);
		initializeCanvasFromAtlas(redEnemyCrouch, redEnemyCrouchData);
		initializeCanvasFromAtlas(redEnemyDash, redEnemyDashData);
		initializeCanvasFromAtlas(redEnemyJump, redEnemyJumpData);

		loadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImageAndLaunchIfReady;
	imgVar.src = assetPath.Image + fileName;
}

function initializeCanvasFromAtlas(canvas, data) {
	canvas.width = data.clipWidth;
	canvas.height = data.clipHeight;
	const context = canvas.getContext("2d");
	context.drawImage(characterAtlas, data.clipX, data.clipY, data.clipWidth, data.clipHeight, 0, 0, data.clipWidth, data.clipHeight);
}

function loadImages() {
	const imageList = [
		// enemies
		{ imgName: characterAtlas, theFile: "CharacterAtlas.png" },

		{ imgName: yellowBossIdle, theFile: "Boss_Idle_Yellow.png" },
		{ imgName: yellowBossWalk, theFile: "BossWalking_Yellow.png" },
		{ imgName: yellowBossPunch, theFile: "BossPunching_Yellow.png" },
		{ imgName: yellowBossKick, theFile: "BossKicking_Yellow.png" },
		{ imgName: yellowBossCrouch, theFile: "BossCrouching_Yellow.png" },
		{ imgName: yellowBossCrouchPunch, theFile: "BossCrouching_Yellow.png" },
		{ imgName: yellowBossSweep, theFile: "BossCrouchPunch_Yellow.png" },

		{ imgName: tanBossIdle, theFile: "Boss_Idle_Tan.png" },
		{ imgName: tanBossWalk, theFile: "BossWalking_Tan.png" },
		{ imgName: tanBossPunch, theFile: "BossPunching_Tan.png" },
		{ imgName: tanBossKick, theFile: "BossKicking_Tan.png" },
		{ imgName: tanBossCrouch, theFile: "BossCrouching_Tan.png" },
		{ imgName: tanBossCrouchPunch, theFile: "BossCrouching_Tan.png" },
		{ imgName: tanBossSweep, theFile: "BossCrouchPunch_Tan.png" },

		{ imgName: brownBossIdle, theFile: "Boss_Idle_Brown.png" },
		{ imgName: brownBossWalk, theFile: "BossWalking_Brown.png" },
		{ imgName: brownBossPunch, theFile: "BossPunching_Brown.png" },
		{ imgName: brownBossKick, theFile: "BossKicking_Brown.png" },
		{ imgName: brownBossCrouch, theFile: "BossCrouching_Brown.png" },
		{ imgName: brownBossCrouchPunch, theFile: "BossCrouching_Brown.png" },
		{ imgName: brownBossSweep, theFile: "BossCrouchPunch_Brown.png" },

		{ imgName: redBossIdle, theFile: "Boss_Idle_Red.png" },
		{ imgName: redBossWalk, theFile: "BossWalking_Red.png" },
		{ imgName: redBossPunch, theFile: "BossPunching_Red.png" },
		{ imgName: redBossKick, theFile: "BossKicking_Red.png" },
		{ imgName: redBossCrouch, theFile: "BossCrouching_Red.png" },
		{ imgName: redBossCrouchPunch, theFile: "BossCrouching_Red.png" },
		{ imgName: redBossSweep, theFile: "BossCrouchPunch_Red.png" },

		{ imgName: blackBossIdle, theFile: "Boss_Idle_Black.png" },
		{ imgName: blackBossWalk, theFile: "BossWalking_Black.png" },
		{ imgName: blackBossPunch, theFile: "BossPunching_Black.png" },
		{ imgName: blackBossKick, theFile: "BossKicking_Black.png" },
		{ imgName: blackBossCrouch, theFile: "BossCrouching_Black.png" },
		{ imgName: blackBossCrouchPunch, theFile: "BossCrouching_Black.png" },
		{ imgName: blackBossSweep, theFile: "BossCrouchPunch_Black.png" },

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
		{ imgName: wooshDashPlayerPic, theFile: "wooshDashPlayer.png"},
		{ imgName: wooshDashEnemyPic, theFile: "wooshDashEnemy.png"},
		{ imgName: wooshDashPlayerLPic, theFile: "wooshDashPlayerL.png"},
        { imgName: wooshDashEnemyLPic, theFile: "wooshDashEnemyL.png"},
        { imgName: smokeSprite, theFile: "smoke.png"},
        
        

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
	];

	picsToLoad = imageList.length;

	for (let i = 0; i < imageList.length; i++) {

		beginLoadingImage(imageList[i].imgName, imageList[i].theFile);

	} // end of for imageList

} // end of function loadImages