class ThreeDArray {
    constructor(l, w, h){
        this.data = [];
        for(let y = 0; y < l; y++){
            this.data.push([]);
            for (let x = 0; x < w; x++){
                this.data[y].push([]);
            }
        }
    }

    push(x, y, item){
        this.data[y][x].push(item);
    }

    getLength(x,y){
        return this.data[y][x].length;
    }
}

export default ThreeDArray