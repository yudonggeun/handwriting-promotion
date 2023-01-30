import React, { useContext } from "react";
import AmendContext from "../context/amend_status_context";
import UrlContext from "../context/url";
import Modal from "./modal";

function Intro(props) {

    const host = useContext(UrlContext);
    const info = props.info;
    let amend_file;

    const [isAmend, setAmend] = useContext(AmendContext);
    const url = `${host}/data/intro`;

    const requestAmendIntro = () => {

        console.log("call", url);
        const formData = new FormData();
        formData.append("file", amend_file);
        formData.append("dto", new Blob([JSON.stringify(info)], { type: "application/json" }));

        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem("access-token")
            },
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
        setAmend(false);
        localStorage.removeItem("access-token");
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
                                : <div name="comments" className="mb-1 w-full bg-transparent outline-none resize-none text-sm lg:text-base font-medium text-gray-900" data-index={index} key={index} >{comment}</div>
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

export default Intro;