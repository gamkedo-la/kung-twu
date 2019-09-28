function DecorationManager(spritesheet) {
    const DEBUG_DECOR = true;
    if (DEBUG_DECOR) console.log("Creating a DecorationManager");
    const SPR_NUM = 8; // how many tiles in a horizontal strip
    const SPR_DIM = spritesheet.width/SPR_NUM; // sprite dimensions in px
    let decorations = []; // an array of [x,y,tilenum]

    this.parseTiledData = function(data) { // TODO parse tiled data
        for (let num=0; num<1000; num++) { // random decorations
            decorations.push([x,y,num]);
        }
    };

    this.draw = function(offsetx,offsety) {
        for (me of decorations) {
            canvasContext.drawImage(spritesheet,SPR_DIM,SPR_DIM,me[0],me[1],me[2]*SPR_DIM,me[2]*SPR_DIM,SPR_DIM,SPR_DIM);
        }
    };
}