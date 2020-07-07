<template>
  <div>
    <h2 align="left"><i class="fas fa-fire"></i> Most Popular</h2>
    <hr/>
    <div v-if="movies.length === 0">
      <b-spinner label="Loading..." class="spinner" variant="primary"></b-spinner>
    </div>
    <div e-else>
      <b-row>
        <b-card-group deck>
          <b-col lg="3"  v-for="movie in movies" :key="movie.id">
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
      <b-row>
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
    name: "MainNavigation",
    
    components: {
        MovieCard
    },

    props: {
      page: {
        type: Number,
        default: 1
      }
    },

    watch: {
        page: function() {
            this.updateMovies();
        }
    },

    methods: {

      linkGen(pageNum) {
        return {
          name: 'home',
          params: { page: pageNum }
        }
      },

      updateMovies: async function() {
        let params = {
          api_key: API_BASE.key,
          page: this.page,
          sort_by: "popularity.desc"
        }
        let urlRequest = API_BASE.url + "discover/movie"
        let response = await axios.get(urlRequest, {params: params})
        this.movies = response.data.results
        this.totalPages = response.data.total_pages
      },

    },

    mounted() {
      this.updateMovies();
    },

    data() {
      return {
        totalPages: 1,
        genres: [],
        movies: [],
      };
    }
  
}
</script>

<style scoped>
.pages-control {
  display: block;
  margin: auto;
}
</style>