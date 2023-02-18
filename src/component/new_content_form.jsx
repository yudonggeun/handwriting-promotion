import { useContext, useRef } from "react";
import { useState } from "react";
import API from "../config/urlConfig";
import LoadingContext from "../context/loading_context";
import ImageUtil from "../util/image_util"



function ContentForm(props) {

    const [update, setUpdate] = useState(1);
    const [images, setImages] = useState([]);

    const changeLoading = useContext(LoadingContext);

    const formRef = useRef();
    const titleRef = useRef();
    const detailRef = useRef();
    const fileRef = useRef();
    const compressFileRef = useRef();

    //functions
    const addContent = props.addContent;

    const rerender = () => {
        setUpdate(update ^ 1);
    }

    const fileOnChange = async () => {
        addImages();
        const compressFiles = await ImageUtil.handleImageUpload(fileRef.current);
        compressFileRef.current.files = compressFiles;
    }

    const addImages = async () => {
        const files = fileRef.current.files;
        const fileCount = fileRef.current.files.length;
        const newImage = [];

        console.log("add", files);

        for (var i = 0; i < fileCount; i++) {
            const url = await ImageUtil.readURL(files[i]);
            newImage.push(url);
        }
        setImages(newImage);
        rerender();
    }

    const requestCreateDetail = async (createSuccessProcessFuntion) => {

        if (titleRef.current.value === "") {
            alert("제목은 필수로 입력해야합니다.");
            return;
        }

        console.log("file len : ", fileRef.current.files.length)
        const formData = fileRef.current.files.length === 0 ? new FormData() : new FormData(formRef.current);
        formData.append("dto", new Blob([JSON.stringify({
            title: titleRef.current.value,
            description: detailRef.current.value
        })], { type: "application/json" }));

        changeLoading(true);
        fetch(API.CONTENT_CHANGE, {
            method: 'PUT',
            headers: {
                Authorization: localStorage.getItem("access-token")
            },
            body: formData
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status === "success") {
                    createSuccessProcessFuntion(response.data);
                } else {
                    alert(`PUT ${API.CONTENT_CHANGE} : 홍보글 등록이 실패했습니다. 다시 실행해보시고 관리자에게 문의하세요.`);
                }
                changeLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                changeLoading(false);
            });
    }


    const createSuccessProcessFuntion = (obj) => {
        //양식 초기화
        titleRef.current.value = "";
        detailRef.current.value = "";
        console.log("form reset", formRef.current);
        console.log(formRef.current.reset());
        formRef.current.reset();
        setImages([]);
        //contentInfos 추가
        console.log("create success : ", obj);
        addContent(obj);
    }

    return (
        <div className="snap-always snap-center bg-white border-t border-gray-100 rounded-lg shadow-md mb-5 order-last">
            <input type="text" placeholder="제목을 입력하세요." ref={titleRef}
                className="rounded-t-lg text-center text-2xl border-b p-5 w-full outline-none"></input>

            <textarea placeholder="설명을 입력하세요." ref={detailRef}
                className="p-1 md:p-5 text-md w-full outline-none resize-none"></textarea>

            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-1">
                {
                    images ?
                        images.map((src, index) => {
                            return (
                                <div className={`hover:p-0 box-content p-2 ${index > 3 ? "hidden" : ""} md:block`} key={index}>
                                    <img className={`rounded-lg border`} src={src} alt=""></img>
                                </div>
                            )
                        })
                        : ""
                }
            </div>

            <div className="flex justify-end">
                <form className="bg-green-500 hover:bg-green-600 rounded-lg mx-2 my-3 p-1" ref={formRef}>
                    <label htmlFor="new_content_images"
                        className="text-white">파일 추가</label>
                    <input id="new_content_images" name="image" type="file" multiple ref={fileRef} hidden onChange={() => fileOnChange()}></input>
                    <input name="compressImage" type="file" multiple ref={compressFileRef} hidden></input>
                </form>
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg mr-5 ml-2 my-3 p-1" onClick={() => requestCreateDetail(createSuccessProcessFuntion)}>새로운 홍보글 추가</button>
            </div>
        </div>
    )
}

export default ContentForm;