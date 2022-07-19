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
    down: ((e: MouseEvent) => void) | undefined | null,
    move: ((e: MouseEvent, offsetX: number, offsetY: number) => void) | undefined | null,
    up: ((e: MouseEvent) => void) | undefined | null) {
    const startRef = ref(new Point())
    const downRef = ref()
    const dragRef = ref(false)  // 按住鼠标

    el.addEventListener('mousedown', (e: MouseEvent) => {
        startDragging()
        startRef.value = new Point(e.clientX, e.clientY)
        downRef.value = new Point(e.clientX, e.clientY)
        down?.(e)
    })

    function handleMousemove(e: MouseEvent) {
        if (dragRef.value) {
            const offsetX = e.clientX - startRef.value.x // 偏移x
            const offsetY = e.clientY - startRef.value.y // 偏移y
            startRef.value = new Point(e.clientX, e.clientY)
            move?.(e, offsetX, offsetY)
        }
    }

    function handleMouseup(e: MouseEvent) {
        stopDragging()
        up?.(e)
    }

    function startDragging() {
        if (!dragRef.value) {
            dragRef.value = true
            document.addEventListener('mousemove', handleMousemove)
            document.addEventListener('mouseup', handleMouseup)
        }
    }

    function stopDragging() {
        if (dragRef.value) {
            dragRef.value = false
            document.removeEventListener('mousemove', handleMousemove)
            document.removeEventListener('mouseup', handleMouseup)
        }
    }
}