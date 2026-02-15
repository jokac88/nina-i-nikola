<script setup>
const props = defineProps({
  headerData: {
    type: Object,
    default: () => {
    },
  }
})
</script>

<template>
    <header class="header">
        <div class="header__wrapper">
            <div class="header__headline">
                <p>{{ headerData.bride }}</p>
                <span>i</span>
                <p>{{ headerData.groom }}</p>
            </div>
            <p class="header__quote">{{ headerData.quote }}</p>
            <div class="header__date">{{ headerData.date }}</div>
        </div>
    </header>
</template>
