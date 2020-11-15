class Game
{
    constructor()
    {
        this.can          = document.getElementById('canvas')
        this.canW         = 500
        this.canH         = 500
        this.can.width   = this.canW
        this.can.height  = this.canH
        this.ctx         = this.can.getContext('2d')
        this.grid        = 25
        this.gridArr     = []

        this.snakeW      = 25
        this.snakeH      = 25
        this.snakeDir    = 'ArrowRight'
        this.stopSnake   = false
        this.dx          = 25
        this.dy          = 0
        this.keyCode     = 'ArrowRight'

        this.snakePos    = [
            {x: 100, y: 125},
            {x: 100, y: 150},
        ]

        this.foodW      = 25
        this.foodH      = 25

        this.foodPos    = {x: 25, y: 0}
    }


    makeGrid(x, y)
    {
        this.fillStyle = '#000'
        this.ctx.fillRect(0, y, this.canW, 0.4)
        this.ctx.fillRect(x, 0, 0.4, this.canH)
    }

    darwGrid()
    {
        for(let i = 0; i <= this.canW; i++)
        {
            if (i % 25 === 0) 
            {
                this.gridArr.push(i)
                this.makeGrid(i, i)
            } 
        }
    }

    drawSnake()
    {
        this.snakePos.forEach(snake => {
            this.ctx.fillStyle = '#000'
            this.ctx.fillRect(snake.x, snake.y, this.snakeW, this.snakeH)
        })
    }

    moveSnake()
    {
        const head = { x: this.snakePos[0].x + this.dx, y: this.snakePos[0].y + this.dy}
        this.snakePos.unshift(head)
        this.snakePos.pop()
    }

    handleKeyEvents()
    {
        const getCode = (e) =>
        {
            this.keyCode = e.code

            const goUp      = this.dy === -this.grid
            const goDown    = this.dy ===  this.grid
            const goLeft    = this.dx === -this.grid
            const goRight   = this.dx ===  this.grid

            if(this.keyCode === 'ArrowUp' && !goDown) {
                this.dy = -this.grid
                this.dx = 0
            }

            if(this.keyCode === 'ArrowDown'&& !goUp) {
                this.dy = this.grid
                this.dx = 0
            }

            if(this.keyCode === 'ArrowLeft' && !goRight) {
                this.dx = -this.grid
                this.dy = 0
            }

            if(this.keyCode === 'ArrowRight' && !goLeft) {
                this.dx = this.grid
                this.dy = 0
            }
        }

        document.addEventListener('keydown', getCode)
    }

    drawFood()
    {
        this.ctx.fillStyle      = '#080'
        this.ctx.fillRect(this.foodPos.x, this.foodPos.y, this.foodW, this.foodH)
    }

    randFood()
    {
        let lenArr = this.gridArr.length
        let randX = Math.floor(Math.random() * lenArr)
        let randY = Math.floor(Math.random() * lenArr)
        let foodX  = this.gridArr[randX]
        let foodY  = this.gridArr[randY]

        this.foodPos.x = foodX
        this.foodPos.Y = foodY
    }

    isFoodEaten()
    {
        if(this.snakePos[0].x === this.foodPos.x && this.snakePos[0].y === this.foodPos.y)
        {
            this.randFood()
        }
    }

    darw()
    {
        this.clear()
        this.darwGrid()
        this.drawFood()
        this.moveSnake()
        this.drawSnake()
        this.handleKeyEvents()
        this.drawFood()
        this.isFoodEaten()
    }

    start()
    {
        setInterval(() => {
            this.darw()
        }, 100)
    }
    
    clear()
    {
        this.ctx.clearRect(0, 0, this.canW, this.canH)
    }
}

export default Game
