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
		//Draw the Gamkedo Logo Image
		canvasContext.drawImage(this, 0, 0);

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
const basicEnemyIdle = document.createElement("img");
const basicEnemyWalk = document.createElement("img");
const basicEnemyKick = document.createElement("img");
const basicEnemyPunch = document.createElement("img");
const basicEnemyCrouch = document.createElement("img");
const basicEnemyDash = document.createElement("img");
const yellowEnemyIdle = document.createElement("img");
const yellowEnemyWalk = document.createElement("img");
const yellowEnemyKick = document.createElement("img");
const yellowEnemyPunch = document.createElement("img");
const yellowEnemyCrouch = document.createElement("img");
const yellowEnemyDash = document.createElement("img");
const tanEnemyIdle = document.createElement("img");
const tanEnemyWalk = document.createElement("img");
const tanEnemyKick = document.createElement("img");
const tanEnemyPunch = document.createElement("img");
const tanEnemyCrouch = document.createElement("img");
const tanEnemyDash = document.createElement("img");
const brownEnemyIdle = document.createElement("img");
const brownEnemyWalk = document.createElement("img");
const brownEnemyKick = document.createElement("img");
const brownEnemyPunch = document.createElement("img");
const brownEnemyCrouch = document.createElement("img");
const brownEnemyDash = document.createElement("img");
const redEnemyIdle = document.createElement("img");
const redEnemyWalk = document.createElement("img");
const redEnemyKick = document.createElement("img");
const redEnemyPunch = document.createElement("img");
const redEnemyCrouch = document.createElement("img");
const redEnemyDash = document.createElement("img");
const yellowBossIdle = document.createElement("img");
const yellowBossWalk = document.createElement("img");
const yellowBossPunch = document.createElement("img");
const yellowBossKick = document.createElement("img");
const yellowBossCrouch = document.createElement("img");
const yellowBossCrouchPunch = document.createElement("img");
const yellowBossSweep = document.createElement("img");
const playerIdleWhite = document.createElement("img");
const playerIdleYellow = document.createElement("img");
const playerIdleTan = document.createElement("img");
const playerIdleBrown = document.createElement("img");
const playerIdleRed = document.createElement("img");
const playerIdleBlack = document.createElement("img");
const playerWalkWhite = document.createElement("img");
const playerWalkYellow = document.createElement("img");
const playerWalkTan = document.createElement("img");
const playerWalkBrown = document.createElement("img");
const playerWalkRed = document.createElement("img");
const playerWalkBlack = document.createElement("img");
const playerWalkBack = document.createElement("img");
const playerPunchWhite = document.createElement("img");
const playerPunchYellow = document.createElement("img");
const playerPunchTan = document.createElement("img");
const playerPunchBrown = document.createElement("img");
const playerPunchRed = document.createElement("img");
const playerPunchBlack = document.createElement("img");
const playerKickWhite = document.createElement("img");
const playerKickYellow = document.createElement("img");
const playerKickTan = document.createElement("img");
const playerKickBrown = document.createElement("img");
const playerKickRed = document.createElement("img");
const playerKickBlack = document.createElement("img");
const playerKnockbackWhite = document.createElement("img");
const playerKnockbackYellow = document.createElement("img");
const playerKnockbackTan = document.createElement("img");
const playerKnockbackBrown = document.createElement("img");
const playerKnockbackRed = document.createElement("img");
const playerKnockbackBlack = document.createElement("img");
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

let picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
	picsToLoad--;
	if (picsToLoad == 0) { // last image loaded?
		loadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImageAndLaunchIfReady;
	imgVar.src = assetPath.Image + fileName;
}

