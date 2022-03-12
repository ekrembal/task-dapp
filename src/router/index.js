import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Tasks from '../views/Tasks.vue'
import CreateTask from '../views/CreateTask.vue'
import Task from '../views/Task.vue'

const routes = [
  {
    path: '/:contractAddress/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'tasks/',
        name: 'Tasks',
        component: Tasks
      },
      {
        path: 'create_task',
        name: 'CreateTask',
        component: CreateTask
      },
      {
        path: 'task/:taskId',
        name: 'Task',
        component: Task,
      },
      {
        path: 'be_a_validator',
        name: 'BeAValidator',
        component: () => import('../views/BeAValidator.vue')
      },
      {
        path: 'solutions',
        name: 'Solutions',
        component: () => import('../views/Solutions.vue')
      },
    ]
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/:contractAddress/tasks',
  //   name: 'Tasks',
  //   component: () => import('../views/Tasks.vue')
  // },
  // {
  //   path: '/:contractAddress/create_task',
  //   name: 'CreateTask',
  //   component: () => import('../views/CreateTask.vue')
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
