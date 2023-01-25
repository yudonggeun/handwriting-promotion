import React, { useContext, useEffect, useState } from "react";
import AmendContext from "../context/amend_status_context";
import PageContext from "../context/page_context";
import Intro from "../component/intro";
import Content from "../component/content";
import ContentForm from "../component/new_content_form";
import { useRef } from "react";

function MainLayout(props) {

    const loadingContent = {
        id: -1,
        title: "로딩",
        description: "로딩",
        images: []
    };

    //elements
    const contentWrapper = useRef();

    const contentInfos = props.contentInfos;
    const setContentInfos = props.setContentInfos;
    const changeView = useContext(PageContext);

    const topRef = useRef();
    const upRef = useRef();


    const introInfo = props.introInfo;
    const [isAmend, setAmend] = useContext(AmendContext);
    let loading = contentInfos == null || introInfo == null;

    let count = 0;
    const loginPage = () => {
        count++;
        if (count === 5) {
            count = 0;
            changeView(null, "login");
        }
    }

    useEffect(() => {
        // Get the button
        const topButton = topRef.current;
        const upButton = upRef.current;
        const target = contentWrapper.current;

        // When the user scrolls down 20px from the top of the document, show the button
        target.onscroll = function () {
            scrollFunction();
        }

        function scrollFunction() {
            if (
                target.scrollTop > 20 ||
                target.scrollTop > 20
            ) {
                topButton.style.display = "block";
                // upButton.style.display = "block";
            } else {
                topButton.style.display = "none";
                upButton.style.display = "none";
            }
        }
        // When the user clicks on the button, scroll to the top of the document
        topButton.addEventListener("click", backToTop);
        // if (contentInfos?.length)
        //     upButton.addEventListener("click", backToUp);

        function backToTop() {
            target.scrollTop = 0;
        }

        // //한번 클릭시 컴포넌트 하나씩 올라가도록
        // function backToUp() {
        //     const count = contentInfos.length;
        //     target.scrollTop = (target.scrollTop - ((target.scrollHeight - target.clientHeight) / count));
        // }
    }, [loading]);

    const addContent = (obj) => {
        setContentInfos(contentInfos.concat([obj]))
    }

    const deleteContent = (id) => {
        setContentInfos(contentInfos.filter(e => e.id !== id));
    }

    return (
        // 메인 배경 설정
        <div id="mainPage" className="relative w-full h-full bg-gradient-to-b from-red-500 to-white overflow-y-auto scrollbar-hide" >
            <div className="flex flex-col w-full h-full">
                <Intro info={introInfo} />
                <div id="contentArea" ref={contentWrapper} className="flex flex-col lg:snap-y lg:snap-mandatory md:overflow-auto md:scrollbar-hide flex-1 w-full px-2 py-5 md:p-5">
                    <h2 className="text-2xl text-center md:text-left bg-white rounded-lg shadow-md mb-2 md:mb-5 p-2">무엇을 배우나요?</h2>
                    {
                        console.log("content infos : ", contentInfos)
                    }
                    {
                        loading
                            ?
                            <Content info={loadingContent} index={0} id={`contentLoading`} />
                            :
                            contentInfos?.map((obj, index) => {
                                return (
                                    <Content info={obj} index={index} key={obj.id} id={`content${index}`} deleteContent={deleteContent}/>
                                )
                            })
                    }
                    {
                        isAmend
                            ?
                            <ContentForm addContent={addContent}/>
                            :
                            <div onClick={() => loginPage()} className="order-last text-right p-2 md:p-5 md:text-xl text-gray-600">
                                문의 전화 010-9189-3254
                            </div>
                    }
                </div>
            </div>
            <div className="absolute right-0 bottom-0 flex flex-col w-fit m-2">
                <button ref={topRef} className="hidden w-9 h-9 p-1 rounded-full bg-gray-200 hover:bg-gray-500 hover:opacity-80 text-white opacity-50 mb-2">top</button>
                {/* <button ref={upRef} className="hidden w-9 h-9 p-1 rounded-full bg-green-200 hover:bg-green-500 hover:opacity-80 text-white opacity-50">up</button> */}
            </div>
        </div>
    )
}

export default MainLayout;