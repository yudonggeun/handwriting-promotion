import React, { useEffect, useState } from "react";
import ContentWrapper from "../component/content";
import DetailWrapper from "../component/detail_image";
import DetailInfoContext from "../context/detail_info_context";
import PageContext from "../context/page_context";

const contentInfosURL = `${window.location.origin}/data/content`;

function RootLayout() {

    const [pageInfo, setPageInfo] = useState({
        page: "main",
        id: null
    })
    const [contentInfos, setContentInfos] = useState(null);
    const [contentIndex, setContentIndex] = useState(0);
    const [DetailImageSrcArray, setDetailImageSrcArray] = useState(null);

    const changeViewDetail = async (index) => {
        const data = await requestImageSrouces(contentInfos[index].id);
        setContentIndex(index);
        setDetailImageSrcArray(data);

        setPageInfo({
            page: "detail",
            id: contentInfos[index]
        })
    }

    const changeViewHome = () => {
        setPageInfo({
            page: "main",
            id: null
        })
    }

    const requestImageSrouces = async (id) => {
        const contentImageURL = `${window.location.origin}/data/content/image`;

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
    }, []);

    return (
        <div id="service_root" className="w-screen h-screen overflow-hidden">
            <DetailInfoContext.Provider value={contentInfos}>
                {
                    pageInfo.page === "main"
                        ?
                        <div id="content_wrapper" className="h-full w-full">
                            <PageContext.Provider value={changeViewDetail}>
                                <ContentWrapper />
                            </PageContext.Provider>
                        </div>
                        :
                        <div id="detail_wrapper" className="h-full w-full">
                            <PageContext.Provider value={changeViewHome}>
                                <DetailWrapper imgSrcs={DetailImageSrcArray} index={contentIndex} />
                            </PageContext.Provider>
                        </div>
                }
            </DetailInfoContext.Provider>
        </div>
    )
}

export default RootLayout;