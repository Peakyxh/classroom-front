<template >
<div  :key="TestKey" style="float: left;">共{{ num }}个活动</div>
<div v-if="roles == 'admin'" style="margin-right: 18vh;"><el-button @click="addtest" style="width: 17vh; height: 5vh;" class="a" type="success" ><PlusOutlined />添加测试</el-button></div>

<div v-if="roles == 'admin'" class="a">  <el-button type="primary" style="width: 17vh; height: 5vh;"><CheckOutlined />批量操作</el-button> </div>
<div v-if="roles == 'admin'" class="a" style="margin-top: 1vh;">
  <DownloadOutlined /><p style="float: right;">&nbsp 下载所有测试</p>
</div>


<div  :key="TestKey" v-if="roles == 'admin'" class="a"  style=" color: rgb(83, 133, 250); margin: 1vh 0vh 0vh 20vh;">
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent style=" color: rgb(83, 133, 250); margin: 1vh 0vh 0vh 20vh;">
      <OrderedListOutlined />
      &nbsp 排序
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;">按添加时间升序</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">按添加时间降序</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">按名称升序</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">按名称降序</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</div>
<Card style="margin-top: 6vh; width: 159vh;">
  <Card style="border: none;">
    <a-list item-layout="horizontal">


    <template v-if="roles == 'admin'" v-for="item in TestList" :key="TestKey">
      <a-list-item v-if="item.course_id == courseId">
        <a-list-item-meta
          description=" ">
          <template #title>
            <div style="height: 12vh;width: 28vh;cursor: pointer;">
              <a @click="testContent(item.testId)" style=" font-size: large;width: 10vh; margin: 2vh 0vh 0vh 3vh; float: left;color: black;">{{ item.title }}</a>
            <div @click="testContent(item.testId)" style="float: left; position: absolute;">
              <p style="display: inline-block; margin: 7vh 2vh 0vh 3vh;">截至时间:
                <p style="display: inline-block;" v-if="item.deadline==null"> &nbsp不限 &nbsp</p>
                <p style="display: inline-block;">{{ item.deadline }}</p> &nbsp|</p>
              <p style="display: inline-block;" v-if="item.testLabel==1">普通测试</p>
              <p style="display: inline-block;" v-if="item.testLabel==2">考试</p>
            </div>

            <div v-if="item.publishDate == null" style="margin-left: 55.5vh; width: 75vh; height: 15vh; position: absolute;">
                <div class="ant-dropdown-link" @click.prevent  style="float: right;margin-top: 1.25vh;cursor: pointer;">
                  <a-dropdown>
                  <a style="color: black;">
                    <div class="change" style="font-size: 3vh;">
                    <EllipsisOutlined />
                  </div>
                    更多</a>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item>
                        <a @click="Edit(item.testId)">编辑</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a href="javascript:;">移动到章节</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a href="javascript:;">保存试卷到备课区</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a href="javascript:;">分享</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a @click="deletetest(item.testId,'bottom')">删除</a>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
                </div>
                <div style="float: right; margin: 2vh 0vh 0vh 6vh;">
                  <a-divider type="vertical" style="height: 60px; background-color: rgb(215, 215, 215)" />
                  <a-divider type="vertical" style="height: 60px; border-color: rgb(215, 215, 215)" dashed />
                </div>

                <div @click="Edit(item.testId)"  style="float: right; margin: 1.25vh 0vh 0vh 6vh;cursor: pointer;">
                  <div class="change" style="font-size: 3vh;">
                    <SendOutlined />
                  </div>
                  <p>发布</p>
                </div>
            </div>


              <div v-if="item.publishDate != null" style="margin-left: 30vh; width: 75vh; height: 15vh; display: inline-block; position: absolute;">
                <div style="float: left; margin-top: 1.25vh;cursor: pointer;">
                  <div class="change" style="font-size: 3vh;">
                    <EyeOutlined/>
                  </div>
                  <p>监控</p></div>
                <div style="float: left; margin: 1.25vh 0vh 0vh 6vh;cursor: pointer;">
                  <div class="change" style="font-size: 3vh;">
                    <CustomerServiceOutlined />
                  </div>
                  <p>讲解</p></div>
                <div style="float: left; margin: 1.25vh 0vh 0vh 6vh;cursor: pointer;">
                  <div class="change" style="font-size: 3vh;">
                    <ClockCircleOutlined />
                  </div>
                  <p>分析</p></div>
                <div style="float: left; margin: 2vh 0vh 0vh 6vh;">
                  <a-divider type="vertical" style="height: 60px; background-color: rgb(215, 215, 215)" />
                  <a-divider type="vertical" style="height: 60px; border-color: rgb(215, 215, 215)" dashed />
                </div>
                <div style="float: left; margin: 0.5vh 0vh 0vh 4vh;cursor: pointer;">
                  <p style="margin: 0vh; padding: 0vh; font-size: 3.5vh; color: hsl(203, 100%, 64%);"
                   v-if="item.corrrcted != null">
                    {{ item.corrrcted }}</p>
                    <p style="margin: 0vh; padding: 0vh; font-size: 3.5vh; color: hsl(203, 100%, 64%);"
                   v-if="item.corrrcted == null">
                    {{ 0 }}</p>

                  <p>已批</p>
                </div>

                <div style="float: left; margin: 0.5vh 0vh 0vh 6vh; cursor: pointer;">
                  <p style="margin: 0vh; padding: 0vh; font-size: 3.5vh; color: hsl(203, 100%, 64%);"
                  v-if="NotCorrected != null">
                    {{ NotCorrected }}</p>
                    <p style="margin: 0vh; padding: 0vh; font-size: 3.5vh; color: hsl(203, 100%, 64%);"
                  v-if="NotCorrected == null">
                    {{ 0 }}</p>
                  <p>未批</p>
                </div>
                <div style="float: left; margin: 0.5vh 0vh 0vh 6vh;cursor: pointer;">
                  <p style="margin: 0vh; padding: 0vh; font-size: 3.5vh; color: hsl(203, 100%, 64%);"
                  v-if="item.unpaid != null">
                    {{ item.unpaid }}</p>
                    <p style="margin: 0vh; padding: 0vh; font-size: 3.5vh; color: hsl(203, 100%, 64%);"
                  v-if="item.unpaid == null">
                    {{ 0 }}</p>

                  <p>未交</p>
                </div>
                <div style="float: left; margin: 2vh 0vh 0vh 6vh;">
                  <a-divider type="vertical" style="height: 60px; background-color: rgb(215, 215, 215)" />
                  <a-divider type="vertical" style="height: 60px; border-color: rgb(215, 215, 215)" dashed />
                </div>
                <div @click.prevent  style=" margin-top: 1.25vh;cursor: pointer;
                display: inline-block; position: absolute;width: 5vh;">

                  <a-dropdown>
                  <a style="color: black;">
                    <div class="change" style="font-size: 3vh;">
                    <EllipsisOutlined />
                  </div>
                    更多</a>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item>
                        <a @click="Edit(item.testId)">编辑</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a href="javascript:;">移动到章节</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a href="javascript:;">保存试卷到备课区</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a href="javascript:;">分享</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a @click="deletetest(item.testId,'bottom')">删除</a>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>


                  <a-modal v-model:open="open"  width="150vh" title="编辑/发布测试" @ok="handleOk(item.testId)">
                    <hr style="border: 1px solid #ccc">
                    <a-form ref="formRef" :model="testForm" style="width: 170vh;margin: auto; margin-top: 4vh;">
                      <a-form-item
                        label="测试标题"
                        name="title"
                        :rules="[{ required: true, message: '请输入测试标题!' }]"
                      >
                        <a-input style="display: inline-block; margin-right: 7vh; width: 131vh;
                        height: 5vh;" v-model:value="testForm.title" placeholder="请输入内容，最多50字"  />
                      </a-form-item>

                      <a-form-item style="width: 142vh;">
                        <div style="border: 1px solid #ccc;">
                          <Toolbar
                            style="border-bottom: 1px solid #ccc"
                            :editor="editorRef"
                            :defaultConfig="toolbarConfig"
                            :mode="mode"
                          />
                          <Editor
                            style="height: 20vh; overflow-y: hidden;"
                            v-model="valueHtml"
                            :defaultConfig="editorConfig"
                            :mode="mode"
                            @onCreated="handleCreated"
                          />
                        </div>
                      </a-form-item>
                      <div>
                        <b>
                          <a-form-item
                        style="margin: 2vh 0vh 0vh 3vh;"
                          label="测试标签"
                          name="testLabel"
                          :rules="[{ required: true }]"
                        >
                        <a-radio-group  v-model:value="testForm.testLabel" style="display: inline-block; float: left; margin-left: 3vh;">
                          <a-radio :value="1">普通测试</a-radio>
                          <a-radio :value="2">考试</a-radio>
                        </a-radio-group>
                      </a-form-item>
                        </b>
                      </div>

                      <div style="float: left; position: absolute; margin-left: 3vh;">
                        <a-form-item
                          label="活动类型标签"
                          name="typeLabel">
                          <a-input style="width: 33vh;" v-model:value="testForm.typeLabel" show-count :maxlength="10" />
                          <p style="display: inline-block; font-size:larger"> &nbsp &nbsp</p>
                        <QuestionOutlined />
                        </a-form-item>
                      </div>
                      <div style="margin: 0vh 0vh 0vh 70vh;float: right; position: absolute;">
                        <a-form-item
                          label="知识共享协议"
                          name="shareProtocol"
                        >
                          <a-tree-select
                            v-model:value="testForm.shareProtocol"
                            style="width: 33vh;"
                            :tree-data="treeData1"
                            placeholder="请选择" />
                            <p style="display: inline-block; font-size:larger"> &nbsp &nbsp</p>
                            <QuestionOutlined />
                        </a-form-item>
                      </div>

                      <div v-if="item.publishDate != null" style="position: absolute; margin: 8vh 0vh 5vh 4vh;">
                      <b>
                      <a-form-item
                        label="章节目录"
                        name="chapterId">
                        <el-tree-select
                          v-model="testForm.chapterId"
                          style="width: 35vh;"
                          placeholder="请选择"
                          :data="treeData"
                          node-key="chapterId"
                          :render-after-expand="false"
                          :props="treeProps"
                        >
                        </el-tree-select>
                      </a-form-item>
                    </b>
                    </div>

                    <div style="position: absolute; margin: 8vh 0vh 5vh 70vh;">
                      <b>
                      <a-form-item
                        label="应用环节"
                        name="process">
                        <a-tree-select
                            v-model:value="testForm.process"
                            style="width: 33vh;"
                            :tree-data="Process"
                            placeholder="请选择" />
                      </a-form-item>
                    </b>
                    </div>


                      <div v-if="item.publishDate != null" style="display: inline-block;">
                        <b>
                          <a-form-item
                            style="margin-top: 16vh;margin-left: 3vh;"
                              label="开始时间"
                              name="publish_date"
                            >
                            <a-space direction="vertical" :size="12">
                              <a-date-picker
                                :format="dateFormat"
                                :show-time="{ format: 'HH:mm:ss' }"
                                style="width: 33vh;"
                              />
                            </a-space>
                            </a-form-item>
                        </b>
                      </div>

                      <div v-if="item.publishDate != null" style="display: inline-block;">
                        <b>
                          <a-form-item
                            style="margin-left: 23vh;"
                              label="截至时间"
                              name="deadline"
                            >
                            <a-space direction="vertical" :size="12">
                              <a-date-picker
                                :format="dateFormat"
                                :show-time="{ format: 'HH:mm:ss' }"
                                style="width: 33vh;"
                              />
                            </a-space>
                            </a-form-item>
                        </b>
                      </div>

                      <!-- <div v-if="item.publishDate != null">
                        <b>
                          <a-form-item
                        style="margin: 2vh 0vh 0vh 3vh;"
                          label="限时答题"
                          name="testLabel"
                          :rules="[{ required: true }]"
                        >
                        <a-radio-group v-if="item.publishDate != null"  v-model:value="testForm.testLabel" style="display: inline-block; float: left; margin-top: 0.5vh; margin-left: 3vh;">
                          <a-radio :value="1">限时</a-radio>
                          <a-radio :value="2">不限时</a-radio>
                        </a-radio-group>
                        <p style="display: inline-block; font-size:larger"> &nbsp &nbsp</p>
                        <QuestionOutlined />
                      </a-form-item>
                        </b>
                      </div> -->
                    </a-form>
                  </a-modal>
              </div>
            </div>
            </div>

          </template>
          <template #avatar>
            <a-avatar style="width: 7vh; height: 7vh ;" src="src/assets/image/test.png" />
            <p style="margin-top: 1vh; width: 7vh;margin-left: 0.5vh; ">测试</p>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>

    <template v-if="roles == 'common'" v-for="item in TestList" :key="testId">
      <a-list-item v-if="item.publishDate != null">
        <a-list-item-meta
          description=" ">
          <template #title>
            <div @click="testContent(item.testId)" style="height: 12vh;width: 28vh;cursor: pointer;">
              <a  style=" font-size: large;width: 10vh; margin: 2vh 0vh 0vh 3vh; float: left;color: black;">{{ item.title }}</a>
            <div style="float: left; position: absolute;">
              <p style="display: inline-block; margin: 7vh 2vh 0vh 3vh;">截至时间:
                <p style="display: inline-block;" v-if="item.deadline==null"> &nbsp不限 &nbsp</p>
                <p style="display: inline-block;">{{ item.deadline }}</p> &nbsp|</p>
              <p style="display: inline-block;" v-if="item.testLabel==1">普通测试</p>
              <p style="display: inline-block;" v-if="item.testLabel==2">考试</p>
            </div>
            <div style="display: inline-block; position: absolute;margin:4vh 0vh 0vh 98vh; ">
              <a-button style="height: 5vh;width: 15vh;">查看试卷</a-button>
            </div>
            </div>

          </template>
          <template #avatar>
            <a-avatar style="width: 8vh; height: 8vh ;" src="../../../assets/image/Testlogo.png" />
            <p style="margin-top: 1vh; width: 7vh;margin-left: 0.5vh; ">测试</p>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>

  </a-list>

  </Card>
