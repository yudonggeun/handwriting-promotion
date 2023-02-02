import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import API from "../config/urlConfig";
import AmendContext from "../context/amend_status_context";
import DetailInfoContext from "../context/detail_info_context";
import PageContext from "../context/page_context";

function DetailWrapper(props) {

    const contentInfo = useContext(DetailInfoContext);
    const changeView = useContext(PageContext);
    const [isAmend, setAmend] = useContext(AmendContext);
    const [imgList, setImageList] = useState(contentInfo.images);

    const imageView = useRef();
    const imageWapper = useRef();

    const deleteImageSet = new Set();

    useEffect(() => {
        //init
        const image_viewer = imageView.current;
        image_viewer.src = ``;
        setImageList(contentInfo.images);
    })

    const changeImageList = (array) => {
        contentInfo.images = array;
        setImageList([]);
    }

    const requestImageSrouces = async (id) => {

        return await fetch(API.CONTENT_IMAGE + "?content_id=" + id)
            .then((response) => response.json())
            .catch((e) => {
                console.log(e);
                alert("오류 발생");
            });
    }

    const requestAddDetailImage = async () => {
        const formData = new FormData(document.getElementById("detail_form"));

        fetch(`${API.IMAGE_CHANGE}/${contentInfo.id}`, {
            method: 'PUT',
            headers: {
                Authorization: localStorage.getItem("access-token")
            },
            body: formData
        })
            .then((response) => response.json())
            .then(async (data) => {
                console.log('Success:', data);
                const newImgList = await requestImageSrouces(contentInfo.id);
                console.log(newImgList);
                changeImageList(newImgList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const requestDeleteImage = () => {

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
                console.log('Success:', data);
                const newImgList = await requestImageSrouces(contentInfo.id);
                changeImageList(newImgList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const clickBackButton = () => {
        imageWapper.current.hidden = true;
        imageView.current.hidden = true;        
        changeView(null, "main")
    }

    return (
        <div id="detailLayout" className="relative flex flex-col w-full h-full" hidden={true}>
            <div className="flex-1 grid grid-cols-1 grid-cols-2 overflow-auto  
                            md:flex md:mt-10">

                <div ref={imageWapper} hidden={true} className="md:w-6/12 lg:w-5/12 xl:4/12 2xl:3/12 
                                md:order-last md:p-5 md:py-[40px] md:px-[32px]
                                overflow-hidden
                                flex justify-center
                                ">
                    {/* sample image viewer */}
                    <img ref={imageView}
                        className="h-fit max-h-full 
                                   object-contain
                                   rounded-md md:shadow-2xl
                                   md:ring-0 md:ring-offset-[19px] md:ring-black md:border-gray-900
                                   " src="" alt="" hidden={true}></img>
                    {/* <div className="max-h-full bg-white grid gap-5 justify-center rounded-md md:shadow-lg md:border py-5 md:px-5">
                        <img ref={imageView} className="max-h-full object-contain md:border" src="" alt=""></img>
                    </div> */}
                </div>
                <form
                    id="imageListView"
                    className="grid content-start grid-cols-3 grid-rows-3
                                md:flex-1 md:flex md:flex-wrap md:p-5 md:gap-5
                                overflow-auto scrollbar-hide
                                ">
                    {
                        imgList ?
                            imgList.map((src, index) => {
                                return (
                                    <ImageComponent key={src} src={src} wapper={imageWapper.current} element={imageView.current} deleteImageSet={deleteImageSet} />
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
                            bg-red-100 p-3
                            md:order-first md:rounded-b-[10px] md:rounded-t-none md:top-0 md:bottom-auto">
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
                        md:h-1/4 md:p-2 md:rounded-lg md:shadow md:bg-gray-50
                        hover:bg-gray-100 ">
            {
                isAmend ? <input className="absolute top-0 right-0 m-3" type="checkbox" value={props.src} onClick={(event) => clickCheckBox(event)}></input> : ""
            }
            <img className="h-full w-full md:rounded-lg border border-0 object-contain" src={props.src} onClick={(event) => clickImageAtList(event)} alt=""></img>
        </div>
    )
}

export default DetailWrapper;