<template>
  <div style="border: 1px solid #ccc">
    <quill-editor
        style="height: 30vh"
        class="ql-editor"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
    </quill-editor>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const emit = defineEmits(["introduceInfo"])

const content = ref("");
const editorOption = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
      ['blockquote', 'code-block'], // 引用  代码块
      [{ header: 1 }, { header: 2 }], // 1、2 级标题
      [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
      [{ script: 'sub' }, { script: 'super' }], // 上标/下标
      [{ indent: '-1' }, { indent: '+1' }], // 缩进
      [{ direction: 'rtl' }], // 文本方向
      [{ size: ['12px', false, '16px', '18px', '20px', '30px'] }], // 字体大小
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
      [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
      [{ font: [false, 'SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial'] }], // 字体种类
      [{ align: [] }], // 对齐方式
      ['clean'], // 清除文本格式
      ['link', 'image', 'video'] // 链接、图片、视频
    ]
  },
  placeholder: '请输入正文'
};
// 失去焦点事件
const onEditorBlur = (quill) => {
  // console.log('editor blur!', quill)
}
// 获得焦点事件
const onEditorFocus = (quill) => {
  // console.log('editor focus!', quill)
}
// 准备富文本编辑器
const onEditorReady = (quill) => {
  // console.log('editor ready!', quill)
}
// 内容改变事件
const onEditorChange = ({ quill, html, text }) => {
  console.log(123)
  console.log('editor change!', quill, html, text)
  content.value = refs.myQuillEditor.quill.root.innerHTML
}
</script>
