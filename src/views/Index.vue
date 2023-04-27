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
        <el-menu :collapse="collapse" :collapse-transition="false" background-color="#304156" text-color="#bfcbd9" router
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
            <el-menu-item index="/tiku/guanli">
              <el-icon style="padding-right: 10px;">
                <Files />
              </el-icon>题库管理</el-menu-item>
            <el-menu-item index="/shiti/guanli">
              <el-icon style="padding-right: 10px;">
                <Tickets />
              </el-icon>试题管理</el-menu-item>
            <el-menu-item index="/kaoshi/guanli">
              <el-icon style="padding-right: 10px;">
                <Monitor />
              </el-icon>考试管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/sys">
            <template #title>
              <el-icon>
                <Setting />
              </el-icon>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/sys/config">
              <el-icon style="padding-right: 10px;">
                <Menu />
              </el-icon>系统配置</el-menu-item>
            <el-menu-item index="/sys/depart">
              <el-icon style="padding-right: 10px;">
                <Opportunity />
              </el-icon>部门管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/users">
            <template #title>
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/sys/role">
              <el-icon style="padding-right: 10px;">
                <Avatar />
              </el-icon>角色管理</el-menu-item>
            <el-menu-item index="/sys/user">
              <el-icon style="padding-right: 10px;">
                <User />
              </el-icon>用户管理</el-menu-item>
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
          <el-breadcrumb separator="/">
            <el-breadcrumb-item to="/home">答题统计</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in breadcrumb" :key="item">{{ item }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="userWrap">
            <el-avatar :size="30"></el-avatar>
            <p class="words">
              欢迎：{{ username }}
            </p>
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item @click="handleToLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <!-- ------------------------标签页开始-------------------------->
          <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit" :addable="false">
            <el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
              {{ item.content }}
            </el-tab-pane>
          </el-tabs>
          <!-- ------------------------标签页结束-------------------------->
          <Transition name="rotate">
            <RouterView />
          </Transition>
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
      username: '',
      headword: "在线考试系统",
      head: false,
      breadcrumb: [],
      /* 以下为标签页 */
      editableTabsValue: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: ''
      }, {
        title: 'Tab 2',
        name: '2',
        content: ''
      }],
      tabIndex: 2
      /* =========== */
    }
  },
  created() {
    this.username = window.localStorage.getItem('username')
  },
  computed: {
    breadcrumb() {
      return this.$route.meta.breadcrumb || [];
    }
  },
  methods: {
    /* ============================标签页的方法============================ */
    handleTabsEdit(targetName, action) {
      // if (action === 'add') {
      //   let newTabName = ++this.tabIndex + '';
      //   this.editableTabs.push({
      //     title: 'New Tab',
      //     name: newTabName,
      //     content: 'New Tab content'
      //   });
      //   this.editableTabsValue = newTabName;
      // }
      if (action === 'remove') {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
      this.editableTabs.forEach((item) => {
        console.log(item, 999);
        if (item.title === params.data.name) {
          this.editableTabsValue = item.name;
          this.editableTabs = this.editableTabsValue.filter((tab) => tab.name !== item.name)
          return;
        }
      })
      addTab(params.data.name)
    },

    /* =============================标签页结束============================= */
    handleOpen(key, keyPath) {
      // console.log(key, keyPath); 
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    zheDie() {
      this.collapse = !this.collapse
      this.head = !this.head
    },
    handleToLogout() {
      /* 清空状态管理中的token，持久化就会清空后退出登录 */
      this.$store.commit('userToken/clearToken');
      /* this.$router.push('/login') */
      /*刷新页面 */
      /* window.location.reload(); */

      //跳转且刷新页面
      window.location.href = '/login';

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
    color: #333;
    padding-top: 4px;
  }
}


.el-dropdown-link:focus {
  outline: none;
}

.el-aside {
  /* position: fixed; */
  /* overflow-y: auto; */
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
  overflow-y: auto;
  transition: linear all 0.2s;
  // position: absolute;
  left: 64px;
  right: 0;
  top: 60px;
  bottom: 0;

  background: #f8f8f8;
  overflow-y: scroll;

  font-size: 14px;

  &.success {
    left: 64px;
  }

  &.error {
    left: 200px;
  }

}

.el-container {
  height: 100vh;
  overflow-y: auto;
}

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
    color: #333;
    padding-top: 4px;
  }

  .el-breadcrumb {
    line-height: 60px;
  }

  .el-dropdown {
    border: none;
    line-height: 60px;
    outline: none;
    border: 0;
    cursor: pointer;
  }

  .el-dropdown-link:focus {
    outline: none;
  }

  .userWrap {
    position: absolute;
    right: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;


    .words {
      line-height: 60px;
      margin-left: 10px;
      font-size: 14px;
      color: #333;
    }
  }

}

.el-menu {
  border: none;
}

.rotate-enter-active {
  animation: .7s linear in;
}

@keyframes move {
  0% {
    display: none;
    transform: translateX(-100%);
  }

  100% {
    display: none;
    transform: translateX(0);
  }
}

@keyframes in {
  0% {
    opacity: 0;
    // display: none;
    transform: translateX(-100%);
  }

  100% {
    //  display: none;
    opacity: 1;
    transform: translateX(0);
  }
}

.rotate-leave-active {
  animation: .7s linear move;
}
</style>
