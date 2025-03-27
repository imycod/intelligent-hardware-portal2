<template>
  <div class="about-container bg-black w-full overflow-hidden">
    <div class="content-container mx-auto flex flex-col">
      <div class="q opacity-0" ref="t1">WANT TO KNOW MORE ABOUT ACUMENBOT?</div>
      <div class="answer opacity-0" ref="t2">Here we are.</div>
      <section class="description opacity-0" ref="t3">
        Acumenbot is developing a new generation of AI-powered smart devices.
        Our mission is to create devices that are easier to incorporate into
        daily life, breaking the barrier that prevents anybody from taking full
        advantage of the technology of artificial intelligence, especially large
        language models.  <br />
        <br />Compared to usage of large language models on smartphones and
        computers, the experience we strive to create eliminates the need for a
        screen, freeing hands and eyes alike. We believe that this change will
        allow many more people to enjoy immense power of large language models
        as access is now much simpler; there will be no need to download an app,
        visit a website, or even unlock your device--all you need to do is start
        talking, and anyone can do it.<br /><br />
        Our technology will remain open for developers and up-to-date with the
        newest large language models; we encourage the creation of applications
        compatible with our devices in hopes of continuously perfecting the user
        experience.  We believe that Acumenbot will become a representative
        leader in the AI-powered smart device industry.
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";

const t1 = ref(null);
const t2 = ref(null);
const t3 = ref(null);

onMounted(() => {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 1,
    },
  });

  tl.fromTo(
    t1.value,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    }
  )
    .fromTo(
      t2.value,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      "-=0.5"
    )
    .fromTo(
      t3.value,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      "-=0.3"
    );
});
</script>

<style lang="scss" scoped>
.about-container {
  padding-top: calc(var(--header-top) + var(--header-height) + 62px);
  margin-bottom: 278px;
  .q {
    color: #fff;
    font-family: "SF Pro";
    font-size: 24px;
    font-style: normal;
    font-weight: 410;
    line-height: normal;
  }
  .answer {
    margin-top: 10px;
    color: #fff;
    font-family: "SF Pro";
    font-size: 80px;
    font-style: normal;
    font-weight: 410;
    line-height: normal;
  }
  .description {
    margin-top: 30px;
    color: #fff;
    font-family: "SF Pro";
    font-size: 24px;
    font-style: normal;
    font-weight: 270;
    line-height: 50px; /* 208.333% */
    align-self: stretch;
  }
}
</style>
