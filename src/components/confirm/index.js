import Vue from 'vue';
import ConfirmConfig from './Confirm.vue';


let currentMsg = null;
let instance = null;
const ConfirmConstructor = Vue.extend(ConfirmConfig);
function defaultCallback(action) {
  instance.visiable = false;
  if (action === 'confirm') {
    currentMsg.resolve('confirm');
  } else {
    currentMsg.reject('cancel');
  }
}

function confirm(option = {}) {
  instance = new ConfirmConstructor({
    el: document.createElement('div'),
  });
  if (typeof option === 'string') {
    instance.message = option;
  } else {
    instance.title = option.title || '提示';
    instance.message = option.message || '';
    instance.showConfirmButton = !!option.showConfirmButton;
    instance.showCancelButton = !!option.showCancelButton;
    instance.confirmButtonText = option.confirmButtonText || '确定';
    instance.cancelButtonText = option.cancelButtonText || '取消';
  }
  instance.$watch('display', (val) => {
    // 再次关闭时，移除组件
    if (!val) {
      instance.$destroy(true);
      instance.$el.parentNode.removeChild(instance.$el);
      instance = null;
      currentMsg = null;
    }
  });
  instance.callback = defaultCallback;
  document.body.appendChild(instance.$el);
  instance.display = true;
  Vue.nextTick(() => {
    instance.visiable = true;
  });
  return new Promise((resolve, reject) => {
    currentMsg = {
      resolve,
      reject,
    };
  });
}
export default confirm;
