import { Bug } from "./Bug";

export class SmallFly extends Bug {
    private height_: number = 7;
    private width_: number = 5;
    private alt_: string = "smallFly";
    constructor(xPos_: number, yPos: number, id_: number) {
        super(xPos_, yPos, id_);
    }
    get alt() { return this.alt_; }
    height(): number { return this.height_; }
    width(): number { return this.width_; }
}