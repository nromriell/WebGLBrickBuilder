import * as glMatrix from "./gl-matrix"

class WebGLCamera
{
    fieldOfView = 45;
    zNear = 0.01;
    zFar = 100.0;
    glContext;
    position;
    rotation;
    projectionMatrix;

    constructor(glContext, position, rotation)
    {
        this.glContext = glContext;
        this.position = position;
        this.rotation = rotation;
        this.regenerateProjection();
    }

    setNewPosition(position){
        this.position = position;
        this.regenerateProjection();
    }

    setNewRotation(rotation){
        this.rotation = rotation;
        this.regenerateProjection();
    }

    rotateAroundOrigin(rads){
        this.rotation[1] = (this.rotation[1]+rads)%6.28;
        if(this.rotation[1] < 0){
            this.rotation[1] = 6.28-this.rotation[1];
        }
        //console.log("Camera Rotation:"+this.rotation[1]);
        glMatrix.mat4.rotate(this.projectionMatrix,
            this.projectionMatrix,
            rads,
            [0,1,0]);
    }

    regenerateProjection() {
        const fov = this.fieldOfView*Math.PI/180;
        const aspect = this.glContext.canvas.clientWidth/this.glContext.canvas.clientHeight;
        this.projectionMatrix = glMatrix.mat4.create();
        glMatrix.mat4.perspective(this.projectionMatrix,
            fov,
            aspect,
            this.zNear,
            this.zFar);
        glMatrix.mat4.translate(this.projectionMatrix, this.projectionMatrix, this.position);
        glMatrix.mat4.rotate(this.projectionMatrix,
            this.projectionMatrix,
            this.rotation[0],
            [1,0,0]);
        glMatrix.mat4.rotate(this.projectionMatrix,
            this.projectionMatrix,
            this.rotation[1],
            [0,1,0]);
        glMatrix.mat4.rotate(this.projectionMatrix,
            this.projectionMatrix,
            this.rotation[2],
            [0,0,1]);
    }
}

export default WebGLCamera