<script setup>
import SocialNetworkCard from "~/components/elements/SocialNetworkCard";

const props = defineProps({
  timeline: {
    type: Object,
    default: () => {
    },
  },
})
</script>
<template>
    <section class="timeline-card">
        <p class="timeline-card__time">{{ timeline.time }}</p>
        <p v-html="timeline.event" class="timeline-card__event"/>
        <i :class="timeline.icon" class="timeline-card__event-icon"/>
        <p v-html="timeline.location" class="timeline-card__location"></p>
        <NuxtLink
                v-if="timeline.locationUrl"
                :to="timeline.locationUrl"
                target="_blank"
                class="timeline-card__map-button"
        >
            Видите на мапи
        </NuxtLink>
        <div class="timeline-card__social-networks">
            <SocialNetworkCard v-for="social in timeline.socialNetworks" :social-network-data="social"/>
        </div>
    </section>
</template>
