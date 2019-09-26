<template>
  <div class="confirm-wrapper" v-show="display">
    <transition name="confirm-bounce" @after-leave="afterLeave">
      <div class="confirm-box" v-show="visiable">
        <p class="confirm-header" v-if="title">{{ title }}</p>
        <p class="confirm-body" v-if="message">{{ message }}</p>
        <div class="confirm-footer">
          <button class="btn-cancel"  v-if="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
          <button class="btn-confirm"  v-if="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'confirm',
  data() {
    return {
      display: false,
      visiable: false
    }
  },
  props: {
    title: {
      type: String,
      default: '提示'
    },
    message: {
      type: String,
      default: ''
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    callback: {
      type: Function,
      default: ()=>{}
    }
  },
  methods: {
    afterLeave() {
      this.display = false;
    },
    handleAction(action){
      if(action === 'cancel' || action === 'confirm'){
        this.callback && this.callback(action)
      }
    }
  },


}
</script>

<style lang="scss" scoped>
  .confirm-wrapper {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .confirm-box {
    display: inline-block;
    width: 420px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    .confirm-header {
      font-size: 18px;
      padding: 0;
      margin: 10px;
      text-align: left;
      color: #333;
    }
    .confirm-body{
      margin: 0 18px 10px;
    }
    .confirm-footer {
      padding: 5px 15px 0;
      text-align: right;
      button{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        transition: .1s;
        font-weight: 500;
        padding: 6px 10px;
        font-size: 14px;
        border-radius: 4px;
        margin: 0 5px;
        &.btn-confirm{
          color: #fff;
          background-color: #409eff;
          border-color: #409eff;
        }
      }
    }
  }

  // 添加动画效果
  .confirm-bounce-enter-active, .confirm-bounce-leave-active {
    transition: all 0.3s ease;
  }
  .confirm-bounce-enter{
    opacity: 0;
    transform: scale(0.5);
  }
  .confirm-bounce-leave-active{
    opacity: 0;
    transform: scale(0.8);
  }

</style>
