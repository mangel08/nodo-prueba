<template>
  <div>
     <h1 v-show="isLoading">
      Cargando...
    </h1>

    <div v-show="!isLoading">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ character.name }} </h5>
          <p class="card-text">
            House: {{ character.house }}
          </p>
        </div>
         <ul class="list-group list-group-flush">
          <li class="list-group-item" style="background-color: #fafafa; color: #111111;">Books</li>
        </ul>
        <ul class="list-group list-group-flush" v-for="book in character.books">
          <li class="list-group-item">{{ book }}</li>
        </ul>
        <div class="card-body">
           <a href="#" class="btn btn-primary">Rank {{character.pageRank }}</a>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
  import { getACharacter } from '../services/got.service.js'

  export default {
    name: 'detail-component',

    /**
     * @description the data block represents all the local variable of this component.
     */
    data () {
      return {
        character: {},
        isLoading: false
      }
    },

    /**
     * @description the create function is the first one to be execute when the component is being created (see vue js lifecycle).
     */
    created () {
      this.isLoading = true
      const { id } = this.$route.params
      getACharacter(id)
        .then(res => {
          this.character = res.data
          console.log(this.character)
          this.isLoading = false
        })
    },

    /**
     * @description the methods block represents all the local methods of this component.
     */
    methods: {

      /**
       * @description get the detail of a character from the GoT API.
       * @param {string} id. the "_id" of the character that we are going to request.
       * @method goToDetail
       */
      
    }
  }
</script>
<style>

</style>