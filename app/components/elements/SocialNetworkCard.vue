<script setup>
const props = defineProps({
  socialNetworkData: {
    type: Object,
    default: () => {
    }
  },
})
</script>

<template>
    <NuxtLink
            :to="socialNetworkData.url"
            target="_blank"
            class="social-network-card"
    >
        <i :class="socialNetworkData.icon" :title="socialNetworkData.name"/>
    </NuxtLink>
</template>
