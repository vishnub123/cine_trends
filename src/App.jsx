import {use, useEffect,useState} from 'react'
import {useDebounce} from 'react-use'
import Search from "./components/Search.jsx"
import Spinner from './components/spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method : 'GET',
  headers: {
    accept:'application/json',
    Authorization: `Bearer ${API_KEY}` // fixed template literal
  }
}

const  App = ()=> {
  const [searchTerm,setSearchTerm] = useState('');
  const [errorMessage,setErrorMessage] = useState('')
  const [movieList,setMovieList] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [trendingMovies,setTrendingMovies] = useState([])
  const[debouncedSearchTerm,setDebouncedSearchTerm] = useState('')

  useDebounce( () => {setDebouncedSearchTerm(searchTerm)}, 500, [searchTerm])
  // fixed the useDebounce function

  const fetchMovies = async(query = '') =>{
    setIsLoading(true); // fixed typo
    setErrorMessage('');
    try{
      const endpoint = query?
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint,API_OPTIONS)
      if(!response.ok){
        throw new Error('Failed to fetch movies')
      }
      const data = await response.json();
      if(data.response==='False'){
        setErrorMessage(data.Error || 'Failed to fetch the movies')
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      if(query && data.results.length>0){
        const movie = data.results[0];
        await updateSearchCount(query,movie);
      }
    }
    catch(error){
      console.error(error)
      setErrorMessage('Error fetching movies.Please try again later!');
    }finally{
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async() => {
    try{
      const movies = await getTrendingMovies();
      console.log('trending :',movies)

      setTrendingMovies(movies || []);


    }catch(error){
      console.error(error)
    }

  }

  useEffect(()=>{
    fetchMovies(debouncedSearchTerm); // call fetchMovies on mount
  },[debouncedSearchTerm])

  useEffect(()=>{
    loadTrendingMovies();
  },[])

  return (
    <main>
      <div className="pattern">
        <div className="wrapper"> 
          <header>
            <img src="./hero.png"/>
            <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without The Hassle </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          </header>

          {trendingMovies.length>0 && (
            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                 {trendingMovies.map((movie,index) => (
                   <li key={movie.$id}>
                    <p>{index+1}</p>
                    <img src={movie.poster_url} alt={movie.title}></img>
                   </li>
                   
                  ))}
              </ul>
            </section>
          )}

          <section className="all-movies">
            <h2 className="mt-[40px]">All Movies</h2>
            {isLoading?(
              <Spinner />
            ):errorMessage?(
              <p className="text-red-500">{errorMessage}</p>
            ):(
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie}/>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>  
  )
}

export default App