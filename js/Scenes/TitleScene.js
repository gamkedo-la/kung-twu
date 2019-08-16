//TitleScene
function TitleScene() {
	const MENU_BG_COLOR = "#010139";

    let selectorPositionsIndex = 0;
    let selectorPosition = {x:0, y:0};
    let selectorSprite;
    const selections = [
        SCENE.GAME,
        SCENE.HELP,
        SCENE.SETTINGS,
        SCENE.CREDITS
    ];
    const buttonHeight = 25;//TODO: Adjust this size based on custom font
    const buttonTitlePadding = 2;
    const buttons = [];

    this.transitionIn = function() {
        let mainMenuX = 0;
        const mainMenuY = canvas.height / 2;
        const deltaY = 1.25 * buttonHeight;
        
        if(buttons.length === 0) {
            buttons.push(buildPlayButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

            mainMenuX = (canvas.width / 2) - (buttons[0].getBounds().width / 2);
            buttons[0].updateXPosition(mainMenuX);

            buttons.push(buildHelpButton(mainMenuX, mainMenuY + deltaY, buttonHeight, buttonTitlePadding));
            buttons.push(buildSettingsButton(mainMenuX, mainMenuY + 2 * deltaY, buttonHeight, buttonTitlePadding));
            buttons.push(buildCreditsButton(mainMenuX, mainMenuY + 3 * deltaY, buttonHeight, buttonTitlePadding));

            buildLanguageButtons();
        } else {
            updateButtonTitles();
        }

        selectorPositionsIndex = 0;
    };

    this.transitionOut = function() {

    };

    this.run = function(deltaTime) {
	    update(deltaTime);
	    
	    draw(deltaTime, buttons, selectorPositionsIndex);
    };

    this.control = function(newKeyEvent, pressed, pressedKeys) {
        if (pressed) {//only act on key released events => prevent multiple changes on single press
            return false;
        }
        
        switch (newKeyEvent) {
            case ALIAS.UP:
            case ALIAS.LEFT:
                selectorPositionsIndex--;
                if (selectorPositionsIndex < 0) {
                    selectorPositionsIndex += selections.length;
                }
                return true;
            case ALIAS.DOWN:
            case ALIAS.RIGHT:
                selectorPositionsIndex++;
                if (selectorPositionsIndex >= selections.length) {
                    selectorPositionsIndex = 0;
                }
                return true;
            case ALIAS.SELECT1:
                console.log("Activated the current button");
                SceneState.setState(selections[selectorPositionsIndex]);
                return true;
            case ALIAS.SELECT2:
                console.log("Selected the Play button");
                SceneState.setState(SCENE.GAME);
                return true;
            case ALIAS.HELP:
                console.log("Selected the Help Button");
                SceneState.setState(SCENE.HELP);
                return true;
            case ALIAS.CREDITS:
                console.log("Selected the Credits Button");
                SceneState.setState(SCENE.CREDITS);
                return true;
            case ALIAS.SETTINGS:
                console.log("Selected the Settings Button");
                SceneState.setState(SCENE.SETTINGS);
                return true;
            case ALIAS.CHEATS:
                CHEATS_ACTIVE = !CHEATS_ACTIVE;
                return true;
            case ALIAS.DEBUG:
                DEBUG = !DEBUG;
                console.log("Debug? " + DEBUG);
                return true;
            case ALIAS.POINTER:
                checkButtons();
                return true;
        }
        
        return false;
    };

    const buildPlayButton = function(x, y, height, padding) {
        const thisClick = function() {
            console.log("Clicked the Play Button");
            SceneState.setState(SCENE.GAME);
        }

        return new UIButton(STRINGS_KEY.Play,
                        x, y, height, padding, thisClick, Color.Red);
    }

    const buildHelpButton = function(x, y, height, padding) {
        const thisClick = function() {
            console.log("Clicked the Help Button");
            SceneState.setState(SCENE.HELP);
        }

        return new UIButton(STRINGS_KEY.Help, x, y, height, padding, thisClick, Color.Green);
    }

    const buildSettingsButton = function(x, y, height, padding) {
        const thisClick = function() {
            console.log("Clicked the Settings Button");
            SceneState.setState(SCENE.SETTINGS);
        }

        return new UIButton(STRINGS_KEY.Settings, x, y, height, padding, thisClick, Color.Aqua);
    }

    const buildCreditsButton = function(x, y, height, padding) {
        const thisClick = function() {
            console.log("Clicked the Credits Button");
            SceneState.setState(SCENE.CREDITS);
        }

        return new UIButton(STRINGS_KEY.Credits, x, y, height, padding, thisClick, Color.Purple);
    }

    const updateButtonTitles = function() {
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].updateTitle();
        }
    }

    const buildLanguageButtons = function() {
        const languages = Object.keys(Language);

        const interButtonPadding = 3 * buttonHeight / 2;
        let xPos = interButtonPadding;
        const languageButtons = [];
        for(let i = 0; i < languages.length; i++) {
            const thisClick = function() {
                currentLanguage = STRINGS_KEY[languages[i]];
                localStorage.setItem(localStorageKey.Language, currentLanguage);
                updateButtonTitles();
            }

            languageButtons.push(new UIButton(STRINGS_KEY[languages[i]], 
                xPos, canvas.height - (3 * buttonHeight / 2), 
                buttonHeight, buttonTitlePadding, thisClick, Color.Red));

            xPos += (buttons[buttons.length - 1].getBounds().width);
            xPos += interButtonPadding;
        }

        const leftMost = languageButtons[0].getBounds().x;
        const lastButton = languageButtons[languageButtons.length - 1];
        const rightMost = lastButton.getBounds().x + lastButton.getBounds().width;
        let currentX = (canvas.width - (rightMost - leftMost)) / 2;

        for(let i = 0; i < languageButtons.length; i++) {
            const thisButton = languageButtons[i];
            thisButton.updateXPosition(currentX);
            currentX += (thisButton.getBounds().width + interButtonPadding);
            buttons.push(thisButton);
        }
    }

    const checkButtons = function() {
        let wasClicked = false;
        for(let i = 0; i < buttons.length; i++) {
            wasClicked = buttons[i].respondIfClicked(mouseX, mouseY);
            if(wasClicked) {break;}
        }
    }
    
    const printMenu = function(menuItems, selected) {
        for(let i = 0; i < menuItems.length; i++) {
            menuItems[i].draw();
        }
	}
	
	const update = function(deltaTime) {
	}
	
	const draw = function(deltaTime, buttons, selectorPositionIndex) {
		// render the menu background
        drawBG();
        
		drawTitle();

        // render menu
        printMenu(buttons, selectorPositionIndex);        
	}
	
	const drawBG = function() {
        // fill the background since there is no image for now
        drawRect(0, 0, canvas.width, canvas.height, MENU_BG_COLOR);
    }
    
    const drawTitle = function() {
	    colorText(getLocalizedStringForKey(STRINGS_KEY.Title), canvas.width / 2, canvas.height / 3, Color.White, Fonts.MainTitle, TextAlignment.Center);
	    colorText(getLocalizedStringForKey(STRINGS_KEY.Subtitle), canvas.width / 2, canvas.height / 3 + 40, Color.White, Fonts.Subtitle, TextAlignment.Center);
    }
        
    return this;
};