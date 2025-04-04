import React from "react";
import { JobTable } from "./components/JobTable";
import { SelectedTableViewer } from "./components/SelectedTableViewer";

const JobPagePresenter = ({ jobs, selectedTable, setSelectedTable, tableData, tableNames }) => {
    return (
        <div style={{ padding: "2rem" }}>
            <h2>전송 기록 목록</h2>
            <JobTable jobs={jobs} />

            <div style={{ marginTop: "2rem" }}>
                <h2>테이블 선택 조회</h2>
                <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
                    {tableNames.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>

                <SelectedTableViewer tableData={tableData} />
            </div>
        </div>
    );
};

export default JobPagePresenter;