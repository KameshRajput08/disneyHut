import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RowItem = ({ movieData, media_type = "movie" }) => {
  const navigate = useNavigate();
  const [isHovered, setisHovered] = useState(false);

  const handleClick = () => {
    navigate(`/${media_type}/${movieData.id}`);
  };
  return (
    <>
      {movieData?.poster_path && (
        <RowItemContainer
          onClick={handleClick}
          layout
          whileHover={{ scale: 1.2 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt=""
          />
          {isHovered && <></>}
        </RowItemContainer>
      )}
    </>
  );
};

export default RowItem;

const RowItemContainer = styled(motion.div)`
  width: 140px;
  height: 195px;
  margin-right: 5px;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 15px;
  background-color: #8892b0;

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }

  &:hover {
    -webkit-box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.07);
    box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.07);
    transition: transform 450ms;
    transform: scale(1.2);
    z-index: 99;

    img {
      border-radius: 8px;
    }
  }

  @media (max-width: 768px) {
    width: 110px;
    height: 155px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
