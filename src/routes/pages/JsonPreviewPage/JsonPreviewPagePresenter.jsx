import React from "react";

const JsonPreviewPagePresenter = ({
    jsonData = [],
    onDelete,
    onSave,
    onCancel,
    isPreviewOnly = false,
}) => {
    return (
        <div style={{ padding: "2rem" }}>
            <h2>{isPreviewOnly ? "전송 JSON 미리보기" : "전송 예정 JSON 데이터"}</h2>

            {jsonData.length === 0 ? (
                <p>데이터가 없습니다.</p>
            ) : (
                <table border="1" cellPadding="8" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>데이터</th>
                            <th>수신 시각</th>
                            <th>작업</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData.map((item) => (
                            <tr key={item.id || item.tempId}>
                                <td>{item.id || "-"}</td>
                                <td>
                                    <pre style={{ whiteSpace: "pre-wrap" }}>
                                        {JSON.stringify(item.data, null, 2)}
                                    </pre>
                                </td>
                                <td>
                                    {item.received_at
                                        ? new Date(item.received_at).toLocaleString("ko-KR")
                                        : "-"}
                                </td>
                                <td>
                                    {isPreviewOnly ? (
                                        <>
                                            <button onClick={onSave}>저장</button>
                                            <button onClick={onCancel}>취소</button>
                                        </>
                                    ) : (
                                        <button onClick={() => onDelete(item.id)}>삭제</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default JsonPreviewPagePresenter;