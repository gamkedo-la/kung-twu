const SpriteFontAlignment = {
  LEFT: "LEFT",
  CENTER: "CENTER",
  RIGHT: "RIGHT"
}; Object.freeze(SpriteFontAlignment);

/**
 * A component that can draw a SpriteFont
 * @param {SpriteFont} font The font this SpriteFontRenderer will render with. May be swapped out on demand.
 * @param {string} text The starting text of this renderer
 * @param {string} align A value from SpriteFontAlignment that determines where the text will be anchored at
 * @param {number} x The x-coordinate position the renderer will start at
 * @param {number} y The x-coordinate position the renderer will start at
 */
function SpriteFontRenderer(font, x, y, text, align, startEnabled = true) {
  const _DEBUG = true;
  /**
   * Whether or not to render..
   */
  this.enabled = startEnabled;
  /**
   * The x-coordinate position.
   * @type number
   */
  this.x = x;
  /**
   * The y-coordinate position .
   * @type number
   */
  this.y = y;
  /**
   * NOT IMPLEMENTED YET!
   * Contains a value from SpriteFontAlignment that indicates where the alignment anchor will be.
   * @type string
   */
  this.align = align;
  /** 
   * The font this SpriteFontRenderer will draw with. May be swapped out on demand.
   * @type SpriteFont 
   */
  this.font = font;
  /**
   * The text this SpriteFontRenderer will render. May be swapped out on demand.
   * @type string
   */
  this.text = text;

  /**
   * Additional Spacing
   * @type number
   */
  this.spacing = 0;
  /**
   * Draw the text!
   */
  this.draw = function() {
    /**@type boolean */ const enabled = this.enabled;
    /**@type SpriteFont */ const font = this.font;

    if (font && enabled) {
      /**@type number */ const x = this.x;
      /**@type number */ const y = this.y;
      /**@type string */ const text = this.text;
      /**@type string */ const align = this.alignment;
      /**@type CanvasRenderingContext2D */ const ctx = canvasContext;

      for (let i = 0; i < text.length; i++) {
        const pos = font.positions.get(text[i]);
        if (pos) {
          // Definition exists for the character.
          ctx.drawImage(font.img, pos.x, pos.y, font.charWidth, font.charHeight, x + (i * font.charWidth), y, font.charWidth, font.charHeight);
        } else {
          // There is no definition for the character
          if (_DEBUG) console.log("Warning! Tried to render a character that does not have a definition. The char \"" + text[i] + "\" in SpriteTextRenderer text does not have a definition in font \"" + font.key + "\"");
        }
      }
    }
    
  }
}