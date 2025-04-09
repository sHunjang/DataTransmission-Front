const JsonDataPagePresenter = ({
    jsonData = [],

    page,
    setPage,

    totalPages,

    onSendAndDelete,

}) => {
    return (
        <div style={{ padding: "2rem" }}>
            <h2>JSON 전송 데이터 조회 (페이지 {page}/{totalPages})</h2>

            <button onClick={onSendAndDelete} style={{ marginBottom: "1rem" }}>
                전체 데이터 전송 및 삭제
            </button>

            {jsonData.length === 0 ? (
                <p>데이터가 없습니다.</p>
            ) : (
                <>
                    <table border="1" cellPadding="8" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>데이터</th>
                                <th>수신 시각</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jsonData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>
                                        <pre style={{ whiteSpace: "pre-wrap" }}>
                                            {JSON.stringify(item.data, null, 2)}
                                        </pre>
                                    </td>
                                    <td>{new Date(item.received_at).toLocaleString("ko-KR")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ marginTop: "1rem" }}>
                        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                            이전
                        </button>
                        <span style={{ margin: "0 1rem" }}>{page} / {totalPages}</span>
                        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                            다음
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default JsonDataPagePresenter;