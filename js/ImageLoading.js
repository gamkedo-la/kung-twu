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
const gamkedoLogoPic = document.createElement("img");
function loadGamkedoLogo() {
    gamkedoLogoPic.onload = function() {
        //Draw the Gamkedo Logo Image
        canvasContext.drawImage(this, 0, 0);

        //Begin loading the Start Image
        loadStartImagePic();

        //Show the Gamkedo Logo Image for 1 second
        setTimeout(function() {
            showStartImage();
        }, 1000);
    }
    
    gamkedoLogoPic.src = assetPath.Image + "TempGamkedoLogo.png";
}

//-----Load the title screen image-----//
const startImagePic = document.createElement("img");
function loadStartImagePic() {
    startImagePic.onload = function() {
        //Show the Start Image if ready
        showStartImage();

        //Begin Loading remaining images
        loadImages();
    } 
    
    startImagePic.src = assetPath.Image + "TempKungTuStart.png";
}

//-----Load the rest of the game images----//
const tempPic = document.createElement("img");
const tempBackground = document.createElement("img");
const tempPlayer = document.createElement("img");

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

		//temp image
		{imgName: tempPic, theFile: "TiledScreenCapture.gif"},//,

        // enemies
//        { imgName: alienPic, theFile: "alien-anim.png" },

        // backgrounds
        { imgName: tempBackground, theFile: "TempBackground.png" },

        // power ups
//        { imgName: shieldPowerUpPic, theFile: "shieldPowerUp.png" },

        // player related
        { imgName: tempPlayer, theFile: "TempPlayer.png" },

        // UI
//        { imgName: heartPic, theFile: "heart.png" },
    ];

    picsToLoad = imageList.length;

    for (let i = 0; i < imageList.length; i++) {

        beginLoadingImage(imageList[i].imgName, imageList[i].theFile);

    } // end of for imageList

} // end of function loadImages