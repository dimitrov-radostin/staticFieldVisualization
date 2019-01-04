document.addEventListener("DOMContentLoaded", () => {
    const MILLISECONDS_TO_GENERATE_CHARGE = 150
    const canvas = document.getElementById('mainCanvas')
    const ctx = canvas.getContext('2d')
    const canvasSize = canvas.width

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvasSize, canvasSize)

    const mesh = new Mesh (ctx)
    let clickStart = null

    canvas.addEventListener('mousedown', e => {
        clickStart = Date.now()
    })

    canvas.addEventListener('mouseup', e => {
        const clickDuration = Date.now() - clickStart
        const charge = Math.ceil(Math.min(clickDuration / MILLISECONDS_TO_GENERATE_CHARGE , 9))

        const canvasRect = canvas.getBoundingClientRect()
        const { x, y, ctrlKey } = e

        mesh.addScource({ 
            x: x - canvasRect.x,
            y: y - canvasRect.y,
            charge: ctrlKey ? - charge : charge
        })
        mesh.calculatePotentail()
        mesh.drawPotential()
        mesh.drawSources()
        // console.log(mesh.potential);
        // mesh.drawSomeFieldLines(1)
    })
})