import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'home',
    component: () => import('./view/home'),
    meta: {
      title: 'components'
    },
    path: '/home'
  },
  {
    name: 'demo',
    component: () => import('./view/demo'),
    meta: {
      title: 'demo'
    },
    path: '/demo',
    children: [
      {
        name: 'cascader',
        component: () => import('./view/demo/cascader'),
        meta: {
          title: 'cascader 级联选择器'
        },
        path: 'cascader'
      }
    ]
  },
  // {
  //   name: 'cascader',
  //   component: () => import('./view/cascader'),
  //   meta: {
  //     title: 'cascader 级联选择器'
  //   }
  // },
];

// add route path
// const routesIterator = route => {
//   if(route.hasOwnProperty('children') && route.children.length) {
//     route.path = route.path || '/' + (route.name || '');
//     routesIterator(route.children);
//   } else {
//     route.path = route.path || '/' + (route.name || '');
//   }
// };
// // routes.forEach(route => {
// //   route.path = route.path || '/' + (route.name || '');
// // });
// routes.forEach(routesIterator);
// console.log(routes);

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
