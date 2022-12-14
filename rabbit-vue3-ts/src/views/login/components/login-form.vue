<script lang="ts" setup name="LoginForm">
import { ref, onBeforeUnmount, watch, onUnmounted } from "vue";
import XtxCheckbox from "@/components/checkbox/index.vue";
import Message from "@/components/message";
import useStore from "@/store";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { useIntervalFn } from "@vueuse/shared";
const router = useRouter();
const { user } = useStore();
const type = ref<"account" | "mobile">("account");
const isMsgLogin = ref(false);
/* const form = ref({
  account: "xiaotuxian001",
  password: "123456",
  isAgree: false,
}); */

// 表单校验
const { validate, resetForm } = useForm({
  // 提供校验规则
  validationSchema: {
    account: (value: string) => {
      // 校验的value值
      // value是将来使用该规则的表单元素的值
      // 1. 必填
      // 2. 6-20个字符，需要以字母开头
      // 如何反馈校验成功还是失败，返回true才是成功，其他情况失败，返回失败原因。
      if (!value) return "请输入用户名";
      if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return "字母开头且6-20个字符";
      return true;
    },
    password: (value: string) => {
      if (!value) return "请输入密码";
      if (!/^\w{6,12}$/.test(value)) return "密码必须是6-24位字符";
      return true;
    },
    isAgree: (value: boolean) => {
      if (!value) return "请同意隐私条款";
      return true;
    },
    mobile: (value: string) => {
      if (!value) return "请输入手机号";
      if (!/^1[3-9]\d{9}$/.test(value)) return "手机号格式错误";
      return true;
    },
    code: (value: string) => {
      if (!value) return "请输入验证码";
      if (!/^\d{6}$/.test(value)) return "验证码格式错误";
      return true;
    },
  },
});
const { value: account, errorMessage: accountError } =
  useField<string>("account");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const { value: isAgree, errorMessage: isAgreeError } =
  useField<boolean>("isAgree");
const {
  value: mobile,
  errorMessage: mobileError,
  validate: validateMobile,
} = useField<string>("mobile");
const { value: code, errorMessage: codeError } = useField<string>("code");
watch(type, () => {
  resetForm();
});
// Login
const login = async () => {
  const res = await validate();
  if (type.value === "account") {
    if (res.errors.account || res.errors.password || res.errors.isAgree) return;
    await user.login(account.value, password.value);
  } else {
    if (res.errors.mobile || res.errors.code) return;
    await user.mobileLogin(mobile.value, code.value);
  }
  Message.success("登录成功");
  router.push("/");
};

// 短信验证码登录
const mobileRef = ref<HTMLInputElement | null>(null);
const time = ref(0);
const { pause, resume } = useIntervalFn(
  () => {
    time.value--;
    if (time.value <= 0) {
      pause();
    }
  },
  1000,
  { immediate: false }
);
const send = async () => {
  const res = await validateMobile();
  if (!res.valid) {
    mobileRef.value?.focus();
    return;
  }
  await user.sendMobileMSG(mobile.value);
  Message.success("获取验证码成功");
  time.value = 60;
  resume();
};
onUnmounted(() => {
  pause();
});
</script>
<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:;" @click="type = 'account'" v-if="type === 'mobile'">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a href="javascript:;" @click="type = 'mobile'" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <div class="form">
      <template v-if="type === 'account'">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input
              v-model="account"
              type="text"
              placeholder="请输入用户名或手机号"
            />
          </div>
          <div class="error" v-if="accountError">
            <i class="iconfont icon-warning" />{{ accountError }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input
              v-model="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-if="passwordError">
            <i class="iconfont icon-warning" />{{ passwordError }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input
              ref="mobileRef"
              v-model="mobile"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="mobileError">
            <i class="iconfont icon-warning" />{{ mobileError }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input v-model="code" type="password" placeholder="请输入验证码" />
            <span class="code" @click="send">发送验证码</span>
          </div>
          <div class="error" v-if="codeError">
            <i class="iconfont icon-warning" />{{ codeError }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <XtxCheckbox v-model="isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="isAgreeError">
          <i class="iconfont icon-warning" />{{ isAgreeError }}
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </div>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
