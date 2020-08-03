export class Matrix {
    constructor(rowNum, colNum) {
        this.matrix = this.generateMatrix(rowNum, colNum)
    }

    generateMatrix = (rowNum, colNum) => {
        let matrix = []
        for (let r = 0; r < rowNum; r++) {
            let row = []
            for (let c = 0; c < colNum; c++) {
                row.push('.')
            }
            matrix.push(row)
        }
        return matrix
    }

    print = () => {
        for (let i = 0; i < this.matrix.length; i++) {
            let rowStr = ''
            for (let j = 0; j < this.matrix[i].length; j++) {
                rowStr += `${this.matrix[i][j]}\t`
            }
            console.log(rowStr)
        }
    }

    get = (rowNum, colNum) => this.matrix[rowNum][colNum]

    alter = (rowNum, colNum, updatedVal) => this.matrix[rowNum][colNum] = updatedVal

    printRow = (rowNum) => {
        for (let i = 0; i < this.matrix[0].length; i++) {
            console.log(this.matrix[rowNum][i])
        }
    }

    printColumn = (colNum) => {
        for (let i = 0; i < this.matrix.length; i++) {
            console.log(this.matrix[i][colNum])
        }
    }

    findCoordinate = (val) => {
        let cords = { x: 0, y: 0 }
        this.matrix.forEach((i, y) => i.forEach((j, x) => { if (j === val) { cords.x = x; cords.y = y } }))
        return cords
    }
}