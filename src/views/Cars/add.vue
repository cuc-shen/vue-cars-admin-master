<template>
    <div class="parking-add">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="车辆品牌">
          <el-select>
              <el-option>福特</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆型号">
          <el-select>
              <el-option>1543434</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="停车场">
          <el-select>
              <el-option>南山停车场</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="车架号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="发动机号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年检">
          <el-radio-group v-model="form.resource">
            <el-radio label="已检"></el-radio>
            <el-radio label="未检"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="保养日期">
            <el-row :gutter="30">
                <el-col :span="6"><el-input v-model="form.name"></el-input></el-col>
                <el-col :span="8">下次保养时间：2021-12-12</el-col>
            </el-row>
          
        </el-form-item>
        <el-form-item label="档位">
          <el-radio-group v-model="form.resource">
            <el-radio label="自动挡"></el-radio>
            <el-radio label="手动挡"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="能源类型">
          <el-radio-group v-model="form.energy">
            <el-radio :label="1">电</el-radio>
            <el-radio :label="2">油</el-radio>
            <el-radio :label="3">混合动力</el-radio>
          </el-radio-group>
          <div class="progress-bar-wrap" v-if="form.energy == 1 || form.energy == 3">
              <span class="label-text">电量：</span>
              <el-row :gutter="20">
                  <el-col :span="5">
                      <div class="progress-bar">
                          
                          
                              <span style="width:50%">
                                  <label>90%</label>
                              </span>
                          
                      </div>
                  </el-col>
                  <el-col :span="2">
                      <el-input  value="100" size="small"></el-input>
                  </el-col>
              </el-row>
          </div>
          <div class="progress-bar-wrap" v-if="form.energy == 3 || form.energy == 2">
              <span class="label-text">油量：</span>
              <el-row :gutton="20">
                  <el-col :span="5">
                      <div class="progress-bar">
                          
                          
                              <span style="width:50%">
                                  <label>90%</label>
                              </span>
                          
                      </div>
                  </el-col>
                  <el-col :span="2">
                      <el-input  value="100" size="small"></el-input>
                  </el-col>
              </el-row>
          </div>
        </el-form-item>
        <el-form-item label="禁启用">
          <el-radio-group v-model="form.resource">
            <el-radio label="禁用"></el-radio>
            <el-radio label="启用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="车辆属性">
          <div v-for="(item,index) in cars_attr" :key="item.key" class="cars-attr-list">
              <el-row :gutter="10">
                  <el-col :span="2"><el-input value="100"></el-input></el-col>
                  <el-col :span="3"><el-input value="100"></el-input></el-col>
                  <el-col :span="6">
                      <el-button type="primary" v-if="index == 0" @click="AddCarsAttr">+</el-button>
                      <el-button v-else>-</el-button>
                  </el-col>
              </el-row>
          </div>
          
        </el-form-item>
        <el-form-item label="车辆描述">
            <quill-editor class="editor"
                    ref="myTextEditor"
                    v-model="content"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)"
                    @change="onEditorChange($event)">
      </quill-editor>
          <!-- <div ref="editorDom" style="text-align:left;"></div> -->
        </el-form-item>
        <el-form-item>
          <el-button type="danger">确定</el-button>
        </el-form-item>
      
      
    
      </el-form>
    </div>
</template>
<script>
import Editor from "wangeditor";
export default{
    name:"ParkingAdd",
    data(){
      return{
          //富文本对象
          content: null,
            editorOption: {
              modules: {
                toolbar: [
                  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                  ["blockquote", "code-block"], // 引用  代码块
                  [{ header: 1 }, { header: 2 }], // 1、2 级标题
                  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
                  [{ script: "sub" }, { script: "super" }], // 上标/下标
                  [{ indent: "-1" }, { indent: "+1" }], // 缩进
                  // [{'direction': 'rtl'}],                         // 文本方向
                  [{ size: ["small", false, "large", "huge"] }], // 字体大小
                  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                  [{ font: [] }], // 字体种类
                  [{ align: [] }], // 对齐方式
                  ["clean"], // 清除文本格式
                  ["link", "image", "video"] // 链接、图片、视频
                ], //工具菜单栏配置
              },
              placeholder: '请在这里添加产品描述', //提示
              readyOnly: false, //是否只读
              theme: 'snow', //主题 snow/bubble
              syntax: true, //语法检测
            },
        // editor:null,
        cars_attr:[
            {key1:111,value1:222},
            {key2:111,value2:222},
            {key3:111,value3:222},
            {key4:111,value4:222},
        ],
        form: {
          energy:1,
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    mounted(){
        // this.createEditor();
    },
     methods: {
      onSubmit() {
        console.log('submit!');
      },
      /***添加汽车属性 */
      AddCarsAttr(){
          this.cars_attr.push({key4:111,value4:222});
      },
      /***创建富文本对象 */
    //   createEditor(){
    //       this.editor = new Editor(this.$refs.editorDom);
    //       this.editor.customConfig.onchange = html =>{};
    //       this.editor.create();//创建富文本实例
    //   }
    // 失去焦点
          onEditorBlur(editor) {},
          // 获得焦点
          onEditorFocus(editor) {},
          // 开始
          onEditorReady(editor) {},
          // 值发生变化
          onEditorChange(editor) {
            this.content = editor.html;
            console.log(editor);
          },
    },
     computed: {
          editor() {
            return this.$refs.myTextEditor.quillEditor;
          }
        },

}
</script>
<style lang="scss" scoped>
@import "./style.scss";
.editor {
    line-height: normal !important;
    height: 300px;
    padding-bottom: 40px;
  }
  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:";
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
      border-right: 0px;
      content: '保存';
      padding-right: 0px;
  }
 
  .ql-snow .ql-tooltip[data-mode=video]::before {
      content: "请输入视频地址:";
  }
 
  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '10px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '18px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '32px';
  }
 
  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6';
  }
 
  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
    content: '衬线字体';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
    content: '等宽字体';
  }
</style>