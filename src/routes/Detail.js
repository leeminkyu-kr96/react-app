import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams(); // URL에서 movie ID를 가져옵니다.
  const [movie, setMovie] = useState(null); // movie 상태의 초기값을 null로 설정합니다.
  const [loading, setLoading] = useState(true); // 로딩 상태를 추가합니다.

  useEffect(() => {
    // 1. useEffect 콜백 함수 자체를 async로 만들지 않습니다.
    // 대신, 내부에 async 함수를 정의하고 호출합니다.
    const getMovie = async () => {
      try {
        const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
        // 응답이 성공적인지 확인 (HTTP 상태 코드 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();

        setMovie(json.data.movie); // API 응답에서 실제 영화 데이터를 설정합니다.
        setLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 변경합니다.
      } catch (error) {
        console.error("영화 상세 정보를 가져오는 데 실패했습니다:", error);
        setLoading(false); // 에러 발생 시에도 로딩 상태를 해제합니다.
      }
    };

    getMovie();

  }, [id]); 

  if (loading) {
    return <div>Loading detail...</div>; // 로딩 중일 때 표시할 메시지
  }

  // movie가 null이 아니고, 유효한 객체임을 확신할 수 있을 때만 다음을 렌더링합니다.
  // movie.genres가 있을 때만 map을 호출하도록 조건부 렌더링을 사용합니다.
  return (
    <div>
      <h1>Detail Page</h1>
      {/* 데이터가 로드된 후 movie 객체가 존재하므로 안전하게 접근 가능 */}
      <h2>{movie.title_long}</h2> {/* 보통 API는 title_long을 제공합니다. */}
      <img src={movie.medium_cover_image} alt={movie.title_long} />
      <p>{movie.description_full}</p>
      <ul>
        {/* movie.genres가 유효한 배열일 때만 map을 실행합니다. */}
        {movie.genres && movie.genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

export default Detail;