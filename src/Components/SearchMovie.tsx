import { useState } from "react";

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
         const response = await fetch(API_URL);
         const data = await response.json();
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
      <div>
         <h1>Movie Search App</h1>
         <div>
            <input
               type='text'
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder='Search movies. . .'
            />
            <button onClick={searchMovies}>Search</button>
         </div>
         <div>
            {movies.map((movie) => (
               <div key={movie.title}>
                  <img
                     src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                     alt={movie.title}
                  />
                  <h2>{movie.title}</h2>
                  <p>Rating: {movie.rating}</p>
                  <p>{movie.overview}</p>
                  <p>Director: {movie.director}</p>
                  <p>Cast: {movie.cast.join(", ")}</p>
               </div>
            ))}
         </div>
      </div>
   );
};
