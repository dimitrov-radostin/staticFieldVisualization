class Source extends Victor {
    constructor({ x, y, charge, ctx }) {
        super(x, y)
        this.charge = charge
        this.ctx = ctx
    }

    potentialAt(x, y) { 
        return this.charge * canvasSize / this.distance(new Victor(x, y))
    }

    draw() {
        const  { x, y, charge } = this
        const size = Math.abs(charge)

        this.ctx.fillStyle = charge > 0 ? 'blue' : 'red'
        this.ctx.beginPath()
        this.ctx.arc(x, y, size, 0, 2 * Math.PI)
        this.ctx.fill()
    }
}
