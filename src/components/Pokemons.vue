<template>
  <div>
    <div v-for='pokemon in pokelist' :key='pokemon.name'>
      <router-link :to='"/pokemons/"+ pokemon.id'>{{pokemon.name}}</router-link>
    </div>
    <button @click='next'>Próximo</button>
  </div>
</template>

<script>
export default {
  computed: {
    pokelist () {
      return this.pokemons.map(p=>({
        name: p.name, id: p.url.match(/\/(\d+)/)[1]
      }))
    }
  },
  data () {
    return {
      pokemons: [],
      nextUrl: null,
    }
  },
  methods: {
    next () {
      fetch(this.nextUrl).then(res => res.json()).then(data => {
        this.pokemons.push(...data.results)
        this.nextUrl = data.next
      })
    }
  },
  created () {
    fetch('https://pokeapi.co/api/v2/pokemon/').then(res => res.json()).then(data => {
      this.pokemons = data.results
      this.nextUrl = data.next
    })
  } 
}
</script>

<style scoped>

</style>
