import styled from "styled-components";
import Row from "./Row";

const Rows = () => {
  return (
    <Container>
      <Row title="Latest and Trending" media_type="all" />
      <Row title="Popular Movies" media_type="movie" />
      <Row title="Popular Shows" media_type="tv" />
      <Row title="Action" genre="28" />
      <Row title="Thriller" genre="53" />
      <Row title="Drama" genre="18"/>
    </Container>
  );
};

export default Rows;

const Container = styled.div`
  width: 100vw;
  margin-bottom: 50px;
`;
