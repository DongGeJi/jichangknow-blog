import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import BlogHome from './components/BlogHome.vue'
import ArticleLikes from './components/ArticleLikes.vue'
import ArticleHeader from './components/ArticleHeader.vue'
import ReviewsList from './components/ReviewsList.vue'
import TagCloud from './components/TagCloud.vue'
import AirportGrid from './components/AirportGrid.vue'
import DongGeRecommend from './components/DongGeRecommend.vue'
import ArticleSidebarRank from './components/ArticleSidebarRank.vue'
import GlobalBackNav from './components/GlobalBackNav.vue'
import LiveSpeedCard from './components/LiveSpeedCard.vue'
import UnlockMatrixCard from './components/UnlockMatrixCard.vue'
import NetworkTopologyCard from './components/NetworkTopologyCard.vue'
import AirportCtaButton from './components/AirportCtaButton.vue'
import MoreAirportsCard from './components/MoreAirportsCard.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 1. 在全站所有文章正文顶部，自动全局注入返回导航条
      'doc-before': () => h(GlobalBackNav),
      // 2. 在全站所有文章右侧目录下方，自动全局注入热门与点赞排行榜
      'aside-outline-after': () => h(ArticleSidebarRank)
    })
  },
  enhanceApp({ app }) {
    app.component('BlogHome', BlogHome)
    app.component('ArticleLikes', ArticleLikes)
    app.component('ArticleHeader', ArticleHeader)
    app.component('ReviewsList', ReviewsList)
    app.component('TagCloud', TagCloud)
    app.component('AirportGrid', AirportGrid)
    app.component('DongGeRecommend', DongGeRecommend)
    app.component('ArticleSidebarRank', ArticleSidebarRank)
    app.component('GlobalBackNav', GlobalBackNav)
    app.component('LiveSpeedCard', LiveSpeedCard)
    app.component('UnlockMatrixCard', UnlockMatrixCard)
    app.component('NetworkTopologyCard', NetworkTopologyCard)
    app.component('AirportCtaButton', AirportCtaButton)
    app.component('MoreAirportsCard', MoreAirportsCard)
  }
}
