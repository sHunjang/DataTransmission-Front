import React, { useState } from "react";
import axios from "axios";

import { API_URL } from "../../../config";

import UploadPagePresenter from "./UploadPagePresenter";

const FileUploadPageContainer = () => {
    const [serverUrl, setServerUrl] = useState("");
    const [files, setFiles] = useState([]);
    const [duration, setDuration] = useState(null);
    const [intervalSec, setIntervalSec] = useState(10);
    const [threadCount, setThreadCount] = useState(1);
    const [message, setMessage] = useState("");
    const [statusMsg, setStatusMsg] = useState("");

    // 단일/멀티 스레드 전송 요청
    const fileTransmission = async (threadType = "single") => {
        const selectedThreadCount = threadType === "single" ? 1 : threadCount;

        if (!serverUrl || files.length === 0) {
            alert("서버 주소 또는 파일을 입력해주세요.");
            return;
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });

        // 클라이언트 시간 (ISO 형식)
        const startTime = new Date().toISOString();

        try {
            const response = await axios.post(`${API_URL}/api/threads/send`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                params: {
                    threadCount: selectedThreadCount,
                    serverUrl,
                    startTime, // 클라이언트 시간 전달
                },
            });

            const endTime = new Date().toISOString();

            // 클라이언트에서 duration 측정
            const durationMs = new Date(endTime) - new Date(startTime);
            setDuration((durationMs / 1000).toFixed(2));

            setStatusMsg("전송 완료: " + response.data.message);
        } catch (err) {
            console.error("전송 실패: ", err.message);
            setStatusMsg("전송 실패: " + err.message);
        }
    };

    // 반복 전송 시작
    const onStartSchedule = async () => {
        try {
            const res = await axios.post(`${API_URL}/api/threads/schedule-send`, {
                serverUrl,
                intervalSec: Number(intervalSec),
                threadCount,
            });
            setMessage("전송 시작" + res.data.message);
        } catch (err) {
            setMessage("전송 시작 실패: " + err.message);
        }
    };

    // 반복 전송 중지
    const onStopSchedule = async () => {
        try {
            const res = await axios.post(`${API_URL}/api/threads/stop-schedule`);
            setMessage("전송 중지" + res.data.message);
        } catch (err) {
            setMessage("전송 중지 실패: " + err.message);
        }
    };

    return (
        <UploadPagePresenter
            serverUrl={serverUrl}
            setServerUrl={setServerUrl}
            files={files}
            setFiles={setFiles}
            duration={duration}
            setDuration={setDuration}
            threadCount={threadCount}
            setThreadCount={setThreadCount}
            onSingleThreadBtn={() => fileTransmission("single")}
            onMultiThreadBtn={() => fileTransmission("multi")}
            intervalSec={intervalSec}
            setIntervalSec={setIntervalSec}
            onStartSchedule={onStartSchedule}
            onStopSchedule={onStopSchedule}
            message={message}
            statusMsg={statusMsg}
        />
    );
};

export default FileUploadPageContainer;