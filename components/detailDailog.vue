<template>
  <div class="detailDailog">
    <div class="detailDailog-header">
      <div class="detailDailog-ctrlbar">
        <a
          href="javascript:;"
          title="編輯"
          class="detailDailog-btn icon-edit"
          @click.stop="editHandler"
        >
          <span>編輯</span>
        </a>
        <a
          href="javascript:;"
          title="刪除"
          class="detailDailog-btn icon-delete"
          @click.stop="deleteHandler"
        >
          <span>刪除</span>
        </a>
        <a
          href="javascript:;"
          title="關閉"
          class="detailDailog-btn icon-close"
          @click.stop="closeHandler"
        >
          <span>關閉</span>
        </a>
      </div>
      <div class="detailDailog-caption">
        {{ textCaption }}
      </div>
    </div>
    <div class="detailDailog-body">
      <div class="detailDailog-title">
        <span class="detailDailog-name">
          {{ textName }}
        </span>
        <span
          class="detailDailog-price"
          :class="{'is-expense': detail.isExpense === true}"
        >
          {{ textPrice }}
        </span>
      </div>
      <div class="detailDailog-content">
        <p style="text-align: right;">
          {{ textTime }}
        </p>
        <p v-if="detail.store !== ''">
          商家：{{ detail.store }}
        </p>
        <p v-if="detail.tags.length > 0">
          標籤：
        </p>
        <ul
          v-if="detail.tags.length > 0"
          class="hashtag-list"
        >
          <li
            v-for="hashtag in detail.tags"
            :key="hashtag"
          >
            <span class="hashtag-item">{{ hashtag }}</span>
          </li>
        </ul>
        <p v-if="detail.notes !== ''">
          備註：{{ detail.notes }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: Object
  },
  methods: {
    // 編輯
    editHandler() {
      const result = this.DEEP_CLONE(this.detail); 
      this.$emit('edit', result);
    },
    // 刪除
    deleteHandler() {
      this.$emit('delete', this.detail.id);
    },
    // 關閉
    closeHandler() {
      this.$emit('close');
    }
  },
  computed: {
    // 標題
    textCaption() {
      return this.detail.isExpense === true ? `${this.categoriesName}/${this.subcategoriesName}` : this.categoriesName;
    },
    // 時間
    textTime() {
      const date = `${this.detail.time.year}/${this.detail.time.month}/${this.detail.time.date}`;
      const time = `${this.detail.time.hour}:${this.detail.time.minute}`;
      return `${date} ${time}`;
    },
    // 名稱
    textName() {
      if (this.detail.isExpense === true) {
        return this.detail.name === '' ? this.subcategoriesName : this.detail.name;
      } else {
        return this.detail.name === '' ? this.categoriesName : this.detail.name;
      }
    },
    // 金額
    textPrice() {
      const price = this.TO_CURRENCY(this.detail.price);
      return this.detail.isExpense === true ? `-$${price}` : `+$${price}`;
    },
    // 主類別名稱
    categoriesName() {
      return this.GET_CATEGORIES_NAME(this.detail.categories);
    },
    // 次類別名稱
    subcategoriesName() {
      return this.GET_CATEGORIES_NAME(this.detail.subcategories);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/utils/_utils.scss';

.detailDailog {
  position: relative;
  overflow: hidden;
  border-radius: 7px;
}

.detailDailog-header {
  background-color: $color-yellow;
}

.detailDailog-ctrlbar {
  display: flex;
  justify-content: flex-end;
}

.detailDailog-btn {
  width: 30px;
  height: 30px;
  display: block;

  span {
    display: none;
  }

  &::before {
    @include fontawesome;

    display: block;
    line-height: 30px;
    text-align: center;
    color: $color-black-light;
  }

  &.icon-edit::before {
    content: '\f044';
  }

  &.icon-delete::before {
    content: '\f1f8';
  }

  &.icon-close::before {
    content: '\f00d';
  }
}

.detailDailog-caption {
  padding: 10px;
  font-size: map-get($font-size, sm);
  font-weight: 500;
  text-align: center;
  color: $color-black-light;
}

.detailDailog-body {
  padding: 10px;
  background-color: $color-black;
}

.detailDailog-title {
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: map-get($font-size, sm);
  border-bottom: 1px $color-white solid;
  margin-bottom: 10px;
}

.detailDailog-name {
  max-height: 2.8em;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: $color-yellow;
}

.detailDailog-price {
  padding-right: 5px;
  padding-left: 5px;
  color: $color-green;

  &.is-expense {
    color: $color-red;
  }
}

.detailDailog-content {
  p {
    margin-bottom: 5px;
  }
}

.hashtag-list {
  display: flex;
  flex-wrap: wrap;

  > li {
    margin-right: 5px;
    margin-bottom: 7px;
  }
}

.hashtag-item {
  padding: 5px 7px;
  display: block;
  font-size: 0.85rem;
  color: $color-black-light;
  background-color: $color-yellow;
  border-radius: 5px;
  line-height: 1em;

  &::before {
    content: '#';
  }
}
</style>