<template>
    <b-navbar fixed="top" sticky toggleable="lg" type="dark" variant="primary">
      
      <b-navbar-brand to="/">Movies Finder</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="#">Give me a movie!</b-nav-item> -->
          <!-- <b-nav-item-dropdown text="Genres" right>
            <b-dropdown-item v-for="genre in genres" :key="genre.id" href="#">{{genre.name}}</b-dropdown-item>
          </b-nav-item-dropdown> -->
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form> -->
            <b-form-input
              v-model="searchField"
              size="sm"
              class="mr-sm-2"
              placeholder="Search a movie"
              @keyup.enter="redirectToSearch"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" variant="light" @click="redirectToSearch">Search</b-button>
          <!-- </b-nav-form> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
import router from '@/router/router'

export default {
    name: 'NavBar',

    methods: {
      redirectToSearch: function () {
        router.push({name: 'search', params: {searchTerm: this.searchField}})
      }
    },

    data () {
      return  {
          searchField: ""
      }
    }

}
</script>