</Card>

</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef,onBeforeUnmount,createVNode, inject} from 'vue';
import { OrderedListOutlined,DownloadOutlined,PlusOutlined,EyeOutlined,
  CustomerServiceOutlined,ClockCircleOutlined,EllipsisOutlined,QuestionOutlined,CheckOutlined,
  ExclamationCircleOutlined,SendOutlined } from '@ant-design/icons-vue';
import { Card,Modal,NotificationPlacement,TreeSelectProps } from 'ant-design-vue';
import axios from 'axios';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { useRoute,useRouter } from 'vue-router';
import { getAllTest,GetNotCorrected,DeleteTest,EditTest,SelectTest,getAllChapterById } from '../../../api/test.js';
import {getRoles} from '../../../utils/user-utils.js';
import { userCourseId } from "../../../store/index.js";
import Vue from 'vue/dist/vue.js';

const route = useRoute();
const num = ref(0)
const TestList = ref()
const NotCorrected = ref()
const roles = ref()
const testid = route.query.testid
const router = useRouter();
const courseId = ref();
const open = ref<boolean>(false);
const toCourseId = userCourseId();
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const TestKey = ref(0)
const treeData = ref([]);
const publishDateValue = ref('');
const deadlineValue = ref('');

const deletetest = (id,placement: NotificationPlacement) =>{
  Modal.confirm({
    title: '提示',
    icon: createVNode(ExclamationCircleOutlined),
    content: '确定删除本次测试吗？',
    onOk() {
      DeleteTest(id)
      .then((response) => {
          // 处理成功响应
          console.log(response.data);
        })
        // 更新数据
        TestList.value = TestList.value.filter(item => item.testId !== id);
        num.value -= 1; // 更新活动数量
        // 手动触发重新渲染
        console.log("更新前："+TestKey.value)
        TestKey.value++;
        console.log("更新后："+TestKey.value)
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));

    },
    onCancel() {},
  });
}

