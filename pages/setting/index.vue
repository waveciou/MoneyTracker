<template>
  <div>
    <header-component />
    <div class="wrap">
      <ul class="settingList">
        <li>
          <a
            href="javascript:;"
            class="settingList-btn icon-delete"
            title="刪除所有資料"
            @click.stop="deleteHandler"
          >
            刪除所有資料
          </a>
        </li>
        <li>
          <a
            href="https://github.com/waveciou/MoneyTracker"
            class="settingList-btn icon-github"
            target="_blank"
            title="Github"
          >
            Github
          </a>
        </li>
      </ul>
      <div class="copyright">
        Version: 1.0.0<br>Created By <a
          href="https://github.com/waveciou"
          target="_blank"
          title="GitHub @waveciou"
        >@waveciou</a>
      </div>
    </div>
  </div>
</template>

<script>
import header from '~/components/header.vue';

export default {
  components: {
    'header-component': header
  },
  methods: {
    deleteHandler() {
      this.$store.commit('SET_ACCOUNTS_DATA', []);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

  .settingList {
    > li {
      border-bottom: 1px $color-white solid;
    }
  }

  .settingList-btn {
    padding: 15px 10px;
    display: block;

    &::before {
      @include fontawesome;

      margin-right: 10px;
    }

    &.icon-delete::before {
      content: '\f2ed';
    }

    &.icon-github::before {
      content: '\f126';
    }
  }

  .copyright {
    margin-top: 2rem;
    text-align: center;
  }
</style>
