// 200
export class Movements {
    private static xFlag: string = '+';
    private static currentMovements: any[];
    private static getMovements(xFlag: string) {
        return [
            [
                { transform: `translate(${xFlag}100px, 0px)` },
                { transform: `translate(${xFlag}150px, 200px)` },
                { transform: `translate(${xFlag}200px, 678px)` },
            ],
            [
                { transform: `translate(${xFlag}100px, 0px)` },
                { transform: `translate(${xFlag}500px, 150px)` },
                { transform: `translate(${xFlag}200px, 678px)` },
            ],
            [
                { transform: `translate(${xFlag}100px, 0px)` },
                { transform: `translate(${xFlag}700px, 25px)` },
                { transform: `translate(${xFlag}200px, 678px)` },
            ],
            [
                { transform: `translate(${xFlag}100px, 0px)` },
                { transform: `translate(${xFlag}1000px, 95px)` },
                { transform: `translate(${xFlag}200px, 678px)` },
            ]
        ]
    };

    public static getMovementFromDirection(fromDirection: string) {
        switch (fromDirection) {
            case "left":
                Movements.currentMovements = Movements.getMovements('+');
                return Movements.currentMovements[Math.floor(Math.random() * Movements.currentMovements.length)];
            case "right":
                Movements.currentMovements = Movements.getMovements('-');
                return Movements.currentMovements[Math.floor(Math.random() * Movements.currentMovements.length)];
        }
    }
}