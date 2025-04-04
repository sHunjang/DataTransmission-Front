import React from "react";

// 날짜 포맷 유틸 함수
export const formatIfDate = (value) => {
    if (typeof value === "string" && value.includes("T") && value.includes("Z")) {
        try {
            return new Date(value).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
        } catch {
            return value;
        }
    }
    return value;
};

export const SelectedTableViewer = ({ tableData }) => {
    if (!tableData || tableData.length === 0) {
        return <p>데이터가 없습니다.</p>;
    }

    const columnNames = Object.keys(tableData[0]);

    return (
        <div style={{ marginTop: "2rem" }}>
            <h3>선택된 테이블 데이터</h3>
            <table border="2" cellPadding="10" cellSpacing="5">
                <thead>
                    <tr>
                        {columnNames.map((col) => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, idx) => (
                        <tr key={idx}>
                            {columnNames.map((col) => {
                                const value = row[col];

                                let displayValue = value;

                                if (value === null || value === undefined) {
                                    displayValue = "-";
                                } else if (typeof value === "object") {
                                    displayValue = (
                                        <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                                            {JSON.stringify(value, null, 2)}
                                        </pre>
                                    );
                                } else {
                                    displayValue = formatIfDate(value);
                                }

                                return <td key={col}>{displayValue}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};