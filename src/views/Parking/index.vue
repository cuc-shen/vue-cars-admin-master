<template>
    <div>
        <div class="filter-form">
            <el-row>
                <el-col :span="21">
                    <el-form :inline="true" :model="form" class="demo-form-inline">
                        <el-form-item label="区域">
                           <CityArea ref="cityArea" :cityAreaValue.sync="form.area" @callback="callbackComponent" />
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="form.type" placeholder="停车场" class="width-120">
                                <el-option v-for="item in parking_type" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="禁启用">
                            <el-select v-model="form.status" placeholder="请选择" class="width-120">
                                <el-option v-for="item in parking_status" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="关键字">
                            <el-select v-model="search_key" placeholder="请选择" class="width-120">
                                <el-option label="停车场名称" value="parkingName"></el-option>
                                <el-option label="详细区域" value="address"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item >
                            <el-input v-model="keyword" placeholder="请输入关键字按Enter搜索"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="getParkingList">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="3">
                    <div class="pull-right">
                        <router-link to="/parkingAdd">
                            <el-button type="danger">新增停车场</el-button>
                        </router-link>
                    </div>
                </el-col>
            </el-row>
            
        </div>
        <TableData :config="table_config"/>
        <!-- 表格数据 -->
        <el-table :data="tableData" border style="width: 100%" v-loading="table_loading">
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column prop="parkingName" label="停车场名称"></el-table-column>
            <el-table-column prop="type" label="类型">
                <template slot-scope="scoped">
                    <span>{{ scoped.row.type | getType }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="区域"></el-table-column>
            <el-table-column prop="carsNumber" label="可停放车辆"></el-table-column>
            <el-table-column prop="disabled" label="禁启用">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" active-value="2" inactive-value="1" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="lnglat" label="查看位置">
                <template slot-scope="scoped">
                    <el-button type="success" size="mini" @click="showMap(scoped.row)">查看地图</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scoped">
                    <el-button type="danger" size="small" @click="edit(scoped.row.id)">编辑</el-button>
                    <el-button size="small" @click="delConfirm(scoped.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row class="padding-top-30">
            <el-col :span="4"><div style="padding: 5px;"></div></el-col>
            <el-col :span="20">
                <el-pagination
                    class="pull-right"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        <MapLocation :flagVisible.sync="map_show" :data="parking_data" />
    </div>
</template>
<script>
// 组件
import CityArea from "@c/common/cityArea";
import TableData from "@c/tableData";
import MapLocation from "@c/dialog/showMapLocation";

let _this;
export default {
    name: "Parking",
    data(){
        _this = this;
        return {
            //表格配置
            table_config:{
                thead:[
                    {label:"停车场名称",prop:"parkingName"},
                    {label:"类型",prop:"type"},
                    {label:"区域",prop:"address"},
                    {label:"可停放车辆",prop:"carsNumber"},
                    {label:"禁启用",prop:"disabled"},
                    {label:"查看位置",prop:"lnglat"},
                    
                ],
                checkbox:true
            },
            // 页码
            total: 0,
            // 当前页码
            currentPage: 1,
            // 请求API的页码
            pageSize: 10,
            pageNumber: 1,
            // 筛选
            form: {
                area: "",
                type: "",
                status: ""
            },
            //
            search_key: "",
            keyword: "",
            // 禁启用
            parking_status: this.$store.state.config.parking_status,
            // 停车场类型
            parking_type: this.$store.state.config.parking_type,
            // 数据列表
            tableData: [],
            // 地图显示 
            map_show: false,
            parking_data: {},
            //地图加载
            table_loading: false
        }
    },
    filters: {
        /** 返回类型文本 */
        getType(value){
            const data = _this.parking_type.filter(item => item.value == value);
            if(data && data.length > 0) {
                return data[0].label
            }
        },
    },
    components: { CityArea, MapLocation,TableData },
    methods: {
        callbackComponent(params){
            if(params.function) { this[params.function](params.data); }
        },
       
        /** 编辑 */
        edit(id){
            this.$router.push({
                name: "ParkingAdd",
                query: {
                    id
                }
            })
        },
        /** 删除 */
        delConfirm(id){
            this.$confirm('确定删除此信息', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ParkingDelete({id}).then(response => {
                    this.$message({
                        type: 'success',
                        message: response.message
                    });
                    this.getParkingList();
                })
            }).catch(() => {});
        },
        /** 显示地图 */
        showMap(data){
            this.map_show = true;
            this.parking_data = data;
        },
        
        /** 页码 */
        handleSizeChange(val){
            this.pageSize = val;
            this.getParkingList();
        },
        handleCurrentChange(val){
            this.pageNumber = val;
            this.getParkingList();
        }
    },
    // DOM元素渲染之前（生命周期）
    beforeMount(){
        this.getParkingList();
    },
    // DOM元素渲染完成（生命周期）
    mounted(){

    },
}
</script>
<style lass="scss" scoped>

</style>