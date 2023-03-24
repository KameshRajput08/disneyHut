import { ArrowBackOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Watch = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <div className="back">
        <ArrowBackOutlined onclick={() => navigate(-1)}/>
        Home
      </div>
      <video 
        autoPlay
        controls
        src="/videos/marvel.mp4"
      />
    </Container>
  );
};

export default Watch;

const Container = styled.div`
  width: 100%;
  height: 100vh;

  .back {
    display: flex;
    align-items: center;
    position: absolute;
    top: 80px;
    left: 10px;
    color: white;
    cursor: pointer;
    z-index: 2;
  }

  video {
    width: 100%;
    height: 99%;
    object-fit: cover;
  }
`;
