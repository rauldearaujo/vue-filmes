<template>
    <div v-if="images.length > 0">
        <hr/>
        <b-row>
            <b-col>
                <h4>Images</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-img 
                    v-for="image in images" 
                    :key="image.file_path" 
                    thumbnail 
                    fluid 
                    :src="'https://image.tmdb.org/t/p/w200/' + image.file_path" ></b-img>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { API_BASE } from '@/consts/api';
const axios = require("axios");

export default {
    name: 'MovieImages',
    
    props: {
        movieId: {
            type: String,
            required: true
        }
    },

    methods: {
        getMoviePosters: async function() {
            let params = {
                api_key: process.env.VUE_APP_API_KEY
            }
            let urlRequest = API_BASE.url + `movie/${this.movieId}/images`
            let response = await axios.get(urlRequest, {params: params})
            this.images = response.data.backdrops
        },
    },

    mounted() {
        this.getMoviePosters()
    },

    data () {
        return  {
            images: []
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