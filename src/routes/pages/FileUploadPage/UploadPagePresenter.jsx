import React from "react";
import { UploadForm } from "./components/UploadForm/UploadForm";


const UploadPagePresenter = (props) => {
    return (
        <div>
            <h2>파일 업로드</h2>
            <UploadForm {...props}/>
        </div>
    )
}

export default UploadPagePresenter;