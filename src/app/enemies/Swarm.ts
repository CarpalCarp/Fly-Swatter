import { Bug } from "./Bug";

export class Swarm extends Bug {
    private height_: number = 19;
    private width_: number = 19;
    private alt_: string = "swarm";
    constructor(xPos_: number, yPos: number, id_: number) {
        super(xPos_, yPos, id_);
    }
    get alt() { return this.alt_; }
    height(): number { return this.height_; }
    width(): number { return this.width_; }
}