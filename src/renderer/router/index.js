import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/findMusic",
      name: 'Home',
      component: require('@/views/Home').default,
      children:[
        {
          path: '/findMusic',
          component: require('@/views/AppMain/findMusic').default
        },
        {
          path: '/searchMusic',
          component: require('@/views/MusicTable').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
