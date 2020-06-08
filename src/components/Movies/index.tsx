import React, { useEffect, useState } from 'react'
import Movie from './Movie'
import './style.css'
import { CircularProgress } from '@material-ui/core'

const API_KEY = '96cafe4c'
const series = ['harry potter', 'avengers', 'fast and furious', 'iron man']

const Movies: React.FC = props => {
    const [movies, setMovies] = useState([])    
    useEffect(()=>{
        const promises = series.map(series=>{
            var url = 'http://www.omdbapi.com/?s='+encodeURIComponent(series)+'&apikey='+API_KEY+'&page=1'
            console.log(url)
            return fetch(url).then(res=>res.json())
    
        })

        Promise.all(promises).then((movies: any) => {
            setMovies(movies.map((movie:any)=>movie.Search))
        })
    },[])

    if(movies.length === 0)
    {
        return <div className="loader">
                  <CircularProgress />
        </div>
    }

    return <div className="movies">
        {movies.flat(2).map((movie: any)=>{
            return <Movie
                key={movie.imdbID}
                title={movie.Title}
                year={movie.Year}
                image={movie.Poster}
            />
        })
        }
    </div>
}

export default Movies
