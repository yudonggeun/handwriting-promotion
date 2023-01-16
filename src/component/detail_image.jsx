import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import AmendContext from "../context/amend_status_context";
import DetailInfoContext from "../context/detail_info_context";
import PageContext from "../context/page_context";
import UrlContext from "../context/url";

function DetailWrapper(props) {

    const host = useContext(UrlContext);
    const contentInfo = useContext(DetailInfoContext);
    const changeView = useContext(PageContext);
    const isAmend = useContext(AmendContext);
    const [imgList, setImageList] = useState(props.imgSrcs);

    const deleteImageSet = new Set();

    let loading = contentInfo == null;

    useEffect(() => {
        //init
        const image_viewer = document.getElementById("detail_image_view");
        image_viewer.src = ``;
    })

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

    const requestAddDetailImage = async () => {
        const url = `${host}/data/detail/${contentInfo[props.index].id}`;
        const formData = new FormData(document.getElementById("detail_form"));

        console.log("call", url);

        fetch(url, {
            method: 'PUT',
            body: formData
        })
            .then((response) => response.json())
            .then(async (data) => {
                console.log('Success:', data);
                const newImgList = await requestImageSrouces(contentInfo[props.index].id);
                setImageList(newImgList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const requestDeleteImage = () => {
        const url = `${host}/data/detail/${contentInfo[props.index].id}`;
        console.log("call", url);

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                files: Array.from(deleteImageSet)
            })
        })
            .then((response) => response.json())
            .then(async (data) => {
                console.log('Success:', data);
                const newImgList = await requestImageSrouces(contentInfo[props.index].id);
                setImageList(newImgList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="relative flex flex-col w-full h-full">
            <div className="flex-1 grid grid-cols-1 overflow-auto  
                            md:flex md:mt-10">

                <div className="md:w-6/12 lg:w-5/12 xl:4/12 2xl:3/12 h-fit
                                md:order-last md:p-5
                                grid place-content-stretch
                                
                                overflow-auto" >
                    <div className="bg-white grid gap-5 justify-center content-start rounded-lg shadow-lg border py-5">
                        <img id="detail_image_view" src="" alt=""></img>
                    </div>
                </div>
                <form
                    id="imageListView"
                    className="grid content-start grid-cols-3 
                                md:flex-1 md:flex md:flex-wrap md:p-5 md:gap-5
                                overflow-auto scrollbar-hide
                                ">
                    {
                        imgList ?
                            imgList.map((src, index) => {
                                return (
                                    <ImageComponent key={index} src={src} deleteImageSet={deleteImageSet} />
                                )
                            })
                            : "loading"
                    }
                    <nav className="p-3 col-span-3 invisible md:hidden">sample</nav>
                </form>

            </div>

            <div className="absolute bottom-0 w-full flex rounded-t-lg border bg-blue-100 p-3
                            md:order-first md:rounded-none md:top-0 md:bottom-auto">
                {/* <button>pre</button> */}
                <nav className="flex-1 text-center">{loading ? "loading" : contentInfo[props.index].title}</nav>
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
                <button type="button" className="opacity-60 hover:opacity-100 p-2 bg-red-200 text-red-500 rounded-full" onClick={() => changeView(null, "main")}>back</button>
            </form>
        </div>
    )
}

function ImageComponent(props) {

    const deleteImageSet = props.deleteImageSet;
    const isAmend = useContext(AmendContext);

    const clickImageAtList = (event) => {
        const src = event.target.src;
        const image_viewer = document.getElementById("detail_image_view");
        image_viewer.src = src;
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
                        hover:shadow-2xl hover:bg-gray-200 ">
            {
                isAmend ? <input className="absolute top-0 right-0 m-3" type="checkbox" value={props.src} onClick={(event) => clickCheckBox(event)}></input> : ""
            }
            <img className="h-full md:rounded-lg border border-0 object-fill" src={props.src} onClick={(event) => clickImageAtList(event)} alt=""></img>
        </div>
    )
}

export default DetailWrapper;