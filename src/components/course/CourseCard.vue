<template>
  <div>
    <div class="card" v-for="item in courseList" :key="item.courseId">
      <div class="card_up" @click="toClassDetail(item.courseId)">
        <span class="year_class">{{item.schoolYear}}</span>
        <span style="font-size: 13px;">{{ " " + item.term}}</span>
        <div class="card_name">{{item.name}}</div>
        <div class="card_classes">{{item.teachClass}}</div>

        <div style="margin-left: 2vw; margin-top: 2vh" v-if="item.isOver === '0'">
          <QrcodeOutlined @click.stop="toQRCode(item.code)" />
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent.stop>
              加课码: {{item.code}}
              <DownOutlined v-if="!isStudent" />
            </a>
            <template #overlay v-if="!isStudent">
              <a-menu style="width: 5vw; margin-left: 5vw">
                <a-menu-item>
                  <a>停用</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="renewCourseCode(item.courseId)">重置</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div style="margin-left: 2vw; margin-top: 2vh" v-else>
          <div class="over_class">已结课</div>
        </div>
      </div>
      <div class="card_down">
        <div style="margin-left: 1vw; margin-top: 6vh; font-size: 14px;">
          <a-tag class="mode_class" color="#108ee9" v-if="item.courseType === '1'">教</a-tag>
          <a-tag class="mode_class" color="blue" v-else-if="item.courseType === '3'">学</a-tag>
          <div style="float: left; font-size: 0.8rem">&nbsp;成员 {{item.joinNumber}} 人</div>
          <div class="other_info">
            <a-dropdown :trigger="['click']">
              <EllipsisOutlined style="font-size: 1.3rem;" />
              <template #overlay v-if="!isStudent">
                <a-menu style="width: 6vw; margin-left: -2vw" >
                  <a-menu-item key="0" v-if="item.isOver === '0'">
                    <a @click="showModalOver(item.courseId, item.isOver)">结课</a>
                  </a-menu-item>
                  <a-menu-item key="3" v-else>
                    <a @click="showModalOpen(item.courseId, item.isOver)">取消结课</a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a @click="showModalDel(item.name, item.courseId)">删除</a>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <a @click="toClassSetting(item.courseId)">编辑</a>
                  </a-menu-item>
                </a-menu>
              </template>
              <template #overlay v-if="isStudent">
                <a-menu style="width: 4.5vw; margin-left: -2vw">
                  <a-menu-item key="0">
                    <a @click="showExit(item.courseId)">退课</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div v-if="item.isTop === '1'" style="float: right; font-size: 0.8rem; cursor: pointer;" @click.stop="handleCancelTop(item.courseId, item.isTop)">取消置顶</div>
          <div v-else style="float: right; font-size: 0.8rem; cursor: pointer;" @click.stop="handleCancelTop(item.courseId, item.isTop)">置顶</div>
        </div>
      </div>
    </div>

    <a-modal v-model:open="openDel" :title="titleInfo" @ok="handleOkDel" cancelText="取消" okText="确定">
      <div>您的这个课程的任何信息或评论将被永久删除</div>
      <div style="color: orange">警告：次操作无法撤销</div>
      <div style="color: #4096FF; margin-bottom: 3vh">提醒：已用课程数包含了“删除课程数”</div>
<!--      <a-input-password v-model:value="value" size="large" placeholder="请输入登录密码校验" />-->
    </a-modal>

    <a-modal v-model:open="openOver" :title="titleInfo" @ok="handleOkOver" cancelText="取消" :okText="sureBt">
      <div>{{content}}</div>
    </a-modal>

<!--    退课-->
    <a-modal v-model:open="openExit" :title="titleInfo" @ok="handleOkExit" cancelText="取消" okText="退课">
      <div>{{content}}</div>
    </a-modal>

    <a-modal v-model:open="showCode" :footer="null">
      <qrcode-vue :value="code" size:300  ></qrcode-vue>
    </a-modal>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import {QrcodeOutlined, DownOutlined, EllipsisOutlined} from "@ant-design/icons-vue";
import {useRouter} from "vue-router";
import {cancelCourse, deleteCourse, openTheCourse, overTheCourse, renewCode, exitCourse} from "@/api/course.js";
import {ElMessage} from "element-plus";
import QrcodeVue from 'qrcode.vue'

const props = defineProps({
  courses: Object,
  student: Boolean
})

const courseList = props.courses
const isStudent = props.student

const router = useRouter();

