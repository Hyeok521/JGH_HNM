import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const PointerInfo_1 = () => {
  const mapRef = useRef(null);
  const infowindowsRef = useRef([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [forecastStart, setForecastStart] = useState(0);
  const [markerInfos, setMarkerInfos] = useState([]);
  const navigate = useNavigate();

  const slideForecast = (direction) => {
    if (direction === "left" && forecastStart > 0) {
      setForecastStart(forecastStart - 1);
    } else if (direction === "right" && forecastStart < 43) {
      setForecastStart(forecastStart + 1);
    }
  };

  const fetchWeatherInfo = async (lat, lng) => {
    const API_KEY = process.env.REACT_APP_WeatherApi;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}&lang=kr`
    );
    const data = await response.json();
    return data;
  };

  const fetchHourlyWeatherInfo = async (lat, lng) => {
    const API_KEY = process.env.REACT_APP_WeatherApi;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}&lang=kr`
    );
    const data = await response.json();
    return data;
  };

  const showInfoOnMarker = async (
    lat,
    lng,
    resultAddress,
    marker,
    map,
    index
  ) => {
    const weatherInfo = await fetchWeatherInfo(lat, lng);
    const temperature = weatherInfo.main.temp;
    const description = weatherInfo.weather[0].description;
    const humidity = weatherInfo.main.humidity;
    const content = `<div style="white-space: nowrap;">포인트 이름: ${resultAddress}<br>현재 온도: ${temperature}°C<br>현재 날씨: ${description}<br>현재 습도: ${humidity}%</div>`;
    document.querySelector(".location-info h5").innerHTML = content;

    const markerData = locations[index];
    setMarkerInfos([{ images: markerData.image, texts: markerData.text }]);

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div>${resultAddress}</div>`,
    });
    infowindowsRef.current.push(infowindow);
    infowindow.open(map, marker);
  };

  const locations = [
    {
      name: "정성바다낚시터",
      lat: 37.51516,
      lng: 126.5441,
      image: [
        {
          url: "https://ifh.cc/g/rtPw9B.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/RwTfhD.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/t10073.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/wbrcmx.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/7xNxDX.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "참돔",
            "미끼: 참갯지렁이, 오징어, 오징어내장, 낙지, 새우",
            "크기: 최대 몸길이 100cm 이상",
            "서식지: 연근해 / 수심 10~200m의 바닥 기복이 심한 암초 지역",
            "금지체장: 24cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "감성돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이, 게, 홍합, 쏙, 오징어내장, 개불",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "농어",
            "미끼: 전갱이, 청갯지렁이",
            "크기: 최대 1m",
            "서식지: 연근해 / 연안이나 만입구의 수심 50~80m 되는 약간 깊은 곳",
            "금지체장: 30cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "우럭",
            "미끼: 미꾸라지, 청갯지렁이, 오징어",
            "크기: 최대 40cm",
            "서식지: 수심 10~100m인 연안의 암초지대",
            "금지체장: 23cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "점성어",
            "미끼: 지렁이, 새우",
            "크기: 최대 1m",
            "서식지: 연안의 산호초 일대 0~100m의 수심에 서식",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "시화방조제",
      lat: 37.31141,
      lng: 126.6083,
      image: [
        {
          url: "https://ifh.cc/g/wbrcmx.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/PSkkY0.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/68Vyd8.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ZJ7NTk.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/t10073.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "우럭",
            "미끼: 미꾸라지, 청갯지렁이, 오징어",
            "크기: 최대 40cm",
            "서식지: 수심 10~100m인 연안의 암초지대",
            "금지체장: 23cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "노래미",
            "미끼: 지렁이, 오징어",
            "크기: 최대 60cm",
            "서식지: 연안의 다소 얕은 곳의 해조류나 암초가 있는 곳",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "망둥이",
            "미끼: 청갯지렁이, 오징어",
            "크기: 최대 35cm",
            "서식지: 서·남해안에 분포하고 있는 연안성 물고기",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "숭어",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 120cm",
            "서식지: 연안",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "농어",
            "미끼: 전갱이, 청갯지렁이",
            "크기: 최대 1m",
            "서식지: 연근해 / 연안이나 만입구의 수심 50~80m 되는 약간 깊은 곳",
            "금지체장: 30cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "뱃말선착장",
      lat: 37.23635,
      lng: 126.538,
      image: [
        {
          url: "https://ifh.cc/g/wbrcmx.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/PSkkY0.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/bkO9qo.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/68Vyd8.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ZJ7NTk.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/x2lNjN.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/rYYvv5.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "우럭",
            "미끼: 미꾸라지, 청갯지렁이, 오징어",
            "크기: 최대 40cm",
            "서식지: 수심 10~100m인 연안의 암초지대",
            "금지체장: 23cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "노래미",
            "미끼: 지렁이, 오징어",
            "크기: 최대 60cm",
            "서식지: 연안의 다소 얕은 곳의 해조류나 암초가 있는 곳",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "도다리",
            "미끼: 청갯지렁이, 참갯지렁이",
            "크기: 최대 30cm",
            "서식지: 우리나라 전 연안",
            "금어기: 12월~2월",
            "금지체장: 15cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "망둥이",
            "미끼: 청갯지렁이, 오징어",
            "크기: 최대 35cm",
            "서식지: 서·남해안에 분포하고 있는 연안성 물고기",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "숭어",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 120cm",
            "서식지: 연안",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "학꽁치",
            "미끼: 곤쟁이크릴",
            "크기: 최대 40cm",
            "서식지: 연근해",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "붕장어",
            "미끼: 오징어, 고등어, 전갱이, 청갯지렁이, 미꾸라지, 꽁치, 멸치",
            "크기: 최대 40cm",
            "서식지: 연근해",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "궁평리선착장",
      lat: 37.11669,
      lng: 126.6767,
      image: [
        {
          url: "https://ifh.cc/g/wbrcmx.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/PSkkY0.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/68Vyd8.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/D6fXn8.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ZJ7NTk.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/t10073.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "우럭",
            "미끼: 미꾸라지, 청갯지렁이, 오징어",
            "크기: 최대 40cm",
            "서식지: 수심 10~100m인 연안의 암초지대",
            "금지체장: 23cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "노래미",
            "미끼: 지렁이, 오징어",
            "크기: 최대 60cm",
            "서식지: 연안의 다소 얕은 곳의 해조류나 암초가 있는 곳",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "망둥이",
            "미끼: 청갯지렁이, 오징어",
            "크기: 최대 35cm",
            "서식지: 서·남해안에 분포하고 있는 연안성 물고기",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "삼치",
            "미끼: 빙어, 밴댕이, 멸치",
            "크기: 최대 100cm",
            "서식지: 연근해의 아표층",
            "금어기: 5월",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "숭어",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 120cm",
            "서식지: 연안",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },

        {
          content: [
            "농어",
            "미끼: 전갱이, 청갯지렁이",
            "크기: 최대 1m",
            "서식지: 연근해 / 연안이나 만입구의 수심 50~80m 되는 약간 깊은 곳",
            "금지체장: 30cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "매향리선착장",
      lat: 37.03816,
      lng: 126.7492,
      image: [
        {
          url: "https://ifh.cc/g/wbrcmx.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/68Vyd8.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ZJ7NTk.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "우럭",
            "미끼: 미꾸라지, 청갯지렁이, 오징어",
            "크기: 최대 40cm",
            "서식지: 수심 10~100m인 연안의 암초지대",
            "금지체장: 23cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },

        {
          content: [
            "망둥이",
            "미끼: 청갯지렁이, 오징어",
            "크기: 최대 35cm",
            "서식지: 서·남해안에 분포하고 있는 연안성 물고기",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },

        {
          content: [
            "숭어",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 120cm",
            "서식지: 연안",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "천리포방파제",
      lat: 36.80398,
      lng: 126.1475,
      image: [
        {
          url: "https://ifh.cc/g/wbrcmx.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/PSkkY0.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/bkO9qo.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/RwTfhD.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/MhH2Qd.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ngOhVs.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/x2lNjN.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/rYYvv5.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "우럭",
            "미끼: 미꾸라지, 청갯지렁이, 오징어",
            "크기: 최대 40cm",
            "서식지: 수심 10~100m인 연안의 암초지대",
            "금지체장: 23cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "노래미",
            "미끼: 지렁이, 오징어",
            "크기: 최대 60cm",
            "서식지: 연안의 다소 얕은 곳의 해조류나 암초가 있는 곳",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "도다리",
            "미끼: 청갯지렁이, 참갯지렁이",
            "크기: 최대 30cm",
            "서식지: 우리나라 전 연안",
            "금어기: 12월~2월",
            "금지체장: 15cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "감성돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이, 게, 홍합, 쏙, 오징어내장, 개불",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "광어",
            "미끼: 새우, 참갯지렁이",
            "크기: 최대 60~80cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금지체장: 35cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "고등어",
            "미끼: 크릴",
            "크기: 최대 30cm",
            "금어기: 4~6월",
            "금지체장: 21cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "학꽁치",
            "미끼: 곤쟁이크릴",
            "크기: 최대 40cm",
            "서식지: 연근해",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "붕장어",
            "미끼: 오징어, 고등어, 전갱이, 청갯지렁이, 미꾸라지, 꽁치, 멸치",
            "크기: 최대 40cm",
            "서식지: 연근해",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "마도방파제",
      lat: 36.67761,
      lng: 126.1262,
      image: [
        {
          url: "https://ifh.cc/g/ZJ7NTk.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/wbrcmx.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/PSkkY0.jpg",
          style: {},
        },

        {
          url: "https://ifh.cc/g/RwTfhD.jpg",
          style: {},
        },

        {
          url: "https://ifh.cc/g/ngOhVs.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/x2lNjN.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "숭어",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 120cm",
            "서식지: 연안",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "우럭",
            "미끼: 미꾸라지, 청갯지렁이, 오징어",
            "크기: 최대 40cm",
            "서식지: 수심 10~100m인 연안의 암초지대",
            "금지체장: 23cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "노래미",
            "미끼: 지렁이, 오징어",
            "크기: 최대 60cm",
            "서식지: 연안의 다소 얕은 곳의 해조류나 암초가 있는 곳",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },

        {
          content: [
            "감성돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이, 게, 홍합, 쏙, 오징어내장, 개불",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },

        {
          content: [
            "고등어",
            "미끼: 크릴",
            "크기: 최대 30cm",
            "금어기: 4~6월",
            "금지체장: 21cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "학꽁치",
            "미끼: 곤쟁이크릴",
            "크기: 최대 40cm",
            "서식지: 연근해",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "신진도 부억도",
      lat: 36.67181,
      lng: 126.132,
      image: [
        {
          url: "https://ifh.cc/g/t10073.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/wbrcmx.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/RwTfhD.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/x2lNjN.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "농어",
            "미끼: 전갱이, 청갯지렁이",
            "크기: 최대 1m",
            "서식지: 연근해 / 연안이나 만입구의 수심 50~80m 되는 약간 깊은 곳",
            "금지체장: 30cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "우럭",
            "미끼: 미꾸라지, 청갯지렁이, 오징어",
            "크기: 최대 40cm",
            "서식지: 수심 10~100m인 연안의 암초지대",
            "금지체장: 23cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },

        {
          content: [
            "감성돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이, 게, 홍합, 쏙, 오징어내장, 개불",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "학꽁치",
            "미끼: 곤쟁이크릴",
            "크기: 최대 40cm",
            "서식지: 연근해",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "몽산포방파제",
      lat: 36.67187,
      lng: 126.2724,
      image: [
        {
          url: "https://ifh.cc/g/wbrcmx.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ZJ7NTk.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/t10073.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/PSkkY0.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/bkO9qo.jpg",
          style: {},
        },

        {
          url: "https://ifh.cc/g/rYYvv5.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "우럭",
            "미끼: 미꾸라지, 청갯지렁이, 오징어",
            "크기: 최대 40cm",
            "서식지: 수심 10~100m인 연안의 암초지대",
            "금지체장: 23cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "숭어",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 120cm",
            "서식지: 연안",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "농어",
            "미끼: 전갱이, 청갯지렁이",
            "크기: 최대 1m",
            "서식지: 연근해 / 연안이나 만입구의 수심 50~80m 되는 약간 깊은 곳",
            "금지체장: 30cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "노래미",
            "미끼: 지렁이, 오징어",
            "크기: 최대 60cm",
            "서식지: 연안의 다소 얕은 곳의 해조류나 암초가 있는 곳",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "도다리",
            "미끼: 청갯지렁이, 참갯지렁이",
            "크기: 최대 30cm",
            "서식지: 우리나라 전 연안",
            "금어기: 12월~2월",
            "금지체장: 15cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "붕장어",
            "미끼: 오징어, 고등어, 전갱이, 청갯지렁이, 미꾸라지, 꽁치, 멸치",
            "크기: 최대 40cm",
            "서식지: 연근해",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "방포방파제",
      lat: 36.50457,
      lng: 126.3347,
      image: [
        {
          url: "https://ifh.cc/g/wbrcmx.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ZJ7NTk.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/PSkkY0.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/x2lNjN.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/DdwP5Z.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/6O9QMp.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "우럭",
            "미끼: 미꾸라지, 청갯지렁이, 오징어",
            "크기: 최대 40cm",
            "서식지: 수심 10~100m인 연안의 암초지대",
            "금지체장: 23cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "숭어",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 120cm",
            "서식지: 연안",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "노래미",
            "미끼: 지렁이, 오징어",
            "크기: 최대 60cm",
            "서식지: 연안의 다소 얕은 곳의 해조류나 암초가 있는 곳",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "학꽁치",
            "미끼: 곤쟁이크릴",
            "크기: 최대 40cm",
            "서식지: 연근해",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "갈치",
            "미끼: 꽁치",
            "크기: 최대 150cm",
            "서식지: 연안",
            "금어기: 7월",
            "금지체장: 18cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "보리멸",
            "미끼: 청갯지렁이",
            "크기: 최대 30cm",
            "서식지: 연안 가까이의 모래 바닥이나 강 하구의 간석지",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "보령방조제",
      lat: 36.4463,
      lng: 126.5269,
      image: [
        {
          url: "https://ifh.cc/g/RwTfhD.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/wbrcmx.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/ZJ7NTk.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/t10073.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/PSkkY0.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/bkO9qo.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/rYYvv5.jpg",
          style: {},
        },
        {
          url: "https://ifh.cc/g/D6fXn8.jpg",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "감성돔",
            "미끼: 크릴, 청갯지렁이, 참갯지렁이, 게, 홍합, 쏙, 오징어내장, 개불",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "우럭",
            "미끼: 미꾸라지, 청갯지렁이, 오징어",
            "크기: 최대 40cm",
            "서식지: 수심 10~100m인 연안의 암초지대",
            "금지체장: 23cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "숭어",
            "미끼: 크릴, 청갯지렁이",
            "크기: 최대 120cm",
            "서식지: 연안",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "농어",
            "미끼: 전갱이, 청갯지렁이",
            "크기: 최대 1m",
            "서식지: 연근해 / 연안이나 만입구의 수심 50~80m 되는 약간 깊은 곳",
            "금지체장: 30cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "노래미",
            "미끼: 지렁이, 오징어",
            "크기: 최대 60cm",
            "서식지: 연안의 다소 얕은 곳의 해조류나 암초가 있는 곳",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "도다리",
            "미끼: 청갯지렁이, 참갯지렁이",
            "크기: 최대 30cm",
            "서식지: 우리나라 전 연안",
            "금어기: 12월~2월",
            "금지체장: 15cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "붕장어",
            "미끼: 오징어, 고등어, 전갱이, 청갯지렁이, 미꾸라지, 꽁치, 멸치",
            "크기: 최대 40cm",
            "서식지: 연근해",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "삼치",
            "미끼: 빙어, 밴댕이, 멸치",
            "크기: 최대 100cm",
            "서식지: 연근해의 아표층",
            "금어기: 5월",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_Kakao_Map}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakao-map");
        const options = {
          center: new window.kakao.maps.LatLng(36, 128),
          level: 13,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        locations.forEach((location, index) => {
          const position = new window.kakao.maps.LatLng(
            location.lat,
            location.lng
          );
          const marker = new window.kakao.maps.Marker({
            position,
            map: map,
          });

          window.kakao.maps.event.addListener(
            marker,
            "click",
            async function () {
              infowindowsRef.current.forEach((info) => info.close());

              showInfoOnMarker(
                position.getLat(),
                position.getLng(),
                location.name,
                marker,
                map,
                index
              );

              const hourlyWeatherInfo = await fetchHourlyWeatherInfo(
                position.getLat(),
                position.getLng()
              );
              setHourlyForecast(hourlyWeatherInfo.list.slice(0, 48));
            }
          );
        });
        // 지도 형식 변경 버튼을 추가합니다.
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT
        );

        // 확대/축소 컨트롤을 추가합니다.
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      });
    };
  }, []);

  const goToPointerInfo2 = () => {
    navigate("/PointerInfo_2");
  };
  const goToPointerInfo3 = () => {
    navigate("/PointerInfo_3");
  };
  const goToPointerInfo4 = () => {
    navigate("/PointerInfo_4");
  };
  const goToPointerInfo5 = () => {
    navigate("/PointerInfo_5");
  };
  const goToPointerInfo6 = () => {
    navigate("/PointerInfo_6");
  };
  const goToPointerInfo7 = () => {
    navigate("/PointerInfo_7");
  };
  const goToPointerInfo8 = () => {
    navigate("/PointerInfo_8");
  };

  return (
    <div className="weatherinfo">
      <h4>포인트 정보(서해중부권)</h4>
      <div className="info-wrapper">
        <div className="info-container">
          <div className="local-button-container">
            <button>서해중부권</button>
            <button onClick={goToPointerInfo2}>서해남부권</button>
            <button onClick={goToPointerInfo3}>동해중부권</button>
            <button onClick={goToPointerInfo4}>동해남부권</button>
            <button onClick={goToPointerInfo5}>남해서부권</button>
            <button onClick={goToPointerInfo6}>남해중부권</button>
            <button onClick={goToPointerInfo7}>남해동부권</button>
            <button onClick={goToPointerInfo8}>제주권</button>
          </div>
          <div className="map-container">
            <div className="map" id="kakao-map"></div>
          </div>
        </div>
        <div className="info-bottom">
          <div className="location-info">
            <h5></h5>
          </div>
          <div className="hourly-forecast-slider">
            <h5>일기 예보</h5>
            <div className="slider-container">
              <button
                className="forecast-button"
                onClick={() => slideForecast("left")}
              >
                &lt;
              </button>
              <div className="hourly-forecast">
                {hourlyForecast
                  .slice(forecastStart, forecastStart + 5)
                  .map((forecast, index) => (
                    <div key={index} className="forecast-item">
                      <div>
                        {`${
                          new Date(forecast.dt * 1000).getMonth() + 1
                        }월 ${new Date(
                          forecast.dt * 1000
                        ).getDate()}일 ${new Date(
                          forecast.dt * 1000
                        ).getHours()}시`}
                      </div>
                      <div>{forecast.main.temp}°C</div>
                      <div>{forecast.weather[0].description}</div>
                      <div>{forecast.main.humidity}%</div>
                    </div>
                  ))}
              </div>
              <button
                className="forecast-button"
                onClick={() => slideForecast("right")}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        <h4 className="mainfish">주요 포획 어종</h4>
        <div className="fishinfo-1">
          {markerInfos.map((info, index) => (
            <div key={index}>
              {info.images.map((image, imageIndex) => (
                <Card
                  key={imageIndex}
                  style={{
                    backgroundColor: "lightblue",
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "70px",
                    width: "1200px",
                    height: "300px",
                  }}
                >
                  <Card.Img
                    variant="right"
                    src={image.url}
                    style={{ width: "600px" }}
                  />
                  <Card.Body>
                    {info.texts &&
                      info.texts[imageIndex] &&
                      (Array.isArray(info.texts[imageIndex].content) ? (
                        info.texts[imageIndex].content.map(
                          (text, textIndex) => (
                            <Card.Text
                              key={textIndex}
                              style={info.texts[imageIndex].style[textIndex]}
                            >
                              {text}
                            </Card.Text>
                          )
                        )
                      ) : (
                        <Card.Text style={info.texts[imageIndex].style}>
                          {info.texts[imageIndex].content}
                        </Card.Text>
                      ))}
                  </Card.Body>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointerInfo_1;
