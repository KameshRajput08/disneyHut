import React from "react";
import styled from "styled-components";

export default function LoadingSpinner() {
  return (
    <Container className="spinner-container">
      <div className="loading-spinner"></div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  z-index: 999;
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 45vh;
    right: 50vw;
    border: 10px solid #f3f3f3; /* Light grey */
    border-top: 10px solid #383636; /* Black */
    border-radius: 50%;
    animation: spinner 1.5s linear infinite;
    z-index: 999;

    @media (max-width: 768px) {
        right: 40vw;
        top: 40vh;
    }
  }
`;
