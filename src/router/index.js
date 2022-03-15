import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

import routes from './routes'

import {sendGetUserByToken} from "@/components/requests-bdd";
import {preventingErrorSQL, validRequest} from "@/components/my-functions";

Vue.use(VueRouter)
Vue.use(VueMeta, {
    // The component option name that vue-meta looks for meta info on.
    keyName: 'page',
})

const router = new VueRouter({
    routes,
    // Use the HTML5 history API (i.e. normal-looking routes)
    // instead of routes with hashes (e.g. example.com/#/about).
    // This may require some server configuration in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    mode: 'history',
    // Simulate native-like scroll behavior when navigating to a new
    // route and using back/forward buttons.
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    },
})


router.beforeEach((to, from, next) => {
    const privatePages = ['/profile'] //Les pages qui sont privé
    const authPage = privatePages.includes(to.path); //C'est une page privé ?
    const tokenUser = localStorage.getItem('user_token'); //Recupère le token

    if(to.path === '/logout' || from.path === '/logout')
        return next();

    if (authPage) {
        //besoin de se connecter
        //avoir un token

        if (tokenUser) {
            //J'ai un token
            //verifier le token
            const authUser = sendGetUserByToken();

            authUser.then((res) => {
                if(!preventingErrorSQL(res))
                    if(!validRequest(res))
                        return next();

                return next({
                    name: 'logout',
                    params: {
                        redirect: 'login',
                        notification: {
                            message: "Une erreur s'est produite. Veuillez vous reconnecter",
                            variant: "danger"
                        }
                    }
                })
            })
        } else {
            //J'ai pas de token
            //Il faut en avoir un
            return next({
                name: 'login',
                params: {
                    notification: {message: "Vous devez être connecté pour acceder à cette page", variant: "danger"}
                }
            })
        }
    } else {
        if (tokenUser) {
            //on a un token
            const authUser = sendGetUserByToken();
            authUser.then((res) => {
                if(!preventingErrorSQL(res))
                    if(!validRequest(res))
                        return next();

                return next({
                    name: 'logout',
                    params: {
                        redirect: 'login',
                        notification: {
                            message: "Une erreur s'est produite. Veuillez vous reconnecter",
                            variant: "danger"
                        }
                    }
                })
            })
        }
    }


    next();

});


router.beforeResolve(async (routeTo, routeFrom, next) => {
    // Create a `beforeResolve` hook, which fires whenever
    // `beforeRouteEnter` and `beforeRouteUpdate` would. This
    // allows us to ensure data is fetched even when params change,
    // but the resolved route does not. We put it in `meta` to
    // indicate that it's a hook we created, rather than part of
    // Vue Router (yet?).
    try {
        // For each matched route...
        for (const route of routeTo.matched) {
            await new Promise((resolve, reject) => {
                // If a `beforeResolve` hook is defined, call it with
                // the same arguments as the `beforeEnter` hook.
                if (route.meta && route.meta.beforeResolve) {
                    route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
                        // If the user chose to redirect...
                        if (args.length) {
                            // If redirecting to the same route we're coming from...
                            // Complete the redirect.
                            next(...args)
                            reject(new Error('Redirected'))
                        } else {
                            resolve()
                        }
                    })
                } else {
                    // Otherwise, continue resolving the route.
                    resolve()
                }
            })
        }
        // If a `beforeResolve` hook chose to redirect, just return.
    } catch (error) {
        return
    }

    // If we reach this point, continue resolving the route.
    next()
})

export default router
