import React from "react";
import { Link } from "react-router-dom";

const HomePagePresenter = () => {
    return (
        <div style={{ padding: "2rem" }}>
            <h2>메인 화면</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                <ul>
                    <li><Link to="/file-upload"> 파일 업로드</Link></li>
                    <li><Link to="/json"> JSON 데이터 전송</Link></li>
                    {/* <li><Link to="/json-preview"> 저장된 JSON 미리보기</Link></li> */}
                    <li><Link to="/json-data"> JSON 저장 데이터 조회</Link></li>
                    {/* <li><Link to="/json-logs">JSON 전송 로그</Link></li>
                    <li><Link to="/job"> 전송 기록 보기</Link></li> */}
                </ul>
            </div>
        </div>
    );
};

export default HomePagePresenter;