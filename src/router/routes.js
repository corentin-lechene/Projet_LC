
export default [
  {
    path: '/',
    name: 'Accueil',
    meta: {
    },
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
    //Deconnexion
  },

  //Profile
  {
    path: '/loyalty-card',
    name: 'Ma carte LC',
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
    name: 'Boutique des offres partenaires',
    meta: {
    },
    component: () => import('./views/shops/offers-partners')
  },
  {
    path: '/lc-shop',
    name: 'Boutique LC',
    meta: {
    },
    component: () => import('./views/shops/lc-shop')
  },
  {
    path: '/product-detail',
    name: 'Detail du produit',
    meta: {
    },
    component: () => import('./views/shops/product-detail')
  },
  {
    path: '/service-detail',
    name: 'Detail du service',
    meta: {
    },
    component: () => import('./views/shops/service-detail')
  },
  {
    path: '/cart',
    name: 'Panier',
    meta: {
    },
    component: () => import('./views/shops/cart')
  },
  {
    path: '/checkout',
    name: 'Payement',
    meta: {
    },
    component: () => import('./views/shops/checkout')
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
    name: 'example',
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