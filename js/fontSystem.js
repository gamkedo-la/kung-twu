/**
 * 
 * @param {HTMLImageElement} jpFont 
 * @param {{width: number, height: number}} charSize 
 * @param {CanvasRenderingContext2D} context 
 */
function fontSystem(jpFont, charSize, context) {
	let letters = [];
	let lettersStartPos = [];
	
	this.getString = function(text,position, alignment, drawwidth){
		for(let i = 0; i < text.length; i++) {
			let letter = text.charAt(i);
			let letterPos = alignment(i, position, align, text.length);
			letters.push(letter, charSize, {x:position.x, y:position.y}, context);
			lettersStartPos.push(letterPos);
			console.log(letters);
		}
	};

	this.getStringWidth = function(text, scale, language = currentLanguage) {
		let totalWidth = 0;
		for(let i = 0; i < text.length; i++) {
			const char1 = text[i];
			const char2 = text[i+1];
			totalWidth += (scale * advancementForLanguageAndCharacter(language, char1, char2));
		}
		return totalWidth;
	};

	this.getCharacterHeight = function(scale) {
		return charSize.height * scale;
	};

	const leftSideOfTextForPosAlignmentAndScale = function(width, xPos, alignment) {
		switch(alignment) {
		case TextAlignment.Left: return xPos;
		case TextAlignment.Center: return (xPos - width / 2);
		case TextAlignment.Right: return (xPos - width);
		}
	};

	this.printTextAt = function(text, position, alignment = TextAlignment.Left, scale = 1, language = currentLanguage, alpha = 1) {
		const stringWidth = this.getStringWidth(text, scale);
		const startPos = leftSideOfTextForPosAlignmentAndScale(stringWidth, position.x, alignment);
		let drawPos = startPos;
		
		// set alpha
		context.save();
		context.globalAlpha = alpha;

		for(let i = 0; i < text.length; i++) {	//Go through all characters
			const thisFrame = this.findLetterCorner(text.charAt(i));	// look up each character of our text in address sheet
			context.drawImage(jpFont, thisFrame.x, thisFrame.y, charSize.width, charSize.height, drawPos, position.y, charSize.width * scale, charSize.height * scale);
			
			const advance = scale * advancementForLanguageAndCharacter(language, text[i], text[i+1]);
			drawPos += advance;
		}

		// restore alpha value
		context.restore();
	};

	this.printRedTextAt = function(text, position, alignment = TextAlignment.Left, scale = 1, language = currentLanguage, alpha = 1) {
		const stringWidth = this.getStringWidth(text, scale);
		const startPos = leftSideOfTextForPosAlignmentAndScale(stringWidth, position.x, alignment);
		let drawPos = startPos;
		
		// set alpha
		const oldAlpha = context.globalAlpha;
		context.globalAlpha = alpha;

		for(let i = 0; i < text.length; i++) {	//Go through all characters
			const thisFrame = this.findRedLetterCorner(text.charAt(i));	// look up each character of our text in address sheet
			context.drawImage(jpFont, thisFrame.x, thisFrame.y, charSize.width, charSize.height, drawPos, position.y, charSize.width * scale, charSize.height * scale);
			
			const advance = scale * advancementForLanguageAndCharacter(language, text[i], text[i+1]);
			drawPos += advance;
		}

		// restore alpha value
		context.globalAlpha = oldAlpha;
	};

	const advancementForLanguageAndCharacter = function(language, character1, character2) {
		if(language === Language.Japanese) {
			if(character1 === " ") {
				return 40;
			} else if(charIsNumeral(character1)) {
				return 50;
			} else {
				return 72;
			}
		}

		if(character2 === "'") {
			return 25;
		}

		switch(character1) {
		case " ": return 35;
		case "W":
		case "w": return 55;
		default: return 50;
		}
	};

	const charIsNumeral = function(char) {
		switch(char) {
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			return true;	
		}

		return false;
	};

	//Address of each character on the sheet
	this.findLetterCorner = function(character) {
		switch(character) {
		case " ": return {x:0, y:0};
		case "!": return {x:charSize.width, y:0};
		case "\"": return {x:2 * charSize.width, y:0};
		case "#": return {x:3 * charSize.width, y:0};
		case "$": return {x:4 * charSize.width, y:0};
		case "%": return {x:5 * charSize.width, y:0};
		case "&": return {x:6 * charSize.width, y:0};
		case "'": return {x:7 * charSize.width, y:0};
		case "(": return {x:8 * charSize.width, y:0};
		case ")": return {x:9 * charSize.width, y:0};
		case "*": return {x:10 * charSize.width, y:0};
		case "+": return {x:11 * charSize.width, y:0};
		case ",": return {x:12 * charSize.width, y:0};
		case "ー": return {x:13 * charSize.width, y:0};
		case ".": return {x:14 * charSize.width, y:0};
		case "/": return {x:15 * charSize.width, y:0};
		case "0": return {x:0, y:charSize.height};
		case "1": return {x:charSize.width, y:charSize.height};
		case "2": return {x:2 * charSize.width, y:charSize.height};
		case "3": return {x:3 * charSize.width, y:charSize.height};
		case "4": return {x:4 * charSize.width, y:charSize.height};
		case "5": return {x:5 * charSize.width, y:charSize.height};
		case "6": return {x:6 * charSize.width, y:charSize.height};
		case "7": return {x:7 * charSize.width, y:charSize.height};
		case "8": return {x:8 * charSize.width, y:charSize.height};
		case "9": return {x:9 * charSize.width, y:charSize.height};
		case ":": return {x:10 * charSize.width, y:charSize.height};
		case ";": return {x:11 * charSize.width, y:charSize.height};
		case "<":
		case "＜":
			return {x:12 * charSize.width, y:charSize.height};
		case "=": return {x:13 * charSize.width, y:charSize.height};
		case ">":
		case "＞":
			return {x:14 * charSize.width, y:charSize.height};
		case "?": return {x:15 * charSize.width, y:charSize.height};
		case "@": return {x:0, y:2 * charSize.height};
		case "a":
		case "A":
		case "А": //Russian A
		case "а": //Russian a
			return {x:charSize.width, y:2 * charSize.height};
		case "b":
		case "B":
		case "В": //Russian B
		case "в": //Russian b
			return {x:2 * charSize.width, y:2 * charSize.height};
		case "c":
		case "C":
		case "С": //Russian C
		case "с": //Russian c
			return {x:3 * charSize.width, y:2 * charSize.height};
		case "d":
		case "D":
			return {x:4 * charSize.width, y:2 * charSize.height};
		case "e":
		case "E":
		case "Е": //Russian E
		case "е": //Russian e
			return {x:5 * charSize.width, y:2 * charSize.height};
		case "f":
		case "F":
			return {x:6 * charSize.width, y:2 * charSize.height};
		case "g":
		case "G":
			return {x:7 * charSize.width, y:2 * charSize.height};
		case "h":
		case "H":
		case "Н": //Russian H
		case "н": //Russian h
			return {x:8 * charSize.width, y:2 * charSize.height};
		case "i":
		case "I":
			return {x:9 * charSize.width, y:2 * charSize.height};
		case "j":
		case "J":
			return {x:10 * charSize.width, y:2 * charSize.height};
		case "k":
		case "K":
		case "К": //Russian K
		case "к": //Russian k
			return {x:11 * charSize.width, y:2 * charSize.height};
		case "l":
		case "L":
			return {x:12 * charSize.width, y:2 * charSize.height};
		case "m":
		case "M":
		case "М": //Russian M
		case "м": //Russian m
			return {x:13 * charSize.width, y:2 * charSize.height};
		case "n":
		case "N":
			return {x:14 * charSize.width, y:2 * charSize.height};
		case "o":
		case "O":
		case "О": //Russian O
		case "о": //Russian o
			return {x:15 * charSize.width, y:2 * charSize.height};
		case "p":
		case "P":
		case "Р": //Russian P
		case "р": //Russian p
			return {x:0 , y:3 * charSize.height};
		case "q":
		case "Q":
			return {x:charSize.width, y:3 * charSize.height};
		case "r":
		case "R":
			return {x:2 * charSize.width, y:3 * charSize.height};
		case "s":
		case "S":
			return {x:3 * charSize.width, y:3 * charSize.height};
		case "t":
		case "T":
		case "Т": //Russian T
		case "т": //Russian t
			return {x:4 * charSize.width, y:3 * charSize.height};
		case "u":
		case "U":
			return {x:5 * charSize.width, y:3 * charSize.height};
		case "v":
		case "V":
			return {x:6 * charSize.width, y:3 * charSize.height};
		case "w":
		case "W":
			return {x:7 * charSize.width, y:3 * charSize.height};
		case "x":
		case "X":
		case "Х": //Russian X
		case "х": //Russian x
			return {x:8 * charSize.width, y:3 * charSize.height};
		case "y":
		case "Y":
			return {x:9 * charSize.width, y:3 * charSize.height};
		case "z":
		case "Z":
			return {x:10 * charSize.width, y:3 * charSize.height};
		case "[":
			return {x:11 * charSize.width, y:3 * charSize.height};
		case "\\":
			return {x:12 * charSize.width, y:3 * charSize.height};
		case "]":
			return {x:13 * charSize.width, y:3 * charSize.height};
		case "^":
			return {x:14 * charSize.width, y:3 * charSize.width};
		case "ぁ": return {x:15 * charSize.width, y:3 * charSize.width};
		case "あ": return {x:0, y:4 * charSize.width};
		case "ぃ": return {x:charSize.width, y:4 * charSize.width};
		case "い": return {x:2 * charSize.width, y:4 * charSize.width};
		case "ぅ": return {x:3 * charSize.width, y:4 * charSize.width};
		case "う": return {x:4 * charSize.width, y:4 * charSize.width};
		case "ぇ": return {x:5 * charSize.width, y:4 * charSize.width};
		case "え": return {x:6 * charSize.width, y:4 * charSize.width};
		case "ぉ": return {x:7 * charSize.width, y:4 * charSize.width};
		case "お": return {x:8 * charSize.width, y:4 * charSize.width};
		case "か": return {x:9 * charSize.width, y:4 * charSize.width};
		case "が": return {x:10 * charSize.width, y:4 * charSize.width};
		case "き": return {x:11 * charSize.width, y:4 * charSize.width};
		case "ぎ": return {x:12 * charSize.width, y:4 * charSize.width};
		case "く": return {x:13 * charSize.width, y:4 * charSize.width};
		case "ぐ": return {x:14 * charSize.width, y:4 * charSize.width};
		case "け": return {x:15 * charSize.width, y:4 * charSize.width};
		case "げ": return {x:0 , y:5 * charSize.height};
		case "こ": return {x:charSize.width, y:5 * charSize.height};
		case "ご": return {x:2 *charSize.width, y:5 * charSize.height};
		case "さ": return {x:3 * charSize.width,y:5 *charSize.height};
		case "ざ": return {x:4 * charSize.width, y:5 * charSize.height};
		case "し": return {x:5 * charSize.width,y:5 * charSize.height};
		case "じ": return {x:6 * charSize.width, y:5 *charSize.height};
		case "す": return {x:7 * charSize.width, y:5 *charSize.height};
		case "ず": return {x:8 * charSize.width,y:5 *charSize.height};
		case "せ": return {x:9 * charSize.width, y:5 *charSize.height};
		case "ぜ": return {x:10 * charSize.width, y:5 *charSize.height};
		case "そ": return {x:11 * charSize.width, y:5 *charSize.height};
		case "ぞ": return {x:12 * charSize.width,y:5 *charSize.height};
		case "た": return {x:13 * charSize.width, y:5 *charSize.height};
		case "だ": return {x:14 * charSize.width, y:5 *charSize.height};
		case "ち": return {x:15 * charSize.width, y:5 *charSize.height};
		case "ぢ": return {x:0, y:6 * charSize.height};
		case "っ": return {x:charSize.width, y:6 *charSize.height};
		case "つ": return {x:2 * charSize.width, y:6 *charSize.height};
		case "づ": return {x:3 *charSize.width , y:6 * charSize.height};
		case "て": return {x:4 * charSize.width, y:6 * charSize.height};
		case "で": return {x:5 * charSize.width, y:6 * charSize.height};
		case "と": return {x:6 * charSize.width, y:6 * charSize.height};
		case "ど": return {x:7 * charSize.width, y:6 * charSize.height};
		case "な": return {x:8 * charSize.width, y:6 * charSize.height};
		case "に": return {x:9 * charSize.width, y:6 * charSize.height};
		case "ぬ": return {x:10 * charSize.width, y:6 * charSize.height};
		case "ね": return {x:11 * charSize.width, y:6 * charSize.height};
		case "の": return {x:12 * charSize.width, y:6 * charSize.height};
		case "は": return {x:13 * charSize.width, y:6 * charSize.height};
		case "ば": return {x:14 * charSize.width, y:6 * charSize.height};
		case "ぱ": return {x:15 * charSize.width, y:6 * charSize.height};
		case "ひ": return {x:0 * charSize.width, y:7 * charSize.height};
		case "び": return {x:charSize.width, y:7 * charSize.height};
		case "ぴ": return {x:2 * charSize.width, y:7 * charSize.height};
		case "ふ": return {x:3 * charSize.width, y:7 * charSize.height};
		case "ぶ": return {x:4 * charSize.width, y:7 * charSize.height};
		case "ぷ": return {x:5 * charSize.width, y:7 *charSize.height};
		case "へ": return {x:6 * charSize.width, y:7 *charSize.height};
		case "べ": return {x:7 * charSize.width, y:7 *charSize.height};
		case "ぺ": return {x:8 * charSize.width, y:7 *charSize.height};
		case "ほ": return {x:9 * charSize.width, y:7 *charSize.height};
		case "ぼ": return {x:10 * charSize.width, y:7 *charSize.height};
		case "ぽ": return {x:11 * charSize.width, y:7 *charSize.height};
		case "ま": return {x:12 * charSize.width, y:7 *charSize.height};
		case "み": return {x:13 * charSize.width, y:7 *charSize.height};
		case "む": return {x:14 * charSize.width, y:7 *charSize.height};
		case "め": return {x:15 * charSize.width, y:7 *charSize.height};
		case "も": return {x:0, y:8 * charSize.height};
		case "ゃ": return {x:charSize.width, y:8 * charSize.height};
		case "や": return {x:2 * charSize.width, y:8 * charSize.height};
		case "ゅ": return {x:3 * charSize.width, y:8 * charSize.height};
		case "ゆ": return {x:4 * charSize.width, y:8 * charSize.height};
		case "ょ": return {x:5 * charSize.width, y:8 * charSize.height};
		case "よ": return {x:6 * charSize.width, y:8 * charSize.height};
		case "ら": return {x:7 * charSize.width, y:8 * charSize.height};
		case "り": return {x:8 * charSize.width, y:8 * charSize.height};
		case "る": return {x:9 * charSize.width, y:8 * charSize.height};
		case "れ": return {x:10 * charSize.width, y:8 * charSize.height};
		case "ろ": return {x:11 * charSize.width, y:8 * charSize.height};
		case "ゎ": return {x:12 * charSize.width, y:8 * charSize.height};
		case "わ": return {x:13 * charSize.width, y:8 * charSize.height};
		case "ゐ": return {x:14 * charSize.width, y:8 * charSize.height};
		case "ゑ": return {x:15 * charSize.width, y:8 * charSize.height};
		case "を": return {x:0, y:9 * charSize.height};
		case "ん": return {x:charSize.width, y:9 * charSize.height};
		case "ァ": return {x:2 * charSize.width, y:9 * charSize.height};
		case "ア": return {x:3 * charSize.width, y:9 * charSize.height};
		case "ィ": return {x:4 * charSize.width, y:9 * charSize.height};
		case "イ": return {x:5 * charSize.width, y:9 * charSize.height};
		case "ゥ": return {x:6 * charSize.width, y:9 * charSize.height};
		case "ウ": return {x:7 * charSize.width, y:9 * charSize.height};
		case "ェ": return {x:8 * charSize.width, y:9 * charSize.height};
		case "エ": return {x:9 * charSize.width, y:9 * charSize.height};
		case "ォ": return {x:10 * charSize.width, y:9 * charSize.height};
		case "オ": return {x:11 * charSize.width, y:9 * charSize.height};
		case "カ": return {x:12 * charSize.width, y:9 * charSize.height};
		case "ガ": return {x:13 * charSize.width, y:9 * charSize.height};
		case "キ": return {x:14 * charSize.width, y:9 * charSize.height};
		case "ギ": return {x:15 * charSize.width, y:9 * charSize.height};
		case "ク": return {x:0, y:10 * charSize.height};
		case "グ": return {x:charSize.width, y:10 *charSize.height};
		case "ケ": return {x:2 * charSize.width, y:10 *charSize.height};
		case "ゲ": return {x:3 * charSize.width, y:10 *charSize.height};
		case "コ": return {x:4 * charSize.width, y:10 *charSize.height};
		case "ゴ": return {x:5 * charSize.width, y:10 *charSize.height};
		case "サ": return {x:6 * charSize.width, y:10 *charSize.height};
		case "ザ": return {x:7 * charSize.width, y:10 *charSize.height};
		case "シ": return {x:8 * charSize.width, y:10 *charSize.height};
		case "ジ": return {x:9 * charSize.width, y:10 *charSize.height};
		case "ス": return {x:10 * charSize.width, y:10 *charSize.height};
		case "ズ": return {x:11 * charSize.width, y:10 *charSize.height};
		case "セ": return {x:12 * charSize.width, y:10 *charSize.height};
		case "ゼ": return {x:13 * charSize.width, y:10 *charSize.height};
		case "ソ": return {x:14 * charSize.width, y:10 *charSize.height};
		case "ゾ": return {x:15 * charSize.width, y:10 *charSize.height};
		case "タ": return {x:0, y:11 *charSize.height};
		case "ダ": return {x:charSize.width, y:11 *charSize.height};
		case "チ": return {x:2 * charSize.width, y:11 *charSize.height};
		case "ヂ": return {x:3 * charSize.width, y:11 *charSize.height};
		case "ッ": return {x:4 * charSize.width, y:11 *charSize.height};
		case "ツ": return {x:5 * charSize.width, y:11 *charSize.height};
		case "ヅ": return {x:6 * charSize.width, y:11 *charSize.height};
		case "テ": return {x:7 * charSize.width, y:11 *charSize.height};
		case "デ": return {x:8 * charSize.width, y:11 *charSize.height};
		case "ト": return {x:9 * charSize.width, y:11 *charSize.height};
		case "ド": return {x:10 * charSize.width, y:11 * charSize.height};
		case "ナ": return {x:11 * charSize.width, y:11 *charSize.height};
		case "ニ": return {x:12 * charSize.width, y:11 * charSize.height};
		case "ヌ": return {x:13 * charSize.width, y:11 * charSize.height};
		case "ネ": return {x:14 * charSize.width, y:11 * charSize.height};
		case "ノ": return {x:15 * charSize.width, y:11 * charSize.height};
		case "ハ": return {x:0, y:12 * charSize.height};
		case "バ": return {x:charSize.width, y:12 * charSize.height};
		case "パ": return {x:2 * charSize.width, y:12 * charSize.height};
		case "ヒ": return {x:3 * charSize.width, y:12 * charSize.height};
		case "ビ": return {x:4 * charSize.width, y:12 * charSize.height};
		case "ピ": return {x:5 * charSize.width, y:12 * charSize.height};
		case "フ": return {x:6 * charSize.width, y:12 * charSize.height};
		case "ブ": return {x:7 * charSize.width, y:12 * charSize.height};
		case "プ": return {x:8 * charSize.width, y:12 * charSize.height};
		case "ヘ": return {x:9 * charSize.width, y:12 * charSize.height};
		case "ベ": return {x:10 * charSize.width, y:12 * charSize.height};
		case "ペ": return {x:11 * charSize.width, y:12 * charSize.height};
		case "ホ": return {x:12 * charSize.width, y:12 * charSize.height};
		case "ボ": return {x:13 * charSize.width, y:12 * charSize.height};
		case "ポ": return {x:14 * charSize.width, y:12 * charSize.height};
		case "マ": return {x:15 * charSize.width, y:12 * charSize.height};
		case "ミ": return {x:0 * charSize.width, y:13 * charSize.height};
		case "ム": return {x:1 * charSize.width, y:13 * charSize.height};
		case "メ": return {x:2 * charSize.width, y:13 * charSize.height};
		case "モ": return {x:3 * charSize.width, y:13 * charSize.height};
		case "ﾔ" : return {x:4 * charSize.width, y:13 * charSize.height};
		case "ヤ": return {x:5 * charSize.width, y:13 * charSize.height};
		case "ﾕ" : return {x:6 * charSize.width, y:13 * charSize.height};
		case "ユ": return {x:7 * charSize.width, y:13 * charSize.height};
		case "ﾖ" : return {x:8 * charSize.width, y:13 * charSize.height};
		case "ヨ": return {x:9 * charSize.width, y:13 * charSize.height};
		case "ラ": return {x:10 * charSize.width, y:13 * charSize.height};
		case "リ": return {x:11 * charSize.width, y:13 * charSize.height};
		case "ル": return {x:12 * charSize.width, y:13 * charSize.height};
		case "レ": return {x:13 * charSize.width, y:13 * charSize.height};
		case "ロ": return {x:14 * charSize.width, y:13 * charSize.height};
		case "ヮ": return {x:15 * charSize.width, y:13 * charSize.height};
		case "ワ": return {x:0, y:14 * charSize.height};
		case "ヰ": return {x:charSize.width, y:14 * charSize.height};
		case "ヱ": return {x:2 * charSize.width, y:14 * charSize.height};
		case "ヲ": return {x:3 * charSize.width, y:14 * charSize.height};
		case "ン": return {x:4 * charSize.width, y:14 * charSize.height};
		case "ヴ": return {x:5 * charSize.width, y:14 * charSize.height};
		case "ヵ": return {x:6 * charSize.width, y:14 * charSize.height};
		case "ヶ": return {x:7* charSize.width, y:14 * charSize.height};
		case "、": return {x:8 * charSize.width, y:14 * charSize.height};
		case "。": return {x:9 * charSize.width, y:14 * charSize.height};
		case "_": return {x:10 * charSize.width, y:14 * charSize.height};
		case "{": return {x:11 * charSize.width, y:14 * charSize.height};
		case "}": return {x:12 * charSize.width, y:14 * charSize.height};
		case "|": return {x:13 * charSize.width, y:14 * charSize.height};
		case "~": return {x:14 * charSize.width, y:14 * charSize.height};
		case "`": return {x:15 * charSize.width, y:14 * charSize.height};

		case "é": 
		case "É": 
			return {x:0, y:15 * charSize.height};
		case "ñ": 
		case "Ñ":
			return {x:charSize.width, y:15 * charSize.height};
		case "ç": 
		case "Ç":
			return {x:2 * charSize.width, y:15 * charSize.height};
		case "ó": 
		case "Ó":
			return {x:3 * charSize.width, y:15 * charSize.height};
		case "ś": 
		case "Ś": 
			return {x:4 * charSize.width, y:15 * charSize.height};
		case "ć":
		case "Ć":
			return {x:5 * charSize.width, y:15 * charSize.height};
		case "ź":
		case "Ź":
			return {x:6* charSize.width, y:15 * charSize.height};
		case "ę":
		case "Ę":
			return {x:7 * charSize.width, y:15 * charSize.height};
		case "ż": 
		case "Ż": 
			return {x:8 * charSize.width, y:15 * charSize.height};
		case "ą":
		case "Ą":
			return {x:9 * charSize.width, y:15 * charSize.height};
		case "ł": 
		case "Ł":
			return {x:10 * charSize.width, y:15 * charSize.height};
		case "ī":
		case "Ī":
			return {x:11 * charSize.width, y:15 * charSize.height};
		case "ù":
		case "Ù":
			return {x:12 * charSize.width, y:15 * charSize.height};
		case "ń":
		case "Ń":
			return {x:13 * charSize.width, y:15 * charSize.height};

		case "Б":
		case "б":
			return {x:14 * charSize.width, y:15 * charSize.height};
		case "Г":
		case "г":
			return {x:15 * charSize.width, y:15 * charSize.height};
		case "Ё":
		case "ё":
			return {x:0 * charSize.width, y:16 * charSize.height};
		case "Ж":
		case "ж":
			return {x:1 * charSize.width, y:16 * charSize.height};
		case "З":
		case "з":
			return {x:2 * charSize.width, y:16 * charSize.height};
		case "И":
		case "и":
			return {x:3 * charSize.width, y:16 * charSize.height};
		case "Й":
		case "й":
			return {x:4 * charSize.width, y:16 * charSize.height};
		case "Л":
		case "л":
			return {x:5 * charSize.width, y:16 * charSize.height};
		case "П":
		case "п":
			return {x:6 * charSize.width, y:16 * charSize.height};
		case "Ф":
		case "ф":
			return {x:7 * charSize.width, y:16 * charSize.height};
		case "Ц":
		case "ц":
			return {x:8 * charSize.width, y:16 * charSize.height};
		case "Ш":
		case "ш":
			return {x:9 * charSize.width, y:16 * charSize.height};
		case "Щ":
		case "щ":
			return {x:10 * charSize.width, y:16 * charSize.height};
		case "Ч":
		case "ч":
			return {x:11 * charSize.width, y:16 * charSize.height};
		case "Я":
		case "я":
			return {x:12 * charSize.width, y:16 * charSize.height};
		case "Ъ":
		case "ъ":
			return {x:13 * charSize.width, y:16 * charSize.height};
		case "Ы":
		case "ы":
			return {x:14 * charSize.width, y:16 * charSize.height};
		case "Ь":
		case "ь":
			return {x:15 * charSize.width, y:16 * charSize.height};
		case "Э":
		case "э":
			return {x:0 * charSize.width, y:17 * charSize.height};
		case "Ю":
		case "ю":
			return {x:1 * charSize.width, y:17 * charSize.height};
		case "У":
		case "у":
			return {x:2 * charSize.width, y:17 * charSize.height};
		case "Д":
		case "д":
			return {x:3 * charSize.width, y:17 * charSize.height};

		default: return {x:18.5 * charSize.width, y:charSize.height};//18.5 so it doesn't crash, but you can tell something's not right
		}
	};

	this.findRedLetterCorner = function(character) {
		switch(character) {
		case "0": return {x:4 * charSize.width, y:17 * charSize.height};
		case "1": return {x:5 * charSize.width, y:17 * charSize.height};
		case "2": return {x:6 * charSize.width, y:17 * charSize.height};
		case "3": return {x:7 * charSize.width, y:17 * charSize.height};
		case "4": return {x:8 * charSize.width, y:17 * charSize.height};
		case "5": return {x:9 * charSize.width, y:17 * charSize.height};
		case "6": return {x:10 * charSize.width, y:17 * charSize.height};
		case "7": return {x:11 * charSize.width, y:17 * charSize.height};
		case "8": return {x:12 * charSize.width, y:17 * charSize.height};
		case "9": return {x:13 * charSize.width, y:17 * charSize.height};
		case "-": return {x:14 * charSize.width, y:17 * charSize.height};
		}
	};
}
