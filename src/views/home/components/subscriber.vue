<template>
  <div class="subscriber-container">
    <h3 class="title">WANT TO HEAR MORE FROM US?</h3>
    <h2 class="subtitle">Subscribe our newsletter</h2>

    <form class="subscribe-form" @submit.prevent="handleSubmit">
      <input
        type="text"
        v-model="formData.name"
        placeholder="Preferred name"
        class="input-field"
      />
      <input
        type="email"
        v-model="formData.email"
        placeholder="Your Email address"
        class="input-field"
      />
      <button type="submit" class="subscribe-btn">Subscribe</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const formData = reactive({
  name: "",
  email: "",
});

const handleSubmit = () => {
  // 处理表单提交
  console.log("Form submitted:", formData);
};
</script>

<style scoped>
.subscriber-container {
  width: 1057px;
  margin: auto;
  padding: 60px 20px;
  text-align: center;
  background: #000;
  color: #fff;
  margin-bottom: 100px;
}

.title {
  font-size: 16px;
  margin-bottom: 20px;
  color: #fff;
  font-family: "SF Pro";
  font-size: 24px;
  font-style: normal;
  font-weight: 410;
  line-height: normal;
}

.subtitle {
  font-size: 42px;
  font-weight: 500;
  margin-bottom: 40px;
  color: #fff;
  font-family: "SF Pro";
  font-size: 80px;
  font-style: normal;
  font-weight: 410;
  line-height: normal;
}

.subscribe-form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.input-field {
  padding: 15px 20px;
  border-radius: 8px;
  border: none;
  color: #fff;
  font-size: 16px;
  border-radius: 50px;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.2);
}

.input-field::placeholder {
  color: #888;
}

.subscribe-btn {
  width: fit-content;
  margin: 0 auto;
  padding: 12px 40px;
  border-radius: 25px;
  border: none;
  background: #ffd6d6;
  color: #000;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  height: 90px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  background: #fbcbc1;
}

.subscribe-btn:hover {
  background: #ffc0c0;
}
</style>
