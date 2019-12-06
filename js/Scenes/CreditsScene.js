var creditsList = [
"You can use arrow keys or mouse drag to manually scroll credits.",
"H Trayford: project lead, core gameplay (main movement, attacking, collision hitboxes, enemies, level structure), enemy AI, localization support, floor/roof parallax effect, foreground fade, assorted integration, game over and belt award screens, menu key support, gamepad support, assist mode options, prop collision, sprite atlas creation, tuning and bug fixes",
"Marc Silva: Main player animations (idle, punch, kick, falling, walk, blocking, crouch, crouch block, sweep kick), gameplay feedback",
"Jeff \"Axphin\" Hanlon: title screen background art, boss sprites (most - adapted from player sprites), menu yin yang cursor, roof tiles, combat sound effects, title bird art, columns, floor boards effect, wall shadow effect, plain wall, zen ink logo rasterization, image loading improvement, level wall scrolls (x5), UI section border, boss animation timing tweaks, knockback sprites, atlas boss states, gameplay feedback",
"Vaan Hope Khani: Japanese letter support, controls remapping functionality, initial menu support, healthbar, sound effects (bone, low pain, steps, menu navigation, low health, 1up, swish), UI background, font system, art (lamp, table, statue, tapestry, carpet, tree, rock, bamboo, background speaker, building, painting, broken vase), addl. Japanese localization, gameplay feedback",
"Christer \"McFunkypants\" Kaitila: whoosh air particles and related visual effects, decoration prop art system, keyboard control improvements, help screen, initial French localization, text drop shadow, sound debug toggle, knockouted out body collision and fade, dash blur, dust and smoke particles, knockout stars, hourglass for GUI, zen ink logo, performance optimizations, foosteps visuals, flash from damage, delay after player death, timing experimentation, gameplay feedback",
"Aaron Ishibashi: event-based input handler and related UI scripting, music fade transition support, advanced timers implementation, improved debug output, addl. extensive sound engine code",
"Jaime Rivas: composed boss music",
"Alan Zaring: composed main gameplay music",
"Jeremiah Franczyk: spritesheets by belt color for player knockback, jump, and helicopter kick",
"Michelly Oliveira: mute toggle, all health meters, score reset bug fixes",
"Stebs: boss spin kick implementation, enemy woosh dashes, localization tweaks",
"Evan Lindsay: camera movement, gamepad movement, gitignore addition",
"Tyler Funk: Idle animation hookup, addl. Japanese localization",
"Simon J Hoffiz: Spanish localization, slide during crouch, credits scroll and related browser interactions",
"Kornel: Polish localization, extensive gameplay feedback",
"Klaim (A. Joël Lamotte): French localization",
"Valentin Lemière: Additional French localization",
"Brian J. Boucher: waterfall painting (based on in-game animation), player sweep attack bug fix",
"Andy King: vase image, waterfall animation",
"Oleksandr Dubrovskyi: Russian localization (initial), canvas CSS fixes",
"Stephanie Patterson: player kick sound effects integration",
"Eugene Meidinger: background music integration",
"Bilal A. Cheema: gamplay feedback",
"Randy Tan Shaoxian: Linux case sensitivity fix",
" ",
"Game made in HomeTeam GameDev, join us at",
"HomeTeamGameDev.com"
];

function lineWrapCredits() { // note: gets calling immediately after definition!
	const newCut = [];
	var maxLineChar = 89;
	var findEnd;
	for(var i=0;i<creditsList.length;i++) {
		while(creditsList[i].length > 0) {
			findEnd = maxLineChar;
			if(creditsList[i].length > maxLineChar) {
				for(var ii=findEnd;ii>0;ii--) {
					if(creditsList[i].charAt(ii) == " ") {
						findEnd=ii;
						break;
					}
				}
			}
			newCut.push(creditsList[i].substring(0, findEnd));
			creditsList[i] = creditsList[i].substring(findEnd, creditsList[i].length);
		}
	}	

	const newerCut = [];
	for(let i = 0; i < newCut.length; i++) {
		const currentLine = newCut[i];
		for(let j = 0; j < currentLine.length; j++) {
			const aChar = currentLine[j];
			if(aChar === ":") {
				if(i !== 0) {
					newerCut.push("\n");
				}

				newerCut.push(currentLine.substring(0, j + 1));
				newerCut.push(currentLine.substring(j + 2, currentLine.length));
				break;
			} else if(j === currentLine.length - 1) {
				if((i === 0) || (i >= newCut.length - 2)) {
					newerCut.push(currentLine);
				} else {
					newerCut.push(currentLine.substring(1, currentLine.length));
				}
			}
		}
	}

	creditsList = newerCut;
}
lineWrapCredits(); // note: calling immediately as part of init, outside the function

