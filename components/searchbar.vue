<template>
  <nav class="searchBar">
    <div class="searchBar__header">
      <label
        for="form__search"
        class="searchBar__title"
      >搜尋</label>
      <button
        class="searchBar__close-btn"
        @click.stop="closeSearchBarHandler"
      />
    </div>
    <div class="searchBar__body">
      <div class="searchBar__control">
        <div class="fieldset-text searchBar__input">
          <input
            id="form__search"
            ref="keywordInput"
            v-model.trim="inputKeyword"
            class="fieldset-text__input"
            type="text"
            placeholder="請輸入關鍵字"
          >
          <button
            class="fieldset-text__btn"
            title="清除"
            @click.stop="inputKeyword = ''"
          />
        </div>
        <button
          class="searchBar__search-btn"
          title="搜尋"
          @click.stop="searchHandler"
        />
      </div>
      <div
        class="searchBar__main"
        :class="{'is-lightbox-open': isLightboxOpen}"
      >
        <div class="searchBar__content">
          <AccountList
            v-if="searchResultList.length > 0"
            :account-list="searchResultList"
          />
          <p
            v-else
            class="none-tips"
          >
            目前尚無任何資料
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  /* eslint-disable no-alert */
  import AccountList from '~/components/accountList.vue';

  export default {
    data() {
      return {
        init: false,
        inputKeyword: '',
        searchResultList: [],
      };
    },
    components: {
      AccountList,
    },
    mounted() {
      this.$refs.keywordInput.focus();
    },
    methods: {
      // 關閉搜尋欄
      closeSearchBarHandler() {
        this.$store.commit('SET_SEARCHBAR_CONTROL', false);
      },
      // 搜尋
      searchHandler() {
        const keyword = this.inputKeyword;

        if (keyword === '') {
          if (process.client) {
            window.alert('請輸入關鍵字');
          }
          return false;
        }

        const accounts = [...this.$store.state.accounts];

        this.searchResultList = accounts.filter((accountItem) => {
          const {
            name, notes, store, tags,
          } = accountItem;
          const compareItems = [name, notes, store, ...tags].filter((item) => item !== '');

          if (compareItems.length <= 0) {
            return false;
          }

          return compareItems.some((item) => item.includes(keyword));
        });

        return true;
      },
    },
    computed: {
      accountsList() {
        return this.$store.state.accounts;
      },
      isLightboxOpen() {
        return this.$store.state.isLightboxOpen;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/utils/_utils.scss';
  @import '~/assets/scss/_form.scss';

  .searchBar {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: $color-black-light;
    z-index: 2500;
  }

  .searchBar__header {
    width: 100%;
    height: $header-height;
    padding: 10px ($header-height + 10px) 10px 20px;
    display: block;
    position: relative;
  }

  .searchBar__title {
    display: block;
    overflow: hidden;
    font-size: map-get($font-size, sm);
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: $color-white;
    line-height: 1.4em;
    word-break: keep-all;
  }

  .searchBar__control {
    width: 100%;
    padding-left: 10px;
    display: flex;
    align-items: center;
  }

  .searchBar__input {
    width: calc(100% - #{$header-height});
  }

  .searchBar__close-btn,
  .searchBar__search-btn {
    width: $header-height;
    height: $header-height;
    display: block;
    text-align: center;

    &::before {
      @include fontawesome;

      font-size: map-get($font-size, sm);
      line-height: $header-height;
    }
  }

  .searchBar__close-btn {
    position: absolute;
    top: 0;
    right: 0;

    &::before {
      content: '\f00d';
    }
  }

  .searchBar__search-btn::before {
    content: '\f002';
  }

  .searchBar__body {
    width: 100%;
    height: calc(100% - #{$header-height} - 30px);
  }

  .searchBar__main {
    width: 100%;
    height: calc(100% - #{$header-height});
    margin-top: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -o-overflow-scrolling: touch;

    &.is-lightbox-open {
      overflow-x: auto;
      overflow-y: hidden;
    }
  }

  .searchBar__content {
    padding: 0 10px;
  }

</style>
