import React from "react";

const JsonLogPagePresenter = ({ logs }) => {
    return (
        <div style={{ padding: "2rem" }}>
            <h2>JSON 전송 로그</h2>
            {logs.length === 0 ? (
                <p>로그가 없습니다.</p>
            ) : (
                <table border="1" cellPadding="8" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>전송 시각</th>
                            <th>전송 데이터</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id}>
                                <td>{log.id}</td>
                                <td>{new Date(log.sent_at).toLocaleString("ko-KR")}</td>
                                <td>
                                    <pre style={{ whiteSpace: "pre-wrap" }}>
                                        {JSON.stringify(log.data, null, 2)}
                                    </pre>
                                </td>
                                <td>{log.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default JsonLogPagePresenter;