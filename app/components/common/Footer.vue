<script setup>
import Form from "~/components/common/Form";
import Countdown from "~/components/common/Countdown";
import Story from "~/components/common/Story";

const props = defineProps({
  formData: {
    type: Object,
    default: () => {
    },
  },
  countdownData: {
    type: Object,
    default: () => {
    }
  },
  storyData: {
    type: Object,
    default: () => {
    }
  }
})
</script>

<template>
    <footer class="footer">
        <Story :story-data="storyData"/>
        <Form :form-data="formData"/>
        <Countdown :countdown-data="countdownData"/>
        <div class="footer__qr-code">
            <img
                src="@/assets/img/qr-code.svg"
                alt="@/assets/img/qr-code"
                title="Скенирајте"
            />
        </div>
    </footer>
</template>
