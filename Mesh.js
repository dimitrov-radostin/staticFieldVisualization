const canvasSize = 500
class Mesh {
    constructor(context){
        this.ctx = context
        this.potential = Array(canvasSize).fill({}).map(() => new Array(canvasSize))
        this.sources = []
    }

    addScource({ x, y, charge }) {
        this.sources.push(new Source({ x, y, charge, ctx: this.ctx }))
    }

    forEach(callback) {
        for (let y = 0; y < canvasSize; y++){
            for (let x = 0; x < canvasSize; x++){
                callback({ 
                    potential: this.potential[y][x],
                    x,
                    y 
                })
            }
        }
    }

    calculatePotentail() {
        this.forEach(({ potential, x, y }) => {
            this.potential[y][x] = this.sources.reduce((acc, source) => { 
                return acc + source.potentialAt(x, y)
            }, 0)
        })
    }

    drawPotential() {
        this.forEach(({ potential, x, y }) => {
            this.ctx.fillStyle = `rgb(0, ${potential%255} , 0)`
            this.ctx.fillRect(x, y, 1, 1)
        })
    }

    drawSources() {
        this.sources.forEach(source => source.draw())
    }

    findGradient (x, y) {
        console.log('find gradient called with ' ,x );

        if (x <= 0 || y <= 0 || x >= canvasSize || y >= canvasSize) {
            return null
        }
        const SEARCH_SIZE = 1
        try {
            const currentPotential = this.potential[x][y] 
            let next = [x, y]
            let neighbours = this.potential
                .slice(next[0] - 1, next[0] + 2 )
                .map((row, y) =>
                    row
                        .slice(next[1] - 1, next[1] + 2 )
                        .map((pot, x) => {
                            let difference = pot - currentPotential
                            if (Math.abs((x - 1) * (y - 1) ) === 1){
                                // difference = difference / Math.SQRT2
                            }
                            return difference
                        })
                )

            let maxDifference = 0
            let step = [0, 0]

            neighbours.forEach((row, y) => {
                row.forEach((difference, x) => {
                    if (difference > maxDifference){
                        maxDifference = difference
                        step = [x - 1, y - 1]
                    }
                })
            })

            next[0] +=step[0]
            next[1] +=step[1]

            if (next[0] == x && next[1] == y) {
                return null
            }
            console.log(next);
            return next
    
        } catch (e) {
            console.log(e);
            return null
        }
    }

    drawRandomFieldLine() {
        const initalX = Math.floor(Math.random() * canvasSize)
        const initalY = Math.floor(Math.random() * canvasSize)
        let next = [initalX, initalY]
        while (next){
            this.ctx.fillStyle = `rgb(250, 250 , 250)`
            this.ctx.fillRect(next[0], next[1], 1, 1)
            next = this.findGradient(...next)
        }
    }
    drawSomeFieldLines(n) {
        for(let i = 0; i < n; i++){
            this.drawRandomFieldLine()
        }
    }
}
