import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Login = ({ setAuthenticate }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect가 실행 중입니다.");

    // Kakao SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("ccee64d52026e46448ac815273a89fda");
    }

    // 세션 스토리지에서 토큰을 가져옵니다.
    const token = sessionStorage.getItem("token");
    console.log("세션 스토리지에서 토큰을 가져옵니다:", token);

    if (token) {
      // 백엔드에 토큰 유효성 검사를 요청합니다.
      axios
        .post("http://13.48.105.95:8080/member/login", { token: token }) // 백엔드 API 주소를 적절하게 수정해야 합니다.
        .then((response) => {
          if (response.data.valid) {
            setAuthenticate(true);
          }
        })
        .catch((error) => {
          console.error("토큰 유효성 검사 실패:", error);
        });
    }
  }, [setAuthenticate]);

  const kakaoLogin = (event) => {
    event.preventDefault();
    // 카카오 로그아웃 수행
    window.Kakao.Auth.logout(() => {
      console.log("카카오 로그아웃 완료");

      // 로그아웃 시 로컬 스토리지 또는 세션 스토리지에서 사용자 정보 삭제
      localStorage.removeItem("userInfo"); // 예시: 로컬 스토리지에서 삭제
      sessionStorage.removeItem("userInfo"); // 예시: 세션 스토리지에서 삭제

      // 카카오 로그인 요청
      window.Kakao.Auth.login({
        scope: "profile_nickname,account_email,birthday,talk_message",
        success: (response) => {
          console.log("카카오 로그인 성공", response);
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: (res) => {
              const kakao_account = res.kakao_account;
              console.log(kakao_account);
              // 카카오 로그인 성공 시, 로그인 상태를 true로 설정
              setAuthenticate(true);
              navigate("/");
            },
          });
        },
        fail: (error) => {
          console.log("카카오 로그인 실패", error);
        },
      });
    });
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://13.48.105.95:8080/member/login",
        {
          userId: id,
          userPw: password,
        }
      );

      console.log("Response from login:", response.data);

      if (response.status === 200 && response.data !== "로그인 실패") {
        const token = response.data;
        console.log("토큰을 세션 스토리지에 저장합니다:", token);
        sessionStorage.setItem("token", token);
        setAuthenticate(true);
        navigate("/");
      } else {
        alert("로그인 실패. 다시 로그인 해주세요.");
        navigate("/login");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("아이디와 비밀번호를 확인해주세요");
    }
  };

  const goToSignUp = (event) => {
    event.preventDefault();
    navigate("/SighUp");
  };

  const goToIdSearch = (event) => {
    event.preventDefault();
    navigate("/IdSearch");
  };

  const goToPasswordSearch = (event) => {
    event.preventDefault();
    navigate("/PasswordSearch");
  };

  return (
    <Container className="login-area">
      <Form onSubmit={login} className="login-form">
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="id"
            placeholder="id"
            name="userId"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="userPw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <ButtonGroup className="Button">
          <Button type="submit" aria-label="First_Group" variant="primary">
            로그인
          </Button>
          <ButtonGroup aria-label="Second group" className="Id_pass">
            <Button variant="primary" onClick={goToIdSearch}>
              아이디 찾기
            </Button>
            <Button
              className="Pass"
              variant="primary"
              onClick={goToPasswordSearch}
            >
              비밀번호 찾기
            </Button>
          </ButtonGroup>
          <Button
            aria-label="Third group"
            className="SignUp"
            variant="primary"
            onClick={goToSignUp}
          >
            회원가입
          </Button>
        </ButtonGroup>
        <img
          onClick={kakaoLogin}
          src="kakao.png"
          alt="Kakao Login"
          style={{
            cursor: "pointer",
            width: "160px",
            height: "60px",
            marginLeft: "210px",
            marginTop: "10px",
          }}
        />
      </Form>
    </Container>
  );
};

export default Login;
