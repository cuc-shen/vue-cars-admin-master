<template>
    <div>
       <el-table :data="table_data"  border style="width: 100%" v-if="table_config.checkbox">
            <el-table-column type="selection" width="35"></el-table-column>
            <template v-for="item in this.table_config.thead">
                <!-- 回调 -->
                <el-table-column v-if="item.type === 'function'" :prop="item.prop" :label="item.label" :key="item.prop">
                    <template slot-scope="scope">
                         <span v-html="item.callback && item.callback(scope.row,item.prop)"></span>
                    </template>
                </el-table-column>
                 <el-table-column v-if="item.type === 'slot'" :prop="item.prop" :label="item.label" :key="item.prop">
                     <template slot-scope="scope">
                         <slot :name="item.slotName" :data="scope.row"></slot>
                     </template>
                 </el-table-column>
                <el-table-column v-else :prop="item.prop" :label="item.label" :key="item.prop"></el-table-column>
            </template>
            
            <el-table-column label="操作"></el-table-column>
        </el-table>
    </div>
</template>
<script>
// API
import {GetTableData} from "@/api/common";
import { ParkingList } from "@/api/parking";
export default {
    name: "TableComponent",
    components: {  },
    data(){
        return {
            //数据
            table_data:[],
            table_config:{
                thead:[],
                checkbox:true,
                url:""
            },
            
        }
    },
    beforeMount(){
        
    },
    methods:{
        initConfig(){
            for(let key in this.config){
                if(Object.keys(this.table_config).includes(key)){
                    this.table_config[key]=this.config[key]
                }
            }
            //配置完成后开始读取接口数据
            this.loadData()

        },
        loadData(){
            let requestData={
                url:this.table_config.url,
                data:{
                    pageSize: 10,
                    pageNumber: 1
                }
            }
            GetTableData(requestData).then(response=>{
                const data = response.data;
                // 判断数据是否存在
                if(data) { this.table_data = data.data }
            })
        },
         
    },
    props:{
        config:{
            type:Object,
            default:()=>{}
        }
    },
    watch:{
        config:{
            handler(newValue){
                this.initConfig();
                
            },
            immediate:true
        }
    }
}
</script>
<style lang="scss" scoped>

</style>