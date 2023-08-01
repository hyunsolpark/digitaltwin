import React from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ApexCharts from "./ChartViewer";

//상세 페이지 컴포넌트
const Info=()=>{
    //실시간 차트 체크 위해 더미데이터 만든 코드
    const [data, updateData] = useState([1, 2, 3, 4, 5, 6]);

    useEffect(() => {
    const interval = setInterval(() => {
      const val = Math.floor(Math.random() * (100 - 30 + 1)) + 30;
      let array = [...data, val];
      array.shift();
      updateData(array);
    }, 100);
    return () => {
      window.clearInterval(interval);
        };
    }, [data]);

    //뒤로가기 코드
    const navigate=useNavigate();

    const {id}=useParams();

    const goBack=()=>{
        navigate(-1);
    }

    //info 상세 화면 html코드와 chart에 데이터를 전달해주는 코드
    return(
        <div>
            <header>
                <div className="info_button"><button className="mybutton" onClick={goBack}>뒤로가기</button></div>
                <div className="info_title">
                    {
                        id<3?<h2>motor{id} 상세 페이지</h2>:<h2>벨트 상세 페이지</h2>
                    }
                </div>
            </header>
            <div className="info_wrapper">
                <h4>상세 정보</h4>
                <ul className="info_detail">
                    <li>속도: 100</li>
                    <li>베어링 결함: x</li>
                    <li>축 불균형: x</li>
                </ul>
                <div className="info_chart">
                    <h4>진동데이터 차트</h4>
                    <ApexCharts data={data} />
                </div>
            </div>
        </div>
    )
}

export default Info