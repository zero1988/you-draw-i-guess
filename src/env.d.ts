/// <reference types="vite/client" />

import type { DefineComponent } from 'vue'

declare module '*.vue' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module '*.css' {
    const classes: {
        readonly [key: string]: string
    }
    export default classes
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $connect: (url?: string) => void
        $disconnect: () => void
    }
}