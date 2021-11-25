<template>
  <div>
   <!-- <input @change='filterByName'>
    <input @change='filterByType'>
    <input @change='filterById'>
    <input @change='filterBySpecies'>-->


    <div v-for='pokemon in filteredPokemons' :key='pokemon.name'>
      <router-link :to='"/pokemons/"+ pokemon.name'>{{pokemon.name}}</router-link>
    </div>
    <div v-infinite-scroll="next" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    filteredPokemons () {
      return this.pokemons.filter(pokemon => {
        var id = pokemon.url.match(/\/(\d+)/)[1]
        return (
          // pokemon.name.search(this.filters.name) >= 0 &&
          // pokemon.types.reduce((memo, type) => memo || type.type.name.search(this.filters.type) >= 0, false) && 
          // (!this.filters.id || id == this.filters.id)
          true
        )
      })
    }
  },
  data () {
    return {
      pokemons: [],
      nextUrl: null,
      filters: {name: '', type: '', id: '', species: ''},
    }
  },
  methods: {
    next () {
      fetch(this.nextUrl).then(res => res.json()).then(data => {
        this.pokemons.push(...data.results)
        this.nextUrl = data.next
      })
    },
    filterByName (e) {
      this.filters.name = e.target.value
    },

    filterByType (e) {
      this.filters.type = e.target.value
    },
    filterById (e) {
      this.filters.id = e.target.value
    },
    filterBySpecies (e) {
      this.filters.species = e.target.value
    }
  },
  created () {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=60').then(res => res.json()).then(data => {
      this.pokemons = data.results
      this.nextUrl = data.next
    })
  } 
}
</script>

<style scoped>

</style>
