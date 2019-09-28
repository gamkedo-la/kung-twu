/**
 * Starting as an abstraction of what is written in japaneseFont for general Sprite-based fonts.
 * A Mono-spaced font, with a rectangular grid.
 * Please use the SpriteFontManager.create to generate a SpriteFontMap.
 * @param {string} key The key or name of this SpriteFont, which is useful for a SpriteFontManager to manage, or simply for your own reference.
 * @param {HTMLImageElement} img The image of the font.
 * @param {Map<string, {x: number, y: number}} fontMap The string array of array (list of rows containing a list) of string characters
 * @param {number} charWidth The number of pixels wide each character is
 * @param {number} charHeight The number of pixels high each character is
 */
function SpriteFont(key, img, fontMap, charWidth, charHeight) {
	this.key = key;
	this.img = fontImg;
	this.charWidth = charWidth;
	this.charHeight = charHeight;
	this.positions = fontMap;
} // end SpriteFont class
