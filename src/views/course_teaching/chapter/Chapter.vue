<template>
  <div class="chapter_all">
    <div class="chapter_up">
      <div class="all_chapter">共{{courseAll ? courseAll.chapterNumber: ''}}个章节</div>
      <div class="all_active">{{courseAll ? courseAll.activeNumber : ''}}个活动</div>
      <a-divider class="divider" type="vertical" />
      <div class="credit">已分配学时 {{courseAll ? courseAll.allocatedHours + '/' + courseAll.creditHours : ''}} </div>
      <a-progress class="progress" :percent="courseAll ? courseAll.allocatedHours / courseAll.creditHours * 100 : 0" size="small" />
      <div style="float: right;" v-if="!isStudent">
        <el-button type="primary" plain size="large">编辑排序</el-button>
        <el-button type="primary" size="large" @click="addChapter"><PlusOutlined />&nbsp; 添加章节</el-button>
        <el-button type="success" size="large" @click="dialogVisible = true"><PlusOutlined />&nbsp; 添加内容</el-button>
      </div>
    </div>

    <div>
      <a-tree
          class="tree_plan"
          :tree-data="treeData"
      >
        <template #title="item">

          <div v-if="item.typeContent === HOMEWORK_CONTENT">
            <HomeContent :contentInfo="item.contentInfo" />
          </div>
          <div v-else-if="item.typeContent === TEST_CONTENT">
            <TestContent :contentInfo="item.contentInfo" />
          </div>
          <div v-else-if="item.typeContent === TOPIC_CONTENT">
            <TopicContent :contentInfo="item.contentInfo" />
          </div>
          <div v-else-if="item.typeContent === RESOURCE_CONTENT">
            <ResourceContent :contentInfo="item.contentInfo" />
          </div>

          <div v-else class="tree_class">
            <div class="expand_tree" @click="toggleSubContent(item)">
              <div v-if="item.parentId === 0" style="font-size: 1.2rem;" >
                {{ item.name }}
              </div>
              <div v-else>{{ item.name }}</div>

              <div style="margin-left: 1vw">{{item.activeNumber}}个活动</div>
              <a-tag color="#74787C" style="margin-left: 1vw" v-if="item.teachMode === '3'">混合</a-tag>
              <a-tag color="#74787C" style="margin-left: 1vw" v-if="item.teachMode === '2'">线下</a-tag>
              <a-tag color="#74787C" style="margin-left: 1vw" v-if="item.teachMode === '1'">线上</a-tag>
              <a-tag color="blue">{{item.creditHours}}学时</a-tag>
            </div>

            <div style="margin-left: 50vw; display: flex; align-items: center;" v-if="!isStudent">
              <div v-if="item.parentId === 0" @click="addSubsection(item.chapterId)">
                <div>
                  <PlusOutlined />
                </div>
                <div style="margin-top: -0.5vh">
                  添加小节
                </div>
              </div>
              <div style="margin-left: 2.5vw;">
                <a-dropdown :trigger="['click']">
                  <div>
                    <div>
                      <EllipsisOutlined style="font-size: 1.3rem" />
                    </div>
                    <div style="margin-top: -1vh">
                      更多
                    </div>
                  </div>
                  <template #overlay>
                    <a-menu style="width: 5vw; margin-left: -1vw">
                      <a-menu-item key="0">
                        <a @click="editChapter(item.chapterId, item.name, item.parentId, item.teachMode, item.creditHours)">编辑</a>
                      </a-menu-item>
                      <a-menu-item key="1">
                        <a href="">删除</a>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </div>
          </div>

        </template>
      </a-tree>
    </div>

    <!--添加章节-->
    <div>
      <a-modal v-model:open="openAdd" :title="modalTitle" @ok="handleOk" width="50vw" cancelText="取消" okText="确定">
        <div style="margin-top: 3vh">
          <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item :label="chapterOrSubsectionName" :rules="[{ required: true, message: '请输入名称' }]">
              <a-input size="large" style="width: 30vw" placeholder="请输入名称" v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="授课模式">
              <a-radio-group v-model:value="formState.teachMode">
                <a-radio value="1">线上</a-radio>
                <a-radio value="2">线下</a-radio>
                <a-radio value="3">混合</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="学时数">
              <a-input size="large" style="width: 30vw" placeholder="请输入学时，不填写默认为不设置" v-model:value="formState.creditHours" />
            </a-form-item>
            <div class="illustration">
              说明：新建章节将出现在已建章节的下方，按建立顺序排序
            </div>
          </a-form>
        </div>
      </a-modal>
    </div>

    <!--添加内容-->
    <div>
      <el-dialog v-model="dialogVisible" title="添加内容" :center="true" width="35%">
        <br />
        <div>
          <h2>课程内容</h2>
          <div style="margin-left: 2vw; cursor: pointer;"  @click="CreateResource()">
            <img src="@/assets/image/icon-data.svg" alt="资料" style="height: 5vh" />
            <div style="margin-left: 0.3vw">资料</div>
          </div>
        </div>
        <div style="margin-bottom: 10vh">
          <h2>课程活动</h2>
          <div class="content_class" style="margin-left: 2vw">
            <img src="@/assets/image/icon-homework.svg" alt="作业" style="height: 5vh" />
            <div style="margin-left: 0.3vw">作业</div>
          </div>
          <div class="content_class" @click="AddTest">
            <img src="@/assets/image/icon-testing.svg" alt="测试" style="height: 5vh" />
            <div style="margin-left: 0.3vw">测试</div>
          </div>
          <div class="content_class">
            <img src="@/assets/image/icon-notice.svg" alt="公告" style="height: 5vh" />
            <div style="margin-left: 0.3vw">公告</div>
          </div>
          <div class="content_class" @click="AddTopic">
            <img src="@/assets/image/icon-topicDiscussion.svg" alt="话题" style="height: 5vh" />
            <div style="margin-left: 0.3vw">话题</div>
          </div>
        </div>
        <br />
      </el-dialog>
    </div>
  </div>
  <AddOrEditResource v-if="openSelect1" :openCreate="openSelect1" @updateOpenAdd="updateOpen"/>
