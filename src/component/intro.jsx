import React, { useContext } from "react";
import AmendContext from "../context/amend_status_context";
import Modal from "./modal";

function Intro(props) {

    const mainPageChangeUrl = "/api/data/intro"
    const info = props.info;
    let amend_file;
    console.log("info : " ,info)

    const [isAmend, setAmend] = useContext(AmendContext);

    const requestAmendIntro = () => {

        const formData = new FormData();
        formData.append("file", amend_file);
        formData.append("dto", new Blob([JSON.stringify(info)], { type: "application/json" }));

        fetch(mainPageChangeUrl, {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem("access-token")
            },
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== "success") {
                    alert(`수정이 실패했습니다. 다시 실행해보시고 관리자에게 문의하세요.`);
                }
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
        console.log("object: ", obj.value)
        info.description = obj.value;
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

        info.imageUrl = file.name;
        img.src = url;
        amend_file = file;
    };

    const callModal = (id) => {
        const modal = document.getElementById(id);
        modal.classList.remove("hidden");
    }


    return (
        <div className="relative h-1/2 md:h-1/4 md:flex mb-5">
            <div className="p-5 h-4/6 md:h-full md:flex-1 flex justify-center">
                <img id="introImage" src={info.imageUrl} alt="" className="h-full"></img>
            </div>

            <div className=" md:h-full md:w-2/5 p-5">
                {
                    isAmend ? <textarea name="comments" className="mb-1 w-full bg-transparent outline-none resize-none" onChange={(event) => changeInfoComment(event)} readOnly={!isAmend} defaultValue={info.description}></textarea>
                        : <div name="comments" className="mb-1 w-full bg-transparent outline-none resize-none text-sm lg:text-base font-medium text-gray-900">{info.description}</div>
                }
            </div>
            {isAmend ?
                <div className="absolute w-30 h-30 right-0 bottom-0 opacity-30 hover:opacity-100">
                    <input id="imageChangeInput" name="file" type="file" className="hidden" onChange={(event) => preview(event)}></input>
                    <label htmlFor="imageChangeInput" className="bg-red-500 hover:bg-red-600 text-white rounded-lg ml-2 my-3 px-1 py-1.5">이미지 사진 변경</label>
                    <button className="bg-red-500 hover:bg-red-600 text-white rounded-lg ml-2 my-3 p-1"
                        data-bs-toggle="modal"
                        onClick={() => callModal(`${props.id}Modal`)}
                    >수정하기</button>
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