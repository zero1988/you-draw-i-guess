import { ref } from 'vue'

class Point {
    x: number
    y: number
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }
}

export function useMouseDragDrop(el: HTMLElement,
    down: ((e: PointerEvent) => void) | undefined | null,
    move: ((e: PointerEvent, offsetX: number, offsetY: number) => void) | undefined | null,
    up: ((e: PointerEvent) => void) | undefined | null) {
    const startRef = ref(new Point())
    const downRef = ref()
    const dragRef = ref(false)  // 按住鼠标

    el.addEventListener('pointerdown', (e: PointerEvent) => {
        startDragging()
        startRef.value = new Point(e.clientX, e.clientY)
        downRef.value = new Point(e.clientX, e.clientY)
        down?.(e)
    })

    function handleMousemove(e: PointerEvent) {
        if (dragRef.value) {
            const offsetX = e.clientX - startRef.value.x // 偏移x
            const offsetY = e.clientY - startRef.value.y // 偏移y
            startRef.value = new Point(e.clientX, e.clientY)
            move?.(e, offsetX, offsetY)
        }
    }

    function handleMouseup(e: PointerEvent) {
        stopDragging()
        up?.(e)
    }

    function startDragging() {
        if (!dragRef.value) {
            dragRef.value = true
            document.addEventListener('pointermove', handleMousemove)
            document.addEventListener('pointerup', handleMouseup)
        }
    }

    function stopDragging() {
        if (dragRef.value) {
            dragRef.value = false
            document.removeEventListener('pointermove', handleMousemove)
            document.removeEventListener('pointerup', handleMouseup)
        }
    }
}
