<script setup name="AppTopnav" lang="ts">
import useStore from "@/store/index";
import { useRouter } from "vue-router";
import Message from "@/components/message";
const router = useRouter();
const { user } = useStore();
const logout = () => {
  user.logout();
  router.push("/login");
  Message.success("退出成功");
};
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <li>
          <a href="javascript:;"
            ><i class="iconfont icon-user"></i>{{ user.profile.nickname }}</a
          >
        </li>
        <li><a href="javascript:;" @click="logout">退出登录</a></li>
        <li><router-link to="/login">请先登录</router-link></li>
        <li><a href="">免费注册</a></li>
        <li><a href="">我的订单</a></li>
        <li><a href="">会员中心</a></li>
        <li><a href="">帮助中心</a></li>
        <li><a href="">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="less" scoped>
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
