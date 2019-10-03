function DecorationManager(spritesheet) {

    var SPR_NUM = 8; // how many tiles in the horizontal strip
    var SPR_W = 100; // sprite dimensions in px
    var all = []; // pos and sprite num of each

    this.generate = function(howmany=50,minx=-4000,maxx=500,miny=628,maxy=636,minspr=0,maxspr=7) { 
        for (let n=0; n<howmany; n++) {
            all.push({ 
                x:Math.floor(minx+Math.random()*(maxx-minx)),
                y:Math.floor(miny+Math.random()*(maxy-miny)),
                i:Math.floor(minspr+Math.random()*(maxspr-minspr)),
                //i:Math.floor(Math.random()*SPR_NUM)
            });
        }
    };

    this.draw = function(camX=0,camY=0) { 
        for (let n=0; n<all.length; n++) { // FIXME - skip drawing offscreen
            canvasContext.drawImage(spritesheet,all[n].i*SPR_W,0,SPR_W,SPR_W,all[n].x-camX,all[n].y-camY,SPR_W,SPR_W);
        }
    };

}