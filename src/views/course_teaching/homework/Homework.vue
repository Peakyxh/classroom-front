<template>
  <a-card  :bordered="true" style="width: 80vw;height: 9.5vh;border: none">
    <a-card style="float: left;margin-left: -3vw;font-size: 16px;text-align: left;height: 5vh;border: none">
      共{{number}}个活动
    </a-card>
    <a-card style="float: right;margin-top: -1vh;height: 5vh;border: none">
      <a-dropdown>
      <template #overlay>
        <a-menu @click="" >
          <a-menu-item key="1">
            <UserOutlined />
            按添加时间升序
          </a-menu-item>
          <a-menu-item key="2">
            <UserOutlined />
            按添加时间降序
          </a-menu-item>
          <a-menu-item key="3">
            <UserOutlined />
            按名称升序
          </a-menu-item>
          <a-menu-item key="4">
            <UserOutlined />
            按名称降序
          </a-menu-item>
        </a-menu>
      </template>
      <a-button :size="size">
        <SortAscendingOutlined />
        排序
        <DownOutlined />
      </a-button>
    </a-dropdown>
    <a-button :size="size">
      <CheckSquareOutlined />
        批量操作
    </a-button>
    <a-button :size="size">
      <DownloadOutlined />
        下载所有的作业
    </a-button>
    <a-button type="primary" shape="round"  style="background-color: rgba(10, 189, 111, 0.849);" :size="size"
      @click="addHome">
      <AppstoreAddOutlined />
      添加作业
    </a-button>
  
    </a-card>
  </a-card>


  <a-card :bordered="true" style="width: 80vw;text-align: left;">
      <a-list item-layout="horizontal"  :data-source ="listData">
          <template #renderItem="{ item }">
            <a-list-item :key="item.title">
              <a-list-item-meta 
                 :description=item.description>
                 <template v-slot:title>
                   <a @click="JumpToHomeDetail(item.homeworkId)" style="font-size: 16px;">{{ item.title}}</a>
                   <!-- 如果未发布 -->
                   <div v-if="item.showpub" style="float: right;">
                      <a href="#" style="font-size: 26px;margin-right: 1vw;float: left;" @click="editHome(item.homeworkId)">
                        <SendOutlined />
                        <p style="font-size: 16px;color: black;margin-left:-0.3vw;">发布</p>
                      </a>
                      <a href="#" style="font-size: 26px;margin-right: 1vw;float: left;">
                        <EllipsisOutlined />
                        <p style="font-size: 16px;color: black;margin-left:-0.3vw;" @click="deleteHome(item.homeworkId)">删除</p>
                      </a>
                   </div>
                   <div v-else="item.showpub"  style="float:right;">
                      <a style="font-size: 26px;margin-right: 2vw;float: left;" @click="JumpToHomeMark(item.homeworkId)">
                        {{ item.approved}}
                        <p style="font-size: 16px;color: black;margin-left:-1.3vw;">已批完</p>
                      </a>
                      <a  style="font-size: 26px;margin-right: 2vw;float: left;" @click="JumpToHomeMark(item.homeworkId)" >
                        {{ item.unapproved}}
                        <p style="font-size: 16px;color: black;margin-left:-1.3vw;">未批完</p>
                      </a>
                      <a style="font-size: 26px;margin-right: 2vw;float: left;" @click="JumpToHomeMark(item.homeworkId)">
                        {{ item.unpaid}}
                        <p style="font-size: 16px;color: black;margin-left:-0.7vw;">未交</p>
                      </a>
                       <a href="#" style="font-size: 26px;margin-right: 1vw;float: left;">
                           <EllipsisOutlined />
                           <p style="font-size: 16px;color: black;margin-left:-0.3vw;"  @click="deleteHome(item.homeworkId)">删除</p>
                       </a>
                   </div>
                 </template>
                 <template #avatar>
                   <a-avatar :size="size" src="src/assets/image/zuoye.png">
                  </a-avatar>
                   <p style="margin-left: 0.3vw;font-size: 16px;">作业</p>
                 </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
      </a-list>
  </a-card>

    <AddHomework v-if="displayAdd" :displayAdd=displayAdd @update:displayAdd="handleUpdateDisplayAdd" :homeworkId="homeworkid" :form="addStateForm"></AddHomework>



