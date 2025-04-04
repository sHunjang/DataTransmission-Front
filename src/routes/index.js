import React from "react";
import { Route, Routes } from "react-router-dom";

import { HomePage, FileUploadPage, JobPage, JsonUploadPage, JsonPreviewPage, JsonDataPage, JsonLogPage } from "./pages";

const Router = () => {

    return (
        <div className="App" style={{ padding: "1rem" }}>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/file-upload"
                    element={<FileUploadPage />}
                />

                <Route
                    path="/job"
                    element={<JobPage />}
                />

                <Route
                    path="/json"
                    element={<JsonUploadPage />}
                />

                <Route
                    path="/json-preview"
                    element={<JsonPreviewPage />}
                />

                <Route
                    path="json-data"
                    element={<JsonDataPage />}
                />

                <Route
                    path="json-logs"
                    element={<JsonLogPage />}
                />

            </Routes>
        </div>

    )
}

export default Router;