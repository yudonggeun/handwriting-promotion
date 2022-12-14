import React, { useContext, useEffect, useState } from "react";
import AmendContext from "../context/amend_status_context";
import DetailInfoContext from "../context/detail_info_context";
import PageContext from "../context/page_context";
import UrlContext from "../context/url";

function ContentWrapper(props) {

    const loadingContent = {
        id: -1,
        title: "로딩",
        description: "로딩",
        images: []
    };
    const loadingIntro = {
        image: "no_image.png",
        comments: ["로딩"]
    }

    const host = useContext(UrlContext);
    const contentInfos = useContext(DetailInfoContext);

    const [introInfo, setIntroInfo] = useState(loadingIntro);
    const introInfosURL = `${host}/data/intro`;
    const isAmend = useContext(AmendContext);
    let loading = contentInfos == null || introInfo == null;

    const requestIntroInfos = () => {
        fetch(introInfosURL)
            .then((response) => response.json())
            .then((data) => {
                setIntroInfo(data);
            }).catch((e) => {
                console.log(e);
                alert("오류 발생");
            });
    }

    let count = 0;
    const loginPage = () => {
        count++;
        if (count === 5) {
            window.location.href = `${host}/login`;
        }
    }
    useEffect(() => {
        requestIntroInfos();
    }, []);

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
        if (contentInfos?.length)
            upButton.addEventListener("click", backToUp);

        function backToTop() {
            target.scrollTop = 0;
        }

        //한번 클릭시 컴포넌트 하나씩 올라가도록
        function backToUp() {
            const count = contentInfos.length;
            target.scrollTop = (target.scrollTop - ((target.scrollHeight - target.clientHeight) / count));
        }
    }, [loading])

    return (
        <div className="relative w-full h-full bg-gradient-to-b from-green-100 to-white overflow-y-auto scrollbar-hide" >
            <div className="flex flex-col w-full h-full">
                <Intro info={introInfo} />
                <div id="contentArea" className="lg:snap-y lg:snap-mandatory md:overflow-auto md:scrollbar-hide flex-1 w-full px-2 py-5 md:p-5">
                    <h2 className="text-2xl text-center md:text-left bg-white rounded-lg shadow-md mb-2 md:mb-5 p-2">무엇을 배우나요?</h2>
                    {
                        loading
                            ?
                            <Content info={loadingContent} index={0} id={`contentLoading`} />
                            :
                            contentInfos?.map((obj, index) => {
                                return (
                                    <Content info={obj} index={index} key={index} id={`content${index}`} />
                                )
                            })
                    }

                    {
                        isAmend
                            ?
                            <ContentForm />
                            :
                            <div onClick={() => loginPage()} className="text-right p-2 md:p-5 md:text-xl text-gray-600">
                                문의 전화 010-9189-3254
                            </div>
                    }
                </div>
            </div>
            <div className="absolute right-0 bottom-0 flex flex-col w-fit m-2">
                <button id="topButton" className="hidden w-9 h-9 p-1 rounded-full bg-green-200 hover:bg-green-500 hover:opacity-80 text-white opacity-50 mb-2">top</button>
                <button id="upButton" className="hidden w-9 h-9 p-1 rounded-full bg-green-200 hover:bg-green-500 hover:opacity-80 text-white opacity-50">up</button>
            </div>
        </div>
    )
}

