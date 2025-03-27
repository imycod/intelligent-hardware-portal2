<template>
  <section class="section-container flex flex-col items-center self-stretch">
    <img src="@/assets/home/5.png" alt="product" />
    <button class="hover:bg-[#ffc0c0] cursor-pointer">
      <router-link to="/order"> Order </router-link>
    </button>
  </section>
</template>

<style lang="scss" scoped>
.section-container {
  padding-top: 200px;
  padding-left: 493px;
  padding-right: 493px;
  padding-bottom: 200px;
  img {
    width: 598px;
    height: 782px;
  }
  button {
    margin-top: 120px;
    display: flex;
    height: 90px;
    padding: 10px 48px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 50px;
    background: #fbcbc1;
    color: #000;
    font-family: "SF Pro";
    font-size: 20px;
    font-style: normal;
    font-weight: 410;
    line-height: normal;
  }
}
</style>
