<script setup>
import TimelineCard from "~/components/elements/TimelineCard";

const props = defineProps({
  timelineData: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
    <section class="timeline">
        <div class="timeline__wrapper">
            <TimelineCard v-for="timeline in timelineData" :timeline="timeline"/>
        </div>
    </section>
</template>
