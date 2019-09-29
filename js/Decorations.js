function DecorationManager(spritesheet) {

    var SPR_NUM = 8; // how many tiles in the horizontal strip
    var SPR_W = 100; // sprite dimensions in px
    var all = []; // an array of [x,y,tilenum]

    this.parseTiledData = function(data) { // TODO parse tiled data
        for (let n=0; n<40; n++) { // random decorations
            all.push({x:Math.floor(Math.random()*8000)-4000,y:632,i:Math.floor(Math.random()*SPR_NUM)});
        }
    };

    this.draw = function(camX=0,camY=0) {  // FIXME - skip drawing offscreen
        for (let n=0; n<all.length; n++) {
            canvasContext.drawImage(spritesheet,all[n].i*SPR_W,0,SPR_W,SPR_W,all[n].x-camX,all[n].y-camY,SPR_W,SPR_W);
        }
    };

}