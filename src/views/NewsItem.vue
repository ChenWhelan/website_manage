<template>
  <div id="categoryEdit">
    <span>新闻列表</span>
    <n-search
      @searchData="searchData"
    ></n-search>
    <el-table
      :data="this.tableData"
      style="max-width:100%">
      <el-table-column
        prop="newsid"
        label="文章编号"
        width="300">
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="source"
        label="作者"
        width="180">
      </el-table-column>
      <el-table-column
        prop="newtype"
        label="文章分区"
        width="300">
      </el-table-column>
      <el-table-column
        prop="summary"
        label="文章概要"
        width="300">
      </el-table-column>
      <el-table-column
        prop="content"
        label="文章内容"
        width="300">
      </el-table-column>
      <el-table-column
        prop="date"
        label="发表时间"
        width="300">
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="showVdiolagy(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteData(scope.row.newsid)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagina">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.currnetPage"
        :page-sizes="this.pageSizes"
        :page-size="this.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total">
      </el-pagination>
    </div>
    <!-- 弹窗  -->
    <n-diolagy
      v-show="showVd"
      :showVdMsg="showVdMsg"
      @showDio="colseDio"
      @changeData="changeData"
    >
    </n-diolagy>
  </div>
</template>

<script>
import NDiolagy from '@/components/n-diolagy'
import NSearch from '@/components/n-search'

export default {
  components: {
    NDiolagy,
    NSearch
  },
  data () {
    return {
      tableData: [
    
      ],
      searchTableData: [],
      showVd: false,
      showVdMsg: {
        newsid: '',
        title: '',
        source:'',
        newtype: '',
        summary: '',
        content:'',
        date: ''
      },
      pageSize: 4,
      pageSizes: [4, 8, 12, 16],
      currnetPage: 1,
      total: 0,
      searchChangeSize: false
    }
  },
  methods: {
    // 修改每页数量
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      if (!this.searchChangeSize) {
        this.getListData()
      } else {
        this.searchFenye()
      }
      // this.currnetPage = 1
    },
    // 修改当前页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currnetPage = val
      if (!this.searchChangeSize) {
        this.getListData()
      } else {
        this.searchFenye()
      }
    },
    // 获取列表总数量
    async getListCount () {
      try {
        const res = await this.$http.get('http://localhost:10520/api/news/getListCount')
        this.total = res.data.data[0].count
      } catch (error) {
        console.log('err！')
        this.$message({
          type: 'error',
          message: '连接失败'
        })
      }
    },
    // 获取列表数据
    async getListData () {
      try {
        const startData = (this.currnetPage - 1) * this.pageSize
        const countData = this.pageSize
        // const res = await this.$http.get('http://localhost:10520/api/news/getNewsList', { startData, countData })
        const res = await this.$http.get(`http://localhost:10520/api/news/getNewsList?startData=${startData}&countData=${countData}`)
        console.log('success!')
        this.tableData = res.data.data
      } catch (error) {
        console.log('err！')
        this.$message({
          type: 'error',
          message: '连接失败'
        })
      }
    },
    // 删除数据
    deleteData (newsid) {console.log(newsid)
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          /* const res=await this.$http.get('http://localhost:10520/api/user/deleteData', email) */
          await this.$http.get(`http://localhost:10520/api/news/deleteData?newsid=${newsid}`) 
            
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.searchChangeSize = false
          this.getListCount()
          this.getListData()
        } catch (err) {console.log(err)
          this.$message({
            type: 'error',
            message: '出错了',
            
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 关闭弹窗
    colseDio (value) {
      this.showVd = value
    },
    // 打开弹窗
    showVdiolagy (showValue) {
      this.showVd = true
      this.showVdMsg = showValue
    },
    // 修改数据
    async changeData (newsid,title,source,newtype,summary,content) {
      try {
        await this.$http.post('http://localhost:10520/api/news/editData', {
          dataNewsID:newsid,
	        dataTitle:title,
          datasource:source,
          dataNewtype:newtype,
          datasummary:summary,
          datacontent:content
        })
        this.$router.go(0)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      } catch (_err) {
        this.$message({
          type: 'error',
          message: '修改失败'
        })
      }
    },
    // 搜索
    async searchData (label, input) {
      console.log(label)
      if (!label || !input) {
        this.$message({
          type: 'error',
          message: '请输入查询条件'
        })
        return
      }
      try {
        // 去掉可能输入的空格
        input = input.replace(/\s/g, '')
        /* const res = await this.$http.post('http://localhost:10520/api/user/searchUserData', { label, input }) */
        const res = await this.$http.post(`http://localhost:10520/api/news/searchData?label=${label}&input=${input}`)
        // 所有符合条件的数据都返回，存在searchTableData里面
        this.searchTableData = res.data.data
        this.total = this.searchTableData.length
        this.searchChangeSize = true
        this.currnetPage = 1
        this.searchFenye()
        this.$message({
          type: 'success',
          message: '查询成功'
        })
      } catch (_err) {
        this.$message({
          type: 'error',
          message: '查询失败'
        })
      }
    },
    searchFenye () {
      const startData = (this.currnetPage - 1) * this.pageSize
      const endData = startData + this.pageSize
      this.tableData = this.searchTableData.slice(startData, endData)
    }
  },
  created () {
    this.getListCount()
    this.getListData()
  }
}
</script>

<style lang="less">
.categoryEdit {
  position: relative;
  .pagina {
    margin-top: 15px;
  }
}
</style>
