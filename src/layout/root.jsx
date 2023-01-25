import React, { useEffect, useState } from "react";
import DetailWrapper from "./detail";
import AmendContext from "../context/amend_status_context";
import DetailInfoContext from "../context/detail_info_context";
import PageContext from "../context/page_context";
import UrlContext from "../context/url";
import LoginPage from "./login";
import MainLayout from "./main";

function RootLayout() {

    const loadingIntro = {
        image: "no_image.png",
        comments: ["로딩"]
    }

    const host = window.location.origin;
    const contentInfosURL = `${host}/data/content`;
    const amendURL = `${host}/admin/isAmend`;
    const introInfosURL = `${host}/data/intro`;

    const [pageInfo, setPageInfo] = useState({ page: "main", id: null });
    const [introInfo, setIntroInfo] = useState(loadingIntro);
    const [contentInfos, setContentInfos] = useState(null);
    const [contentDetailInfo, setContentDetailInfo] = useState({
        id: -1,
        title: "로딩",
        description: "로딩",
        images: []
    })
    const [DetailImageSrcArray, setDetailImageSrcArray] = useState(null);
    const [isAmend, setAmend] = useState(false);

    //pageName : ["main", 메인 화면] ["detail", 작품 페이지] ["login", 로그인 페이지]
    const changeView = async (obj, pageName) => {

        const pageInfoBox = {
            page: pageName,
            id: null
        };

        const mainLayout = document.getElementById("mainPage");
        const detailLayout = document.getElementById("detailLayout");

        if (pageName === "main") {
            if (!mainLayout) {
                setPageInfo(pageInfoBox);
                return;
            }
            detailLayout.hidden = true;
            mainLayout.hidden = false;
        }

        if (pageName === "detail") {
            const imageList = await requestImageSrouces(obj.id);
            obj.images = imageList;
            console.log("detail imageList", imageList);
            console.log("obj : ", obj)
            setContentDetailInfo(obj);
            setDetailImageSrcArray(imageList);
            pageInfoBox.id = obj.id;
            mainLayout.hidden = true;
            detailLayout.hidden = false;
        }

        if (pageName === "login") {
            setPageInfo(pageInfoBox);
        }
    }

    const requestAmend = () => {
        fetch(amendURL, {
            headers: {
                Authorization: localStorage.getItem("access-token")
            }
        })
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

    const requestIntroInfos = () => {
        console.log("intro info get");
        fetch(introInfosURL)
            .then((response) => response.json())
            .then((data) => {
                setIntroInfo(data);
            }).catch((e) => {
                console.log(e);
                alert("오류 발생");
            });
    }

    useEffect(() => {
        requestContentInfos();
        requestAmend();
        requestIntroInfos();
    }, []);

    return (
        <div id="service_root" className="w-screen h-screen overflow-hidden">
            <UrlContext.Provider value={host}>
                <AmendContext.Provider value={[isAmend, setAmend]}>
                    <PageContext.Provider value={changeView}>
                        <DetailInfoContext.Provider value={contentDetailInfo}>
                            {pageInfo.page !== "login" ?
                                <div className="w-full h-full">
                                    <MainLayout introInfo={introInfo} contentInfos={contentInfos} setContentInfos={setContentInfos} />
                                    <DetailWrapper id={pageInfo.id} />
                                </div> : ""}
                            {pageInfo.page === "login" ? <LoginPage setAmend={setAmend} /> : ""}
                        </DetailInfoContext.Provider>
                    </PageContext.Provider>
                </AmendContext.Provider>
            </UrlContext.Provider>
        </div>
    )
}

export default RootLayout;