</template>
<script setup>
import {onMounted, reactive, ref, toRaw, watch} from 'vue';
import {addChapterInfo, getChapterByCourse, getCourseContentInfo, updateChapterInfo} from "../../../api/chapter.js";
import {userCourseId} from "../../../store/index.js";
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons-vue';
import {ElMessage} from "element-plus";
import HomeContent from "@/components/chapter/HomeContent.vue";
import TestContent from "@/components/chapter/TestContent.vue";
import TopicContent from "@/components/chapter/TopicContent.vue";
import {ADMIN, COMMON, HOMEWORK_CONTENT, RESOURCE_CONTENT, TEST_CONTENT, TOPIC_CONTENT} from "@/config/setting.js";
import {getRoles} from "@/utils/user-utils.js";
import {useRouter} from "vue-router";
import { Modal } from "ant-design-vue";
import mitter from "../../../main.js";
import ResourceContent from "@/components/chapter/ResourceContent.vue";
import AddOrEditResource from "@/components/resource/AddOrEditResource.vue";

const toCourseId = userCourseId()

const chapterList = ref(null)

const treeData = ref([])

const dialogVisible = ref(false)

const courseAll = ref(null)

const id = ref()

const isStudent = ref(true)

onMounted(() => {
  const roles = getRoles()
  if(roles.includes(ADMIN)){
    isStudent.value = false
  }else if (roles.includes(COMMON)){
    isStudent.value = true
  }
  id.value =  toCourseId.getCourseId()
  getInfo()
  formState.courseId = id.value
})

const getInfo = () => {
  getChapterByCourseInfo(id.value)
  getCourseContentInfoAll(id.value)
}

// 得到章节对应课程的一些信息
const getCourseContentInfoAll = (courseId) => {
  getCourseContentInfo(courseId).then((res) => {
    courseAll.value = res
  })
}

// 获取章节信息
const getChapterByCourseInfo = (courseId) => {
  getChapterByCourse(courseId).then((res) => {
    chapterList.value = res
    treeData.value = res
    console.log(chapterList.value)
  })
}

const modalTitle = ref('添加章节')
const chapterOrSubsectionName = ref('章节名称')

const formState = reactive({
  chapterId: '',
  name: '',
  parentId: '',
  teachMode: '',
  creditHours: '',
  courseId: ''
});

const clearFrom = () => {
  formState.chapterId = '';
  formState.name = '';
  formState.parentId = '';
  formState.teachMode = '';
  formState.creditHours = '';
}

// 创建章节
const openAdd = ref(false);
const addChapter = () => {
  modalTitle.value = '添加章节'
  chapterOrSubsectionName.value = '章节名称'
  clearFrom()
  openAdd.value = true;
}

