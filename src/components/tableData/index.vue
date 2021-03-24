<template>
    <div>
       <el-table :data="table_data"  border style="width: 100%" v-if="table_config.checkbox">
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column v-for="item in this.table_config.thead" :prop="item.prop" :label="item.label" :key="item.prop"></el-table-column>
            <!-- <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="address" label="区域"></el-table-column>
            <el-table-column prop="carsNumber" label="可停放车辆"></el-table-column>
            <el-table-column prop="disabled" label="禁启用"></el-table-column>
            <el-table-column prop="lnglat" label="查看位置"></el-table-column> -->
            <el-table-column label="操作"></el-table-column>
        </el-table>
    </div>
</template>
<script>
// API
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
                checkbox:true
            },
            
        }
    },
    beforeMount(){
        this.getParkingList();
    },
    methods:{
        initConfig(){
            for(let key in this.config){
                if(Object.keys(this.table_config).includes(key)){
                    this.table_config[key]=this.config[key]
                }
            }
            console.log(this.table_config)

        },
         /** 获取列表 */
        getParkingList(){
            const requestData = {
                pageSize: 10,
                pageNumber: 1
            }
            
            ParkingList(requestData).then(response => {
                const data = response.data;
                // 判断数据是否存在
                if(data) { this.table_data = data.data }
                // 页码
                
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