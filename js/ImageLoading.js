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
    
	startImagePic.src = assetPath.Image + "TempKungTuStart.png";
}

//-----Load the rest of the game images----//
const titleScreen = document.createElement("img");
const titleBlock = document.createElement("img");
const selector = document.createElement("img");
const tempBackground = document.createElement("img");
const tempWindowedWall = document.createElement("img");
const tempTiledWall = document.createElement("img");
const jpFont = document.createElement("img");
const tempOverhead = document.createElement("img");
const roofTileTop = document.createElement("img");
const roofTileBottom = document.createElement("img");
const floorboardSheet = document.createElement("img");
const tempColumn = document.createElement("img");
const tempEnemyIdlePic = document.createElement("img");
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
		{ imgName: tempEnemyIdlePic, theFile: "TempEnemy.png" },

		// backgrounds
		{ imgName: tempBackground, theFile: "TempBackground.png" },
		{ imgName: tempWindowedWall, theFile: "TempTiledBackground.png" },
		{ imgName: tempTiledWall, theFile: "TempTiledBackgroundWall.png" },
		{ imgName: tempOverhead, theFile: "TempOverhead.png" },
		{ imgName: roofTileTop, theFile: "roof-tile-top.png" },
		{ imgName: roofTileBottom, theFile: "roof-tile-bottom.png" },
		{ imgName: floorboardSheet, theFile: "Floor-Frames.png" },
		{ imgName: tempColumn, theFile: "TempColumn.png" },

		// power ups
		//        { imgName: shieldPowerUpPic, theFile: "shieldPowerUp.png" },

		// player related
		{ imgName: playerIdle, theFile: "Player_Idle_Condensed.png"},
		{ imgName: playerWalkFwd, theFile: "Player_Walk-Forward_Condensed.png"},
		{ imgName: playerWalkBack, theFile: "Player_Walk-Backwards_Condensed.png"},
		{ imgName: playerPunch, theFile: "Player_Punch_Condensed.png"},
		{ imgName: playerKick, theFile: "Player_Kick_Condensed.png"},

		// UI
		//        { imgName: heartPic, theFile: "heart.png" },
		{ imgName: titleScreen, theFile: "title_screen.png"},
		{ imgName: titleBlock, theFile: "title_screen_menu_block.png"},
		{ imgName: selector, theFile: "title_screen_yinyang_selector.png"},
		{ imgName: jpFont, theFile: "JPFont.png"},
	];

	picsToLoad = imageList.length;

	for (let i = 0; i < imageList.length; i++) {

		beginLoadingImage(imageList[i].imgName, imageList[i].theFile);

	} // end of for imageList

} // end of function loadImages