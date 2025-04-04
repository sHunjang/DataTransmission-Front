import React, { useEffect, useState } from "react";
import axios from "axios";
import JsonPreviewPagePresenter from "./JsonPreviewPagePresenter";

import { API_URL } from "../../../config";

const JsonPreviewPage = () => {
    const [jsonData, setJsonData] = useState([]);

    const fetchData = async () => {
        const res = await axios.get(`${API_URL}/api/json/all`);
        setJsonData(res.data);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/json/${id}`);
            fetchData();
        } catch (err) {
            console.error("삭제 실패:", err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <JsonPreviewPagePresenter jsonData={jsonData} onDelete={handleDelete} />;
};

export default JsonPreviewPage;