function ContentForm(props) {

    const host = useContext(UrlContext);
    const [update, setUpdate] = useState(1);

    const [images, setImages] = useState([]);
    var title = "";
    var description = "";

    const inputTitle = (event) => {
        title = event.target.value;
    }

    const inputDescription = (event) => {
        description = event.target.value;
    }

    const readURL = file => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = e => res(e.target.result);
            reader.onerror = e => rej(e);
            reader.readAsDataURL(file);
        });
    };

    const rerender = () => {
        setUpdate(update ^ 1);
    }

    const addImages = async (event) => {
        const files = event.target.files;
        const fileCount = event.target.files.length;
        const newImage = [];

        for (var i = 0; i < fileCount; i++) {
            const url = await readURL(files[i]);
            // images.push(url);
            newImage.push(url);
        }
        setImages(newImage);
        rerender();
    }

    const requestCreateDetail = async () => {
        const url = `${host}/data/content`;
        console.log("call", url);

        if (title === "") {
            alert("제목은 필수로 입력해야합니다.");
            return;
        }

        const formData = new FormData(document.getElementById("new_content_form"));
        formData.append("dto", new Blob([JSON.stringify({
            title: title,
            description: description
        })], { type: "application/json" }));

        fetch(url, {
            method: 'PUT',
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                document.getElementById("new_content_title").value = "";
                document.getElementById("new_content_description").value = "";
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="snap-always snap-center bg-white border-t border-gray-100 rounded-lg shadow-md mb-5">
            <input id="new_content_title" type="text" placeholder="제목을 입력하세요."
                className="rounded-t-lg text-center text-2xl border-b p-5 w-full outline-none"
                onChange={event => inputTitle(event)}></input>

            <textarea id="new_content_description" placeholder="설명을 입력하세요."
                className="p-1 md:p-5 text-md w-full outline-none resize-none"
                onChange={event => inputDescription(event)}></textarea>

            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-1">
                {
                    images.map((src, index) => {
                        return (
                            <div className={`hover:p-0 box-content p-2 ${index > 3 ? "hidden" : ""} md:block`} key={index}>
                                <img className={`rounded-lg border`} src={src} alt=""></img>
                            </div>
                        )
                    })
                }
            </div>

            <div className="flex justify-end">
                <form id="new_content_form" className="bg-green-500 hover:bg-green-600 rounded-lg mx-2 my-3 p-1">
                    <label htmlFor="new_content_images"
                        className="text-white">파일 추가</label>
                    <input id="new_content_images" name="image" type="file" multiple hidden onChange={(event) => addImages(event)}></input>
                </form>
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg mr-5 ml-2 my-3 p-1" onClick={() => requestCreateDetail()}>새로운 홍보글 추가</button>
            </div>
        </div>
    )
}

function Intro(props) {

    const host = useContext(UrlContext);
    const info = props.info;
    let amend_file;

    const [reload, setReload] = useState(false);
    const isAmend = useContext(AmendContext);
    const url = `${host}/data/intro`;

    const requestAmendIntro = () => {

        console.log("call", url);
        const formData = new FormData();
        formData.append("file", amend_file);
        formData.append("dto", new Blob([JSON.stringify(info)], { type: "application/json" }));

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    async function requestLogout() {
        await fetch(`${host}/admin/logout`)
            .then(() => setReload(!reload));
    }

    const changeInfoComment = (event) => {
        const obj = event.target;
        const comments = info.comments;
        const index = obj.dataset.index;
        comments[index] = obj.value;
    }

    const readURL = file => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = e => res(e.target.result);
            reader.onerror = e => rej(e);
            reader.readAsDataURL(file);
        });
    };

    const preview = async event => {
        const file = event.target.files[0];
        const url = await readURL(file);
        const img = document.getElementById("introImage");

        info.image = file.name;
        img.src = url;
        amend_file = file;
    };

    return (
        <div className="relative h-1/2 md:h-1/4 md:flex mb-5">
            <div className="p-5 h-4/6 md:h-full md:flex-1 flex justify-center">
                <img id="introImage" src={info.image} alt="" className="h-full"></img>
            </div>

            <div className=" md:h-full md:w-2/5 p-5">
                {
                    info.comments.map((comment, index) => {
                        return (
                            isAmend
                                ? <textarea name="comments" className="mb-1 w-full bg-transparent outline-none resize-none" onChange={(event) => changeInfoComment(event)} data-index={index} readOnly={!isAmend} key={index} defaultValue={comment}></textarea>
                                : <div name="comments" className="mb-1 w-full bg-transparent outline-none resize-none" data-index={index} key={index} >{comment}</div>
                        )
                    })
                }
            </div>
            {isAmend ?
                <div className="absolute w-30 h-30 right-0 bottom-0 opacity-30 hover:opacity-100">
                    <input id="imageChangeInput" name="file" type="file" className="hidden" onChange={(event) => preview(event)}></input>
                    <label htmlFor="imageChangeInput" className="bg-red-500 hover:bg-red-600 text-white rounded-lg ml-2 my-3 px-1 py-1.5">이미지 사진 변경</label>
                    <button className="bg-red-500 hover:bg-red-600 text-white rounded-lg ml-2 my-3 p-1" data-bs-toggle="modal" data-bs-target={`#${props.id}Modal`}>수정하기</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white rounded-lg mx-2 my-3 p-1" onClick={() => requestLogout()}>로그아웃</button>
                </div>
                : ""}

            {isAmend
                ? <Modal id={`${props.id}Modal`} text={`수정하시겠습니까?`} functions={requestAmendIntro}></Modal>
                : ""
            }
        </div>
    )
}

function Content(props) {

    const [info, setInfo] = useState(props.info);
    const isAmend = useContext(AmendContext);
    const changeView = useContext(PageContext);

    const id = info.id;
    const images = info.images;
    let title = info.title;
    let description = info.description;

    const host = useContext(UrlContext);
    const url = `${host}/data/content`;

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
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-1">
                {
                    info.images.map((src, index) => {
                        return (
                            <div className={`hover:p-0 box-content p-2 ${index > 3 ? "hidden" : ""} md:block`} key={index}>
                                <img className={`rounded-lg border`} src={src} alt=""></img>
                            </div>
                        )
                    })
                }
            </div>
            {isAmend
                ? <textarea className="p-1 md:p-5 text-md w-full outline-none resize-none" onChange={(event) => changeDescription(event)} readOnly={!isAmend} defaultValue={info.description}></textarea>
                : <div className="p-5 text-md w-full outline-none resize-none">{info.description}</div>
            }
            <div className="flex justify-end">
                {isAmend
                    ? <button className="bg-red-500 hover:bg-red-600 text-white rounded-lg mx-5 my-3 p-1" data-bs-toggle="modal" data-bs-target={`#${props.id}Modal`}>수정하기</button>
                    : ""}
                <button className="text-blue-300 hover:text-blue-900 rounded-lg mx-5 my-3 p-1" onClick={() => changeView(props.index)}>더보기</button>
            </div>

            {isAmend
                ? <Modal id={`${props.id}Modal`} text={`수정하시겠습니까?`} functions={requestAmendContent}></Modal>
                : ""
            }
        </div>
    )
}

function Modal(props) {

    const id = props.id + "modal";
    const alarm_text = props.text;
    const functions = props.functions;

    return (
        <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id={id} aria-hidden="true">
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
                        {alarm_text}
                    </div>
                    <div
                        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                        <button className="bg-red-500 hover:bg-red-600 text-white rounded-lg mx-2 my-3 p-1" data-bs-dismiss="modal">닫기</button>
                        <button className="bg-green-500 hover:bg-green-600 text-white rounded-lg my-3 p-1" data-bs-dismiss="modal" onClick={() => functions()}>확인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentWrapper;