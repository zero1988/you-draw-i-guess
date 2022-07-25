<template>
    <router-view />
</template>

<script lang="ts">
export default {
    components: {},
    setup(): void {

    }
}
</script>

<style>
#app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

html,
body {
    margin: 0;
    padding: 0;
    background-color: rgb(195, 225, 235);
    width: 100%;
    height: 100%;
    overflow: hidden;
}

* {
    touch-action: none;
    touch-callout: none;
    -webkit-touch-callout: none;
    /* user-select: none;
    -webkit-user-select: none; */
}

/******scroll*****/
::-webkit-scrollbar-thumb {
    background-color: gray;
    height: 50px;
    outline-offset: -2px;
    outline: 2px solid #fff;
    -webkit-border-radius: 12px;
    border: 2px solid #fff;
}

/*---鼠标点击滚动条显示样式--*/

::-webkit-scrollbar-thumb:hover {
    background-color: gray;
    height: 50px;
    -webkit-border-radius: 12px;
}

/*---滚动条大小--*/

::-webkit-scrollbar {
    width: 12px;
    height: 12px;
}

/*---滚动框背景样式--*/

::-webkit-scrollbar-track-piece {
    background-color: rgb(245, 245, 245);
    -webkit-border-radius: 0;
}

/*******END*******/
</style>
