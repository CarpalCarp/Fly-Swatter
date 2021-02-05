export abstract class Bug {
    private hit_: boolean = false;
    private animationId_: number;
    constructor(private xPos_: number, private yPos_: number, private id_: number) { }
    get xPos() { return this.xPos_; }
    get yPos() { return this.yPos_; }
    set xPos(xPos: number) { this.xPos_ = xPos; }
    set yPos(yPos: number) { this.yPos_ = yPos; }
    get hit() { return this.hit_; }
    get id() { return this.id_; }
    get animationId() { return this.animationId_; }
    abstract height(): number;
    abstract width(): number;
    set hit(value: boolean) { if (value) this.hit_ = value; }
    set animationId(id: number) { this.animationId_ = id; }
}