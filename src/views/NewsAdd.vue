<template>
    <div id="app">
        <div class="container">
            <el-form label="添加新闻" :model="form" prop="form" class="demo-form-inline" :inline="true" :rules="rules" ref="form">
                <el-form-item prop="title" label="文章标题">
                    <el-input style="width: 400px;" v-model="form.title"  autocomplete="off" placeholder="请输入新闻标题"></el-input>
                </el-form-item><br>
                <el-form-item prop="source" label="作者" >
                    <el-input style="width:400px;" v-model="form.source" autocomplete="off" placeholder="请输入来源和作者等相关信息"></el-input>
                </el-form-item><br>
                <el-form-item prop="newtype" label="文章分区">
                    <el-select v-model="form.newtype" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item><br>
                <el-form-item  prop="summary" label="文章概要">
                    <el-input style="width: 400px;"  type="textarea"
                              :rows="3"
                              placeholder="请输入内容" maxlength="90"
                              show-word-limit v-model="form.summary" autocomplete="off"></el-input>
                </el-form-item><br>
                <el-form-item prop="content"  label="文章内容">
                    <el-card style="height: 410px;">
                        <quill-editor v-model="form.content" ref="myQuillEditor" style="height: 300px;" :options="editorOption">
                            <!-- 自定义toolar -->
                            <div id="toolbar" slot="toolbar">
                                <!-- Add a bold button -->
                                <button class="ql-bold" title="加粗">Bold</button>
                                <button class="ql-italic" title="斜体">Italic</button>
                                <button class="ql-underline" title="下划线">underline</button>
                                <button class="ql-strike" title="删除线">strike</button>
                                <button class="ql-blockquote" title="引用"></button>
                                <button class="ql-code-block" title="代码"></button>
                                <button class="ql-header" value="1" title="标题1"></button>
                                <button class="ql-header" value="2" title="标题2"></button>
                                <!--Add list -->
                                <button class="ql-list" value="ordered" title="有序列表"></button>
                                <button class="ql-list" value="bullet" title="无序列表"></button>
                                <!-- Add font size dropdown -->
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
                                <!-- Add subscript and superscript buttons -->
                                <select class="ql-color" value="color" title="字体颜色"></select>
                                <select class="ql-background" value="background" title="背景颜色"></select>
                                <select class="ql-align" value="align" title="对齐"></select>
                                <button class="ql-image"  title="图片"></button>
                                <button class="ql-link" title="链接"></button>
                                <button class="ql-clean" title="还原"></button>
                                <!-- You can also add your own -->
                                <input class="open-file" type="file" name="file" id="file"
                                       accept="image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
                                       style="display: none;" @change="imgChange($event)" multiple="false"
                                />
                            </div>
                        </quill-editor>
                    </el-card>
                </el-form-item>
            </el-form>
            <div style="text-align:center;" >
                
                <el-button type="primary" @click="addnews()">提 交</el-button>
            </div>
        </div>
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
    name: 'NewsAdd',
    components: {
      quillEditor,
    },
    data() {
      return {
        imageUrl: '',
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
        rules: {
          title: [
            {
              required: true,
              message: "请输入标题名称",
              trigger: "blur"
            }
          ],
          source:[
            {
              required: true,
              message: "请输入来源和作者等相关信息",
              trigger: "blur"
            }
          ],
          newtype:[{
            required: true,
            message: "请选择类型",
            trigger: "blur"
          }],
          summary:[
            {
              required: true,
              message: "请输入概要",
              trigger: "blur"
            }
          ]
        },
        form:{
          title: "",
          source:"",
          newtype:"",
          summary:"",
          content:""
        },
       /*  content: null, */
        editorOption: {
          placeholder: "请输入",
          theme: "snow", // or 'bubble'
          modules: {
            toolbar: {
              container: '#toolbar',
              handlers: {
                'image': function (value) {
                  let that = this;
                  if (value) {
                    that.container.querySelector('.open-file').click();
                  } else {
                    this.quill.format('image', false);
                  }
                }
              },
            }
          }
        }
      }
    },
    methods: {
      changeType() {
				this.form.title = ''
				this.form.source = ''
				this.form.newtype = ''
        this.form.summary = ''
				this.form.content = ''
			},
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
 
        if (!isJPG) {
          this.$message.error('只能上传图片文件');
        }
        if (!isLt2M) {
          this.$message.error('图片大小不能超过 2MB!');
        }
        var data=new from;
        data.append("file",file);
        let that =this;
        that.$axios.post("http://127.0.0.1:10520/api/news/imgUpload",data)
          .then(function(res){
            // 如果上传成功
            if (res.data.status) {
              let imgName = res.data.data.name;
              setTimeout(function() {
                that.imageUrl = require('D:/upload/img/' + imgName);
                that.form.img = imgName;
              },2000);
            } else {
              // 提示信息，需引入Message
              this.$alter('图片引入失败');
            }
          })
 
      },
      imgChange(e){
 
        var fileInput=e.target;
 
        if(fileInput.files.length==0){
          return
        }
        //this.editor.focus();
        if(fileInput.files[0].size>1024*1024*100){
          this.$alert('图片不能大于600KB', '图片尺寸过大', {
            confirmButtonText: '确定',
            type: 'warning',
          })
        }
        var data=new FormData;
        data.append("file",fileInput.files[0]);
        let that =this;
        that.$axios.post("http://127.0.0.1:10520/api/news/imgUpload",data)
          .then(function(res){
                // 如果上传成功
                if (res.data.status) {
                  let imgName = res.data.data;
                  setTimeout(function(){
                    let lujing = require('D:/upload/img/'+imgName);
                    // 获取富文本组件实例
                    let quill = that.$refs.myQuillEditor.quill;
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    quill.insertEmbed(length, 'image', lujing);        // 调整光标到最后
                    quill.setSelection(length + 1);
                  },2000);
                } else {
                  // 提示信息，需引入Message
                  this.$alter('图片插入失败');
                }
          })
      },
      addnews(){
				const self = this;
				if(self.form.title != "" && self.form.source != "" &&  self.form.newtype != "" && self.form.summary != "" && self.form.content != "" ){
					self.$axios({
						method:'post',
						url: 'http://127.0.0.1:10520/api/news/add',
						data: {
							title: self.form.title,
							source: self.form.source,
							newtype: self.form.newtype,
              summary: self.form.summary,
							content: self.form.content
						}
					})
					.then( res => {
						switch(res.data){
							case 0:
								alert("添加成功！");
								break;
							case -1:
								this.existed = true;
								break;
						}
					})
					.catch( err => {
						console.log(err);
					})
				} else {
					alert("填写不能为空！");
				}
			}
    }
  }
</script>
 
<style scoped>
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