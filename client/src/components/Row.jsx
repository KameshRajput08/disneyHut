import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { publicRequest } from "../axiosRequest";
import RowItem from "./RowItem";

const api_key = process.env.REACT_APP_API_KEY;

const Row = ({ title, media_type="movie", genre: genre }) => {
  const dispatch = useDispatch();
  const [movies, setmovies] = useState([]);

  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    const distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }

    if (direction === "right" && slideNumber < 8) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

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
      <div className="wrapper">
        <h2 className="RowTitle">{title}</h2>
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
          className={`sliderArrow right ${slideNumber === 8 && "notShow"}`}
          onClick={() => handleClick("right")}
        />
      </div>
    </RowContainer>
  );
};

export default Row;

const RowContainer = styled.div`
  width: 100%;
  margin: 10px 0;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    overflow: scroll;
    scrollbar-width: 0;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .wrapper {
    position: relative;
    .sliderArrow {
      width: 50px;
      height: 80%;
      overflow: scroll;
      color: white;
      position: absolute;
      z-index: 990;
      bottom: 0;
      margin: auto;
      cursor: pointer;
      opacity: 0;
      @media (max-width: 768px) {
        display: none;
      }

      &:hover {
        opacity: 1;
      }

      &.left {
        left: -50px;
      }

      &.right {
        right: 50px;
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
