<template>
  <div class="support-container">
    <div class="form-container mx-auto">
      <div class="title w-full">HAVING ANY TROUBLE WITH ACUMENBOT?</div>
      <div class="form-wrapper">
        <div class="title">Contact us.</div>
        <form
          action=""
          class="w-full flex flex-col justify-center items-center"
        >
          <input type="text" class="email" placeholder="Your Email address" />
          <textarea class="message mb-[30px]" placeholder="Message"></textarea>
          <button>Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.support-container {
  margin-top: calc(var(--header-top) + var(--header-height) + 62px);
  .form-container {
    width: 956px;
    .title {
      color: #fff;
      font-family: "SF Pro";
      font-size: 24px;
      font-style: normal;
      font-weight: 410;
      line-height: normal;
    }
    .form-wrapper {
      display: flex;
      flex-direction: column;
      gap: 30px;
      .title {
        color: #fff;
        font-family: "SF Pro";
        font-size: 80px;
        font-style: normal;
        font-weight: 410;
        line-height: normal;
      }
      .email {
        display: flex;
        margin-bottom: 30px;
        width: 100%;
        padding: 24px 36px;
        align-items: flex-start;
        gap: 10px;
        align-self: stretch;
        border-radius: 50px;
        border: 1px solid #fff;
        font-family: "SF Pro";
        font-size: 24px;
        font-style: normal;
        font-weight: 270;
        line-height: normal;
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
        &::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      }
      .message {
        display: flex;
        height: 500px;
        width: 100%;
        padding: 24px 36px;
        align-self: stretch;
        border-radius: 50px;
        border: 1px solid #fff;
        color: #fff;
        font-family: "SF Pro";
        font-size: 24px;
        font-style: normal;
        font-weight: 270;
        line-height: normal;
        background: rgba(255, 255, 255, 0.2);
        &::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      }
      button {
        display: flex;
        height: 90px;
        padding: 10px 48px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        box-sizing: border-box;
        border-radius: 50px;
        background: #fbcbc1;
        cursor: pointer;
      }
    }
  }
}
</style>
