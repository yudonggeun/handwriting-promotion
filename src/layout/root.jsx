import React, { useEffect, useState } from "react";
import ContentWrapper from "../component/content";
import DetailWrapper from "../component/detail_image";
import AmendContext from "../context/amend_status_context";
import DetailInfoContext from "../context/detail_info_context";
import PageContext from "../context/page_context";
import UrlContext from "../context/url";
import LoginPage from "./login";

function RootLayout() {

    const host = `${window.location.protocol}//${window.location.host}/api`;
    const contentInfosURL = `${host}/data/content`;
    const amendURL = `${host}/admin/isAmend`;

    const [pageInfo, setPageInfo] = useState({
        page: "main",
        id: null
    })
    const [contentInfos, setContentInfos] = useState(null);
    const [contentIndex, setContentIndex] = useState(0);
    const [DetailImageSrcArray, setDetailImageSrcArray] = useState(null);
    const [isAmend, setAmend] = useState(false);

    //pageName : ["main", 메인 화면] ["detail", 작품 페이지] ["login", 로그인 페이지]
    const changeView = async (index, pageName) => {

        const pageInfoBox = {
            page: pageName,
            id: null
        };

        if (pageName === "detail") {
            const data = await requestImageSrouces(contentInfos[index].id);
            setContentIndex(index);
            setDetailImageSrcArray(data);
            pageInfoBox.id = contentInfos[index];
        }

        setPageInfo(pageInfoBox);
    }
    
    const requestAmend = () => {
        fetch(amendURL)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === true) {
                    setAmend(data.amendAuthority);
                }
            }).catch((e) => {
                console.log(e);
                setAmend(false);
            });
    }

    const requestImageSrouces = async (id) => {
        const contentImageURL = `${host}/data/content/image`;

        console.log("call", contentImageURL);
        return await fetch(contentImageURL + "?content_id=" + id)
            .then((response) => response.json())
            .catch((e) => {
                console.log(e);
                alert("오류 발생");
            });
    }

    const requestContentInfos = () => {
        console.log("call", contentInfosURL);
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
        requestAmend();
    }, []);

    return (
        <div id="service_root" className="w-screen h-screen overflow-hidden">
            <UrlContext.Provider value={host}>
                <AmendContext.Provider value={isAmend}>

                    <DetailInfoContext.Provider value={contentInfos}>
                        {
                            pageInfo.page === "main"
                                ?
                                <div id="content_wrapper" className="h-full w-full">
                                    <PageContext.Provider value={changeView}>
                                        <ContentWrapper />
                                    </PageContext.Provider>
                                </div>
                                : ""
                        }
                        {
                            pageInfo.page === "detail"
                                ? <div id="detail_wrapper" className="h-full w-full">
                                    <PageContext.Provider value={changeView}>
                                        <DetailWrapper imgSrcs={DetailImageSrcArray} index={contentIndex} />
                                    </PageContext.Provider>
                                </div>
                                : ""
                        }
                        {pageInfo.page === "login" ? <LoginPage /> : ""}
                    </DetailInfoContext.Provider>
                </AmendContext.Provider>
            </UrlContext.Provider>
        </div>
    )
}

export default RootLayout;