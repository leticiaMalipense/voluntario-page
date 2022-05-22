import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Individual from "@/views/Individual.vue";
import CompanyList from "@/views/CompanyList.vue";
import NotFound from "@/views/NotFound.vue";

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
      {
        path: "/",
        redirect: "/login",
      },
      {
        path: "/login",
        name: "login",
        component: Login
      },
      {
        path: "/home",
        name: "home",
        component: Home,
        redirect: "/company",
        children: [
          {
            path: "/company",
            name: "company",
            component: CompanyList
          },
          {
            path: "/individual",
            name: "individual",
            component: Individual
          }
        ]
      },
      { path: "*", component: NotFound }
    ]
  });



  router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    if (authRequired && !loggedIn) {
      return next('/login');
    }
  
    next();
  })

  
