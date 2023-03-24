import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../axiosRequest";
import RowItem from "./RowItem";

const api_key = import.meta.env.VITE_API_KEY;

const Row = ({ title, media_type = "movie", genre: genre }) => {
  const [movies, setmovies] = useState([]);

  const [slideNumber, setSlideNumber] = useState(0);
  const listRef = useRef();

  const handleClick = (direction) => {
    const distance = 144.5 + 5;

    function goToPage(slideNumber) {
      let position = -1 * slideNumber * distance;
      listRef.current.style.transform = "translateX(" + position + "px)";
    }

    if (direction === "left" && slideNumber > 0) {
      goToPage(slideNumber - 1);
      setSlideNumber(slideNumber - 1);
    }

    if (direction === "right" && slideNumber < 12) {
      goToPage(slideNumber + 1);
      setSlideNumber(slideNumber + 1);
    } else if (slideNumber === 12) {
      goToPage(0);
      setSlideNumber(0);
    }
  };

  useEffect(() => {}, [slideNumber]);

  useEffect(() => {
    const fetchData = async () => {
      if (
        title === "Latest and Trending" ||
        title === "Popular Movies" ||
        title === "Popular Shows"
      ) {
        const data = await publicRequest.get(
          `/trending/${media_type}/week?api_key=${api_key}`
        );
        if (media_type == "all") {
          data.data.results.media_type = media_type;
        }
        setmovies(data.data.results);
      } else {
        const data = await publicRequest.get(
          `/discover/movie?api_key=${api_key}&with_genres=${genre}`
        );
        const reqData = data.data.results;
        reqData.media_type = "movie";
        setmovies(reqData);
      }
    };
    fetchData();

    return () => {};
  }, []);

  return (
    <RowContainer>
      <div className="carousel">
        <span className="RowTitle">{title}</span>
        <div className="wrapper">
          <ArrowBackIosOutlined
            className={`sliderArrow left ${slideNumber === 0 && "notShow"}`}
            onClick={() => handleClick("left")}
          />
          <div className="Row" ref={listRef}>
            {movies.map((movie, index) => {
              return (
                <RowItem
                  movieData={movie}
                  media_type={media_type}
                  index={index}
                  key={movie.id}
                />
              );
            })}
          </div>
          <ArrowForwardIosOutlined
            className={`sliderArrow right`}
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
    </RowContainer>
  );
};

export default Row;

const RowContainer = styled.div`
  width: 100%;
  margin: 10px 0;
  margin: 20px 0px;

  span {
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 1.5;
    padding-left: 50px;

    @media (max-width: 768px) {
      padding-left: 5px;
    }
  }

  .wrapper {
    position: relative;
    padding: 0 40px;
    overflow: hidden;

    @media (max-width: 768px) {
      overflow: scroll;
      scrollbar-width: 0;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    @media (max-width: 768px) {
      padding: 0 0px;
    }

    .notShow {
      display: none;
    }
    .sliderArrow {
      width: 40px;
      height: 85%;
      overflow: scroll;
      color: white;
      position: absolute;
      z-index: 990;
      bottom: 15px;
      margin: auto;
      cursor: pointer;
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.5);
      @media (max-width: 768px) {
        display: none;
      }

      &:hover {
        opacity: 1;
      }

      &.left {
        left: 0px;
      }

      &.right {
        right: 0px;
      }
    }

    .Row {
      display: flex;
      margin-top: 20px;
      width: max-content;
      transform: translateX(0px);
      transition: all 1s ease;
    }
  }
`;
