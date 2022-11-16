import React, { useContext, useEffect, useState } from "react";
import AmendContext from "../context/amend_status_context";

const infroInfo = {
    image: `${process.env.PUBLIC_URL}/images/calligraphy-g9ada6110c_1920.png`,
    comments: [
        "요즘 학생들의 글씨체는 본인도 알아 볼 수 없을 만큼 바르지 못합니다. 마우스와 키보드에 익숙하기 때문입니다.",
        "글씨체를 바로 잡음으로서 산만함을 약화시키고 집중력을 가지게 해 줄 수 있습니다."
    ]
}


const contentInfos = [
    {
        title: "캘리그라피를 배워보세요~~!!",
        description: "캘리그라피 어쩌구 설명을 적어요        캘리그라피 어쩌구 설명을 적어요        캘리그라피 어쩌구 설명을 적어요",
        images: [
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",

            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg"
        ]
    },
];


function ContentWrapper(props) {

    const [infos, setInfo] = useState(contentInfos);
    const [isAmend, setAmend] = useState(false);

    useEffect(() => {
        // Get the button
        const topButton = document.getElementById("topButton");
        const upButton = document.getElementById("upButton");
        const target = document.getElementById("contentArea");

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
                upButton.style.display = "block";
            } else {
                topButton.style.display = "none";
                upButton.style.display = "none";
            }
        }
        // When the user clicks on the button, scroll to the top of the document
        topButton.addEventListener("click", backToTop);
        upButton.addEventListener("click", backToUp);

        function backToTop() {
            target.scrollTop = 0;
        }

        //한번 클릭시 컴포넌트 하나씩 올라가도록
        function backToUp() {
            const count = infos.length;
            const top = target.scrollTop - ((target.scrollHeight - target.clientHeight) / count);
            target.scrollTop = top;
        }
    }, [])

    return (
        <AmendContext.Provider value={isAmend}>
            <div className="relative w-full h-full">
                <div className="flex flex-col w-full h-full">
                    <Intro />
                    <div id="contentArea" className="lg:snap-y lg:snap-mandatory overflow-auto scrollbar-hide flex-1 w-full p-2 md:p-5">
                        <h2 className="text-2xl bg-white rounded-lg mb-2 md:mb-5 p-2">무엇을 배우나요?</h2>
                        {
                            infos.map((obj, index) => {
                                return (
                                    <Content info={obj} key={index} />
                                )
                            })
                        }
                        <div className="text-right p-2 md:p-5 md:text-xl text-gray-600">
                            문의 전화 010-9189-3254
                        </div>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 flex flex-col w-fit m-2">
                    <button id="topButton" className="hidden w-9 h-9 p-1 rounded-full bg-green-200 hover:bg-green-500 hover:opacity-80 text-white opacity-50 mb-2">top</button>
                    <button id="upButton" className="hidden w-9 h-9 p-1 rounded-full bg-green-200 hover:bg-green-500 hover:opacity-80 text-white opacity-50">up</button>
                </div>
            </div>
        </AmendContext.Provider>
    )
}

function Intro(props) {

    const info = infroInfo;

    const isAmend = useContext(AmendContext);

    return (
        <div className="h-1/2 md:h-1/4 md:flex">
            <div className="p-5 h-4/6 md:h-full md:flex-1 flex justify-center">
                <img src={info.image} alt="" className="h-full"></img>
            </div>
            <div className=" md:h-full md:w-2/5 p-5">
                {
                    info.comments.map((comment, index) => {
                        return (
                            <textarea className="mb-1 w-full bg-transparent outline-none resize-none" readOnly={!isAmend} key={index} defaultValue={comment}>
                            </textarea>
                        )
                    })
                }
            </div>
        </div>
    )
}

function Content(props) {

    const info = props.info;
    const isAmend = useContext(AmendContext);

    return (
        <div className="snap-always snap-center bg-white border-t border-gray-100 rounded-lg shadow-md mb-5">
            <input type="text" readOnly={!isAmend} className="rounded-t-lg text-center text-2xl border-b p-5 w-full outline-none" defaultValue={info.title}></input>
            <textarea className="p-1 md:p-5 text-lg w-full outline-none resize-none" readOnly={!isAmend} defaultValue={info.description}></textarea>
            <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-1">
                {
                    info.images.map((src, index) => {
                        return (
                            <div className="hover:p-0 box-content p-2 md:hover:col-span-2 hover:row-span-2" key={index}>
                                <img className={`rounded-lg border ${index > 3 ? "sm:hidden md:inline" : ""}`} src={src} alt=""></img>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-end">
                {isAmend ? <button className="bg-red-500 hover:bg-red-600 text-white rounded-lg mx-5 my-3 p-1">수정하기</button> : ""}
                <button className="text-blue-300 hover:text-blue-900 rounded-lg mx-5 my-3 p-1">더보기</button>
            </div>
        </div>
    )
}

export default ContentWrapper;