// 编辑章节
const editChapter = (chapterId, name, isParent, teachMode, creditHours) => {
  if(isParent === 0){
    modalTitle.value = '编辑章节'
    chapterOrSubsectionName.value = '章节名称'
  }else {
    modalTitle.value = '编辑小节'
    chapterOrSubsectionName.value = '小节名称'
  }

  // 将章节信息回显到编辑表单中
  formState.chapterId = chapterId;
  formState.name = name;
  formState.parentId = isParent;
  formState.teachMode = teachMode;
  formState.creditHours = creditHours;

  openAdd.value = true;
}

// 添加小节
const addSubsection = (courseId) => {
  modalTitle.value = '添加小节'
  chapterOrSubsectionName.value = '小节名称'
  clearFrom()
  formState.parentId = courseId
  openAdd.value = true;
}

// 提交
const handleOk = e => {
  if(formState.name != ''){
    openAdd.value = false;
    if(modalTitle.value === '添加章节'){
      formState.parentId = 0
      addChapterInfo(formState).then((res) => {
        ElMessage.success(res)
        getInfo()
      })
    }
    if(modalTitle.value === '添加小节'){
      addChapterInfo(formState).then((res) => {
        ElMessage.success(res)
        getInfo()
      })
    }
    if(modalTitle.value === '编辑章节' || modalTitle.value === '编辑小节'){
      updateChapterInfo(formState).then((res) => {
        ElMessage.success(res?.msg)
        getInfo()
      })
    }
  }else {
    ElMessage.error("名称为空，必须添写")
  }

};

const expandedSubContent = ref([]); // 用于存储子内容的展开状态

const toggleSubContent = (item) => {
  // 判断当前子内容的展开状态
  const isExpanded = expandedSubContent.value.includes(item.chapterId);

  if (isExpanded) {
    // 如果已展开，就收起
    expandedSubContent.value = expandedSubContent.value.filter(id => id !== item.chapterId);
    console.log("123==="+expandedSubContent.value)
  } else {
    // 如果未展开，就展开
    expandedSubContent.value = [...expandedSubContent.value, item.chapterId];
    console.log("456==="+expandedSubContent.value)
  }
};

const labelCol = {
  style: {
    width: '10vw',
  },
};
const wrapperCol = {
  span: 20,
};

const router = useRouter();
// 添加测试
const AddTest = () => {
  router.push({
    name:'AddTest',
  })
}

// 添加话题
const showMode = ref(true);
const AddTopic = () => {
  mitter.emit("showMode", showMode.value);
  dialogVisible.value = false
};

// 添加资料
const openSelect1 = ref(false);
const CreateResource = () => {
  dialogVisible.value = false
  openSelect1.value = true;
};
</script>
<style>
.chapter_all{
  width: 80vw;
}
.chapter_up{
  height: 8vh;
}
.all_chapter{
  float: left;
  margin-top: 1vh;
}
.all_active{
  float: left;
  margin-left: 1vw;
  margin-top: 1vh;
}
.divider{
  border-color: gray;
  float: left;
  margin-top: 1.7vh;
}
.credit{
  float: left;
  margin-top: 1vh;
}
.progress{
  float: left;
  width: 10vw;
  margin-left: 1vw;
  margin-top: 1vh;
}

.tree_plan{
  padding-left: 1vw;
  width: 80vw;
  background-color: #EEEEEE;
}

.tree_plan .ant-tree-treenode-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  margin: 0;
}

.tree_plan .ant-tree-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: auto;
  height: auto;
  margin: 0;
}
.tree_class{
  display: flex;
  align-items: center;
  height: 7vh;
//background-color: #EEEEEE;
}
/* 取消默认的悬停和点击样式 */
.ant-tree-node-content-wrapper:hover,
.ant-tree-node-selected .ant-tree-node-content-wrapper {
  background-color: transparent !important;
}

/* 取消点击后的默认背景颜色 */
.ant-tree-node-selected .ant-tree-node-content-wrapper:active {
  background-color: transparent !important;
}

.expand_tree{
  display: flex;
  align-items: center;
  margin-left: 0.5vw;
}


.illustration{
  margin-left: 5.5vw;
  margin-bottom: 3vh;
  color: #888888;
}
.content_class{
  float: left;
  margin-left: 3vw;
  cursor: pointer; /* 将光标设为小手 */
}

</style>
