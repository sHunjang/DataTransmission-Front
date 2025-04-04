import React, { useState, useEffect } from "react";
import axios from "axios";

import { API_URL, RECEIVER_URL } from "../../../config";

import JsonDataPagePresenter from "./JsonDataPagePresenter";

const JsonDataPageContainer = () => {
    const [jsonData, setJsonData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (pageNumber) => {
        try {
            const res = await axios.get(`${API_URL}/api/json/all?page=${pageNumber}&limit=10`);
            setJsonData(res.data);
            setPage(res.data.page);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error("데이터 불러오기 실패:", err.message);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const handleSendAndDelete = async () => {
        try {
            const res = await axios.post(`${API_URL}/api/json/send-delete`, {
                serverUrl: `${RECEIVER_URL}/upload-json`,
            });
            alert(res.data.message); // 결과 메시지 출력
            fetchData(page); // 데이터 다시 불러오기
        } catch (err) {
            console.error("전송/삭제 실패:", err.message);
            alert("전송 또는 삭제 실패: " + err.message);
        }
    };

    return (
        <JsonDataPagePresenter
            jsonData={jsonData}


            page={page}
            setPage={setPage}

            totalPages={totalPages}

            onSendAndDelete={handleSendAndDelete}
        />
    );
};

export default JsonDataPageContainer;