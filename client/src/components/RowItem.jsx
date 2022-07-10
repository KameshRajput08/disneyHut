import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RowItem = ({ movieData, media_type="movie" }) => {  
  const navigate = useNavigate();
  const [isHovered, setisHovered] = useState(false);

  const handleClick = () => {
    navigate(`/${media_type}/${movieData.id}`);
  };
  return (
    <>
      <RowItemContainer onClick={handleClick}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt=""
        />
        {isHovered && <></>}
      </RowItemContainer>
    </>
  );
};

export default RowItem;

const RowItemContainer = styled.div`
  width: 140px;
  height: 195px;
  margin-right: 5px;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 15px;

  @media (max-width: 768px){
     width: 100px;
     height: 140px;
  }

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

    img{
      border-radius: 8px;
    }
}
`;
