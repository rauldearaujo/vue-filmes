<template>
    <div v-if="reviews.length > 0">
        <hr/>
        <b-row >
            <b-col>
                <h4>Reviews</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-card v-for="review in reviews" :key="review.id">
                <b-card-text>
                    {{review.content}}
                </b-card-text>
                <template v-slot:footer>
                    <strong>Author:</strong> {{review.author}}
                </template>
            </b-card>
        </b-row>
    </div>
</template>

<script>
import { API_BASE } from '@/consts/api';
const axios = require("axios");

export default {
    name: 'MovieReviews',
    
    props: {
        movieId: {
            type: String,
            required: true
        }
    },

    methods: {
        getMovieReviews: async function() {
            let params = {
                api_key: process.env.VUE_APP_API_KEY
            }
            let urlRequest = API_BASE.url + `movie/${this.movieId}/reviews`
            let response = await axios.get(urlRequest, {params: params})
            this.reviews = response.data.results
        },
    },

    mounted() {
        this.getMovieReviews()
    },

    data () {
        return  {
            reviews: []
        }
    }

}
</script>

<style scoped>
.card-text {
    max-height: 200px;
    overflow-y: auto;
    font-size: 12px;
}
.card {
    width: 100%;
    margin-bottom: 20px;
}
</style>