import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import DetailInfoContext from "../context/detail_info_context";
import PageContext from "../context/page_context";

function DetailWrapper(props) {

    const contentInfo = useContext(DetailInfoContext);
    const changeView = useContext(PageContext);

    let loading = contentInfo == null;

    useEffect(() => {
        //init
        const image_viewer = document.getElementById("detail_image_view");
        image_viewer.src = ``;
    })

    const clickImageAtList = (event) => {
        const src = event.target.src;
        const image_viewer = document.getElementById("detail_image_view");
        image_viewer.src = src;
    };

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
                <div className="grid content-start grid-cols-3 
                                md:flex-1 md:flex md:flex-wrap md:p-5 md:gap-5
                                overflow-auto scrollbar-hide
                                ">
                    {
                        props.imgSrcs ?
                            props.imgSrcs.map((src, index) => {
                                return (
                                    <div className="relative
                                                md:h-1/4 md:p-2 md:rounded-lg md:shadow md:bg-gray-50
                                                hover:shadow-2xl hover:bg-gray-200 " key={index}>
                                        <input className="absolute top-0 right-0 m-3" type="checkbox"></input>
                                        <img className="h-full md:rounded-lg border border-0 object-fill" src={src} onClick={(event) => clickImageAtList(event)} alt=""></img>
                                    </div>
                                )
                            })
                            : "loading"
                    }
                    <nav className="p-3 col-span-3 invisible md:hidden">sample</nav>
                </div>

            </div>

            <div className="absolute bottom-0 w-full flex rounded-t-lg border bg-blue-100 p-3
                            md:order-first md:rounded-none md:top-0 md:bottom-auto">
                <button>pre</button>
                <nav className="flex-1 text-center">{loading ? "loading" : contentInfo[props.index].title}</nav>
                <button>back</button>
            </div>

            <div className="absolute bottom-10 md:top-10 right-0 p-1
                            md:bottom-0 md:p-3">
                <input className="hidden" type="file" id="additionalImage" multiple onChange={() => alert("사진을 추가하시겠습니까?")}></input>
                <label htmlFor="additionalImage" className="opacity-60 hover:opacity-100 p-2 mr-5 bg-green-200 text-gray-600 rounded-full">사진추가</label>
                <button className="opacity-60 hover:opacity-100 p-2 mr-5 bg-red-200 text-red-500 rounded-full" onClick={() => changeView()}>사진삭제</button>
                <button className="opacity-60 hover:opacity-100 p-2 bg-red-200 text-red-500 rounded-full" onClick={() => changeView()}>back</button>
            </div>
        </div>
    )
}

export default DetailWrapper;