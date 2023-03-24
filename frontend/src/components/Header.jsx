import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/userRedux";
import { sign_Out } from "../redux/moviesReducer";
import { Menu } from "@mui/icons-material";
import { useState } from "react";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.currentUser?.user);
  const photo = false;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Nav>
      <Logo>
        <Menu
          className="menuIcon"
          onClick={() => (showMenu ? setShowMenu(false) : setShowMenu(true))}
        />
        <img
          src="/images/logo.svg"
          alt="Disney+"
          onClick={() => navigate("/")}
        />
      </Logo>
      <>
        <NavMenu showMenu={showMenu}>
          <Link to="/" onClick={() => setShowMenu(false)}>
            <img src="/images/home-icon.svg" alt="HOME" />
            <span>HOME</span>
          </Link>
          <Link to="/search" onClick={() => setShowMenu(false)}>
            <img src="/images/search-icon.svg" alt="SEARCH" />
            <span>SEARCH</span>
          </Link>
          <Link to="/myWatchlist" onClick={() => setShowMenu(false)}>
            <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
            <span>WATCHLIST</span>
          </Link>
          <Link to="/movies" onClick={() => setShowMenu(false)}>
            <img src="/images/movie-icon.svg" alt="MOVIES" />
            <span>MOVIES</span>
          </Link>
          <Link to="/tv" onClick={() => setShowMenu(false)}>
            <img src="/images/series-icon.svg" alt="SERIES" />
            <span>SERIES</span>
          </Link>
        </NavMenu>
        {user ? (
          photo ? (
            <SignOut>
              <UserImg src="" alt="" />
              <DropDown>
                <span>Sign out</span>
              </DropDown>
            </SignOut>
          ) : (
            <SignOut>
              <Person className="profile" fontSize="large" />
              <DropDown>
                <span
                  onClick={() => {
                    dispatch(signOut());
                    dispatch(sign_Out());
                  }}
                >
                  Sign out
                </span>
              </DropDown>
            </SignOut>
          )
        ) : (
          <LoginBtn onClick={() => navigate("/login")}>Login</LoginBtn>
        )}
      </>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  letter-spacing: 16px;
  z-index: 999;

  @media (max-width: 768px) {
    padding: 0 3s0px;
  }
`;

const Logo = styled.a`
  position: relative;
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }

  .menuIcon {
    position: absolute;
    left: -34px;
    top: 15px;
    z-index: 999;
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const LoginBtn = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }

  @media (max-width: 600px) {
    margin-right: -30px;
  }
`;

const NavMenu = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  padding: 0;
  margin: 0;
  justify-content: flex-end;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
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

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;

  span {
    width: 100%;
  }
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    .profile {
      margin-left: 40px;
    }
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
