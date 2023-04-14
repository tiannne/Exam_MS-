<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="collapse ? '64px' : '200px'">
        <div class="headword" v-if="head">
          <el-icon>
            <HomeFilled />
          </el-icon>
          {{ headword }}
        </div>
        <div class="headword" style="" v-else>
          <el-icon>
            <HomeFilled />
          </el-icon>
        </div>
        <el-menu :collapse="collapse" :collapse-transition=false background-color="#304156" text-color="#bfcbd9" router
          :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item index="/home">
            <el-icon>
              <Edit />
            </el-icon>
            <span>答题统计</span>
          </el-menu-item>

          <el-sub-menu index="/kaoshiguanli">
            <template #title>
              <el-icon>
                <InfoFilled />
              </el-icon>
              <span>考试管理</span>
            </template>
            <el-menu-item index="/tiku/guanli">题库管理</el-menu-item>
            <el-menu-item index="/shiti/guanli">试题管理</el-menu-item>
            <el-menu-item index="/kaoshi/guanli">考试管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/sys">
            <template #title>
              <el-icon>
                <Setting />
              </el-icon>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/sys/config">系统配置</el-menu-item>
            <el-menu-item index="/sys/depart">部门管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/users">
            <template #title>
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/sys/role">角色管理</el-menu-item>
            <el-menu-item index="/sys/user">用户管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="collapseBtn" @click="zheDie" v-if="head">
            <el-icon>
              <Fold />
            </el-icon>
          </div>
          <div class="collapseBtn" @click="zheDie" v-else>
            <el-icon>
              <Expand />
            </el-icon>
          </div>
        </el-header>

        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapse: true,
      headword: '在线考试系统',
      head: false,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    zheDie() {
      this.collapse = !this.collapse
      this.head = !this.head
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  padding: 0;
  height: 60px;

  .collapseBtn {
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    color:#333;
    padding-top: 4px;
  }
}

.el-aside {
  background: #304156;
  height: 100vh;
  /*   text-align: center; */
  transition: linear all 0.2s;
  /* 隐藏折叠滚动条 */
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .headword {
    background: #2b2f3a;
    width: 200px;
    color: white;
    line-height: 60px;
    font-size: 15px;
    font-weight: bold;

    .el-icon {
      font-size: 17px;
      margin: 20px;
    }
  }
}

.el-main {
  background: #f8f8f8;
}

.el-menu {
  border: none
}
</style>