const Edit = (id) =>{
    open.value = true;
    SelectTest(id)
        .then((responseData) => {
            const testData = JSON.parse(responseData);
            // console.log(testData); // 在这里处理获取到的测试数据
            testForm.value = {
                testId: id,
                title: testData.title,
                chapterId: testData.chapterId,
                typeLabel: testData.typeLabel,
                shareProtocol: testData.shareProtocol,
                testLabel: testData.testLabel,
                process: testData.process,
                publishDate: testData.publishDate,
                deadline: testData.deadline,
                course_id: testData.course_id,
            };
        })

  }

const handleOk = (id) => {
  open.value = false;
  Modal.confirm({
    title: '请确认是否发布该测试？',
    icon: createVNode(ExclamationCircleOutlined),
    content: '目前该测试正在 进行中,若点击”确定保存“ 可能会影响学生的答题数据，请谨慎修改！' ,
    onOk() {
      EditTest(testForm.value)
      .then((response) => {
          // 处理成功响应
          
          testForm.value = {
            testId:id,
            title: '',
            chapterId:'',
            typeLabel:'测试',
            shareProtocol:'',
            testLabel:1,
            process:'',
            publishDate:'',
            deadline:'',
            course_id:'',
          };
        })
        location.reload()
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));

    },
    onCancel() {},
  });
};

