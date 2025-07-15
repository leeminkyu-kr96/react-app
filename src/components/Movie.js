import { Link } from "react-router-dom";

function Movie({posterPath, title, genres, id}){

    return (
        <>
        <div>
            <img src={posterPath}></img>
            <h2 >
              <Link to={`/movie/${id}`}>{title}</Link>
            </h2>
            <ul>
              {genres.map(g => (<li key={g}>{g}</li>))}
            </ul>
          </div>
        </>
    );
}
export default Movie;