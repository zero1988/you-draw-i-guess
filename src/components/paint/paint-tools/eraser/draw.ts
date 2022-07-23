import { ActionData } from '@/store/modules/paint'
import { EraserData } from '.'

export default function draw(ctx: CanvasRenderingContext2D,
    action: ActionData<EraserData>) {
    const { size } = action.data
    const { points } = action.data

    points.forEach(points => {
        ctx.fillStyle = '#fff'
        ctx.fillRect(points.x - size / 2, points.y - size / 2, size, size)
    })
}