import Movie from "../components/Movie";
import { useState, useEffect } from "react";

function Home(){

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async () => {
      const response = await (await fetch(`https://yts.mx/api/v2/list_movies.json`)).json();
      setLoading(false);
      console.log(response.data.movies)
      setMovies(response.data.movies);
    }
    useEffect(() => {
      getMovies();
    }, [])
    
    return (
        <div >
        <h1>The Coins {movies.length}</h1>
        <br />
        {loading ? 'Loading' :
          (
            <div>
              {movies.map((movie) =>
                <Movie
                  key={movie.id}
                  id={movie.id}
                  posterPath={movie.medium_cover_image} 
                  title={movie.title} 
                  genres={movie.genres} />
              )}
            </div>
          )}
  
      </div>
    );
}
export default Home;