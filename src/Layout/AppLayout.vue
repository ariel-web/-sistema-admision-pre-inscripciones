<template>
    <div class="app-layout">
        <header class="app-layout__header">
          
        </header>

        <main class="app-layout__main">
            <router-view />
        </main>

        <footer class="app-layout__footer">
         
        </footer>
    </div>

</template>
<script></script>
<style lang="scss">
#loading-bg {
    display: none;
}

.app-layout {
    background-color: #eaeaea;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-items: space;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>