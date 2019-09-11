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
const windowedWall = document.createElement("img");
const tiledWall = document.createElement("img");
const wallGradient = document.createElement("img");
const jpFont = document.createElement("img");
const roofTileTop = document.createElement("img");
const roofPosts = document.createElement("img");
const roofTileBottom = document.createElement("img");
const floorboardSheet = document.createElement("img");
const column = document.createElement("img");
const basicEnemyIdle = document.createElement("img");
const basicEnemyWalk = document.createElement("img");
const basicEnemyKick = document.createElement("img");
const basicEnemyPunch = document.createElement("img");
const playerIdle = document.createElement("img");
const playerWalkFwd = document.createElement("img");
const playerWalkBack = document.createElement("img");
const playerPunch = document.createElement("img");
const playerKick = document.createElement("img");

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

		// backgrounds
		{ imgName: windowedWall, theFile: "TempTiledBackground.png" },
		{ imgName: tiledWall, theFile: "TempTiledBackgroundWall.png" },
		{ imgName: roofTileTop, theFile: "RoofBricks.png" },
//		{ imgName: roofTileTop, theFile: "Rounded_Roof_Tile.png" },
		{ imgName: roofPosts, theFile: "perspective_Posts.png" },
//		{ imgName: roofTileTop, theFile: "roof-tile-top.png" },
		{ imgName: roofTileBottom, theFile: "roof-tile-bottom.png" },
		{ imgName: floorboardSheet, theFile: "Floor-Frames.png" },
		{ imgName: column, theFile: "column_01.png" },
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