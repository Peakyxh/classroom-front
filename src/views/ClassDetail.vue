<template>
  <div style="margin-left: 10vw; margin-top: 12vh">
    <Header />
    <div class="class_header">
      <div class="header_up">
        <h1 class="course_name">{{courseInfo ? courseInfo.name : ''}}</h1>
        <h2 class="course_class">{{courseInfo ? courseInfo.teachClass : ''}}</h2>
        <div class="course_member" @click="enterMember">成员管理</div>
        <div class="course_msg">
          <span> <QrcodeOutlined />  加课码 {{courseInfo ? courseInfo.code : ''}}&nbsp;&nbsp; </span>
          <span> 已有{{courseInfo ? courseInfo.joinNumber : ''}}人加入&nbsp;&nbsp; </span>
          <span> {{courseInfo ? courseInfo.creditHours : ''}} 学时数&nbsp;&nbsp; </span>
        </div>
      </div>
      <div class="header_down">
        <a-menu
            v-model:selectedKeys="current"
            mode="horizontal"
            :items="items"
            :mode="state.mode"
            :theme="state.theme"
            style="font-size: 20px;"
            @click="handleMenuClick"
        />
      </div>
    </div>
    <div>
      <CourseTeaching v-if="active === 1" />
      <StudentAnalysis v-if="active === 2" />
    </div>
  </div>
</template>
<script setup>
import {ref, reactive} from 'vue';
import Header from "../components/Header.vue";
import CourseTeaching from './course_teaching/index.vue'
import StudentAnalysis from './study_analysis/index.vue'
import {useRoute, useRouter} from 'vue-router';
import {getOneCourse} from "../api/course.js";
import {userCourseId} from "../store/index.js";
import {QrcodeOutlined} from "@ant-design/icons-vue";

const route = useRoute();

const courseId = route.query.courseId

const courseInfo = ref(null)

const toCourseId = userCourseId()

// 得到数据
if(courseId !== undefined){
  getOneCourse(courseId).then((res) => {
    courseInfo.value = res
  })
  toCourseId.setCourseId(courseId)
}

const active = ref(1)
const state = reactive({
  mode: 'inline',
  theme: 'light',
});
const current = ref(['1']);
const items = ref([
  {
    key: '1',
    label: '课程教学',
    title: '课程教学',
  },
  // {
  //   key: '2',
  //   label: '学情分析',
  //   title: '学情分析',
  // },
]);
// 处理菜单项点击事件
const handleMenuClick = (item) => {
  // 根据点击的菜单项的 key 来切换 active 的值
  active.value = parseInt(item.key);
};

// 跳转去成员管理
const router = useRouter();
const enterMember = () => {
  router.push({
    name: 'MemberInfo',
    query: {courseId}
  });
}

</script>
<style>
.class_header{
  width: 80vw;
  height: 35vh;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
.header_up{
  height: 25vh;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-image: url("../assets/image/13.png");
  background-size: cover; /* 背景图片随着盒子的变大而变大并保持比例 */
  background-repeat: no-repeat; /* 阻止背景图片重复 */
  background-position: center center; /* 水平和垂直居中对齐 */
}
.header_down{
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.course_name{
  color: white;
  position: absolute;
  top: 15vh;
  left: 13vw;
}
.course_class{
  color: white;
  position: absolute;
  top: 23vh;
  left: 13vw;
}
.course_msg{
  color: white;
  position: absolute;
  top: 31vh;
  left: 13vw;
}
.course_member{
  color: white;
  position: absolute;
  top: 15vh;
  right: 13vw;
}
</style>
