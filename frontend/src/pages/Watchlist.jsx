import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RowItem from "../components/RowItem";
import { getUserLikedMovies } from "../redux/moviesReducer";
import LoadingSpinner from "../components/Spinner";

const WatchList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.user?.currentUser?.user?.email);
  const movies = useSelector((state) => state.movies?.likedMovies);

  const [noLikedMovies, setNoLikedMovies] = useState(false); 
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (email) {
      const getLikedMovies = async () => {
        setIsLoading(true);
        const likedMovies = await dispatch(getUserLikedMovies({ email }));
        likedMovies.payload.length === 0 && setNoLikedMovies(true);
      };
      getLikedMovies();
      setIsLoading(false)
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Container>
    {isLoading && <LoadingSpinner />}
      <h1>My WatchList</h1>
      <div className="rows">
        {movies?.map((movie, index) => {
          return <RowItem movieData={movie} index={index} key={movie.id} />;
        })}
        {noLikedMovies && (
          <div className="noMovies">
            <h6>No Movies added to the watchlist</h6>
          </div>
        )}
      </div>
    </Container>
  );
};

export default WatchList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    margin-left: 50px;
    margin-top: 6.2rem;

    @media (max-width: 768px) {
      margin-left: 14px;
    }
  }
  .rows {
    margin: 20px 50px;
    gap: 0.4rem;
    display: flex;
    flex-wrap: wrap;
    position: relative;

    @media (max-width: 768px) {
      margin: 10px 8px;
    }

    .noMovies {
      width: 100vw;
      height: 50vh;
      display: flex;
      align-items: center;
      justify-content: center;

      h6 {
        font-size: 16px;
        font-weight: bold;
        color: #ccc;
      }
    }
  }
`;
