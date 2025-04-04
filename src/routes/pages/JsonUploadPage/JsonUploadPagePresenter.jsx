import React from "react";

const JsonUploadPagePresenter = ({
    serverUrl,
    setServerUrl,
    jsonText,
    setJsonText,
    onUploadJson,
    responseMsg,
    tableName,
    setTableName,
    tableOptions,
    intervalSec,
    setIntervalSec,
    onStartAutoSend,
    onStopAutoSend,
    onClearMidData,
    userTables,
    selectedUserTable,
    setSelectedUserTable,
    onMoveToUserTable,
}) => {
    return (
        <div style={{ padding: "2rem" }}>
            <h2>JSON 데이터 전송</h2>

            {/* 서버 주소 입력 */}
            <div>
                <label>수신 서버 주소</label>
                <input
                    type="text"
                    value={serverUrl}
                    onChange={(e) => setServerUrl(e.target.value)}
                    placeholder="http://localhost:4000/upload-json"
                    style={{ width: "100%", marginBottom: "1rem" }}
                />
            </div>

            {/* 테이블 선택 */}
            <div style={{ marginBottom: "1rem" }}>
                <label>테이블 선택</label>
                <select value={tableName} onChange={(e) => setTableName(e.target.value)}>
                    <option value="">테이블을 선택하세요</option>
                    {tableOptions.map((table) => (
                        <option key={table} value={table}>
                            {table}
                        </option>
                    ))}
                </select>
            </div>

            {/* JSON 입력 */}
            <div style={{ marginBottom: "1rem" }}>
                <label>전송할 JSON 데이터</label>
                <textarea
                    rows={10}
                    value={jsonText}
                    onChange={(e) => setJsonText(e.target.value)}
                    placeholder='예: {"temp": 23, "status": "ok"}'
                    style={{ width: "100%", fontFamily: "monospace" }}
                />
            </div>

            {/* 전송 버튼 */}
            <div style={{ marginBottom: "1rem" }}>
                <button onClick={onUploadJson}>미리보기</button>
                <button onClick={onClearMidData}>수신 데이터 초기화</button>
            </div>

            {/* 사용자 테이블 선택 콤보박스 */}
            <div>
                <label>사용자 테이블 선택</label>
                <select value={selectedUserTable} onChange={(e) => setSelectedUserTable(e.target.value)}>
                    {userTables.map((table) => (
                        <option key={table} value={table}>
                            {table}
                        </option>
                    ))}
                </select>
            </div>

            {/* 이동 버튼 */}
            <div style={{ marginTop: "1rem" }}>
                <button onClick={onMoveToUserTable}>중간 데이터 → 사용자 테이블 이동</button>
            </div>

            {/* 주기 설정 */}
            <div style={{ marginBottom: "1rem" }}>
                <label>전송 주기 (초)</label>
                <input
                    type="number"
                    value={intervalSec}
                    onChange={(e) => setIntervalSec(Number(e.target.value))}
                    placeholder="예: 10"
                    style={{ width: "80px", marginLeft: "0.5rem" }}
                />
            </div>

            {/* 자동 전송 시작/중지 버튼 */}
            <div style={{ marginBottom: "1rem" }}>
                <button onClick={onStartAutoSend}>자동 전송 시작</button>
                <button onClick={onStopAutoSend} style={{ marginLeft: "1rem" }}>
                    자동 전송 중지
                </button>
            </div>

            {/* 응답 메시지 */}
            {responseMsg && <p style={{ color: "green" }}>{responseMsg}</p>}
        </div>
    );
};

export default JsonUploadPagePresenter;