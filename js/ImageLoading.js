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
const windowedWall = document.createElement("img");
const tiledWall = document.createElement("img");
const wallGradient = document.createElement("img");
const jpFont = document.createElement("img");
const roofTileTop = document.createElement("img");
const roofboardSheet = document.createElement("img");
const roofTileBottom = document.createElement("img");
const floorboardSheet = document.createElement("img");
const lvl1Column = document.createElement("img");
const lvl2Column = document.createElement("img");
const lvl3Column = document.createElement("img");
const basicEnemyIdle = document.createElement("img");
const basicEnemyWalk = document.createElement("img");
const basicEnemyKick = document.createElement("img");
const basicEnemyPunch = document.createElement("img");
const yellowEnemyIdle = document.createElement("img");
const yellowEnemyWalk = document.createElement("img");
const yellowEnemyKick = document.createElement("img");
const yellowEnemyPunch = document.createElement("img");
const tanEnemyIdle = document.createElement("img");
const tanEnemyWalk = document.createElement("img");
const tanEnemyKick = document.createElement("img");
const tanEnemyPunch = document.createElement("img");
const brownEnemyIdle = document.createElement("img");
const brownEnemyWalk = document.createElement("img");
const brownEnemyKick = document.createElement("img");
const brownEnemyPunch = document.createElement("img");
const redEnemyIdle = document.createElement("img");
const redEnemyWalk = document.createElement("img");
const redEnemyKick = document.createElement("img");
const redEnemyPunch = document.createElement("img");
const playerIdle = document.createElement("img");
const playerWalkFwd = document.createElement("img");
const playerWalkBack = document.createElement("img");
const playerPunch = document.createElement("img");
const playerKick = document.createElement("img");
const wooshPic = document.createElement("img");

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
		{ imgName: yellowEnemyIdle, theFile: "TempEnemy_Yellow.png" },
		{ imgName: yellowEnemyWalk, theFile: "EnemyWalking_Yellow.png" },
		{ imgName: yellowEnemyKick, theFile: "EnemyKicking_Yellow.png" },
		{ imgName: yellowEnemyPunch, theFile: "EnemyPunching_Yellow.png" },
		{ imgName: tanEnemyIdle, theFile: "TempEnemy_Tan.png" },
		{ imgName: tanEnemyWalk, theFile: "EnemyWalking_Tan.png" },
		{ imgName: tanEnemyKick, theFile: "EnemyKicking_Tan.png" },
		{ imgName: tanEnemyPunch, theFile: "EnemyPunching_Tan.png" },
		{ imgName: brownEnemyIdle, theFile: "TempEnemy_Brown.png" },
		{ imgName: brownEnemyWalk, theFile: "EnemyWalking_Brown.png" },
		{ imgName: brownEnemyKick, theFile: "EnemyKicking_Brown.png" },
		{ imgName: brownEnemyPunch, theFile: "EnemyPunching_Brown.png" },
		{ imgName: redEnemyIdle, theFile: "TempEnemy_Red.png" },
		{ imgName: redEnemyWalk, theFile: "EnemyWalking_Red.png" },
		{ imgName: redEnemyKick, theFile: "EnemyKicking_Red.png" },
		{ imgName: redEnemyPunch, theFile: "EnemyPunching_Red.png" },

		// backgrounds
		{ imgName: uiScreenBg, theFile: "UI_BG.png"},
		{ imgName: windowedWall, theFile: "TempTiledBackground.png" },
		{ imgName: tiledWall, theFile: "TempTiledBackgroundWall.png" },
		{ imgName: roofTileTop, theFile: "RoofBricks.png" },
		{ imgName: roofTileBottom, theFile: "roof-tile-bottom.png" },
		{ imgName: roofboardSheet, theFile: "Roof-Frames.png" },
		{ imgName: floorboardSheet, theFile: "Floor-Frames.png" },
		{ imgName: lvl1Column, theFile: "column_01.png" },
		{ imgName: lvl2Column, theFile: "column_02.png" },
		{ imgName: lvl3Column, theFile: "column_03.png" },
		{ imgName: titleScreenBG, theFile: "title_screen_bg.png"},
		{ imgName: titleImage, theFile: "title_screen_ktname.png"},
		{ imgName: titleScreenDecore, theFile: "title_screen_decor.png"},
		{ imgName: wallGradient, theFile: "wall-gradient.png"},

		// player related
		{ imgName: playerIdle, theFile: "Player_Idle_Condensed.png"},
		{ imgName: playerWalkFwd, theFile: "Player_Walk-Forward_Condensed.png"},
		{ imgName: playerWalkBack, theFile: "Player_Walk-Backwards_Condensed.png"},
		{ imgName: playerPunch, theFile: "Player_Punch_Condensed.png"},
		{ imgName: playerKick, theFile: "Player_Kick_Condensed.png"},
		{ imgName: wooshPic, theFile: "woosh.png"},

		// UI
		{ imgName: titleBlock, theFile: "title_screen_menu_block.png"},
		{ imgName: titleScreenBird, theFile: "bird_sprite-flap-sheet.png"},
		{ imgName: selector, theFile: "title_screen_yinyang_selector.png"},
		{ imgName: jpFont, theFile: "JPFont.png"},
	];

	picsToLoad = imageList.length;

	for (let i = 0; i < imageList.length; i++) {

		beginLoadingImage(imageList[i].imgName, imageList[i].theFile);

	} // end of for imageList

} // end of function loadImages