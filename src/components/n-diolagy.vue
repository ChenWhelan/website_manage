<template>
    <div id="diolagy">
      <el-form v-model="showVdMsg" label-width="80px">
        <el-form-item label="文章编号">
          <el-input v-model="showVdMsg.newsid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input v-model="showVdMsg.title" ></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="showVdMsg.source"></el-input>
        </el-form-item>
<!--         <el-form-item label="文章分区">
          <el-input v-model="showVdMsg.newtype" ></el-input>
        </el-form-item> -->
        <el-form-item prop="newtype" label="文章分区">
                    <el-select v-model="showVdMsg.newtype" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
        <el-form-item label="文章概要">
          <el-input v-model="showVdMsg.summary"></el-input>
        </el-form-item>
<!--         <el-form-item label="文章内容">
          <el-input v-model="showVdMsg.content"></el-input>
        </el-form-item> -->
        <el-form-item prop="content"  label="文章内容">
            <el-card style="height: 500px;">
                <quill-editor v-model="showVdMsg.content" ref="myQuillEditor" style="height: 300px;" :options="editorOption">
                    
                    <div id="toolbar" slot="toolbar">
                        
                        <button class="ql-bold" title="加粗">Bold</button>
                        <button class="ql-italic" title="斜体">Italic</button>
                        <button class="ql-underline" title="下划线">underline</button>
                        <button class="ql-strike" title="删除线">strike</button>
                        <button class="ql-blockquote" title="引用"></button>
                        <button class="ql-code-block" title="代码"></button>
                        <button class="ql-header" value="1" title="标题1"></button>
                        <button class="ql-header" value="2" title="标题2"></button>
                        
                        <button class="ql-list" value="ordered" title="有序列表"></button>
                        <button class="ql-list" value="bullet" title="无序列表"></button>
                        
                        <select class="ql-header" title="段落格式">
                            <option selected>段落</option>
                            <option value="1">标题1</option>
                            <option value="2">标题2</option>
                            <option value="3">标题3</option>
                            <option value="4">标题4</option>
                            <option value="5">标题5</option>
                            <option value="6">标题6</option>
                        </select>
                        <select class="ql-size" title="字体大小">
                            <option value="12px">12px</option>
                            <option value="14px">14px</option>
                            <option value="16px" selected>16px</option>
                            <option value="18px">18px</option>
                            <option value="20px">20px</option>
                        </select>
                        <select class="ql-font" title="字体">
                            <option value="SimSun">宋体</option>
                                    <option value="SimHei">黑体</option>
                                    <option value="Microsoft-YaHei">微软雅黑</option>
                                    <option value="KaiTi">楷体</option>
                                    <option value="FangSong">仿宋</option>
                                    <option value="Arial">Arial</option>
                                </select>
                                
                                <select class="ql-color" value="color" title="字体颜色"></select>
                                <select class="ql-background" value="background" title="背景颜色"></select>
                                <select class="ql-align" value="align" title="对齐"></select>
                                <button class="ql-image"  title="图片"></button>
                                <button class="ql-clean" title="还原"></button>

                                <input class="open-file" type="file" name="file" id="file"
                                       accept="image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
                                       style="display: none;" @change="imgChange($event)" multiple="false"
                                />
                            </div>
                        </quill-editor>
                    </el-card>
                </el-form-item>
                <el-form-item label="发布时间">
          <el-input v-model="showVdMsg.date" :disabled="true"></el-input>
        </el-form-item>
        <div class="operate">
          <el-button type="primary" round @click="determine(showVdMsg.newsid,showVdMsg.title,showVdMsg.source,showVdMsg.newtype,showVdMsg.summary,showVdMsg.content,showVdMsg.date)">确定</el-button>
          <el-button type="info" round @click="cancel()">取消</el-button>
        </div>
      </el-form>
    </div>
  </template>
  
  <script>
   import {
    Quill,
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
 
  //引入font.css
/*   import './font.css' */

 
  // 自定义字体大小
  let Size = Quill.import('attributors/style/size')
  Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px']
  Quill.register(Size, true)
 
  // 自定义字体类型
  var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
    '宋体', '黑体'
  ]
  var Font = Quill.import('formats/font')
  Font.whitelist = fonts
  Quill.register(Font, true)

  export default {
    name: 'Ndiolagy',
    components: {
      quillEditor,
    },
    props: {
      showVdMsg: {
        type: Object,
        default: function () {
          return {
          newsid:'',
          title:'',
          source:'',
          newtype:'',
          summary:'',
          content:'',
          date:''
          }
        }
      }
    },
    data () {
      return {
        options: [
        {
          value: '学院新闻',
          label: '学院新闻'
        }, {
          value: '教务通知',
          label: '教务通知'
        }, {
          value: '学工通知',
          label: '学工通知'
        }, {
          value: '培养方案',
          label: '培养方案'
        }, {
          value: '规章制度',
          label: '规章制度'
        }, {
          value: '党团公示',
          label: '党团公示'
        }, {
          value: '党团组织',
          label: '党团组织'
        }, {
          value: '党团动态',
          label: '党团动态'
        }, {
          value: '精品活动',
          label: '精品活动'
        }, {
          value: '校友之窗',
          label: '校友之窗'
        }, {
          value: '学工动态',
          label: '学工动态'
        }, {
          value: '招生工作',
          label: '招生工作'
        }, {
          value: '招聘信息',
          label: '招聘信息'
        }, {
          value: '就业动态',
          label: '就业动态'
        }, {
          value: '下载专区/教师专区',
          label: '下载专区/教师专区'
        }, {
          value: '下载专区/学生专区',
          label: '下载专区/学生专区'
        }
        ],
        value: '',
        showVd: false
      }
    },
    methods: {
      // 将需要修改的数据id传到父组件
      determine (newsid,title,source,newtype,summary,content,date) {
        console.log('yes')
        this.$emit('changeData',newsid,title,source,newtype,summary,content,date)
      },
      cancel () {
        this.$emit('showDio', this.showVd)
      }
    }
  }
  </script>
  
  <style lang="less">
  .diolagy {
    width: 600px;
    height: 200px;
    padding: 20px 5px;
    box-sizing: border-box;
    // position: absolute;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 5px;
    z-index: 1000;
    .el-form {
      width: 80%;
      margin: 0 auto;
      .el-form-item {
        .el-input {
          width: 90%;
        }
      }
      .operate {
        text-align: center;
      }
    }
  }
  .container{
        height: 100%;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9fafc;
    }
    .ivu-upload {
        display: none;
    }
    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
  </style>
  