<template>
    <div>
      <h2 align="left">Search Resuls for "{{searchTerm}}"</h2>
      <hr/>
      <div v-if="loadingSearch">
        <b-spinner label="Loading..." class="spinner" variant="primary"></b-spinner>
      </div>
      <div v-else-if="movies.length === 0">
        <h4 align="left">No results...</h4>
      </div>
      <div v-else>
        <b-row>
          <b-card-group deck>
            <b-col lg="3" md="6" sm="12" v-for="movie in movies" :key="movie.id">
              <movie-card 
                :id="movie.id"
                :title="movie.title" 
                :poster_path="movie.poster_path"
                :vote_average="movie.vote_average"
                :popularity="movie.popularity"
              />
            </b-col>
          </b-card-group>
        </b-row>
        <br/>
        <b-row >
          <b-col>
            <b-pagination-nav
              align="center"
              :link-gen="linkGen"
              v-model="page"
              :number-of-pages="totalPages"
              first-number
              last-number
              use-router
            ></b-pagination-nav>
          </b-col>
        </b-row>
      </div>
    </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue';
import { API_BASE } from "@/consts/api";
const axios = require("axios");

export default {
    name: "SearchNavigation",
    
    components: {
        MovieCard
    },

    props: {
        searchTerm: { 
          type: String,
          require: true
        },
        page: {
          tupe: Number,
          default: 1
        }
    },

    watch: {
      
      searchTerm: function() {
        this.searchMovie()
      },

      page: function() {
        this.searchMovie()
      }

    },

    methods: {
      
      linkGen(pageNum) {
        return {
          name: 'search',
          params: { page: pageNum }
        }
      },

      searchMovie: async function() {
        this.loadingSearch = true
        this.movies = []
        let params = {
          api_key: process.env.VUE_APP_API_KEY,
          query: this.searchTerm,
          page: this.page
        }
        let urlRequest = API_BASE.url + "search/movie"
        let response = await axios.get(urlRequest, {params: params})
        this.movies = response.data.results
        this.currentPage = response.data.page
        this.totalPages = response.data.total_pages
        this.loadingSearch = false
      }
    
    },

    mounted () {
      this.searchMovie()
    },

    data () {
        return {
            totalPages: 1,
            movies: [],
            loadingSearch: false
        }
    }
}
</script>

<style scoped>
.pages-control {
  display: block;
  margin: auto;
}
</style>