import Router from 'vue-router'
import MainNavigation from '@/components/MainNavigation'
import SearchNavigation from '@/components/SearchNavigation'
import MoviePage from '@/components/MoviePage'

const routes = [
    {
        name: "home",
        path: "/:page?",
        component: MainNavigation,
        props: (route) => ({
            page: route.params.page || 1
        })
    },
    {
        name: "search",
        path: "/search/:searchTerm/:page?",
        component: SearchNavigation,
        props: (route) => ({
            searchTerm: route.params.searchTerm,
            page: route.params.page || 1
        })
    },
    {
        name: "movie",
        path: "/movie/:movieId",
        component: MoviePage,
        props: true
    }
]

const router = new Router({routes})

export default router