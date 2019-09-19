//Graphics Common
function drawRect(x, y, w, h, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x, y, w, h);
}

function colorText(showWords,
	textX, textY,
	fillColor, fontface,
	textAlign = "left",
	opacity = 1,
	dropShadow = true) {
		
	canvasContext.save();
	canvasContext.textAlign = textAlign;
	canvasContext.font = fontface;
	canvasContext.globalAlpha = opacity;
	if (dropShadow) {
		canvasContext.fillStyle = "black";
		canvasContext.fillText(showWords, textX + 1, textY + 1);
	}
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
	canvasContext.restore();
}

function getTextWidth(txt, font) {
	canvasContext.save();
	canvasContext.font = font;

	var width = canvasContext.measureText(txt).width;

	canvasContext.restore();

	return width;
}

function drawBorder(x, y, w, h, color) {
	canvasContext.beginPath();
	canvasContext.rect(x, y, w, h);
	canvasContext.strokeStyle = color;
	canvasContext.stroke();
}
