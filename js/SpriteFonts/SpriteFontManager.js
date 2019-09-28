/**
 * Manager of SpriteFont objects, which assists in their creation, storage, and getting on demand.
 */
function SpriteFontManager() {
  /** @type Map<string, SpriteFont> */
  const _fonts = new Map();
  
  /**
   * Creates a new SpriteFont and adds it to the manager. Please check the _generateFontMap function in SpriteFontManager for more info on these parameters.
   * @param {string} refKey The string by which to reference the font
   * @param {{chars: string[][], numRows: number, numColumns: number, charWidth: number, charHeight: number, offsetX: number, offsetY: number, nullString: string, img: HTMLImageElement}} config
   */
  this.create = function(refKey, config) {
    const fontMap = _generateFontMap(config.chars, config.numRows, config.numColumns, config.charWidth, config.charHeight, config.offsetX, config.offsetY, config.nullString);
    _add(refKey, new SpriteFont(refKey, config.img, fontMap, config.charWidth, config.charHeight));
    return this;
  };

  /**
   * @param {string} refKey The reference key of the SpriteFont to get
   */
  this.get = function(refKey) {
    const _spriteFont = _fonts.get(refKey);
    if (_spriteFont) {
      return _spriteFont;
    } else {
      throw new Error("Attempted to get a SpriteFont with the key \"" + refKey + "\", that has not been entered into this SpriteFontManager!")
    }
  }

  function _add(key, spriteFont) {
    if (_fonts.has(key)) {
      throw new Error("Attempting to add a duplicate SpriteFont string key to SpriteFontManager!");
    }
    _fonts.set(key, spriteFont);
  }

  /**
	 * @function _generateFontMap (chars, numRows, numColumns, charWidth, charHeight, offsetX, offsetY, nullString)
	 * Generates a map of image source positions to access like so:
	 * ```javascript
	 * fontPositions.get("メ");
	 * ```
	 * It returns an object with x and y positions of the top-left corners of the character's source position.
	 * ```javascript
	 * { x: 10, y: 48}
	 * ```
	 * This map is created from an array of arrays (list of rows each containing a list of string characters).
	 * Assumes the map we are generating for is rectangular, even-spaced with consistent width and height.
	 * The character list that you pass in must have an entry for each spot in the grid. A particular string 
	 * can be skipped that you pass in nullString param. The intent behind nullString is to make it easy to spot which
	 * entries are to be skipped in your code. It should not be a character you intend to use by the font.
	 * @param {string[][]} chars The string array of array (list of rows containing a list) of string characters
	 * @param {number} numRows The number of intended rows of this font map
	 * @param {number} numColumns The number of intended columns of this font map
	 * @param {number} charWidth The number of pixels wide each character is
	 * @param {number} charHeight The number of pixels high each character is
	 * @param {number} offsetX The number of pixels to offset x by before calculating rows/cols
	 * @param {number} offsetY The number of pixels to offset y by before calculating rows/cols
	 * @param {string} nullString The marking string that is used in the character row array for skipping that particular character by this generator
	 * @returns {Map<string, {x: number, y: number}>}
	 */
	function _generateFontMap(chars, numRows, numColumns, charWidth, charHeight, offsetX, offsetY, nullString) {
		/** @type Map<string, {x: number, y: number}> */
		const map = new Map();

		// Iterate over each row
		for (let i = 0; i < numRows; i++) {
			// Check that the row array has the right number of rows. Throw an error if not.
			if (chars.length !== numRows) {
				throw new Error("Character Map failed to generate because the number of intended rows (" + numRows + ") does not match the actual number of rows the character array (" + chars.length + ")");
			}
			// Check that each row has the right number of characters per row. Throw an error if not.
			if (chars[i].length !== numColumns) {
				throw new Error("Character Map failed to generate because row " + i + " does not contain the intended number of  " + numColumns + "string/char entries. It is actually " + chars[i].length + " entries long.");
			}

			// Iterate over each column
			for (let j = 0; j < numColumns; j++) {
				const char = chars[i][j];
				// Check that each string is valid: one char long or the nullString. If not throw an error.
				if (char.length !== 1 && char !== nullString) {
					throw new Error("Character Map failed to generate because character \"" + char + "\" in row " + i + ", position " + j +" is invalid! It is either longer than one char or not the nullString \"" + nullString + "\"");
				}

				if (char === nullString) {
					// char is nullString do nothing!
				} else {
					// char is writable, enter it into the Map
					const position = {
						x: offsetX + (j * charWidth),
						y: offsetY + (i * charHeight)
					}
					map.set(char, position);
				}
			} // end for each column
		} // end for each row
		return map; // It's a miracle! We've finished creating the position map!
	} // end generateFontMap function

}