import React, { useContext, useState } from "react";
import { useRef } from "react";
import AmendContext from "../context/amend_status_context";
import PageContext from "../context/page_context";
import UrlContext from "../context/url";
import Modal from "./modal";

function Content(props) {

    const [info, setInfo] = useState(props.info);
    const [isAmend, setAmend] = useContext(AmendContext);
    const changeView = useContext(PageContext);

    const id = info.id;
    const images = info.images;

    const titleRef = useRef();
    const descriptionRef = useRef();

    const host = useContext(UrlContext);
    const url = `${host}/data/content`;

    const requestAmendContent = () => {
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem("access-token"),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                title: titleRef.current.value,
                description: descriptionRef.current.value,
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

    const requestDeleteContent = () => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: localStorage.getItem("access-token"),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                title: titleRef.current.value,
                description: descriptionRef.current.value
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('삭제했습니다. :', data);
                deleteContent(id);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getObj = () => {
        return {
            id: info.id,
            title: titleRef.current?.value ? titleRef.current.value : info.description,
            description: descriptionRef.current?.value ? descriptionRef.current.value : info.description,
            images: []
        };
    }

    const deleteContent = props.deleteContent;

    return (
        <div className="bg-white border-t border-gray-100 rounded-lg shadow-md mb-5">
            {/* title */}
            <input type="text" ref={titleRef} readOnly={!isAmend} className="rounded-t-lg text-center text-gray-800 font-medium text-2xl border-b p-5 w-full outline-none" defaultValue={info.title} placeholder="무슨 제목을 쓸까요?"></input>
            {/* images */}
            <div className="w-full grid grid-cols-2 p-1
                            md:grid-rows-1 md:grid-cols-3 
                            lg:grid-cols-4
                            ">
                {
                    info.images.map((src, index) => {
                        return (
                            <div className={`h-48 md:h-72 lg:h-96 hover:p-0 box-content p-2 ${index > 3 ? "hidden" : ""} md:block`} key={index}>
                                <img className={`rounded-lg border object-cover hover:object-contain w-full h-full`} src={src} alt=""></img>
                            </div>
                        )
                    })
                }
            </div>
            {/* description */}
            {isAmend
                ? <textarea className="p-1 md:p-5 text-md w-full text-gray-800 outline-none resize-none" ref={descriptionRef} readOnly={!isAmend} defaultValue={info.description} placeholder="설명이 비었네요?? 설명을 써주세요!"></textarea>
                : <div className="p-5 text-md w-full outline-none resize-none text-gray-800" ref={descriptionRef}>{info.description}</div>
            }
            <div className="flex justify-end">
                {isAmend ? <button className="bg-gray-400 hover:bg-gray-700 text-white rounded-lg ml-5 my-3 p-1" data-bs-toggle="modal" data-bs-target={`#${props.id}DeleteModal`}>삭제하기</button> : ""}
                {isAmend ? <button className="bg-red-400 hover:bg-red-600 text-white rounded-lg ml-5 my-3 p-1" data-bs-toggle="modal" data-bs-target={`#${props.id}ModifyModal`}>수정하기</button> : ""}
                <button className="text-pink-300 hover:text-pink-900 rounded-lg mx-5 my-3 p-1" onClick={() => {
                    const obj = getObj();
                    changeView(obj, "detail");
                }}>더보기</button>
            </div>
            {isAmend ? <Modal id={`${props.id}DeleteModal`} text={`삭제하시겠습니까?`} functions={requestDeleteContent}></Modal> : ""}
            {isAmend ? <Modal id={`${props.id}ModifyModal`} text={`수정하시겠습니까?`} functions={requestAmendContent}></Modal> : ""}
        </div>
    )
}

export default Content;