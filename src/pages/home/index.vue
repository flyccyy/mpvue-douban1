<template>
  <div>
    <div class="header">
      <span>豆瓣</span>
      <icon type="search" size="18" color="#00b600"></icon>
      <button>打开豆瓣App</button>
    </div>
    <div class="content" v-for="(cateItem,cateIndex) in categoryList" :key="cateIndex">
      <p class="title">
        <span>{{cateItem.name}}</span>
        <span class="more">更多</span>
      </p>
      <scroll-view class="scroll-view_H" scroll-x="true" style="width: 100%">
        <view
          id="demo1"
          class="scroll-view-item_H demo-text-1"
          v-for="item in cateItem.list"
          :key="item.id"
        >
          <img :src="item.images.small" alt />
          <p>{{item.title}}</p>
          <div class="rating" v-if="cateItem.name === '影院热映'">
            <div class="stars" v-if="item.rating.average">
              <img
                src="../../../static/images/star.svg"
                alt
                v-for="(subitem,subindex) in item.starNum"
                :key="subindex"
              />
              <img
                src="../../../static/images/unstar.svg"
                alt
                v-for="(subitem2,subindex2) in (5-item.starNum)"
                :key="subindex2"
              />
            </div>
            <span>{{item.rating.average?item.rating.average:'暂无评分'}}</span>
          </div>
        </view>
      </scroll-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryList: [
        {
          name: "影院热映",
          params: "in_theaters",
          list: []
        },
        {
          name: "Top250",
          params: "top250",
          list: []
        }
      ]
    };
  },
  onLoad() {
    this.categoryList.forEach(item => {
      this.getMovies(item);
    });
  },
  methods: {
    //获取电影列表
    getMovies(item) {
      wx.request({
        url: `https://api.douban.com/v2/movie/${
          item.params
        }?apikey=0df993c66c0c636e29ecbb5344252a4a`,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: res => {
          // 解构
          const {
            statusCode,
            data: { subjects }
          } = res;
          if (statusCode === 200) {
            // 处理星星的分数：除以2向上取整
            subjects.forEach(item => {
              item.starNum = Math.ceil(item.rating.average / 2);
            });
            item.list = subjects;
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.header {
  height: 94rpx;
  display: flex;
  align-items: center;
  padding: 0 36rpx;
  border: 1px solid #eee;
  span {
    font-size: 18px;
    color: #00b600;
  }
  icon {
    flex: 1;
    margin: 4rpx 0 0 28rpx;
  }
  button {
    background-color: #40bc55;
    color: #fff;
    width: 200rpx;
    height: 58rpx;
    font-size: 12px;
    line-height: 58rpx;
  }
}
.content {
  margin-top: 20rpx;
  .title {
    height: 88rpx;
    display: flex;
    align-items: center;
    padding: 0 36rpx;
    font-size: 18px;
    justify-content: space-between;
    .more {
      color: #40bc55;
    }
  }
  .scroll-view_H {
    white-space: nowrap;
    padding: 12rpx 38rpx 20rpx;
    .scroll-view-item_H {
      width: 200rpx;
      height: 286rpx;
      display: inline-block;
      margin-right: 18rpx;
      text-align: center;
      p {
        margin: 20rpx 0 6rpx;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      .rating {
        display: flex;
        justify-content: center;
        span {
          margin-left: 6rpx;
          color: #aaa;
        }
        .stars {
          img {
            width: 22rpx;
            height: 22rpx;
          }
        }
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>