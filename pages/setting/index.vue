<template>
  <div>
    <header-component />
    <div class="wrap">
      <div class="logo">
        <span>Money Tracker</span>
      </div>
      <ul class="settingList">
        <li>
          <a
            href="javascript:;"
            class="settingList-btn icon-example"
            title="載入範例資料"
            @click.stop="initExampleHandler"
          >
            載入範例資料
          </a>
        </li>
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
        Version: 1.1.1<br>Created By <a
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
    // 刪除所有資料
    deleteHandler() {
      if (process.client) {
        const isConfirm = window.confirm('確定要刪除所有資料？');
        if (isConfirm === true) {
          this.$store.commit('SET_ACCOUNTS_DATA', []);
        }
      }
    },
    // 載入預設資料
    initExampleHandler() {
      if (process.client) {
        const isConfirm = window.confirm('載入範例資料將會覆蓋現有資料，確定要載入範例資料？');
        if (isConfirm === true) {
          this.$store.commit('SET_ACCOUNTS_DATA', []);

          const result = this.GET_EXAMPLE_DATA();
          this.$store.commit('SET_ACCOUNTS_DATA', result);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;

    &::before {
      content: '';
      width: 60px;
      height: 60px;
      margin-right: 10px;
      display: block;
      background: url('../../assets/img/money-tracker.svg') no-repeat center/contain;
    }

    span {
      display: block;
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 1.4em;

      @include min-width(map-get($phone, sm)) {
        font-size: 1.8rem;
      }
    }
  }

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

    &.icon-example::before {
      content: '\f1c0';
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
