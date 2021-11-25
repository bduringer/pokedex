<template>
  <div>
    <div>{{pokemon.name}}</div>
    
    <div v-for='(url, angle) in pokemon.sprites'>
      <img v-if='typeof url == "string"' :src='url'>
    </div>

    <div>
      <h2>Habilidades</h2>
      <div v-for='move in pokemon.moves' :key='move.move.name'>
        {{move.move.name}}
      </div>
    </div>

    <div>
      <h2>Versões</h2>
      <div v-for='game in pokemon.game_indices' :key='game.version.name'>
        {{game.version.name}}
      </div>
    </div> 
    <div>
      <h2>Evoluções</h2>
      <div v-for='evolution in evolutions'>
        {{evolution}}
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
          this.evolutions = [species.name, ...this.nextEvolutions(evolutionChain.chain)]
        })
      })
    },
    nextEvolutions (chain)  {
      return chain.evolves_to.reduce((memo, evolution) => [...memo, evolution.species.name, ...this.nextEvolutions(evolution)], [])
    }
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

</style>
