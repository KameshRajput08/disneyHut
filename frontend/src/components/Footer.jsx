import React from "react";
import styled from "styled-components";
import { Twitter, Instagram, GitHub, LinkedIn } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container className="footer">
      <SocialContainer className="social-icon">
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <LinkedIn className="icon" />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <Twitter className="icon" />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <Instagram className="icon" />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <GitHub className="icon" />
          </a>
        </li>
      </SocialContainer>
      <NavMenu>
        <Link to="/">
          <img src="/images/home-icon.svg" alt="HOME" />
          <span>HOME</span>
        </Link>
        <Link to="/search">
          <img src="/images/search-icon.svg" alt="SEARCH" />
          <span>SEARCH</span>
        </Link>
        <Link to="/myWatchlist">
          <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
          <span>WATCHLIST</span>
        </Link>
        <Link to="/movies">
          <img src="/images/movie-icon.svg" alt="MOVIES" />
          <span>MOVIES</span>
        </Link>
        <Link to="/tv">
          <img src="/images/series-icon.svg" alt="SERIES" />
          <span>SERIES</span>
        </Link>
      </NavMenu>
      <p>&copy; 2023 Kamesh Rajput | All Rights Reserved</p>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  position: relative;
  width: 100%;
  background: rgba(4, 7, 20, 1);
  padding: 20px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 50px 0;

  p {
    letter-spacing: 1.2px;
  }
`;

const SocialContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;

  li {
    list-style: none;
  }

  .icon {
    font-size: 30px;
    transform: translateY(0);
    transition: all ease 0.2s;

    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const NavMenu = styled.nav`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  position: relative;
  transform: 2s;

  @media (max-width: 768px) {
    width: 180px;
    height: 280px;
    padding: 30px 10px;
    align-items: flex-start;
    justify-content: space-between;
    position: absolute;
    background-color: #192133;
    top: 70px;
    left: -20px;
    flex-direction: column;
    border-radius: 10px;
    display: ${(props) => (props.showMenu ? "flex" : "none")};
  }
  .show {
    display: flex;
  }

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
      transform: translateY(1.5px);

      &::before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
`;
