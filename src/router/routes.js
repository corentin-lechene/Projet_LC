
export default [
  {
    path: '/',
    name: 'Homepage',
    component: () => import('./views/homepage'),
  },

  //Account
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/account/login'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./views/account/register'),
  },
  {
    path: '/forgot-password',
    name: 'Forgot password',
    component: () => import('./views/account/forgot-password'),
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('./views/account/logout'),
  },

    //Profile
  {
    path: '/loyalty-card',
    name: 'LoyaltyCard',
    meta: {
    },
    component: () => import('./views/profile/loyalty-card')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
    },
    component: () => import('./views/profile/profile')
  },

  //Shops
  {
    path: '/offers-partners',
    name: 'Offer partners',
    meta: {
    },
    component: () => import('./views/shops/offers-partners')
  },
  {
    path: '/lc-shop',
    name: 'lc shop',
    meta: {
    },
    component: () => import('./views/shops/lc-shop')
  },
  {
    path: '/product-detail',
    name: 'Product detail',
    meta: {
    },
    component: () => import('./views/shops/product-detail')
  },
  {
    path: '/service-detail',
    name: 'Service detail',
    meta: {
    },
    component: () => import('./views/shops/service-detail')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
    },
    component: () => import('./views/shops/cart')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    meta: {
    },
    component: () => import('./views/shops/checkout')
  },
  {
    path: '/admin',
    name: 'Back-Office',
    meta: {
    },
    component: () => import('./views/account/account')
  },
  {
    path: '/invoice',
    name: 'Facture',
    meta: {
    },
    component: () => import('./views/support/invoice')
  },
  {
    path: '/pdf',
    name: 'PDF',
    meta: {
    },
    component: () => import('./views/support/pdf')
  },


  //Example
  {
    path: '/example',
    name: 'Example',
    meta: {
    },
    component: () => import('./views/example/example')
  },

  //Errors
  {
    path: '/500',
    name: 'InternetServerError',
    meta : {
      title: 'Internet Server Error',
    },
    component: () => import('./views/errors/500')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    meta : {
      title: '404 Notfound',
    },
    component: () => import('./views/errors/404')
  }
  
]
