import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import JsonUploadPagePresenter from "./JsonUploadPagePresenter";
import JsonPreviewPagePresenter from "../JsonPreviewPage/JsonPreviewPagePresenter";

import { API_URL, RECEIVER_URL } from "../../../config";

const JsonUploadPageContainer = () => {
    const [serverUrl, setServerUrl] = useState("");
    const [jsonText, setJsonText] = useState("");
    const [responseMsg, setResponseMsg] = useState("");
    const [previewData, setPreviewData] = useState(null);
    const [tableName, setTableName] = useState("");
    const [tableOptions, setTableOptions] = useState([]);
    const [intervalSec, setIntervalSec] = useState(10);
    const intervalRef = useRef(null);
    const [userTables, setUserTables] = useState([]);
    const [selectedUserTable, setSelectedUserTable] = useState("");

    // 테이블 옵션 불러오기 (송신 DB용)
    useEffect(() => {
        axios.get(`${API_URL}/api/tables/names`)
            .then((res) => setTableOptions(res.data))
            .catch((err) => console.error("테이블 목록 로드 실패:", err));
    }, []);

    // 사용자 테이블 목록 불러오기 (수신 DB용)
    useEffect(() => {
        axios.get(`${RECEIVER_URL}/user-tables`)
            .then((res) => {
                setUserTables(res.data);
                if (res.data.length > 0) setSelectedUserTable(res.data[0]);
            })
            .catch((err) => console.error("사용자 테이블 목록 조회 실패:", err));
    }, []);

    // 미리보기 생성
    const onUploadJson = () => {
        try {
            const parsed = JSON.parse(jsonText);
            setPreviewData({ data: parsed, tempId: Date.now() });
            setResponseMsg("미리보기 준비 완료");
        } catch {
            setResponseMsg("유효한 JSON 형식이 아님");
        }
    };

    // 수신 서버로 전송
    const sendToReceiverMidDb = async () => {
        try {
            const parsed = JSON.parse(jsonText);
            await axios.post(`${RECEIVER_URL}/upload-json`, parsed);
            setResponseMsg("수신 서버 중간 DB로 전송됨");
        } catch (err) {
            setResponseMsg("전송 실패: " + err.message);
        }
    };

    // 저장 (미리보기 상태에서만 동작)
    const onSave = async () => {
        await sendToReceiverMidDb();
        setPreviewData(null);
        setJsonText("");
    };

    const onCancel = () => {
        setPreviewData(null);
        setResponseMsg("저장 취소됨");
    };

    // 자동 전송 시작
    const onStartAutoSend = () => {
        if (!jsonText) return alert("JSON 데이터 입력");
        if (intervalRef.current) return alert("이미 자동 전송 중");

        intervalRef.current = setInterval(() => {
            sendToReceiverMidDb();
        }, intervalSec * 1000);

        setResponseMsg(`자동 전송 시작 (주기: ${intervalSec}초)`);
    };

    const onStopAutoSend = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setResponseMsg("자동 전송 중지됨");
    };

    const handleClearMidData = async () => {
        try {
            const res = await axios.delete(`${RECEIVER_URL}/delete-mid-data`);
            alert(res.data.message);
        } catch (err) {
            console.error("삭제 실패:", err);
        }
    };

    const handleMoveToUserTable = async () => {
        if (!selectedUserTable) return;

        try {
            const res = await axios.post(`${RECEIVER_URL}/move-to-user-table`, {
                targetTable: selectedUserTable,
            });
            alert(res.data.message);
        } catch (err) {
            alert("이동 실패: " + err.message);
        }
    };

    return (
        <>
            <JsonUploadPagePresenter
                serverUrl={serverUrl}
                setServerUrl={setServerUrl}
                jsonText={jsonText}
                setJsonText={setJsonText}
                onUploadJson={onUploadJson}
                responseMsg={responseMsg}
                tableName={tableName}
                setTableName={setTableName}
                tableOptions={tableOptions}
                intervalSec={intervalSec}
                setIntervalSec={setIntervalSec}
                onStartAutoSend={onStartAutoSend}
                onStopAutoSend={onStopAutoSend}
                onClearMidData={handleClearMidData}
                userTables={userTables}
                selectedUserTable={selectedUserTable}
                setSelectedUserTable={setSelectedUserTable}
                onMoveToUserTable={handleMoveToUserTable}
            />

            {previewData && (
                <JsonPreviewPagePresenter
                    jsonData={[previewData]}
                    isPreviewOnly={true}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            )}
        </>
    );
};

export default JsonUploadPageContainer;