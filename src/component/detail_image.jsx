import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import DetailInfoContext from "../context/detail_info_context";
import PageContext from "../context/page_context";

const contentInfosURL = `${window.location.origin}/data/content/image`;

function DetailWrapper(props) {

    const contentInfo = useContext(DetailInfoContext);
    const changeView = useContext(PageContext);
    const [imageSrcs, setImageSources] = useState([]);

    let loading = contentInfo == null;

    const requestImageSrouces = () => {
        fetch(contentInfosURL + "?content_id=" + contentInfo[props.index].id)
            .then((response) => response.json())
            .then((data) => {
                setImageSources(data);
            }).catch((e) => {
                console.log(e);
                alert("오류 발생");
            });
    }

    useEffect(() => {
        requestImageSrouces();
    }, []);


    // const temper_src = [
    //     "https://mblogthumb-phinf.pstatic.net/20111129_250/stupidpark_1322533136260BDN70_JPEG/1322324832103.jpg?type=w2",
    //     "https://storage.googleapis.com/jjalbot/2018/12/qXdIxpDVf/zzal.jpg",
    //     "https://mblogthumb-phinf.pstatic.net/MjAxOTA0MTFfMTYg/MDAxNTU0OTY0NDE2ODA5.ITBUEU5NSHZWsfuG8qpH3fqyS0V481X7w1ru5Eqh-z4g.CRGPgC-rGAw4FFk5eX5v7wMYYbFdAfgyyCt4A-xuiAEg.GIF.goproblem/1548256753.gif?type=w2"
    // ];

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
                        imageSrcs.map((src, index) => {
                            return (
                                <div className=" 
                                                md:h-1/4 md:p-2 md:rounded-lg md:shadow md:bg-gray-50
                                                hover:shadow-2xl hover:bg-gray-200 " key={index}>
                                    <img className="h-full md:rounded-lg border border-0 object-fill" src={src} onClick={(event) => clickImageAtList(event)} alt=""></img>
                                </div>
                            )
                        })
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
                <button className="opacity-60 hover:opacity-100 p-2 bg-red-200 text-red-500 rounded-full" onClick={() => changeView()}>back</button>
            </div>
        </div>
    )
}


export default DetailWrapper;