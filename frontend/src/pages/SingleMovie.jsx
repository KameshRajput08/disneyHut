import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../axiosRequest";
import Row from "../components/Row";
import { useDispatch, useSelector } from "react-redux";
import {
  ShareRounded,
  AddRounded,
  PlayArrowRounded,
  Done,
} from "@mui/icons-material";
import {
  addtoLikedMovies,
  getUserLikedMovies,
  removeFromLikedMovies,
} from "../redux/moviesReducer";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/Spinner";

const api_key = import.meta.env.VITE_API_KEY;

const SingleMovie = () => {
  const navigate = useNavigate();
  const email = useSelector((state) => state.user?.currentUser?.user?.email);
  const likedMovies = useSelector((state) => state.movies?.likedMovies);
  const dispatch = useDispatch();
  const location = useLocation();
  const mediaId = location?.pathname.split("/")[2];

  const [isLoading, setIsLoading] = useState(false);

  const [movieData, setMovieData] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [type, settype] = useState("");

  useEffect(() => {
    if (movieData) {
      likedMovies.forEach((movieElement) => {
        movieElement.id === movieData?.id && setIsLiked(true);
      });
    }
  }, [movieData, location, likedMovies]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await publicRequest.get(
          `/movie/${mediaId}?api_key=${api_key}`
        );
        setMovieData(res.data);
      } catch (err) {
        const tvData = await publicRequest.get(
          `/tv/${mediaId}?api_key=${api_key}`
        );
        setMovieData(tvData.data);
      }
    };
    fetchMedia();
    movieData?.seasons ? settype("movie") : settype("tv");
    window.scrollTo(0, 0);
    return () => {};
  }, [location]);

  const runTime = () => {
    let time = movieData?.runtime;
    if (time / 60 !== 0) {
      const hour = time / 60;
      const hr = hour.toString()[0];
      const min = time % 60;
      return `${hr}hr ${min}min`;
    } else {
      return `${time / 60}hr`;
    }
  };

  return (
    <Container>
      {isLoading && <LoadingSpinner />}
      <Media>
        <div className="infoContainer">
          <div className="info">
            {type === "tv" ? (
              <h2>{movieData?.name || movieData?.title}</h2>
            ) : (
              <h2>{movieData?.title}</h2>
            )}
            <ul>
              {!movieData?.seasons && <li>{runTime()}</li>}
              {movieData?.genres.map((genre) => {
                return <li key={genre.id}>{genre.name}</li>;
              })}
              <li>{movieData?.vote_average}</li>
            </ul>
            <p>{movieData?.overview}</p>
            <div className="icons">
              <div className="iconCont play" onClick={() => navigate("/watch")}>
                <PlayArrowRounded className="icon" />
                <span>Watch Trailer</span>
              </div>
              <div className="icon2">
                <div className="iconCont2 list">
                  {isLiked ? (
                    <Done
                      className="icon"
                      title="Remove from liked movies."
                      onClick={async () => {
                        setIsLoading(true);
                        const res = await dispatch(
                          removeFromLikedMovies({
                            movieId: movieData.id,
                            email,
                          })
                        );
                        dispatch(getUserLikedMovies({ email }));
                        toast.success(
                          "Movie successfully removed from the Watchlist."
                        );
                        setIsLiked(false);
                        setIsLoading(false);
                      }}
                    />
                  ) : (
                    <AddRounded
                      className="icon"
                      onClick={async () => {
                        setIsLoading(true);
                        const res = await dispatch(
                          addtoLikedMovies({ data: movieData, email })
                        );
                        if (res.type === "disney/user/remove/movie/rejected") {
                          toast.error("Movie is alredy in the Watchlist.");
                        } else {
                          dispatch(getUserLikedMovies({ email }));
                          toast.success(
                            "Movie successfully added to the Watchlist."
                          );
                        }
                        setIsLiked(true);
                        setIsLoading(false);
                      }}
                    />
                  )}
                  <span>Watchlist</span>
                </div>
                <div className="iconCont2 share">
                  <ShareRounded className="icon" />
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src={
            movieData?.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${movieData?.backdrop_path}`
              : `https://image.tmdb.org/t/p/w500${movieData?.poster_path}`
          }
          alt=""
        />
      </Media>
      <Rows>
        <Row title="Latest and Trending" media_type="all" />
        <Row title="Popular Movies" media_type="movie" />
        <Row title="Popular Shows" media_type="tv" />
        <Row title="Action" genre="28" />
        <Row title="Thriller" genre="53" />
        <Row title="Drama" genre="18" />
      </Rows>
    </Container>
  );
};

export default SingleMovie;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 85px;
  padding: 0 1vw;

  @media (max-width: 600px) {
    width: 100vw;
  }
`;

const Media = styled.main`
  width: 100%;
  height: 70vh;
  padding: 0px 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    padding: 0px;
    height: 50vh;
  }

  img {
    flex: 2;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .infoContainer {
    flex: 1;
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #0c111b;
    z-index: 7;

    .info {
      position: absolute;
      top: 30px;
      left: 50px;
      width: 500px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-wrap: wrap;

      @media (max-width: 600px) {
        top: 15px;
        left: 15px;
        width: 350px;
      }

      .icon2 {
        display: flex;
        align-items: center;

        .iconCont2 {
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-right: 20px;

          .icon {
            margin-bottom: 10px;
            cursor: pointer;
          }
        }

        span {
          font-size: 1rem;
        }
      }

      span {
        font-weight: 600;
        font-size: 1.1rem;
        padding-bottom: 20px;
      }

      h2 {
        font-weight: 800;
        font-size: 2rem;
        margin: 0;
        margin-bottom: 10px;

        @media (max-width: 600px) {
          font-size: 1.4rem;
          display: inline-block;
        }
      }

      ul {
        display: flex;
        align-items: center;
        margin-left: -25px;

        li {
          margin-right: 20px;

          @media (max-width: 600px) {
            margin-right: 18px;
          }
        }
      }

      .icons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 50px;
        margin-right: 10px;

        @media (max-width: 600px) {
          margin-top: 20px;
        }

        .iconCont {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          .icon {
            font-size: 2.5rem;
            margin-bottom: 20px;
          }
        }

        list {
          margin-left: 100px;
        }
      }

      p {
        font-weight: 300;
        font-size: 1.1rem;

        @media (max-width: 600px) {
          font-size: 0.9rem;
          margin-right: 20px;
        }
      }

      &::after {
        content: "";
        width: 70px;

        height: 500px;
        position: absolute;
        top: -5vh;
        left: 38%;
        box-shadow: 50px 0px 30px 0px #0c111b;
        z-index: -9;

        @media (max-width: 1200px) {
          display: none;
        }
      }
    }
  }
`;

const Rows = styled.div`
  width: 100%;
  margin: 0 50px;

  @media (max-width: 600px) {
    margin: 0 10px;
  }
`;
