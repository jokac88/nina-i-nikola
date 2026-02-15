<script setup>
import Header from "~/components/common/Header";
import Timeline from "~/components/common/Timeline";
import Footer from "~/components/common/Footer";
import BackToTop from "~/components/common/BackToTop";
import data from "~/store/data.json";

const {
  header: headerData,
  timeline: timelineData,
  story: storyData,
  form: formData,
  countdown: countdownData
} = data;
</script>

<template>
  <div class="flex-container">
    <Header :header-data="headerData"/>
    <Timeline :timeline-data="timelineData"/>
    <Footer
        :story-data="storyData"
        :form-data="formData"
        :countdown-data="countdownData"
    />
    <BackToTop/>
  </div>
</template>
