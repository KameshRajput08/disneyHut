import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { loginUser, registerUser } from "../redux/userRedux";
import LoadingSpinner from "../components/Spinner";

const Login = () => {
  const dispatch = useDispatch();
  const [showRegister, setShowRegister] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [userLoginDetails, setUserLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [userRegisterDetails, setUserRegisterDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    if (showRegister) {
      setUserRegisterDetails({
        ...userRegisterDetails,
        [e.target.name]: e.target.value,
      });
    } else {
      setUserLoginDetails({
        ...userLoginDetails,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showRegister) {
      setIsLoading(true);
      const data = await dispatch(
        registerUser({ userDetails: userRegisterDetails })
      );
      if (data.type === "user/login/fulfilled") {
        toast.success("You have successfully Registered.");
        setIsLoading(false);
      } else if (data.type === "user/register/rejected") {
        toast.error(
          "Please try again with another username and email."
        );
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    } else {
      setIsLoading(true);
      const data = await dispatch(loginUser({ userDetails: userLoginDetails }));
      if (data.type === "user/login/fulfilled") {
        setIsLoading(false);
        toast.success("You have successfully logged in.");
      } else if (data.type === "user/login/rejected") {
        toast.error(
          "User not found. Please add correct email and password or try again later."
        );
        setIsLoading(false);
      }
    }
  };
  return (
    <Container>
      {isLoading && <LoadingSpinner />}
      <Content>
        <CTA>
          <CTALogoOne src="/images/cta-logo-one.svg" />
          <SignUp>GET ALL THERE</SignUp>
          <Description>
            Get Premier Access to Raya and the Last Dragon for an additional fee
            with a Disney+ subscription. As of 03/26/21, the price of Disney+
            and The Disney Bundle will increase by $1.
          </Description>
          <CTALogoTwo src={"/images/cta-logo-two.png"} />
        </CTA>
        <LoginContainer>
          <div className="wrappper"></div>
          <div className={`login ${showRegister && "hide"}`}>
            <img src="/images/logo.svg" alt="Disney+" />
            <h5>Login to continue</h5>
            <form>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={userLoginDetails.email}
                onChange={onChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userLoginDetails.password}
                onChange={onChange}
              />
              <button onClick={handleSubmit}>Login</button>
            </form>
            <p>
              Don't have an account.{" "}
              <span onClick={() => setShowRegister(true)}>Register</span>
            </p>
          </div>
          <div className={`login register ${!showRegister && "hide"}`}>
            <img src="/images/logo.svg" alt="Disney+" />
            <h5>Create your Account</h5>
            <form>
              <input
                type="name"
                name="userName"
                placeholder="Name"
                value={userRegisterDetails.userName}
                onChange={onChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={userRegisterDetails.email}
                onChange={onChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userRegisterDetails.password}
                onChange={onChange}
              />
              <button onClick={handleSubmit}>Register</button>
            </form>
            <p>
              Already have an account.{" "}
              <span onClick={() => setShowRegister(false)}>Login</span>
            </p>
          </div>
        </LoginContainer>
        <BgImage />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const LoginContainer = styled.div`
  width: 400px;
  height: 72vh;
  background-color: #192133;

  .register {
    display: none;
  }

  .login {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 50px;

    img {
      width: 80px;
      align-self: center;
    }

    h5 {
      font-size: 1.2rem;
    }

    input {
      width: 100%;
      font-size: 15px;
      padding: 10px;
      color: #fff;
      background-color: transparent;
      outline: none;
      border: none;
      border-bottom: 1px solid #1f80e0;
      margin-bottom: 20px;

      &:focus {
        background-color: transparent;
        border-bottom: 2px solid #1f80e0;
      }
    }

    p {
      align-self: center;
      margin-top: 30px;
      letter-spacing: 1.5px;

      span {
        cursor: pointer;
        color: #ccc;
        border-bottom: 1px solid #ccc;
      }
    }

    button {
      width: 100%;
      color: #fff;
      font-size: 1.1rem;
      font-weight: 600;
      margin-top: 20px;
      padding: 13px;
      background-color: #1f80e0;
      border-radius: 3px;
      border: none;
      cursor: pointer;
    }
  }

  .hide {
    display: none;
  }
`;

const BgImage = styled.div`
  height: 100%;
  background-position: top;
  background-image: url("/images/login-background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  right: 0;
  left: 0%;
  z-index: -1;
`;

const CTA = styled.div`
  max-width: 650px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0%;
  display: none;
`;

const CTALogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;

const SignUp = styled.a`
  width: 100%;
  background-color: #0063e5;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1.5px;
  font-size: 18px;
  margin-bottom: 12px;
  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;

  &:hover {
    background-color: #0483ee;
  }
`;

const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 11px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
`;

const CTALogoTwo = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: inline-block;
  width: 100%;
`;

export default Login;
