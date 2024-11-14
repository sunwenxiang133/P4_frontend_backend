const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/infoPage1',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/infoPage.vue') }
    ]
  },
  {
    path: '/infoPage2',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/infoPage2.vue') }
    ]
  },
  {
    path: '/infoPage3',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/infoPage3.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
