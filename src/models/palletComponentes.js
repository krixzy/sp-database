import { fromJSON } from "postcss";
import Block from "./block";
import Plank from "./plank";

export default class PalletComponentes {
    constructor(planks = [], blocks = [], coToo = 0, m3 = 0) {
        this.planks = planks;
        this.blocks = blocks;
        this.coToo = coToo;
        this.m3 = m3;

    }


static fromJSON(json) {
    return new PalletComponentes(
        json.planks.map((plank) => Plank.fromJSON(plank)),
        json.blocks.map((block) => Block.fromJSON(block)),
        json.coToo,
        json.m3
    );
}
}