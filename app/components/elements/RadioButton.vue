<script setup>
const props = defineProps({
    value: {
        type: String,
        default: ''
    },
    entry: {
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
          :name="checked && entry"
          @click="$emit('radio-button-clicked', value)"
          :value="value"
          :checked="checked"
        />
        <span class="checkmark">
            <span class="circle"/>
        </span>
    </label>
</template>
