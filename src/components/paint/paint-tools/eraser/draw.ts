import { ActionData } from '@/store/modules/paint'
import { EraserData } from '.'

export default function draw(ctx: CanvasRenderingContext2D,
    action: ActionData<EraserData>) {
    const { size } = action.data
    const { tiles } = action.data

    tiles.forEach(tile => {
        ctx.fillStyle = '#fff'
        ctx.fillRect(tile.x - size / 2, tile.y - size / 2, size, size)
    })
}