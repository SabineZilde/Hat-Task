const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Position {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    movePosition(right, left) {
        this.x += right;
        this.y += left;
    }
}
class Field {
    constructor(xyz) {
        this.field = xyz;
        this.currentPosition = new Position(0, 0);
    }
    print() {
        let fieldString = '';
        for (const row of this.field) {
            let rowString = '';
            for (const cell of row) {
                rowString += cell;
            }
            fieldString += rowString + '\n';
        }
        return fieldString;
    }
    move() {
        const name = prompt('Where do you whant to go? ');
        //savākt taustiņu no lietotāja kā burtu
        let userInput = 'U';
        let x = 0;
        let y = 0;
        let continuGamePromt;
        userInput = name.toUpperCase();
        switch (userInput) {
            case 'U':
                y = -1;
                break;
            case 'D':
                y = 1;
                break;
            case 'R':
                x = 1;
                break;
            case 'L':
                x = -1;
                break;
            default:
                console.log('Press U for up, D for down, R for right, L for left. ');
                return;
        }
        this.currentPosition.movePosition(x, y);
        // console.log(this.currentPosition);

        if (this.currentPosition.x == -1 || this.currentPosition.y == -1 || this.currentPosition.y >= this.field.length || this.currentPosition.x >= this.field[0].length) {
            console.log("Oh, no! You fell from the Flat Earth.");
            return true;
        }
        let currentFieldValue = this.field[this.currentPosition.y][this.currentPosition.x];
        if (currentFieldValue == hat) {
            console.log("Congratulations! You found the hat!");
            return true;
        }
        if (currentFieldValue == hole) {
            console.log("Oh, no! You fell into a hole.");
            return true;
        }

        this.field[this.currentPosition.y][this.currentPosition.x] = pathCharacter;
        console.log(this.print());
    }

    static generateField(height, width, percentage = 25) {
        const field = [];

        let hatY = Math.floor(Math.random() * height);
        let hatX = Math.floor(Math.random() * width);

        for (let row = 0; row < height; row++) {
            const rowArray = [];
            for (let column = 0; column < width; column++) {
                if (row === 0 && column === 0) {
                    rowArray.push(pathCharacter);
                    continue;
                }
                if (row === hatY && column === hatX) {
                    rowArray.push(hat);
                    continue;
                }
                rowArray.push(fieldCharacter);
            }
            field.push(rowArray);
        }

        let generateHoles = height * width * percentage / 100;
        for (generateHoles; generateHoles > 0; generateHoles--) {
            let holeY = 0;
            let holeX = 0;
            while (field[holeY][holeX] !== fieldCharacter) {
                holeY = Math.floor(Math.random() * height);
                holeX = Math.floor(Math.random() * width);
            }
            field[holeY][holeX] = hole;
        }
        return field;
    }
}

let turpinatSpelet = true;
while (turpinatSpelet) {
    const myField = new Field(Field.generateField(10, 20));
    console.log(myField.print());
    while (!myField.move()) {
        myField.move()
    }
    const startOver = prompt('Press Y to start over the game. ');
    if (startOver !== 'y') {
        return;
    }
}
