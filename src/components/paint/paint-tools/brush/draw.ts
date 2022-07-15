import { ActionData } from '@/store/modules/paint'
import { BrushData } from '.'

export default function draw(ctx: CanvasRenderingContext2D,
    action: ActionData<BrushData>) {
    const { size, color, points } = action.data
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = size
    ctx.strokeStyle = color
    ctx.beginPath()
    points.forEach((point: { x: number, y: number }, index: number) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y)
        } else {
            ctx.lineTo(point.x, point.y)
        }
    })
    ctx.stroke()
}