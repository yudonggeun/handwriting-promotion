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
        id: "000",//폴더 이름
        title: "temper title",
        description: "설명입니다.",
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

    const [infos, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAmend, setAmend] = useState(false);
    const amendURL = `${window.location.origin}/admin/isAmend`;
    const contentInfosURL = `${window.location.origin}/data/content`;

    const requestContentInfos = () => {
        fetch(contentInfosURL)
            .then((response) => response.json())
            .then((data) => {
                setInfo(data);
                setLoading(false);
            }).catch((e) => {
                console.log(e);
                alert("오류 발생");
            });
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

    useEffect(() => {
        requestContentInfos();
        requestAmend();
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

    const loadingMsg = loading ? "로딩 중입니다." : "";

    return (
        <AmendContext.Provider value={isAmend}>
            <div className="relative w-full h-full">
                <div className="flex flex-col w-full h-full">
                    <Intro />
                    <div id="contentArea" className="lg:snap-y lg:snap-mandatory overflow-auto scrollbar-hide flex-1 w-full p-2 md:p-5">
                        <h2 className="text-2xl bg-white rounded-lg shadow-md mb-2 md:mb-5 p-2">무엇을 배우나요?</h2>
                        {loadingMsg}
                        {
                            infos?.map((obj, index) => {
                                return (
                                    <Content info={obj} key={index} id={`content${index}`} />
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

    const [info, setInfo] = useState(props.info);
    const isAmend = useContext(AmendContext);

    console.log(info);

    const id = info.id;
    const images = info.images;
    let title = info.title;
    let description = info.description;

    const url = `${window.location.origin}/data/content`;

    const requestAmendContent = () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                title: title,
                description: description,
                images: images
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function changeTitle(event) {
        const obj = event.target;
        title = obj.value;
    }

    function changeDescription(event) {
        const obj = event.target;
        description = obj.value;
    }

    return (
        <div className="snap-always snap-center bg-white border-t border-gray-100 rounded-lg shadow-md mb-5">
            <input type="text" onChange={(event) => changeTitle(event)} readOnly={!isAmend} className="rounded-t-lg text-center text-2xl border-b p-5 w-full outline-none" defaultValue={info.title}></input>
            <textarea className="p-1 md:p-5 text-lg w-full outline-none resize-none" onChange={(event) => changeDescription(event)} readOnly={!isAmend} defaultValue={info.description}></textarea>
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
                {isAmend ? <button className="bg-red-500 hover:bg-red-600 text-white rounded-lg mx-5 my-3 p-1" data-bs-toggle="modal" data-bs-target={`#${props.id}Modal`}>수정하기</button> : ""}
                <button className="text-blue-300 hover:text-blue-900 rounded-lg mx-5 my-3 p-1">더보기</button>
            </div>

            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id={`${props.id}Modal`} aria-hidden="true">
                <div className="modal-dialog relative w-auto pointer-events-none">
                    <div
                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div
                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">알림</h5>
                            <button type="button"
                                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body relative p-4">
                            수정하시겠습니까?
                        </div>
                        <div
                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                            <button className="bg-red-500 hover:bg-red-600 text-white rounded-lg mx-2 my-3 p-1" data-bs-dismiss="modal">닫기</button>
                            <button className="bg-green-500 hover:bg-green-600 text-white rounded-lg my-3 p-1" data-bs-dismiss="modal" onClick={() => requestAmendContent()}>수정</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentWrapper;