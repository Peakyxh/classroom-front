<template>
  <!-- 添加作业或修改发布作业对话框 -->
    <template>
        <a-modal v-model:open="displayaa"  :title="homeTitle" @ok="handleOk" width="70vw" cancelText="取消" okText="确定">
            <a-card >
                <a-form ref="formRef" :model="addFormState" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <div>
                        <a>导入作业</a>
                    </div>
                    <a-form-item label="作业类型" name="resource" :rules="[{ required: true, message: ' ', trigger: 'change' }]">
                        <a-radio-group v-model:value="resource">
                            <a-radio value="1">个人作业</a-radio>
                            <a-radio value="2">小组作业</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item  label="作业标题" :rules="[{ required: true, message: '请输入测试标题!' }]">
                        <a-input v-model:value="addFormState.title" size="large" style="width: 30vw" placeholder="请输入作业标题"  />
                    </a-form-item>
                    <a-form-item name="content" v-model="addFormState.content"   :rules="[{ required: true, message: '请输入作业内容!'}]"
                                 style="margin-left: 4vw;">
                        <RichText v-model="addFormState.content" :valueHtml="addFormState.content" />
                    </a-form-item>

                    <a-card>
                        <div style="display: flex;">
                            <a-form-item label="活动内容标签" style="flex: 1; margin-right: 20px;">
                                <a-input v-model:value="addFormState.typeLabel" size="large" placeholder="作业" />
                            </a-form-item>
                            <div style="flex: 1;">
                                <a-form-item
                                        label="知识共享协议"
                                        name="shareProtocol"
                                        placeholder="不使用"
                                >
                                    <a-tree-select
                                            v-model:value="addFormState.shareProtocol"
                                            style="width: 33vh;"
                                            :tree-data="treeData"
                                            placeholder="请选择" />
                                    <p style="display: inline-block; font-size:larger"> &nbsp &nbsp</p>
                                    <QuestionOutlined />
                                </a-form-item>
                            </div>
                        </div>
                        <div style="display: flex;">
                            <a-form-item label="应用环节" name="process">
                                <a-tree-select
                                        v-model:value="addFormState.process"
                                        style="width: 33vh;"
                                        :tree-data="Process"
                                        placeholder="请选择" />
                            </a-form-item>
                            <a-form-item label="所属章节" style="flex: 1; margin-right: 20px;">
                                <a-input size="large" placeholder="请选择" />
                            </a-form-item>
                        </div>
                    </a-card>

                    <a-form-item  name="delivery" style="margin-left: 4vw;">
                        <a-switch v-model:checked="delivery" />
                        <scan style="border:none;color: rgba(255, 68, 0, 0.829);font-size: 18px;">是否立即发布</scan>
                    </a-form-item>
                </a-form>
                <div style="margin-left: 4vw;padding-left:1vw;display: flex;background-color: rgba(218,220,224,0.22)" v-if="delivery ? true : false">
                    <el-form-item label="发布时间" style="margin-top: 2vh;" prop="publishDate">
                        <el-date-picker clearable
                                        v-model="addFormState.publishDate"
                                        type="datetime"
                                        placeholder="请选择发布时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item style="margin-left: 4vw;margin-top: 2vh;" label="截至时间" prop="deadline">
                        <el-date-picker clearable
                                        v-model="addFormState.deadline"
                                        type="datetime"
                                        placeholder="请选择截至时间">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <div style="margin-left: 4vw;padding-left:1vw;background-color: rgba(218,220,224,0.22)" v-if="delivery ? true : false">
                    <el-form-item label="总分" prop="totalScore">
                        <el-input style="width: 4vw" v-model="addFormState.totalScore" placeholder="请输入总分" />
                    </el-form-item>
                    <a-form-item  name="isCheck" >
                        <a-switch v-model:checked="isCheck" />
                        <scan style="border:none;color: rgba(94,149,210,0.83);font-size: 18px;">进行查重</scan>
                    </a-form-item>
                    <div style="display: flex;" v-if="isCheck ? true : false">
                        <el-form-item label="查重警戒值" prop="checkNumber">
                            <el-input style="width: 3vw" v-model="addFormState.checkNumber"  />
                            <span>%</span>
                        </el-form-item>
                        <a-form-item style="margin-left: 4vw;"  name="isCheck" >
                            <a-switch v-model:checked="ifBack" />
                            <scan style="border:none;font-size: 18px;">自动打回</scan>
                        </a-form-item>
                    </div>
                </div>
            </a-card>
        </a-modal>
    </template>
</template>
<script setup lang="ts">

import {
    QuestionOutlined, ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import {createVNode, onMounted, reactive, ref, defineEmits, watchEffect} from 'vue';
import {addHomeworkT, getHomeworkById, updateHomework} from "../../api/homework.js";
import RichText from '../../components/RichText.vue';
import { TreeSelectProps,Modal, message } from 'ant-design-vue';
import {getUserId,getRoles} from "../../utils/user-utils.js";
// 在子组件中通过 props 接收变量


//添加作业
const formRef = ref();
const homeTitle = ref('添加作业')
const delivery = ref()
const isCheck = ref(false)
const ifBack = ref(false)
const userid = ref();
const role = ref();
const treeData = ref<TreeSelectProps['treeData']>([
    { id: 1, pId: 0, value: '1', title: '不使用' },
    { id: 2, pId: 0, value: '2', title: '署名（CC-BY）' },
    { id: 3, pId: 0, value: '3', title: '署名-相同方式共享（CC-BY-SA）' },
    { id: 4, pId: 0, value: '4', title: '署名-非商业（CC-BY-NC）' },
    { id: 5, pId: 0, value: '5', title: '署名-禁止演绎（CC-BY-ND）' },
    { id: 6, pId: 0, value: '6', title: '署名-非商业-禁止演绎（CC-BY-NC-ND）' },
    { id: 7, pId: 0, value: '7', title: '署名-非商业-相同方式共享（CC-BY-NC-SA）' },
]);
const Process = ref<TreeSelectProps['treeData']>([
    { id: 1, pId: 0, value: '1', title: '课前' },
    { id: 2, pId: 0, value: '2', title: '课中' },
    { id: 3, pId: 0, value: '3', title: '课后' },
    { id: 4, pId: 0, value: '4', title: '期中' },
    { id: 5, pId: 0, value: '5', title: '期末' },
]);
const addFormState = reactive({
    homeworkId: "",
    title: '',
    content: '',
    userId: userid,
    typeLabel: '',
    shareProtocol: '',
    process: '',
    chapterId: 0,
    ifPublish:  0,
    publishDate: '',
    deadline: '',
    totalScore: 0,
    approved: 0,
    unpaid: 0,
    isCheck: 0,
    checkNumber:  0,
    ifBack: 0,
    status: 0,
    createBy: '',
    createTime: '',
    updateBy: '',
    updateTime:  '',
    remark: '',
})
const display = defineProps(['displayAdd','homeworkId','form']);
const displaya =  ref(display.displayAdd)
const displayaa = ref(true)
const homeworkIda = ref(display.homeworkId)

watchEffect(() => {
    displaya.value = display.displayAdd;
    homeworkIda.value = display.homeworkId;

    // 如果 homeworkId 有值，进行查值操作
    if (homeworkIda.value != "") {
            try {
                console.log("aaa")
                addFormState.title = display.form.title;
                addFormState.homeworkId = display.form.homeworkId;
                addFormState.content = display.form.content;
                addFormState.typeLabel = display.form.typeLabel;
                addFormState.shareProtocol = display.form.shareProtocol;
                addFormState.process = display.form.process;
                addFormState.chapterId = display.form.chapterId;
                addFormState.ifPublish = display.form.ifPublish;
                addFormState.publishDate = display.form.publishDate;
                addFormState.deadline = display.form.deadline;
                addFormState.totalScore = display.form.totalScore;
                addFormState.approved = display.form.approved;
                addFormState.unpaid = display.form.unpaid;
                addFormState.checkNumber = display.form.checkNumber;
                addFormState.ifBack = display.form.ifBack;
                addFormState.status = display.form.status;
                addFormState.createBy = display.form.createBy;
                addFormState.createTime = display.form.createTime;
                addFormState.updateBy = display.form.updateBy;
                addFormState.updateTime = display.form.updateTime;
                addFormState.remark = display.form.remark;
                delivery.value  = addFormState.ifPublish.toString() === "1" ? true : false;
                isCheck.value = addFormState.isCheck.toString() === "1" ? true : false;
                ifBack.value = addFormState.ifBack.toString() === "1" ? true : false;
            } catch (error) {
                console.error(error);
            }
    }
});
const emit = defineEmits(["displayAdd"]);
const resource = ref("1");

//提交,返回更改父组件displayAdd失败
const handleOk = e => {
    userid.value = getUserId();
    role.value = getRoles();
    emit("update:displayAdd", false)
    console.log(displaya)
    addFormState.ifPublish = delivery.value ? 1 : 0;
    addFormState.isCheck = isCheck.value ? 1 : 0;
    addFormState.ifBack = ifBack.value ? 1 : 0;
    Modal.confirm({
        title: '请确认是否发布该作业？',
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
            if (homeworkIda === ""){
                addHomeworkT(addFormState).then((res)=>{
                    console.log(addFormState);
                    console.log(res);
                    location.reload();
                }).catch(err => {
                    console.error(err);
                });
            }else {
                addFormState.ifPublish = 1;
                updateHomework(addFormState).then((res) =>{
                    console.log(addFormState);
                    console.log(res);
                    location.reload();
                }).catch(err => {
                    console.error(err);
                });
            }
            return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {
            this.open = false;
            displayaa.value = false;
            reset()

        },
    });
}



onMounted(() => {
    homeTitle.value = '添加作业';
    delivery.value = false;
    isCheck.value = false;
    ifBack.value = false;

})
const reset = () => {
    this.addFormState = {
        homeworkId: "",
        title: '',
        content: '',
        userId: userid,
        typeLabel: '',
        shareProtocol: '',
        process: '',
        chapterId: 0,
        ifPublish:  0,
        publishDate: '',
        deadline: '',
        totalScore: 0,
        approved: 0,
        unpaid: 0,
        isCheck: 0,
        checkNumber:  0,
        ifBack: 0,
        status: 0,
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime:  '',
        remark: '',
    }
}

const labelCol = {
    style: {
        width: '10vw',
    },
};
const wrapperCol = {
    span: 20,
};
</script>

<style scoped>

</style>