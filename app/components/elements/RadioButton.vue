<script setup>
const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  formEntry: {
    type: String,
    default: ''
  },
  checked: {
    type: Boolean,
    default: ''
  },
})
</script>

<template>
    <label class="radio-button">
        {{ value }}
        <input
                type="radio"
                :name="checked && formEntry"
                @click="$emit('radio-button-clicked', value)"
                :value="value"
                :checked="checked"
        />
        <span class="checkmark"/>
    </label>
</template>
