import { Bug } from "./Bug";

export class Bomb extends Bug {
    private height_: number = 16;
    private width_: number = 16;
    private alt_: string = "bomb";
    constructor(xPos_: number, yPos: number, id_: number) {
        super(xPos_, yPos, id_);
    }
    get alt() { return this.alt_; }
    height(): number { return this.height_; }
    width(): number { return this.width_; }
}