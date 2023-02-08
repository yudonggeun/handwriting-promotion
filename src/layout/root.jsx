import React, { useEffect, useState } from "react";
import DetailWrapper from "./detail";
import AmendContext from "../context/amend_status_context";
import DetailInfoContext from "../context/detail_info_context";
import PageContext from "../context/page_context";
import LoginPage from "./login";
import MainLayout from "./main";
import API from "../config/urlConfig"

function RootLayout() {

    const [pageInfo, setPageInfo] = useState({ page: "main", id: null });
    const [introInfo, setIntroInfo] = useState(null);
    const [contentInfos, setContentInfos] = useState(null);
    const [contentDetailInfo, setContentDetailInfo] = useState({
        id: -1,
        title: "로딩",
        description: "로딩",
        images: []
    })
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
            pageInfoBox.id = obj.id;
            mainLayout.hidden = true;
            detailLayout.hidden = false;
        }

        if (pageName === "login") {
            setPageInfo(pageInfoBox);
        }
    }

    const requestAmend = () => {
        fetch(API.amendURL, {
            headers: {
                Authorization: localStorage.getItem("access-token")
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    if (data.data.status === true) {
                        setAmend(data.data.amendAuthority);
                    }
                } else {
                    alert(`GET ${API.amendURL} : 요청 실패! 관리자에게 문의하세요.`);
                }

            }).catch((e) => {
                console.log(e);
                setAmend(false);
            });
    }

    const requestImageSrouces = async (id) => {
        return await fetch(API.CONTENT_IMAGE + "?content_id=" + id)
            .then((response) => response.json())
            .then((response) => {
                if (response.status === "success") {
                    return response.data;
                } else {
                    alert(`GET ${API.CONTENT_IMAGE} : 홍보 이미지 목록 조회가 실패했습니다. 다시 실행해보시고 관리자에게 문의하세요.`);
                }
            })
            .catch((e) => {
                console.log(e);
                alert("오류 발생");
            });
    }

    const requestContentInfos = () => {
        fetch(API.contentInfosURL)
            .then((response) => response.json())
            .then((response) => {
                if(response.status === "success"){
                    setContentInfos(response.data);
                } else {
                    alert(`GET ${API.contentInfosURL} : 요청 실패! 관리자에게 문의하세요.`);
                }
            }).catch((e) => {
                console.log(e);
                alert("오류 발생");
            });
    }

    const requestIntroInfos = () => {
        fetch(API.introInfosURL)
            .then((response) => response.json())
            .then((response) => {
                if(response.status === "success"){
                    setIntroInfo(response.data);
                } else {
                    alert(`GET ${API.introInfosURL} : 요청 실패! 관리자에게 문의하세요.`);
                }
            })
            .catch((e) => {
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
        </div>
    )
}

export default RootLayout;