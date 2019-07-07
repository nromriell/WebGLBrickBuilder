import React from 'react'
import GLCanvas from '../../Components/WebGL/GLCanvas'
import WebGLCamera from "../../Data/WebGLCamera";
import WebGLMaterial from "../../Data/WebGLMaterial";
import WebGLLight from "../../Data/WebGLLight";
import Cube from "../../Data/Cube"
import WebGLMesh from "../../Data/WebGLMesh";
import VertexShader from "../../Data/VertexShader";
import FragmentShader from "../../Data/FragmentShader";
import Plane from "../../Data/Line";
import ThreeDArray from "../../Data/ThreeDArray";

class WebGLMain extends React.Component {

    constructor(props){
        super(props);
        this.glContext = null;
        this.camera = null;
        this.light = null;
        this.frame = 0;
        this.selectedPosition = [0,0.5,0];
        this.gridSize = 11;
        this.dimensionalArray = new ThreeDArray(this.gridSize, this.gridSize, this.gridSize);
        this.rotatingCamera = false;
        this.clearColor = [props.red, props.green, props.blue, props.alpha];
        this.lastMousePosition = null;
        this.lastUpdateTime = new Date().getTime();
        //this.onMouseDown = this.onMouseDown.bind(this);
        //this.onMouseUp = this.onMouseUp.bind(this);
        //this.onButtonDown = this.onButtonDown.bind(this);
        //this.onButtonUp = this.onButtonUp.bind(this);
        //this.update();
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onButtonDown.bind(this));
        document.addEventListener("keyup", this.onButtonUp.bind(this));
        document.addEventListener("mousedown", this.onMouseDown.bind(this));
        document.addEventListener("mouseup", this.onMouseUp.bind(this));
        document.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.getGLContext();

