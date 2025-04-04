import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../../../config";

import JobPagePresenter from "./JobPagePresenter";

const JobPageContainer = () => {
    const [jobs, setJobs] = useState([]);
    const [tableNames, setTableNames] = useState([]);
    const [selectedTable, setSelectedTable] = useState("transmission_jobs");
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/threads/jobs`);
                setJobs(response.data);
            } catch (err) {
                console.error("전송 기록 조회 실패:", err);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        const fetchTables = async () => {
            const res = await axios.get(`${API_URL}/api/tables/names`);
            setTableNames(res.data);
        };

        fetchTables();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${API_URL}/api/tables/${selectedTable}`);
            console.log("👀 JSON 응답 확인", res.data);
            setTableData(res.data);
        };
        if (selectedTable) fetchData();
    }, [selectedTable]);

    return (
        <JobPagePresenter
            jobs={jobs}
            tableNames={tableNames}
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
            tableData={tableData}
        />
    );
};

export default JobPageContainer;