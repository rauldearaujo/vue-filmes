<template>
  <div>
    <b-row>
      <b-col class="sort-title">
        <h2 v-if="sortMoviesBy === 'popularity.desc'"><i class="fas fa-fire"></i> Most Popular</h2>
        <h2 v-else-if="sortMoviesBy === 'vote_average.desc'"><i class="fas fa-star"></i> Top Rated</h2>
        <h2 v-else><i class="fas fa-sort-alpha-down"></i> Per Title</h2>
      </b-col>
      <b-col align="right" lg="4" sm="12">
        <h6 align="left">Sort movies by:</h6>
        <b-form-select v-model="sortMoviesBy" :options="sortMoviesByOptions"></b-form-select>
      </b-col>
    </b-row>
    <hr/>
    <div v-if="loadingMovies">
      <b-spinner label="Loading..." class="spinner" variant="primary"></b-spinner>
    </div>
    <div e-else>
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
      },
      sortMoviesBy: {
        type: String,
        default: "original_title.asc"
      }
    },

    watch: {
        page: function() {
          this.updateMovies();
        },

        sortMoviesBy: function() {
          this.updateMovies();
        }

    },

    methods: {

      linkGen(pageNum) {
        return {
          name: 'home',
          params: { page: pageNum, sortMoviesBy: this.sortMoviesBy }
        }
      },

      updateMovies: async function() {
        this.loadingMovies = true
        let params = {
          api_key: API_BASE.key,
          page: this.page,
          sort_by: this.sortMoviesBy
        }
        let urlRequest = API_BASE.url + "discover/movie"
        let response = await axios.get(urlRequest, {params: params})
        this.movies = response.data.results
        this.totalPages = response.data.total_pages
        this.loadingMovies = false
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
        loadingMovies: false,
        sortMoviesByOptions: [
          {
            text: "Popularity",
            value: "popularity.desc"
          }, 
          {
            text: "Evaluation",
            value: "vote_average.desc"
          },
          {
            text: "Title",
            value: "original_title.asc"
          }
        ]
      };
    }
  
}
</script>

<style scoped>
.pages-control {
  display: block;
  margin: auto;
}
.sort-title {
  position: relative;
  text-align: left;
}
.sort-title h2{
  position: absolute;
  bottom: 0;
}
</style>