<template>
<div class="container">
  <div class="corpo">
    <div><h1 class="name">{{pokemon.name}}</h1></div>
    
    <div class="sprites" v-for='(url, angle) in pokemon.sprites' :key='angle'>
      <img v-if='typeof url == "string"' :src='url'>
    </div>

    <div>
      <h2 class="name">Habilidades:</h2>
      <div class="ability" v-for='move in pokemon.moves' :key='move.move.name'>
        {{move.move.name}}
      </div>
    </div>

    <div>
      <h2 class="name">Aparece nos pokemon's:</h2>
      <div class="ability" v-for='game in pokemon.game_indices' :key='game.version.name'>
        {{game.version.name}}
      </div>
    </div> 
    <div>
      <h2 class="name">Evoluções:</h2>
      <a class="ability evolves" v-for='evolution in evolutions' :key='evolution.name' :href="'/pokemons/' + evolution.name">
        {{evolution.name}}
      </a>
    </div> 
  </div>
  </div>
</template>

<script>
export default {

  data () {
    return { 
      pokemon: {
        sprites: {},
        moves: [],
      },
      evolutions: [],
    }
  },

  methods: {
    getEvolutions () {
      fetch(this.pokemon.species.url).then(res => res.json()).then(species => {
        fetch(species.evolution_chain.url).then(res => res.json()).then(evolutionChain => {
          this.evolutions = this.nextEvolutions(evolutionChain.chain)
        })
      })
    },
    nextEvolutions (evolution) {      
      if (!evolution.evolves_to) return
      var nextEvolutions = evolution.evolves_to.reduce((memo, nextEvolution) => {
        memo.push(...this.nextEvolutions(nextEvolution))
        return memo
      }, [])
      return [evolution.species, ...nextEvolutions]
    },
  },
  
  created () {
    fetch('https://pokeapi.co/api/v2/pokemon/' + this.$route.params.id).then(res => res.json()).then(data => {
      this.pokemon = data
      this.getEvolutions()
    })
  },
}
</script>

<style scoped>

  .evolves{
    margin-bottom: 30px;
  }
  .ability{
    display: inline-block;
    text-transform: uppercase;
    color: black;
    text-shadow: 1px 1px 2px black, blue, yellow;
    margin-right: 10px;
    margin-left: 10px;
    max-width: 100%;
  }
  .name{
    text-transform: uppercase;
    color: black;
    text-shadow: 1px 1px 2px black, blue, yellow;
    max-width: 100%;
  }
  
  .corpo{
    display: block;
    position: relative;
    margin-top: 30px;
    background-image: linear-gradient(to right, #00BFFF , #4169E1);
    border: solid;
    box-shadow: inset 0 0 1em black, 0 0 1em grey;
    font-family: Blippo, fantasy;
    text-align: center;
    font-size: 30px;
    margin-left: 20%;
    margin-right: 20%;
    border-radius: 50px;
    max-width: 100%;
  }
  .sprites{
    display: inline-block;
    max-width: 100%;
  }

  .sprites img{
    width: 200px;
  }

  .container{
    background-image: url('../assets/slowpoke.png');
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 40px;
    max-width: 100%;
  }
</style>
