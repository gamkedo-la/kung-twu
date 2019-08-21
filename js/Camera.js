function Camera() {
    let position = {x:0, y:0}
    let parent = null;

    this.getPosition = function () {
        return {x: position.x, y: position.y}
    }

    this.attach = function (entity) {
        if (entity.getPosition() != null) {
            parent = entity;
            position.x = parent.getPosition().x;
            position.y = parent.getPosition().y;
        }
    }

    this.detach = function () {
        parent = null;
    }

    this.update = function(deltaTime) {
        if (parent != null) {
            let deadZoneLeft = position.x - deadZoneHalfWidth;
            let deadZoneRight = position.x + deadZoneHalfWidth;

            if (parent.getPosition().x < deadZoneLeft) {
                position.x = position.x + (parent.getPosition().x - deadZoneLeft);
            } else if (parent.getPosition().x > deadZoneRight) {
                position.x = position.x + (parent.getPosition().x - deadZoneRight);
            }
        }
    }

    this.draw = function(deltaTime) {
        canvasContext.resetTransform()
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.translate(-position.x + (canvas.width / 2), 0);
    }
}