const testForm = ref({
    testId:0,
    title: '',
    chapterId:'',
    typeLabel:'测试',
    shareProtocol:'',
    testLabel:1,
    process:'',
    publishDate:'',
    deadline:'',
    course_id:'',
  })
  const treeProps = {
      label: "name",
    };

onMounted(async () => {
courseId.value = toCourseId.getCourseId();
roles.value = getRoles()
console.log(courseId.value+"222")
getAllChapterById(courseId.value).then((res) =>{
  treeData.value = res
})
  getAllTest().then((res) => {
  TestList.value = res;

  num.value = res.length;
  setTimeout(() => {
        valueHtml.value = '<p> </p>'
    }, 1500)
})
if (testid !== undefined) {
  GetNotCorrected().then((res) => {
    NotCorrected.value = res;
  })
}
})



const addtest = () =>{
  router.push({
    name:'AddTest',
  })
}

const testContent = (testId) =>{
  router.push({
    name:'TestContent',
    query:{testId}
  })

}
const Process = ref<TreeSelectProps['treeData']>([
  { id: 1, pId: 0, value: '1', title: '课前' },
  { id: 2, pId: 0, value: '2', title: '课中' },
  { id: 3, pId: 0, value: '3', title: '课后' },
  { id: 4, pId: 0, value: '4', title: '期中' },
  { id: 5, pId: 0, value: '5', title: '期末' },
]);


  const treeData1 = ref<TreeSelectProps['treeData']>([
  { id: 1, pId: 0, value: '1', title: '不使用' },
  { id: 2, pId: 0, value: '2', title: '署名（CC-BY）' },
  { id: 3, pId: 0, value: '3', title: '署名-相同方式共享（CC-BY-SA）' },
  { id: 4, pId: 0, value: '4', title: '署名-非商业（CC-BY-NC）' },
  { id: 5, pId: 0, value: '5', title: '署名-禁止演绎（CC-BY-ND）' },
  { id: 6, pId: 0, value: '6', title: '署名-非商业-禁止演绎（CC-BY-NC-ND）' },
  { id: 7, pId: 0, value: '7', title: '署名-非商业-相同方式共享（CC-BY-NC-SA）' },
]);


const mode = "default"
   // 编辑器实例，必须用 shallowRef
   const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')


const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style>

.a{
  float: right;
  margin-left: 5vh;
}

.change:hover{
  color: hsl(203, 100%, 64%);

  }


  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;

  }

  .steps-action {
    margin-top: 24px;
  }

  [data-theme='dark'] .steps-content {
    background-color: #2f2f2f;
    border: 1px dashed #404040;
  }


</style>
