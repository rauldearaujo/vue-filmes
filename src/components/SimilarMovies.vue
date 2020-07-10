<template>
    <div v-if="similarMovies.length > 0">
        <hr/>
        <b-row>
            <b-col>
                <h4>Similar Movies</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-card-group class="cards-group" deck>
                <b-col lg="3" v-for="similarMovie in similarMovies" :key="similarMovie.id">
                    <movie-card 
                        :id="similarMovie.id"
                        :title="similarMovie.title" 
                        :poster_path="similarMovie.poster_path"
                        :vote_average="similarMovie.vote_average"
                        :popularity="similarMovie.popularity"
                    />
                </b-col>
            </b-card-group>
        </b-row>
    </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue';
import { API_BASE } from '@/consts/api';
const axios = require("axios");

export default {
    name: 'SimilarMovies',
    
    components: {
        MovieCard
    },

    props: {
        movieId: {
            type: String,
            required: true
        }
    },

    methods: {
        getSimilarMovies: async function() {
            let params = {
                api_key: process.env.VUE_APP_API_KEY
            }
            let urlRequest = API_BASE.url + `movie/${this.movieId}/similar`
            let response = await axios.get(urlRequest, {params: params})
            this.similarMovies = response.data.results
        },
    },

    mounted() {
        this.getSimilarMovies()
    },

    data () {
        return  {
            similarMovies: []
        }
    }

}
</script>

<style scoped>
.card-text {
    max-height: 200px;
    overflow-y: auto;
}
.card {
    width: 100%;
    margin-bottom: 20px;
}
img {
    width: 20%;
}
</style>