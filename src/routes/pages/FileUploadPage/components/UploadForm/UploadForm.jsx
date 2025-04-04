import React from "react";

export const UploadForm = ({

    threadCount,
    setThreadCount,

    serverUrl,
    setServerUrl,

    intervalSec,
    setIntervalSec,

    files,
    setFiles,

    onSingleThreadBtn,
    onMultiThreadBtn,
    onStartSchedule,
    onStopSchedule,
    onScheduleTransmission,

    duration,

    message,
    statusMsg,


}) => {


    return (
        <div>

            {/* 서버 주소 입력 */}
            <div>
                <label>수신할 서버 주소</label>
                <input
                    type="text"
                    value={serverUrl}
                    onChange={(e) => setServerUrl(e.target.value)}
                    placeholder="ex: http://localhost:4000/upload"
                />
            </div>

            {/* 파일 선택 */}
            <div>
                <label>파일 선택</label>
                <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(Array.from(e.target.files))}
                />
            </div>

            {files.length > 0 && (
                <div style={{ marginTop: "1rem" }}>
                    <h3>선택 파일 목록</h3>
                    <ul>
                        {files.slice(0, 3).map((file, idx) => (
                            <li key={idx}>{file.name}</li>
                        ))}

                        {files.length > 4 && (
                            <li>...</li>
                        )}

                        {files.length > 3 && (
                            <li>{files[files.length - 1].name}</li>
                        )}
                    </ul>
                </div>
            )}

            {/* 스레드 수 설정 */}
            <div>
                <label>스레드 수</label>
                <input
                    type="number"
                    value={threadCount}
                    onChange={(e) => setThreadCount(Number(e.target.value))}
                    placeholder="ex: 10"
                />
            </div>

            {/* 파일 전송 버튼 */}
            <div>
                <button
                    onClick={onSingleThreadBtn}
                >단일 스레드 전송
                </button>
                <button
                    onClick={onMultiThreadBtn}
                >
                    멀티 스레드 전송
                </button>
            </div>

            {duration !== null && (
                <p>처리 시간: <span>{duration}</span></p>
            )}

            <div>
                <h2>전송 주기 설정</h2>
                <div>
                    <label>전송 주기 (초)</label>
                    <input
                        type="number"
                        value={intervalSec}
                        onChange={(e) => setIntervalSec(e.target.value)}
                        placeholder="ex: 10"
                    />
                </div>

                <div>
                    <button
                        onClick={onStartSchedule}
                    >전송 시작
                    </button>
                    <button
                        onClick={onStopSchedule}
                    >전송 중지
                    </button>
                </div>
            </div>
            {message && <p>{message}</p>}

        </div>
    )
}