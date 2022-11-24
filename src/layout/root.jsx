import React, { useEffect, useState } from "react";
import ContentWrapper from "../component/content";
import DetailWrapper from "../component/detail_image";
import DetailInfoContext from "../context/detail_info_context";
import PageContext from "../context/page_context";

const contentInfosURL = `${window.location.origin}/data/content`;

function RootLayout() {

    const [contentInfos, setContentInfos] = useState(null);
    const [contentIndex, setContentIndex] = useState(0);

    const changeViewDetail = (index) => {
        const detail_page = document.getElementById("detail_wrapper");
        const content_page = document.getElementById("content_wrapper");
        content_page.hidden = true;
        detail_page.hidden = false;
        setContentIndex(index);
    }

    const changeViewHome = () => {
        const detail_page = document.getElementById("detail_wrapper");
        const content_page = document.getElementById("content_wrapper");
        content_page.hidden = false;
        detail_page.hidden = true;
    }

    const requestContentInfos = () => {
        fetch(contentInfosURL)
            .then((response) => response.json())
            .then((data) => {
                setContentInfos(data);
            }).catch((e) => {
                console.log(e);
                alert("오류 발생");
            });
    }

    useEffect(() => {
        requestContentInfos();
    }, []);

    return (
        <div id="service_root" className="w-screen h-screen overflow-hidden">
            <DetailInfoContext.Provider value={contentInfos}>
            <div id="content_wrapper" className="h-full w-full">
                <PageContext.Provider value={changeViewDetail}>
                    <ContentWrapper/>
                </PageContext.Provider>
            </div>
            <div id="detail_wrapper" className="h-full w-full" hidden>
                <PageContext.Provider value={changeViewHome}>
                    <DetailWrapper index={contentIndex}/>
                </PageContext.Provider>
            </div>
            </DetailInfoContext.Provider>
        </div>
    )
}

export default RootLayout;