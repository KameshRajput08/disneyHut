import styled from "styled-components";
import ImgSlider from "../components/ImgSlider";
import Rows from "../components/Rows";
import Viewer from "../components/Viewer";

const Home = () => {
  return (
    <Container>
      <ImgSlider />
      <Viewer />
      <Rows />
    </Container>
  );
};

export default Home;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 70px);
  overflow: hidden;
  display: block;
  top: 70px;
  margin-bottom: 70px;

  @media (max-width: 768px) {
     padding: 0 15px;
  }
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
