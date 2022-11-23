import React from "react";
import { useContext } from "react";
import ContentWrapper from "../component/content";
import DetailWrapper from "../component/detail_image";
import PageContext from "../context/page_context";

function RootLayout(props) {

    const pageView = useContext(PageContext);

    // top bottom 을 이용한 애니매이션 효과 적용해서 페이지 이동 구현하기
    const changeViewDetail = (info) => {
        const root = document.getElementById("service_root");
        root.scrollTop = root.clientHeight;
    }

    const changeViewHome = () => {
        const root = document.getElementById("service_root");
        root.scrollTop = 0;
    }

    return (
        <div id="service_root" className="w-screen h-screen overflow-hidden">
            <div className="h-full w-full">
                <PageContext.Provider value={changeViewDetail}>
                    <ContentWrapper />
                </PageContext.Provider>
            </div>
            <div className="h-full w-full">
                <PageContext.Provider value={changeViewHome}>
                    <DetailWrapper />
                </PageContext.Provider>
            </div>
        </div>
    )
}

export default RootLayout;