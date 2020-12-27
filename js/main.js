let app = new Vue (
    {
        el: "#app",
        data: {
            // UTILITIES
            my_api_key: "abe738a72b875634baa4e3568faa8280",
            movieGenresUrl: "https://api.themoviedb.org/3/genre/movie/list?",
            moviesUrl: "https://api.themoviedb.org/3/search/movie?",
            tvSeriesUrl: "https://api.themoviedb.org/3/search/tv?",
            multiSearchUrl: "https://api.themoviedb.org/3/search/multi?",
            filterSearch: "https://api.themoviedb.org/3/search/multi?",
            poster: "https://image.tmdb.org/t/p/w780",
            noImgFound: "img/img-not-available.png",
            pages: 1,
            // /UTILITIES
            showTypes : ["Tutti", "Serie TV", "Film"],
            results: [],
            genresArray: [],
            query: "",
            searchQuery: "",
            openSearchField: false,
            noResultsFound: true,
            indexActive: 0,
            genreSelected: -1,
        },
        methods: {

            getQueryByInput: function () {
                this.query = this.searchQuery;

                axios.get(this.filterSearch, {
                    params: {
                        api_key: this.my_api_key,
                        query: this.query,
                        page: this.pages,
                        language: "it-IT",
                    }
                })
                .then( (response) => {
                    this.results = response.data.results;

                    this.genresArray.forEach( (element) => {
                        this.results.forEach( (el) => {
                            if (el.genre_ids.includes(element.id)) {
                                el.genre_ids.push(element.name);
                            }
                        } );
                    } );

                    if (this.results.length != 0) {
                        this.noResultsFound = false;
                    } else {
                        this.noResultsFound = true;
                    }
                } );

                this.searchQuery = "";
            },

            moveActiveClass: function (i) {
                this.indexActive = i;
                if (this.indexActive == 1) {
                    this.filterSearch = this.tvSeriesUrl;
                } else if (this.indexActive == 2) {
                    this.filterSearch = this.moviesUrl;
                } else {
                    this.filterSearch = this.multiSearchUrl;
                }
                this.query = "";
            },

            getGenresByAxiosCall: function () {
                axios.get(this.movieGenresUrl, {
                    params: {
                        api_key: this.my_api_key,
                        language: "it-IT",
                    }
                })
                .then( (response) => {
                    this.genresArray = response.data.genres;
                    console.log(this.genresArray);
                } );
            },

        },
        mounted: function () {
            this.getGenresByAxiosCall();
        },
    }
);
