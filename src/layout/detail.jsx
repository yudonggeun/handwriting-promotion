import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import API from "../config/urlConfig";
import AmendContext from "../context/amend_status_context";
import DetailInfoContext from "../context/detail_info_context";
import LoadingContext from "../context/loading_context";
import PageContext from "../context/page_context";

function DetailWrapper(props) {

    const contentInfo = useContext(DetailInfoContext);
    const changeView = useContext(PageContext);
    const [isAmend, setAmend] = useContext(AmendContext);
    const setLoading = useContext(LoadingContext);

    const [imgList, setImageList] = useState(contentInfo.images);

    const imageView = useRef();
    const imageWapper = useRef();
    const imageListView = useRef();

    const deleteImageSet = new Set();

    useEffect(() => {
        //init
        const image_viewer = imageView.current;
        image_viewer.src = ``;
        setImageList(contentInfo.images);
    })

    const changeImageViewHeight = (heightRate) => {
        imageWapper.current.classList.remove("hidden");
        console.log(document.body.clientHeight * heightRate / 100)
        //md 사이즈 미만에서만 적용
        if (document.body.clientWidth < 768) {
            console.log("md 이하");
            imageListView.current.classList.replace("h-full", "h-1/2");
        }
    }

    const changeImageList = (array) => {
        contentInfo.images = array;
        setImageList([]);
    }

    const requestImageSrouces = async (id) => {
        setLoading(true);
        return await fetch(API.CONTENT_IMAGE + "?content_id=" + id)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    return data.data;
                } else {
                    alert(`GET ${API.CONTENT_IMAGE} : 홍보 이미지 목록 조회가 실패했습니다. 다시 실행해보시고 관리자에게 문의하세요.`);
                }
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                alert("오류 발생");
                setLoading(false);
            });
    }

    const requestAddDetailImage = async () => {
        const formData = new FormData(document.getElementById("detail_form"));

        setLoading(true);
        fetch(`${API.IMAGE_CHANGE}/${contentInfo.id}`, {
            method: 'PUT',
            headers: {
                Authorization: localStorage.getItem("access-token")
            },
            body: formData
        })
            .then((response) => response.json())
            .then(async (data) => {
                if (data.status === "success") {
                    const newImgList = await requestImageSrouces(contentInfo.id);
                    changeImageList(newImgList);
                } else {
                    alert(`PUT ${API.IMAGE_CHANGE}/${contentInfo.id} : 이미지 등록이 실패했습니다. 다시 실행해보시고 관리자에게 문의하세요.`);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error:', error);
            });
    }

    const requestDeleteImage = () => {

        setLoading(true);
        fetch(`${API.IMAGE_CHANGE}/${contentInfo.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: localStorage.getItem("access-token"),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                files: Array.from(deleteImageSet)
            })
        })
            .then((response) => response.json())
            .then(async (data) => {
                if (data.status === "success") {
                    const newImgList = await requestImageSrouces(contentInfo.id);
                    changeImageList(newImgList);
                } else {
                    alert(`DELETE ${API.IMAGE_CHANGE}/${contentInfo.id} : 이미지 삭제가 실패했습니다. 다시 실행해보시고 관리자에게 문의하세요.`);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }

    const clickBackButton = () => {
        imageWapper.current.classList.add("hidden");
        imageWapper.current.hidden = true;
        imageView.current.hidden = true;
        changeView(null, "main")
    }

    return (
        <div id="detailLayout" className="relative flex flex-col w-full h-full bg-pink-100/50" hidden={true}>
            <div className="flex-1 overflow-auto
                            md:flex md:mt-10">
                {/* 이미지 뷰어 */}
                <div ref={imageWapper} hidden={true} className="
                                bg-white md:bg-white/0
                                h-1/2 md:h-fit hidden
                                md:w-6/12 lg:w-5/12 xl:4/12 2xl:3/12 
                                md:order-last md:p-5 md:py-[40px] md:px-[32px]
                                overflow-hidden
                                flex justify-center
                                ">
                    {/* sample image viewer */}
                    <img ref={imageView}
                        className="h-full max-h-full 
                                   object-contain
                                   md:h-fit
                                   md:rounded-md md:shadow-2xl
                                   md:ring-0 md:ring-offset-[19px] md:ring-black md:border-gray-900
                                   " src="" alt="" hidden={true}></img>
                    {/* <div className="max-h-full bg-white grid gap-5 justify-center rounded-md md:shadow-lg md:border py-5 md:px-5">
                        <img ref={imageView} className="max-h-full object-contain md:border" src="" alt=""></img>
                    </div> */}
                </div>
                {/* 이미지 목록 */}
                <form
                    ref={imageListView}
                    className="
                            h-full
                            md:h-full
                            grid content-start grid-cols-3
                            md:flex-1 md:flex md:flex-wrap md:p-5 md:gap-5
                            overflow-auto scrollbar-hide
                            ">
                    {
                        imgList ?
                            imgList.map((src, index) => {
                                return (
                                    <ImageComponent key={src} src={src}
                                        wapper={imageWapper.current}
                                        element={imageView.current}
                                        deleteImageSet={deleteImageSet}
                                        changeImageViewHeight={changeImageViewHeight} />
                                )
                            })
                            : "loading"
                    }
                </form>

            </div>
            {/* 네이게이션 바 */}
            <div className="absolute bottom-0 
                            w-full flex 
                            rounded-t-[20px]
                            bg-red-100 hover:bg-pink-200
                            p-3
                            md:order-first md:rounded-b-[10px] md:rounded-t-none md:top-0 md:bottom-auto
                            ">
                {/* <button>pre</button> */}
                <nav className="flex-1 text-center font-medium text-gray-600">{contentInfo.title}</nav>
                {/* <button>back</button> */}
            </div>

            <form id="detail_form" className="absolute bottom-10 md:top-10 right-0 p-1
                            md:bottom-0 md:p-3">
                <input className="hidden" type="file" name="image" id="additionalImage" multiple onChange={() => requestAddDetailImage()}></input>
                {
                    isAmend ?
                        <label htmlFor="additionalImage" className="opacity-60 hover:opacity-100 p-2 mr-5 bg-green-200 text-gray-600 rounded-full">사진추가</label> : ""
                }{
                    isAmend ? <button type="button" className="opacity-60 hover:opacity-100 p-2 mr-5 bg-red-200 text-red-500 rounded-full" onClick={() => requestDeleteImage()}>사진삭제</button>
                        : ""
                }
                <button type="button" className="opacity-60 hover:opacity-100 p-2 bg-red-200 text-red-500 rounded-full" onClick={() => clickBackButton()}>back</button>
            </form>
        </div>
    )
}

function ImageComponent(props) {

    const deleteImageSet = props.deleteImageSet;
    const [isAmend, setAmend] = useContext(AmendContext);

    const clickImageAtList = () => {
        props.wapper.hidden = false;
        props.element.hidden = false;
        props.element.src = props.src;
        props.changeImageViewHeight(100);
    };

    const clickCheckBox = (event) => {
        const checkbox = event.target;
        if (checkbox.checked) {
            deleteImageSet.add(checkbox.value);
        } else {
            deleteImageSet.delete(checkbox.value);
        }
        console.log(deleteImageSet);
    }

    return (
        <div className="relative
                        h-32
                        md:h-1/4 md:p-2 md:rounded-lg md:shadow md:bg-gray-50
                        ">
            {
                isAmend ? <input className="absolute top-0 right-0 m-3" type="checkbox" value={props.src} onClick={(event) => clickCheckBox(event)}></input> : ""
            }
            <img className="h-full w-full 
                            rounded-lg md:rounded-lg 
                            border border-1 hover:border-pink-500
                            object-cover" src={props.src} onClick={(event) => clickImageAtList(event)} alt=""></img>
        </div>
    )
}

export default DetailWrapper;