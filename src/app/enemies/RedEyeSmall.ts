import { Bug } from "./Bug";

export class RedEyeSmall extends Bug {
    private height_: number = 8;
    private width_: number = 13;
    private alt_: string = "redEyeSmall";
    constructor(xPos_: number, yPos: number, id_: number) {
        super(xPos_, yPos, id_);
    }
    get alt() { return this.alt_; }
    height(): number { return this.height_; }
    width(): number { return this.width_; }
}