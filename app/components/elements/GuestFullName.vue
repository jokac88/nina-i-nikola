<script setup>
const props = defineProps({
  guestFullName: {
    type: String,
    default: ''
  },
  index: {
    type: Number,
    default: 0
  },
});
</script>
<template>
    <div class="guest-name">
        <p class="guest-name__number">{{ index }}.</p>
        <p class="guest-name__text">{{ guestFullName }}</p>
        <button
                @click="$emit('remove-guest', index)"
                type="button"
                class="guest-name__remove-guest-button"
        >
            <i class="icon-user-delete"/>
        </button>
    </div>
</template>
