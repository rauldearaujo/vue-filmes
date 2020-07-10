<template>
    <div>
        <!-- Quando o filme possui figura -->
        <b-card v-if="poster_path"
            :id="'title-tooltip-' + id"
            :img-src="'https://image.tmdb.org/t/p/w300/' + poster_path"
            @click="goToMovie"
        >
            <b-badge pill variant="danger" v-b-tooltip.hover title="Popularity">
                <i class="fas fa-fire"></i> {{popularity}}
            </b-badge>
            <b-badge pill variant="warning" v-b-tooltip.hover title="Evaluation">
                <i class="fas fa-star"></i> {{vote_average}}
            </b-badge>
            
        </b-card>

        <!-- Quando o filme não possui figura -->
        <b-card v-else  
            :id="'title-tooltip-' + id"
            title-tag="h6"
            :img-src="require('../assets/film-art.png')"
            @click="goToMovie"
        >
            <b-badge pill variant="danger">
                <i class="fas fa-fire"></i> {{popularity}}
            </b-badge>
            <b-badge pill variant="warning">
                <i class="fas fa-star"></i> {{vote_average}}
            </b-badge>
        </b-card>

        <b-tooltip :target="'title-tooltip-' + id" triggers="hover">
            {{title}}
        </b-tooltip>

    </div>
</template>

<script>
import router from '@/router/router'

export default {
    name: "MovieCard",
    
    props: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        poster_path: {
            required: true
        },
        popularity: {
            type: Number,
            required: true
        },
        vote_average: {
            type: Number,
            required: true
        },
        noFooter: {
            type: Boolean,
            default: false
        }

    },

    methods: {
        goToMovie: function() {
            router.push({name: "movie", params: {movieId: this.id.toString()}})
        }
    }

}
</script>

<style scoped>
.card {
  cursor: pointer;
  margin: 20px;
}
</style>