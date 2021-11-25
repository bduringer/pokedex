import Vue from 'vue'
import VueRouter from 'vue-router'
import Pokemons from '../components/Pokemons.vue'
import Pokemon from '../components/Pokemon.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pokemons',
    component: Pokemons
  },
  {
    path: '/Pokemons',
    name: 'Pokemons',
    component: Pokemons
  },
  {
    path: '/pokemons/:id',
    name: 'Pokemon',
    component: Pokemon
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
