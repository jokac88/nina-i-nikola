<script setup>
import { useThrottleFn } from '@vueuse/core';

let isVisible = ref(false);

function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const onScroll = useThrottleFn(() => {
  const currentScrollYPosition = document.documentElement.scrollTop || document.body.scrollTop;

  isVisible.value = currentScrollYPosition >= 600;
}, 500);

onMounted(() => window.addEventListener('scroll', onScroll));
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
    <div
        class="back-to-top"
        :class="{'back-to-top--is-visible': isVisible}"
        @click="backToTop"
    >
        <i class="icon-back-to-top"/>
    </div>
</template>
