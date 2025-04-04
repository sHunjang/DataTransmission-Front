import React from "react";

export const JsonPreviewTable = ({ data }) => {
    return (
        <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>수신 시각</th>
                    <th>데이터(JSON)</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{new Date(item.received_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</td>
                            <td><pre>{JSON.stringify(item.data, null, 2)}</pre></td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">데이터가 없습니다.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};