//跳转到课程详细页面
const toClassDetail = (courseId) => {
  router.push({
    name: 'ClassDetail',
    query: {courseId}
  });
}

//跳转到课程设置页面
const toClassSetting = (courseId) => {
  router.push({
    name: 'ClassSetting',
    query: {courseId}
  });
}

//删除课程
const titleInfo = ref("确定要删除")
const courseIds = ref(null)
const openDel = ref(false);
const showModalDel = (name, courseId) => {
  titleInfo.value = "确定要删除"+"“"+name+"”"
  courseIds.value = courseId
  openDel.value = true;
};
const handleOkDel = e => {
  if(courseIds.value != null){
    deleteCourseInfo(courseIds.value)
  }
  openDel.value = false;
};
const deleteCourseInfo = (courseId) => {
  deleteCourse(courseId).then(res => {
    ElMessage.success(res)
    location.reload();
  })
}

// 进行结课和取消结课
const openOver = ref(false)
const content = ref("结课后，将无法再新增学生。")
const sureBt = ref("结课")
const courseOver = ref()
const showModalOver = (courseId, isOver) => {
  titleInfo.value = "确定要结课吗？"
  content.value = "结课后，将无法再新增学生。"
  sureBt.value = "结课"
  courseIds.value = courseId
  courseOver.value = isOver
  openOver.value = true
}
const showModalOpen = (courseId, isOver) => {
  titleInfo.value = "确定取消结课吗？"
  content.value = "取消后，课程恢复正常运行状态，学生可正常访问课程。"
  sureBt.value = "取消结课"
  courseIds.value = courseId
  courseOver.value = isOver
  openOver.value = true
}
const handleOkOver = e => {
  if(courseOver.value === '0'){
    // 还没结课，需要进行结课
    if(courseIds.value != null){
      overCourse(courseIds.value)
    }
  }else {
    // 已经结课了，进行取消结课
    if(courseIds.value != null){
      openCourse(courseIds.value)
    }
  }
  openOver.value = false;
};
const overCourse = (courseId) => {
  overTheCourse(courseId).then(res => {
    ElMessage.success(res)
    location.reload();
  })
}
const openCourse = (courseId) => {
  openTheCourse(courseId).then(res => {
    ElMessage.success(res)
    location.reload();
  })
}

// 退课
const openExit = ref(false)
const showExit = (courseId) => {
  titleInfo.value = "确定要退出吗？"
  content.value = "退出后，关于该课程的所有内容都会被删除！"
  courseIds.value = courseId
  openExit.value = true
}
const handleOkExit = () => {
  exitCourse(courseIds.value).then(res => {
    ElMessage.success(res)
    openExit.value = false
    location.reload();
  })
}

// 转二维码
const showCode = ref(false)
const code = ref('')
const toQRCode = (value) => {
  code.value = value
  showCode.value = true
}

// 重置课程码
const renewCourseCode = (courseId) => {
  renewCode(courseId).then(res => {
    ElMessage.success(res)
    location.reload();
  })
}

// 取消置顶
const handleCancelTop = (courseId, isTop) => {
  cancelCourse(courseId, isTop).then(res => {
    console.log(res)
  })
}
</script>
<style>
.card{
  width: 18vw;
  height: 33vh;
  margin-top: 5vh;
  margin-left: 1.5vw;
  margin-bottom: 3vh;
  float: left;
  border-radius: 10px;
  text-align: left;
  vertical-align: top;
  border: 1px solid #ddd;
}
.card_up{
  height: 68%;
  background-image: url("../../assets/image/13.png");
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: white;
  cursor: pointer; /* 将鼠标光标设为小手 */
}
.card_down{
  height: 32%;
}
.year_class{
  display:inline-block;
  margin-top: 2vh;
  margin-left: 2vw;
  font-size: 10px;
}
.card_name{
  margin-top: 1vh;
  margin-left: 2vw;
  font-size: 20px;
}
.card_classes{
  margin-left: 2vw;
  margin-top: 1vh;
  font-size: 15px;
}
.ant-dropdown-link{
  color: white;
}
.mode_class{
  float: left;
  border-radius: 3px;
  text-align: center;
  width: 1vw;
}
.other_info{
  //display: inline-block;
  float: right;
  margin-right: 1vw;
  //margin-top: -2.5vh;
  vertical-align: middle;
  cursor: pointer;
}
.over_class{
  width: 5vw;
  height: 4vh;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 2px;
}
</style>
