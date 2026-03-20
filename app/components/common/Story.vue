<script setup>

const props = defineProps({
  storyData: {
    type: Object,
    default: () => {
    },
  },
})
</script>

<template>
    <section class="story">
        <div class="story__wrapper">
            <div class="story__image">
                <img src="@/assets/img/hug.webp" alt="@/assets/img/hug.webp"/>
            </div>
            <div v-html="storyData.text" class="story__text"/>
        </div>
    </section>
</template>
