function DecorationManager(spritesheet) {
	var SPR_W = 100; // sprite dimensions in px
	var all = []; // pos and sprite num of each

	this.generate = function(howmany=50,minx=-4000,maxx=500,miny=628,maxy=636,minspr=0,maxspr=7,frontY=740,backY=640) {
		for (let n=0; n<howmany; n++) {
			const thisY = Math.floor(miny+Math.random()*(maxy-miny));
			const thisBottom = thisY + spritesheet.height;
			let thisRatio;
			if(thisBottom <= backY) {//this decoration is on the wall => scroll with the wall
				thisRatio = 2;//2 is magic number based on floor spritesheet
			} else {//this decoration is on the floor => scale scrolling based on where on the floor
				thisRatio = 2 * ((frontY - thisBottom) / (frontY - backY));//2 is magic number based on floor spritesheet
			}

			all.push({ 
				x:Math.floor(minx+Math.random()*(maxx-minx)),
				y:thisY,
				ratio:thisRatio,
				i:Math.floor(minspr+Math.random()*(maxspr-minspr)),
			});
		}
	};

	this.update = function(shifts) {
		for(let sprite of all) {
			sprite.x -= (shifts * sprite.ratio);
		}
	};

	this.draw = function(camX=0) { 
		for (let n=0; n<all.length; n++) {
			if((all[n].x > camX - canvas.width/2 - SPR_W) && (all[n].x < camX + canvas.width/2 + SPR_W)) {
				canvasContext.drawImage(spritesheet, all[n].i * SPR_W, 0, SPR_W, SPR_W, all[n].x, all[n].y, SPR_W, SPR_W);
			}
		}
	};
}