function loadImages() {
	const imageList = [
		// enemies
		{ imgName: basicEnemyIdle, theFile: "TempEnemy.png" },
		{ imgName: basicEnemyWalk, theFile: "EnemyWalking.png" },
		{ imgName: basicEnemyKick, theFile: "EnemyKicking.png" },
		{ imgName: basicEnemyPunch, theFile: "EnemyPunching.png" },
		{ imgName: basicEnemyCrouch, theFile: "EnemyCrouching.png" },
		{ imgName: basicEnemyDash, theFile: "EnemyDashing.png" },
		{ imgName: yellowEnemyIdle, theFile: "TempEnemy_Yellow.png" },
		{ imgName: yellowEnemyWalk, theFile: "EnemyWalking_Yellow.png" },
		{ imgName: yellowEnemyKick, theFile: "EnemyKicking_Yellow.png" },
		{ imgName: yellowEnemyPunch, theFile: "EnemyPunching_Yellow.png" },
		{ imgName: yellowEnemyCrouch, theFile: "EnemyCrouching_Yellow.png" },
		{ imgName: yellowEnemyDash, theFile: "EnemyDashing_Yellow.png" },
		{ imgName: tanEnemyIdle, theFile: "TempEnemy_Tan.png" },
		{ imgName: tanEnemyWalk, theFile: "EnemyWalking_Tan.png" },
		{ imgName: tanEnemyKick, theFile: "EnemyKicking_Tan.png" },
		{ imgName: tanEnemyPunch, theFile: "EnemyPunching_Tan.png" },
		{ imgName: tanEnemyCrouch, theFile: "EnemyCrouching_Tan.png" },
		{ imgName: tanEnemyDash, theFile: "EnemyDashing_Tan.png" },
		{ imgName: brownEnemyIdle, theFile: "TempEnemy_Brown.png" },
		{ imgName: brownEnemyWalk, theFile: "EnemyWalking_Brown.png" },
		{ imgName: brownEnemyKick, theFile: "EnemyKicking_Brown.png" },
		{ imgName: brownEnemyPunch, theFile: "EnemyPunching_Brown.png" },
		{ imgName: brownEnemyCrouch, theFile: "EnemyCrouching_Brown.png" },
		{ imgName: brownEnemyDash, theFile: "EnemyDashing_Brown.png" },
		{ imgName: redEnemyIdle, theFile: "TempEnemy_Red.png" },
		{ imgName: redEnemyWalk, theFile: "EnemyWalking_Red.png" },
		{ imgName: redEnemyKick, theFile: "EnemyKicking_Red.png" },
		{ imgName: redEnemyPunch, theFile: "EnemyPunching_Red.png" },
		{ imgName: redEnemyCrouch, theFile: "EnemyCrouching_Red.png" },
		{ imgName: redEnemyDash, theFile: "EnemyDashing_Red.png" },

		{ imgName: yellowBossIdle, theFile: "Boss_Idle_Yellow.png" },
		{ imgName: yellowBossWalk, theFile: "BossWalking_Yellow.png" },
		{ imgName: yellowBossPunch, theFile: "BossPunching_Yellow.png" },
		{ imgName: yellowBossKick, theFile: "BossKicking_Yellow.png" },
		{ imgName: yellowBossCrouch, theFile: "BossCrouching_Yellow.png" },
		{ imgName: yellowBossCrouchPunch, theFile: "BossCrouching_Yellow.png" },
		{ imgName: yellowBossSweep, theFile: "BossCrouchPunch_Yellow.png" },

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

		// player related
		{ imgName: playerIdleWhite, theFile: "Player_Idle_White.png"},
		{ imgName: playerIdleYellow, theFile: "Player_Idle_Yellow.png"},
		{ imgName: playerIdleTan, theFile: "Player_Idle_Tan.png"},
		{ imgName: playerIdleBrown, theFile: "Player_Idle_Brown.png"},
		{ imgName: playerIdleRed, theFile: "Player_Idle_Red.png"},
		{ imgName: playerIdleBlack, theFile: "Player_Idle_Black.png"},
		{ imgName: playerWalkWhite, theFile: "player_Walk_White.png"},
		{ imgName: playerWalkYellow, theFile: "player_Walk_Yellow.png"},
		{ imgName: playerWalkTan, theFile: "player_Walk_Tan.png"},
		{ imgName: playerWalkBrown, theFile: "player_Walk_Brown.png"},
		{ imgName: playerWalkRed, theFile: "player_Walk_Red.png"},
		{ imgName: playerWalkBlack, theFile: "player_Walk_Black.png"},
		{ imgName: playerWalkBack, theFile: "Player_Walk-Backwards_Condensed.png"},
		{ imgName: playerPunchWhite, theFile: "Player_Punch_White.png"},
		{ imgName: playerPunchYellow, theFile: "Player_Punch_Yellow.png"},
		{ imgName: playerPunchTan, theFile: "Player_Punch_Tan.png"},
		{ imgName: playerPunchBrown, theFile: "Player_Punch_Brown.png"},
		{ imgName: playerPunchRed, theFile: "Player_Punch_Red.png"},
		{ imgName: playerPunchBlack, theFile: "Player_Punch_Black.png"},
		{ imgName: playerKickWhite, theFile: "Player_Kick_White.png"},
		{ imgName: playerKickYellow, theFile: "Player_Kick_Yellow.png"},
		{ imgName: playerKickTan, theFile: "Player_Kick_Tan.png"},
		{ imgName: playerKickBrown, theFile: "Player_Kick_Brown.png"},
		{ imgName: playerKickRed, theFile: "Player_Kick_Red.png"},
		{ imgName: playerKickBlack, theFile: "Player_Kick_Black.png"},
		{ imgName: playerKnockbackWhite, theFile: "Player_Knockback_White.png"},
		{ imgName: playerKnockbackYellow, theFile: "Player_Knockback_Yellow.png"},
		{ imgName: playerKnockbackTan, theFile: "Player_Knockback_Tan.png"},
		{ imgName: playerKnockbackBrown, theFile: "Player_Knockback_Brown.png"},
		{ imgName: playerKnockbackRed, theFile: "Player_Knockback_Red.png"},
		{ imgName: playerKnockbackBlack, theFile: "Player_Knockback_Black.png"},
		{ imgName: wooshPunchPic, theFile: "wooshPunch.png"},
		{ imgName: wooshKickPic, theFile: "wooshKick.png"},
		{ imgName: wooshKickPic2, theFile: "wooshKick2.png"},
		{ imgName: wooshHurtPic, theFile: "wooshHurt.png"},
        { imgName: wooshKnockoutPic, theFile: "wooshKnockout.png"},
        { imgName: wooshDashPlayerPic, theFile: "wooshDashPlayer.png"},
        { imgName: wooshDashEnemyPic, theFile: "wooshDashEnemy.png"},
        { imgName: wooshDashPlayerLPic, theFile: "wooshDashPlayerL.png"},
        { imgName: wooshDashEnemyLPic, theFile: "wooshDashEnemyL.png"},
        

		// UI
		{ imgName: titleBlock, theFile: "title_screen_menu_block.png"},
		{ imgName: titleScreenBird, theFile: "bird_sprite-flap-sheet.png"},
		{ imgName: selector, theFile: "title_screen_yinyang_selector.png"},
		{ imgName: jpFontImg, theFile: "JPFont.png"},
	];

	picsToLoad = imageList.length;

	for (let i = 0; i < imageList.length; i++) {

		beginLoadingImage(imageList[i].imgName, imageList[i].theFile);

	} // end of for imageList

} // end of function loadImages