<script setup>

const props = defineProps({
  countdownData: {
    type: Object,
    default: () => {
    },
  },
});

const weddingDate = "May 31, 2026 12:00:00";
let timeleft = ref(0);
let days = ref(0);
let hours = ref(0);
let minutes = ref(0);
let seconds = ref(0);

const countDownDate = new Date(weddingDate).getTime();
const setFunctionInterval = setInterval(calculateRemainingTime, 1000);

function calculateRemainingTime() {
  const now = new Date().getTime();

  timeleft.value = countDownDate - now;
  days.value = Math.floor(timeleft.value / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((timeleft.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes.value = Math.floor((timeleft.value % (1000 * 60 * 60)) / (1000 * 60));
  seconds.value = Math.floor((timeleft.value % (1000 * 60)) / 1000);

  if (timeleft.value < 0) {
    clearInterval(setFunctionInterval);
  }
}

onBeforeUnmount(() => clearInterval(setFunctionInterval))
</script>

<template>
    <section class="countdown">
        <p class="countdown__info">{{ countdownData.text }}</p>
        <div class="countdown__wrapper">
            <div class="countdown__text">
                {{ days < 10 ? `0${ days }` : days }}
                <span>Dani</span>
            </div>
            <div class="countdown__text">
                {{ hours < 10 ? `0${ hours }` : hours }}
                <span>Sati</span>
            </div>
            <div class="countdown__text">
                {{ minutes < 10 ? `0${ minutes }` : minutes }}
                <span>Minuti</span>
            </div>
            <div class="countdown__text">
                {{ seconds < 10 ? `0${ seconds }` : seconds }}
                <span>Sekunde</span>
            </div>
        </div>
    </section>
</template>
