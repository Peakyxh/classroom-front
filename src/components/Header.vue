<template>
  <div class="all_header">
    <div>
<!--      <a-breadcrumb separator=">">-->
<!--        <a-breadcrumb-item>Home</a-breadcrumb-item>-->
<!--        <a-breadcrumb-item href="">Application Center</a-breadcrumb-item>-->
<!--        <a-breadcrumb-item href="">Application List</a-breadcrumb-item>-->
<!--        <a-breadcrumb-item>An Application</a-breadcrumb-item>-->
<!--      </a-breadcrumb>-->

      <div>
        <img src="../assets/image/logo_blue.png" class="header_img">
      </div>

<!--      <a-breadcrumb style="margin-left: 1vw; margin-top: 1vh" separator=">" v-for="(item, index) in state.list" :key="index">-->
<!--        <a-breadcrumb-item v-if="index < state.list.length-1">-->
<!--            {{item.meta.title}}-->
<!--        </a-breadcrumb-item>-->
<!--        <a-breadcrumb-item @click="toThisPage(item)" v-else>-->
<!--          {{item.meta.title}}-->
<!--        </a-breadcrumb-item>-->
<!--      </a-breadcrumb>-->
      <div class="ClassHeader">
        <h3>我的课堂</h3>
      </div>
    </div>

<!--    <div class="login_btn" @click="toLogin">-->
    <div class="login_btn">
      <a-dropdown :trigger="['click']">
        <a style="font-size: 1rem; cursor: pointer;">{{username ? username : '登录'}}</a>
        <template #overlay>
          <a-menu style="width: 8vw; margin-left: 3vw">
            <a-menu-item key="0">
              <SettingOutlined />
              <a > 个人设置</a>
            </a-menu-item>
            <a-menu-item key="1">
              <DeleteOutlined />
              <a @click="handleLogout"> 退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

  </div>
</template>
<script setup>
import {useRouter, useRoute} from "vue-router";
import {onMounted, reactive, ref, watch} from "vue";
import {userCourseId} from "@/store/index.js";
import {SettingOutlined, DeleteOutlined} from "@ant-design/icons-vue";
import {logout} from "@/api/login.js";
import {ElMessage} from "element-plus";
import {removeRoles, removeUserId} from "@/utils/user-utils.js";
import {removeToken} from "@/utils/token-utils.js";
import {userInfo} from "@/store/index.js";

const router = useRouter();
const toLogin = () => {
  router.push({name: 'Login'})
}

const route = useRoute()
const state = reactive({
  list: []
})

onMounted(() => {
  let matched = route.matched  //获取菜单对应的路由信息
  state.list = matched
  // console.log("--------", state.list)
})

watch(() => route.matched, (newVal, oldValue) => {
  let matched = newVal
  state.list = matched
  //更新路由菜单数组
  // console.log("========", state.list)
})

const toCourseId = userCourseId()

const toThisPage = (item) => {
  router.push({
    path: item.path,
    query: toCourseId.getCourseId()
  })
}

// 退出操作
const handleLogout = () => {
  logout().then(res => {
    ElMessage.success(res)
    removeToken()
    removeRoles()
    removeUserId()
    location.reload()
  })
}

// 获取当前用户信息
const userInfoM = userInfo()
const username = ref(null)
username.value =userInfoM.getUsername()

</script>
<style>
.all_header{
  position: fixed;
  background-color: white;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
.login_btn{
  position: absolute;
  top: 30%;
  right: 3vw;
}
.header_img{
  float: left;
  width: 8vw;
  margin-top: 2.5vh;
  margin-left: 2vw;
}
.ClassHeader{
  position: absolute;
  top: 20%;
  left: 50%;
  font-size: 1.5rem;
}
</style>
