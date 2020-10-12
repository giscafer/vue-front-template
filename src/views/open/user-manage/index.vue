<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.account"
        placeholder="账号名称"
        style="width: 300px;"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
      />

      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 20px;"
        @click="handleFilter"
      >查询</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 20px;"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
      >新增用户</el-button>
    </div>

    <s-table :data="responseData" :loading.sync="listLoading" @query-change="getList">
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="90"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号名" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司名称" min-width="110px">
        <template slot-scope="{row}">
          <span>{{ row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="accessKey" width="110px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleView(row,'accessKey')">点击查看</span>
        </template>
      </el-table-column>
      <el-table-column label="密钥" width="110px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleView(row,'secret')">点击查看</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" class-name="status-col" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="240" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button
            v-if="row.status!='published'"
            size="mini"
            type="primary"
            @click="handlePermission(row,'published')"
          >权限</el-button>
          <el-button
            v-if="row.status!='unfreeze'"
            type="success"
            size="mini"
            @click="handleAcctStatus(row,'freeze')"
          >冻结</el-button>
          <el-button
            v-if="row.status!='freeze'"
            type="success"
            size="mini"
            @click="handleAcctStatus(row,'unfreeze')"
          >解冻</el-button>
          <el-button size="mini" type="danger" @click="handleResetPsw(row,$index)">重置密码</el-button>
        </template>
      </el-table-column>
    </s-table>

    <el-dialog :visible.sync="dialogAkVisible" title="查看" width="650px">
      <el-row :gutter="10">
        <el-col :span="4">
          <div style="line-height: 36px; text-align: right;">{{ secretData.label }}</div>
        </el-col>
        <el-col :span="18">
          <el-input v-model="secretData.value" :disabled="true">
            <el-button
              slot="append"
              v-clipboard:copy="secretData.value"
              v-clipboard:success="onCopy"
              v-clipboard:error="onCopyError"
              icon="el-icon-copy-document"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogAkVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createArticle, updateArticle } from '@/api/user-manage';
import waves from '@/directive/waves'; // waves directive
import { parseTime } from '@/shared/utils';
import STable from '@/components/Table';
import { successToast, errorToast } from '@/shared/message.js';

export default {
  name: 'UserManage',
  components: { STable },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        account: undefined,
        sort: '+id'
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogAkVisible: false,
      secretData: {
        label: '',
        value: ''
      },
      responseData: {},
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(evt) {
      if (evt) {
        Object.assign(this.listQuery, evt);
      }
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data;
        setTimeout(() => {
          this.responseData = response;
          this.listLoading = false;
        }, 800);
        this.total = response.pageInfo.totalSize;
        // Just to simulate the time of the request
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleAcctStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === 'id') {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id';
      } else {
        this.listQuery.sort = '-id';
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = 'vue-admin-template';
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            });
          });
        }
      });
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      });
      this.list.splice(index, 1);
    },
    handleView(row, type) {
      this.dialogAkVisible = true;
      this.secretData = {
        label: type,
        value: row[type]
      };
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? 'ascending' : 'descending';
    },
    onCopy() {
      successToast('复制成功');
    },
    onCopyError() {
      errorToast('复制失败！');
    }
  }
};
</script>
