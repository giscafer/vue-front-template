<template>
  <div class="sino-table">
    <el-table
      :key="tableKey"
      v-loading="loading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <!-- columns -->
      <template v-if="columns && columns.length>0">
        <el-table-column
          v-for="col in columns"
          :key="col.field"
          :label="col.label"
          :width="col.width"
          :align="col.align || 'center'"
        >
          <template slot-scope="{row}">
            <span v-if="!col.scopedSlots">{{ row[col.field] }}</span>
            <!-- custom render -->
            <slot v-else :name="col.scopedSlots.customRender" :row="row"></slot>
          </template>
        </el-table-column>
      </template>

      <!-- action template -->
      <slot></slot>
      <slot name="action"></slot>
    </el-table>

    <pagination
      v-show="showPagination && pageInfo.totalSize>0"
      :total="pageInfo.totalSize"
      :page.sync="innerCurrentPage"
      :limit.sync="pageSize"
      :page-sizes="pageSizes"
      @pagination="queryChange"
    />
  </div>
</template>

<script>
import Pagination, { defaultPageSizes } from '@/components/Pagination'

const tableKey = Math.random()
  .toString(16)
  .substr(2)

const defaultPageInfo = {
  first: true,
  last: false,
  number: 0,
  size: 10,
  totalPages: 1,
  totalSize: 0
}

export default {
  name: 'STable',
  components: { Pagination },
  props: {
    loadingStr: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return defaultPageSizes
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Object,
      default: () => {
        return {
          pageInfo: defaultPageInfo,
          data: []
        }
      }
    }
  },
  data() {
    return {
      tableKey,
      innerCurrentPage: 1
    }
  },
  computed: {
    tableData() {
      // console.log(this.data.data)
      if (this.data) {
        return this.data.data
      }
      return this.data
    },
    pageInfo() {
      if (this.data && this.data.pageInfo) {
        return this.data.pageInfo
      }
      return defaultPageInfo
    },
    queryInfo() {
      return {
        page: this.innerCurrentPage,
        size: this.pageSize
      }
    }
  },
  watch: {
    data: {
      handler(value) {
        // console.log(value)
        // this.tableLoading = false
      }
    }
  },
  created() {
    // console.log(this.columns)
    this.queryChange({ type: 'init' })
    // fix https://github.com/njleonzhang/vue-data-tables/issues/172
    /*   const currentPage = this.pageInfo.number / this.pageInfo.size
    this.innerCurrentPage = Math.ceil(currentPage)
    this.innerTotal =
      totalPage >= this.currentPage
        ? this.pageInfo.totalSize
        : this.pageSize * this.currentPage */
  },
  methods: {
    queryChange(evt) {
      const info = {
        ...this.queryInfo,
        ...evt
      }
      // console.log(evt)
      this.$emit('query-change', info)
    }
  }
}
</script>

<style>
.sino-table {
  position: relative;
}
</style>
