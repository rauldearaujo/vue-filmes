<template>
    <div v-if="movie === {}">
        <b-spinner label="Loading..." class="spinner" variant="primary"></b-spinner>
    </div>
    <div v-else align="justify">
        
        <b-row>
            <b-col>
                <h2 v-if="movie.release_date">{{movie.title}} ({{getYear(movie.release_date)}})</h2>
                <h2 v-else>{{movie.title}}</h2>
            </b-col>
            <b-col align="right">
                <b-badge pill variant="danger" v-b-tooltip.hover title="Popularity">
                    <i class="fas fa-fire"></i> {{movie.popularity}}
                </b-badge>
                <b-badge pill variant="warning" v-b-tooltip.hover title="Evaluation">
                    <i class="fas fa-star"></i> {{movie.vote_average}}
                </b-badge>
            </b-col>
        </b-row>
        <hr/>
        <b-row>
            <b-col align="left">
                <b-badge 
                    variant="success" 
                    class="badge" 
                    v-for="genre in movie.genres" 
                    :key="genre.id"
                >
                    {{genre.name}}
                </b-badge>
            </b-col>
            <b-col align="right">
                <b-badge 
                    variant="primary" 
                    class="badge" 
                    v-for="company in movie.production_companies" 
                    :key="company.id"
                >
                    {{company.name}}
                </b-badge>
            </b-col>
        </b-row>
        <br/>
        <b-row>
            <b-col v-if="movie.overview">
                <p>{{movie.overview}}</p>
            </b-col>
            <b-col v-if="movie.poster_path" lg="3" align="right">
                <b-img 
                    thumbnail 
                    fluid 
                    :src="'https://image.tmdb.org/t/p/w200/' + movie.poster_path"></b-img>
            </b-col>
        </b-row>

        <movie-images :movieId="movieId" />
        
        <movie-reviews :movieId="movieId" />

        <similar-movies :movieId="movieId" />

    </div>
</template>

<script>
import MovieReviews from '@/components/MovieReviews.vue'
import MovieImages from '@/components/MovieImages.vue'
import SimilarMovies from '@/components/SimilarMovies.vue'
import { API_BASE } from '@/consts/api';
const axios = require("axios");

export default {
    name: 'MoviePage' ,
    
    components: {
        MovieImages,
        MovieReviews,
        SimilarMovies
    },

    props: {
        movieId: {
            type: String,
            required: true
        }
    },
    
    methods: {
        getMovieById: async function() {
            let params = {
                api_key: API_BASE.key
            }
            let urlRequest = API_BASE.url + `movie/${this.movieId}`
            let response = await axios.get(urlRequest, {params: params})
            this.movie = response.data
        },

        

        getYear: function(date) {
            return date.slice(0,4);
        }

    },

    mounted () {
        this.getMovieById()
    },

    data () {
        return {
            movie: {}
        }
    }

}
</script>

<style scoped>
.badge {
    margin: 0px 2px;
}
</style>