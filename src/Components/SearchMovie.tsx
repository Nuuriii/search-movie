import { useState } from "react";
import "./Search.css";
import axios from "axios";

interface Movie {
   title: string;
   poster: string;
   rating: number;
   overview: string;
   director: string;
   cast: string[];
}

export const SearchMovie = () => {
   const [query, setQuery] = useState("");
   const [movies, setMovies] = useState<Movie[]>([]);

   const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${
      import.meta.env.VITE_SOME_KEY
   }&query=${query}`;

   const searchMovies = async () => {
      try {
         const response = await axios.get(API_URL);
         const data = await response.data;
         const movieResults = data.results;
         const formattedMovies = movieResults.map((movie: any) => ({
            title: movie.title,
            poster: movie.poster_path,
            rating: movie.vote_average,
            overview: movie.overview,
            director: "", //isi dengan informasi sutradara
            cast: [], //isi dengan daftar pemeran
         }));
         setMovies(formattedMovies);
      } catch (error) {
         console.error("Error:", error);
      }
   };

   return (
      <div className='main-container'>
         <h1>Movie Search App</h1>
         <div className='search-container'>
            <input
               type='text'
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder='Search movies. . .'
            />
            <button onClick={searchMovies}>Search</button>
         </div>
         <div className='result-container'>
            {movies.map((movie) => (
               <div className='movie-container' key={movie.title}>
                  <div className='movie-card'>
                     <div>
                        <img
                           src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                           alt={movie.title}
                        />
                     </div>
                     <div className='description-container'>
                        <h2>{movie.title}</h2>
                        <p>{movie.rating}/10</p>
                     </div>
                  </div>
                  {/* <p>{movie.overview}</p>
                  <p>Director: {movie.director}</p>
                  <p>Cast: {movie.cast.join(", ")}</p> */}
               </div>
            ))}
         </div>
      </div>
   );
};
