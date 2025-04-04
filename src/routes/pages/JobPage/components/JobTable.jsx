import React from "react";

export const JobTable = ({ jobs }) => {
    if (!Array.isArray(jobs) || jobs.length === 0) {
        return <p>전송 기록이 없습니다.</p>;
    }

    const headers = Object.keys(jobs[0]);

    return (
        <div style={{ marginBottom: "2rem" }}>
            <table border="1" cellPadding="10" cellSpacing="5">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job, idx) => (
                        <tr key={idx}>
                            {headers.map((key) => {
                                const value = job[key];

                                let displayValue;

                                // 날짜 처리
                                if (
                                    typeof value === "string" &&
                                    (key.includes("time") || key.includes("at"))
                                ) {
                                    const date = new Date(value);
                                    displayValue = isNaN(date)
                                        ? value
                                        : date.toLocaleString("ko-KR", {
                                            timeZone: "Asia/Seoul",
                                        });
                                }
                                // 객체 처리
                                else if (typeof value === "object" && value !== null) {
                                    displayValue = (
                                        <pre style={{ margin: 0 }}>
                                            {JSON.stringify(value, null, 2)}
                                        </pre>
                                    );
                                }
                                // 기본 값
                                else {
                                    displayValue = value?.toString() ?? "-";
                                }

                                return <td key={key}>{displayValue}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};