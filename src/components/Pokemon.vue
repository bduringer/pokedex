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
  </div>
</template>

<script>
export default {

  data () {
    return { 
      pokemon: {
        sprites: {},
        moves: [],
      }
    }
  },
  
  created () {
    fetch('https://pokeapi.co/api/v2/pokemon/' + this.$route.params.id).then(res => res.json()).then(data => {
      this.pokemon = data
      console.log(this.pokemon)
    })
  },
}
</script>

<style scoped>

</style>
