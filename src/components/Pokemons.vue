<template>
  <div class="container">
  <div class="body">
   <!-- Nesta parte tentei botar os inputs para o filtro:
    <input @change='filterByName'>
    <input @change='filterByType'>
    <input @change='filterById'>
    <input @change='filterBySpecies'>-->
      <img class="logo" src="../assets/Logo_pokedex.png">
      <div class="pokemons" v-for='pokemon in filteredPokemons' :key='pokemon.name'>
        <router-link class="pokemons" :to='"/pokemons/"+ pokemon.name'>
          {{pokemon.name}}
        </router-link>
      </div>
    <div v-infinite-scroll="next" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
  </div>
  </div>
</template>

<script>
export default {
  computed: {
    filteredPokemons () {
      return this.pokemons//.filter(pokemon => {
       // var id = pokemon.url.match(/\/(\d+)/)[1]
        //return (
          // Obs: Aqui tentei fazer um filtro, mas não consegui :(
          // pokemon.name.search(this.filters.name) >= 0 &&
          // pokemon.types.reduce((memo, type) => memo || type.type.name.search(this.filters.type) >= 0, false) && 
          // (!this.filters.id || id == this.filters.id)
        //   true
        // )
      //})
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
      if (!this.nextUrl) return
      
      fetch(this.nextUrl).then(res => res.json()).then(data => {
        this.pokemons.push(...data.results)
        this.nextUrl = data.next
      })
    },
    // filterByName (e) {
    //   this.filters.name = e.target.value
    // },

    // filterByType (e) {
    //   this.filters.type = e.target.value
    // },
    // filterById (e) {
    //   this.filters.id = e.target.value
    // },
    // filterBySpecies (e) {
    //   this.filters.species = e.target.value
    // }
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

  .body {
    display: block;
    position: relative;
    margin-top: 30px;
    background-image: linear-gradient(to right, yellow, red);
    border: solid;
    box-shadow: inset 0 0 1em gold, 0 0 1em red;
    font-family: Blippo, fantasy;
    text-align: center;
    font-size: 50px;
    margin-left: 20%;
    margin-right: 20%;
    border-radius: 50px;
  }
  .logo {
    max-width: 100%;
    margin-bottom: -50px;
    margin-top: -30px;
  }
  .pokemons{
    text-transform: uppercase;
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em yellow;
    text-decoration: none;
    margin-bottom: 40px;
    max-width: 100%;
  }
  .container{
    background-image: url("../assets/bg_pokemon.png");
    background-repeat: repeat;
    background-size: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 40px;
    max-width: 100%;
  }
  

</style>