//Credits Scene
function CreditsScene() {
	this.name = "Credits";
	let selectorPositionsIndex = 0;
	const selectorPosition = {x:0, y:0};
	const TITLE_Y_POS = 100;
	const selections = [
		SCENE.TITLE,
		SCENE.LEVEL_INTRO
	];
	const buttonHeight = 25;
	const buttonTitlePadding = 2;
	let buttonPadding;
	const buttons = [];

	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		buttonPadding = canvas.width / 40;

		let mainMenuX = 0;
		const mainMenuY = canvas.height - (9 * buttonHeight / 2);
		
		if(buttons.length === 0) {
			buttons.push(buildBackButton(canvas.width / 40, mainMenuY, buttonHeight, buttonTitlePadding));
			buttons.push(buildPlayButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

			updateButtonPositions();

			// support mouse hovers that move the selector
			for (var num=0; num<buttons.length; num++) {
				buttons[num].selectorIndex = num;
			}
		} else {
			updateButtonTitles();
			updateButtonPositions();
		}

		selectorPositionsIndex = 0;
	};

	this.transitionOut = function() {
		this.properties = null;
	};

	this.run = function(deltaTime) {
		update(deltaTime);

		draw();
	};

	this.control = function(newKeyEvent, pressed) {
		if (pressed) {//only act on key released events => prevent multiple changes on single press
			return false;
		}
		
		switch (newKeyEvent) {
		case ALIAS.SELECT2:
			if(pauseManager.getIsPaused()) {
				pauseManager.resumeGame(CAUSE.Keypress);
			}
			SceneState.setState(SCENE.LEVEL_INTRO);
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
		case ALIAS.POINTER:
			checkButtons();
			return true;
		}
		
		return false;
	};

	this.moveSelector = function(num) {
		// used to simulate arrow key press on mousemove so
		// the cursor moves as appropriate when hovering menu
		//console.log("Moving menu menu selector: " + num);
		selectorPositionsIndex = num;
		updateSelectorPosition();
	};

	const update = function(deltaTime) {
		processUserInput();
		processUserPressedInput();

		creditReel(deltaTime);
	};

	const processUserInput = function() {
		const navKeys = inputProcessor.getNewlyActiveKeys();
		for(let key of navKeys) {
			const newNavAction = keyMapper.getNavAction(key);
			if(newNavAction != null) {
				switch(newNavAction) {
				case NAV_ACTION.LEFT:
					selectorPositionsIndex--;
					if (selectorPositionsIndex < 0) {
						selectorPositionsIndex += selections.length;
					}
					updateSelectorPosition();
					sound.playSFX(Sounds.SFX_MenuNav);
					break;			
				case NAV_ACTION.RIGHT:
					selectorPositionsIndex++;
					if (selectorPositionsIndex >= selections.length) {
						selectorPositionsIndex = 0;
					}
					updateSelectorPosition();
					sound.playSFX(Sounds.SFX_MenuNav);
					break;
				case NAV_ACTION.SELECT:
					if(selectorPositionsIndex === 0) {
						SceneState.setState(SceneState.getPreviousState());
					} else {
						pauseManager.resumeGame(CAUSE.Keypress);
						SceneState.setState(selections[selectorPositionsIndex]);
					}
					sound.playSFX(Sounds.SFX_MenuSelect);
					break;
				case NAV_ACTION.BACK:
					break;//nowhere to go 'back' to
				case NAV_ACTION.PAUSE:

				}
			}
		}
	};

	const processUserPressedInput = function() {
		const navKeys = inputProcessor.getCurrentlyActiveKeys();
		for(let key of navKeys) {
			const newNavAction = keyMapper.getNavAction(key);
			if(newNavAction != null) {
				switch(newNavAction) {
				case NAV_ACTION.UP://this falls through and moves the selector, make it change credits instead
					creditPosY = creditPosY - 5;
					break;
				case NAV_ACTION.DOWN://this falls through and moves the selector, make it change credits instead
					creditPosY = creditPosY + 5;
					break;
				}
			}
		}
	};

	const updateSelectorPosition = function() {
		const theseBounds = buttons[selectorPositionsIndex].getBounds();
		let widthToUse = theseBounds.width + (buttonHeight / 2);
		if(selectorPositionsIndex === 1) {
			widthToUse = -(selector.width + (buttonHeight / 2));
		}

		selectorPosition.x = theseBounds.x + widthToUse;
		selectorPosition.y = theseBounds.y + (buttonHeight / 2) - (selector.height / 2);
	};

	const checkButtons = function() {
		let wasClicked = false;
		for(let button of buttons) {
			wasClicked = button.respondIfClicked(mouseX, mouseY);
			if(wasClicked) {break;}
		}
	};

	const buildPlayButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.LEVEL_INTRO);
		};

		return new UIButton(STRINGS_KEY.Play, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildBackButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SceneState.getPreviousState());
		};

		return new UIButton(STRINGS_KEY.Back, x, y, height, padding, thisClick, Color.Purple);
	};

	const updateButtonPositions = function() {
		buttons[0].updateXPosition(buttonPadding);
		const button1Width = buttons[1].getBounds().width;
		buttons[1].updateXPosition(canvas.width - (button1Width + buttonPadding));

		updateSelectorPosition();
	};

	const updateButtonTitles = function() {
		for(let button of buttons) {
			button.updateTitle();
		}
	};

	const printButtons = function() {
		for(let button of buttons) {
			button.draw();
		}
	};

	const draw = function() {
		// render the menu background
		drawBG();
		
		drawTitle();

		drawCredits();

		// render menu
		printButtons();        
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, 0, 0);

		canvasContext.save();
		canvasContext.fillStyle = Color.Black;
		canvasContext.globalAlpha = 0.8;
		canvasContext.fillRect(0,0,canvas.width,canvas.height);
		canvasContext.restore();

		canvasContext.drawImage(titleScreenDecore, 0, 0); 
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);            
	};
	
	const drawTitle = function() {
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.CreditsScreenTitle),{x:canvas.width / 2,y:TITLE_Y_POS}, TextAlignment.Center, 1);
	};

	//all variables relating to credit manipulation
	var creditPosY = 300;
	var mouseToDrag = false;
	var creditRun = true;
	var lastScrollPosition = 100;
	var previousMousePosY;
	var mousePos = {x:0, y:0};

	const drawCredits = function() {
		for(var i=0; i<creditsList.length; i++) {
			var yPos = creditPosY + i * 30;
			if (200 < yPos && yPos < 600) {
				if((i > 0) && (creditsList[i - 1] === "\n")) {
					colorText(
						creditsList[i],
						90, yPos,
						Color.White, Fonts.BoldCredits, TextAlignment.Left);
				} else if(i === creditsList.length - 2) {
					colorText(
						creditsList[i],
						canvas.width / 2, yPos,
						Color.White, Fonts.BoldCredits, TextAlignment.Center);
				} else if(i === creditsList.length - 1) {
					colorText(
						creditsList[i],
						canvas.width / 2, yPos + 30,
						"#54b0bd", Fonts.Subtitle, TextAlignment.Center);
				} else {
					colorText(
						creditsList[i],
						90, yPos,
						Color.White, Fonts.CreditsText, TextAlignment.Left);
				}
			}
		}
	};

	const creditReel = function(deltaTime) {
		if(creditRun) {
			creditPosY -= (0.025 * deltaTime);
		}
		canvas.addEventListener("wheel", creditScroll);
		canvas.addEventListener("mousedown", creditStop);
		canvas.addEventListener("mouseup", noCreditMouseDrag);
		canvas.addEventListener("mousemove",creditMouseDrag);
	};

	// function for user to control credits by scrolling with mouse wheel
	const creditScroll = function(e) {
		//console.log(e.deltaY);

		var newScrollPosition = lastScrollPosition + e.deltaY;
		//console.log (newScrollPosition);

		if (newScrollPosition > lastScrollPosition) {
			//upward scroll code
			creditPosY -= 2.5;
		}

		if (newScrollPosition < lastScrollPosition) { //downward scroll code
			creditPosY += 2.5;
		}
	};

	function creditStop () {
		creditRun = false;
		mouseToDrag = true;	
	}

	function noCreditMouseDrag() {
		mouseToDrag = false;
		creditRun = true;
	}

	function creditMouseDrag(evt) {
		previousMousePosY = mousePos.y;
		if (mouseToDrag) {
			mousePos = calculateMousePos(evt);
			if (mousePos.y > previousMousePosY) {
				creditPosY +=2.5;
			} else if (mousePos.y < previousMousePosY) {
				creditPosY -=2.5;
			}
		}
	}		

	function calculateMousePos(evt) {
		var rect = canvas.getBoundingClientRect();
		var root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;
		return {
			x:mouseX,
			y:mouseY
		};
	}

}