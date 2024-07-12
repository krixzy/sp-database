import Component from "./component";

export default class Plank extends Component{
    
    constructor(amount, length, width, height, price = 0, m3 = 0){
        super(amount, length, width, height, price, m3);
    }

    static fromJSON(json){
        return new Plank(
            json.amount,
            json.length,
            json.width,
            json.height,
            json.price, 
            json.m3
        );
    }
}