</template>
<script setup lang="ts">
import {
    SortAscendingOutlined,
    CheckSquareOutlined,
    DownloadOutlined,
    AppstoreAddOutlined,
    SendOutlined,
    EllipsisOutlined,
} from '@ant-design/icons-vue';
import type { SizeType } from 'ant-design-vue/es/config-provider';
import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import {addHomeworkT, deleteHomework, fetchHomeworkData} from "../../../api/homework.js";
import AddHomework from "../../../components/homework/AddHomework.vue";
import {getUserId,getRoles} from "../../../utils/user-utils.js";



//变量
const size = ref<SizeType>('large');
const open = ref(false);
const userid = ref();
const role = ref();
interface Homework {
  homeworkId: number;
  title: string;
  content: string;
  userId: number | null;
  typeLabel: string;
  shareProtocol: string;
  process: string;
  chapterId: number | null;
  ifPublish: number | null;
  publishDate: string;
  deadline: string;
  totalScore: number;
  approved: number | null;
  unpaid: number | null;
  isCheck: string;
  checkNumber: number | null;
  ifBack: string;
  status: number | null;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string | null;
  remark: string | null;
}
const number = ref(0);
// 存放从后端获取的作业数据
const homeworkList = ref<Homework[]>([]);
const listData= ref<Record<string, string | boolean>[]>([]);





const getHomeworkContentInfoAll = () => {
  fetchHomeworkData().then((res)=>{
    homeworkList.value = res;
    number.value = homeworkList.value.length; // 更新 number 的值
    fullList(homeworkList);
  })
}

function fullList(homeworkList){
  listData.value = [];
  for(let i = 0;i<number.value;i++){
        listData.value.push({
          title:homeworkList.value[i].title,
          description:homeworkList.value[i].ifPublish === "1" ? `已发布 | 提交截止时间：${homeworkList.value[i].deadline} | 个人作业` : '未发布 | 个人作业',
          unpaid:`${homeworkList.value[i].unpaid}` === "null"? `0` : `${homeworkList.value[i].unpaid}`,
          approved:`${homeworkList.value[i].approved}` === "null"? `0` : `${homeworkList.value[i].approved}`,
          //这个是总人数减去未交的再减去已批的
          unapproved:`${homeworkList.value[i].approved}` === "null"? `0` : `${homeworkList.value[i].approved}`,
          showpub:homeworkList.value[i].ifPublish === "0"?true:false,
          homeworkId: homeworkList.value[i].homeworkId,
      })
    }

}


const displayAdd = ref(false)
const homeworkid = ref("")
const addStateForm = ref({})
const addHome = () => {
    displayAdd.value = false;
    displayAdd.value = true;
    userid.value = getUserId();
    role.value = getRoles();
    displayAdd.value = false;
}
const editHome = (homeworkId) => {
    displayAdd.value = false;
    displayAdd.value = true;
    userid.value = getUserId();
    role.value = getRoles();
    homeworkid.value = homeworkId;
    addStateForm.value = homeworkList.value[homeworkId-1];
}
const deleteHome = (homeworkId) => {
    deleteHomework(homeworkId).then((res)=>{
        console.log(res);
        location.reload();
    }).catch(err => {
        console.error(err);
    });
}
const handleUpdateDisplayAdd = (value) => {
    displayAdd.value = value;
};
const router = useRouter();
const JumpToHomeDetail = (e) => {
    console.log("作业详情页面")
    console.log("e：",e)
    router.push({
        name: 'NoticeDetail',
        query:{
            noticeid:e
        }
    })
}
const JumpToHomeMark = (e) => {
    console.log("作业排行页面")
    console.log("e：",e)
    router.push({
        name: 'Marking',
        query:{
        }
    })
}
onMounted(() => {
    getHomeworkContentInfoAll();
})


</script>
<style lang="less" scoped>
</style>