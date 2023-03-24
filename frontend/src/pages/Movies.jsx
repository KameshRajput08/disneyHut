import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import RowItem from "../components/RowItem";
import { getGenres } from "../redux/moviesReducer";
import { fetchDataByGenre } from "../redux/moviesReducer";
import LoadingSpinner from "../components/Spinner";

const Movies = () => {
  const location = useLocation();
  let type = location?.pathname.split("/")[1];

  const movies = useSelector((state) => state.movies?.movies);
  const Loading = useSelector((state) => state.movies?.isLoading);

  if (type === "movies") {
    type = "movie";
  } else type = "tv";

  const dispatch = useDispatch();

  const [genres, setgenres] = useState([]);
  const [genre, setGenre] = useState("Thriller");

  useEffect(() => {
    dispatch(fetchDataByGenre({ genre: genre, type }));
  }, [location, genre, type]);

  useEffect(() => {
    const getGenre = async () => {
      const genres = await dispatch(getGenres());
      setgenres(genres.payload);
    };
    getGenre();
  }, []);

  return (
    <Container>
      {Loading && <LoadingSpinner />}
      <div className="category">
        <Select onChange={(e) => setGenre(e.target.value)}>
          {genres.map((genre, index) => {
            return (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </Select>
      </div>
      <div className="rows">
        {movies?.map((movie) => {
          return <RowItem movieData={movie} media_type={type} key={movie.id} />;
        })}
      </div>
    </Container>
  );
};

export default Movies;

const Select = styled.select`
  cursor: pointer;
  background-color: #000;
  border: 1px solid white;
  color: white;
  margin-left: 20px;
  padding: 5px;

  @media (max-width: 768px) {
    margin-left: -10px;
  }
`;

const Container = styled.div`
  width: 100%;
  overflow: hidden;

  .category {
    position: absolute;
    top: 90px;
    left: 30px;
    font-size: 30px;
    font-weight: 500;
    color: white;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .rows {
    margin-top: 160px;
    width: 100%;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      padding: 0 8px;
      margin-top: 150px;
    }
  }
`;