        const material = new WebGLMaterial(this.glContext, [1.0, 0.0, 0.0, 1.0], 0.40, VertexShader, FragmentShader);
        const selectedMaterial = new WebGLMaterial(this.glContext, [1.0, 1.0, 0.3, 0.5], 0.80, VertexShader, FragmentShader);
        this.selectedObject = new WebGLMesh(selectedMaterial, Cube, this.camera, this.light, this.selectedPosition, [0,0,0], [1,1,1]);
        //this.objects = [new WebGLMesh(material, Cube, this.camera, this.light, [0.0, 0.0, 0], [45, 45, 45], [1,1,1])];
        this.objects = [];
        this.gridObjects = [];
        this.generateGrid(this.gridSize, .01);
        //setInterval(this.update.bind(this), 10);
        this.update();
    }

    generateGrid(size, lineWidth)
    {
        const gridMaterial =  new WebGLMaterial(this.glContext, [0.0, 1.0, 1.0, 1.0], 0.80, VertexShader, FragmentShader);
        for(var i = 0; i < size+1; i++){
            let newGridObject = new WebGLMesh(gridMaterial, Plane, this.camera, this.light, [(i-(size)/2)*2, -1.5, 0], [0, 0, 0], [lineWidth,1,size]);
            let newGridObject1 = new WebGLMesh(gridMaterial, Plane, this.camera, this.light, [0, -1.5, (i-(size)/2)*2], [0, 0, 0], [size,1,lineWidth]);
            this.gridObjects.push(newGridObject, newGridObject1);
        }
    }

    resize(){
        // Lookup the size the browser is displaying the canvas.
        var realToCSSPixels = window.devicePixelRatio;
        var displayWidth  = Math.floor(this.glContext.canvas.clientWidth  * realToCSSPixels);
        var displayHeight = Math.floor(this.glContext.canvas.clientHeight * realToCSSPixels);

        // Check if the canvas is not the same size.
        if (this.glContext.canvas.width  !== displayWidth ||
            this.glContext.canvas.height !== displayHeight) {

            // Make the canvas the same size
            this.glContext.canvas.width  = displayWidth;
            this.glContext.canvas.height = displayHeight;
        }
        this.glContext.viewport(0, 0, this.glContext.canvas.width, this.glContext.canvas.height);
    }

    update() {
        let currentTime = new Date().getTime();
        if(currentTime-this.lastUpdateTime >= 32) { //Lock to 30 FPS
            this.lastUpdateTime = new Date().getTime();
            this.resize();
            this.frame += 1;
            this.clearWithColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]);
            this.selectedObject.draw(this.frame);
            for (var i = 0; i < this.objects.length; i++) {
                this.objects[i].draw(this.frame);
            }
            for (i = 0; i < this.gridObjects.length; i++) {
                this.gridObjects[i].draw(this.frame);
            }
        }
    }

    getGLContext(){
        if(this.glContext == null) {
            const canvas = document.querySelector("#glCanvas");
            this.glContext = canvas.getContext("webgl");
            if(this.glContext == null){
                alert("WebGL Not Supported By This Browser");
            }
            this.camera = new WebGLCamera(this.glContext, [0,0,-80], [3.14/4,0,0]);
            this.light = new WebGLLight([15, 10 , -8], [1,1,1,1]);
        }
        return this.glContext;
    }

    clearWithColor(red, green, blue, alpha){
        if(this.glContext == null) {
            alert("No GL Context! Check WebGL Support");
            return;
        }
        this.glContext.clearColor(red, green, blue, alpha);
        this.glContext.clearDepth(10.0);
        this.glContext.enable(this.glContext.DEPTH_TEST);
        this.glContext.depthFunc(this.glContext.LEQUAL);
        this.glContext.clear(this.glContext.COLOR_BUFFER_BIT | this.glContext.DEPTH_BUFFER_BIT);
    }

    onMouseMove(e) {
        //console.log("Mouse Move");
        if(this.rotatingCamera){
            let diff = e.clientX-this.lastMousePosition;
            this.camera.rotateAroundOrigin(diff*0.01);
            this.update();
        }
        this.lastMousePosition = e.clientX;
    }

    onMouseDown(e){
       // console.log("Mouse Down");
        this.lastMousePosition = e.clientX;
        this.rotatingCamera = true;
    }

    onMouseUp(e){
       // console.log("Mouse Up");
        this.rotatingCamera = false;
    }

    onButtonDown(e) {
        console.log("Pressed:" + e.keyCode);
        let direction = -1;
        switch (e.keyCode) {
            case 40: //DOWN
                direction = 1;
                break;
            case 38: //UP
                direction = 0;
                break;
            case 37: //LEFT
                direction = 2;
                break;
            case 39: //RIGHT
                direction = 3;
                break;
            case 32: //SPACE
                //Add block
                const material = new WebGLMaterial(this.glContext, [1.0, 0.0, 0.0, 1.0], 0.40, VertexShader, FragmentShader);
                let newItem = new WebGLMesh(material, Cube, this.camera, this.light, JSON.parse(JSON.stringify(this.selectedPosition)), [0, 0, 0], [1,1,1]);
                this.objects.push(newItem);
                this.dimensionalArray.push(this.selectedPosition[0]/2+Math.floor(this.gridSize/2), this.selectedPosition[2]/2+Math.floor(this.gridSize/2), newItem);
                break;
            default:
                break;
        }
        if(direction >= 0){
            //Remap Direction
            if(this.camera.rotation[1] > .785 && this.camera.rotation[1] < 2.355){
                //Facing Left
                switch (direction) {
                    case 0:
                        direction = 3;
                        break;
                    case 1:
                        direction = 2;
                        break;
                    case 2:
                        direction = 0;
                        break;
                    default:
                        direction = 1;
                        break;
                }
            }else if(this.camera.rotation[1] > 2.355 && this.camera.rotation[1] < 3.925){
                //Facing Back
                switch (direction) {
                    case 0:
                        direction = 1;
                        break;
                    case 1:
                        direction = 0;
                        break;
                    case 2:
                        direction = 3;
                        break;
                    default:
                        direction = 2;
                        break;
                }
            }else if(this.camera.rotation[1] > 3.925 && this.camera.rotation[1] < 5.495){
                //Facing Right
                switch (direction) {
                    case 0:
                        direction = 2;
                        break;
                    case 1:
                        direction = 3;
                        break;
                    case 2:
                        direction = 1;
                        break;
                    default:
                        direction = 0;
                        break;
                }
            }
            switch(direction){
                case 0: // UP
                    if(this.selectedPosition[2] > -this.gridSize+1){
                        this.selectedPosition[2] -= 2;
                    }
                    break;
                case 1: // DOWN
                    if(this.selectedPosition[2] < this.gridSize-1){
                        this.selectedPosition[2] += 2;
                    }
                    break;
                case 2: // LEFT
                    if(this.selectedPosition[0] > -this.gridSize+1){
                        this.selectedPosition[0] -= 2;
                    }
                    break;
                default: //RIGHT
                    if(this.selectedPosition[0] < this.gridSize-1){
                        this.selectedPosition[0] += 2;
                    }
                    break;
            }
        }
        this.selectedPosition[1] = 0.5+this.dimensionalArray.getLength(this.selectedPosition[0]/2+Math.floor(this.gridSize/2), this.selectedPosition[2]/2+Math.floor(this.gridSize/2))*2;
        this.update();
    }


    onButtonUp(e){
        console.log("Pressed:"+e.keyCode);
    }

    render() {
        return (
            <GLCanvas onKeyDown={(e) => this.onButtonDown(e)} onKeyUp={(e) => this.onButtonUp(e)} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove} tabIndex="0"/>
        )
    }

}

export default WebGLMain