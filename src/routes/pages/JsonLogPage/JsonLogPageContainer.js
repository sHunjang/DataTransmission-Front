import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";

import JsonLogPagePresenter from "./JsonLogPagePresenter";

const JsonLogPageContainer = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/json/logs`);
                setLogs(res.data);
            } catch (err) {
                console.error("로그 불러오기 실패:", err.message);
            }
        };
        fetchLogs();
    }, []);

    return <JsonLogPagePresenter logs={logs} />;
};

export default JsonLogPageContainer;