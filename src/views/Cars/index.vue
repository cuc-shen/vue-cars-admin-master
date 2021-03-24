<template>
    <div>
      <div class="head-car">
          
                    <el-row>
                         <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px"> 
                             
                                 <el-col :span="5">
                                     <el-form-item label="车辆品牌：" size="mini">
                                        <el-select v-model="form.type" placeholder="车辆品牌">
                                        <el-option label="福特" value="shanghai"></el-option>
                                        <el-option label="红旗" value="beijing"></el-option>
                                        <el-option label="奔驰" value="beijing"></el-option>
                                        <el-option label="宝马" value="beijing"></el-option>
                                        <el-option label="五菱" value="beijing"></el-option>
                                        <el-option label="长城" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                 </el-col>
                                 <el-col :span="5">
                                     <el-form-item label="车牌号" size="mini">
                                        <el-input v-model="form.parking_name"></el-input>
                                    </el-form-item>
                                 </el-col>
                                 <el-col :span="5">
                                     <el-form-item label="关键字" size="mini">
                                        <el-select v-model="form.type" placeholder="发动号">
                                        <el-option label="福特" value="shanghai"></el-option>
                                        <el-option label="红旗" value="beijing"></el-option>
                                        <el-option label="奔驰" value="beijing"></el-option>
                                        <el-option label="宝马" value="beijing"></el-option>
                                        <el-option label="五菱" value="beijing"></el-option>
                                        <el-option label="长城" value="beijing"></el-option>
                                        </el-select>
                                        
                                    </el-form-item>
                                 </el-col>
                                 <el-col :span="3">
                                     <el-form-item size="mini">
                                         <el-input value="关键字"></el-input>
                                     </el-form-item>
                                 </el-col>
                                 <el-col :span="3">
                                     <el-form-item size="mini">
                                        <el-button type="danger">搜索</el-button>
                                    </el-form-item>
                                </el-col>
                                 
                              
                            
                            
                             <el-col :span="3">
                            <div class="pull-right" >
                            <el-form-item size="mini">
                                <el-button type="danger" @click="dialog_show=!dialog_show">新增车辆</el-button>    
                            </el-form-item>
                            </div>
                        </el-col>
                            
                            
                        </el-form>    
                    
                        
                    </el-row> 
                    
               
          
      </div>
      <div class="head-car">
          <!--表格数据-->
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column prop="name" label="车牌号" width="180"></el-table-column>
                <el-table-column prop="type" label="年检" width="180"></el-table-column>
                <el-table-column prop="area" label="能源类型"></el-table-column>
                <el-table-column prop="disabled" label="禁启用">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.disabled" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="area" label="停车场"></el-table-column>
                <el-table-column prop="area" label="发动机号"></el-table-column>
                <el-table-column prop="area" label="车架号"></el-table-column>
                <el-table-column label="操作">
                    <template>
                        <el-button type="danger" size="small">编辑</el-button>
                        <el-button size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
     <AddCarsBrand :flagVisble.sync="dialog_show"/><!--父组件往子组件传数据时，是单向的-->
     <div class="pull-right">
         <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
     </div>
    </div>

</template>
<script>
import AddCarsBrand from "@c/dialog/addCarsBrand.vue";
export default{
    name:"Parking",
    components:{AddCarsBrand},
    data(){
        return{
            //弹窗标记
            dialog_show:false,
            form:{
                parking_name:'',
                area:'',
                type:''
            },
        
            tableData:[
                {
                    name:"南山停车场",
                    type:"室外",
                    area:"广东省 深圳市 南山区",
                    carsNumber:20,
                    disabled:0,
                    address:"254411544"

                }
            ]

        }
    }
}
</script>
<style lang="scss" scoped>
.head-car{
    padding-bottom: 30px;
}
</style>

