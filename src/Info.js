import React from "react"
import { useNavigate, useParams } from "react-router-dom";
import ApexCharts from "./ChartViewer";
// import axios from "axios";

//상세 페이지 컴포넌트
const Info=()=>{
    //백엔드와 통신 테스트 코드
    // axios.get("http://localhost:8000")
    //     .then((res)=>console.log(res.data))
    //     .catch((err)=>console.log(err))

    //뒤로가기 기능
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
                    <ApexCharts />
                </div>
            </div>
        </div>
    )
}

export default Info