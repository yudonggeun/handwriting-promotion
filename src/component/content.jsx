import React, { useState } from "react";

const infroInfo = {
    image: `${process.env.PUBLIC_URL}/images/calligraphy-g9ada6110c_1920.png`,
    comments: [
        "요즘 학생들의 글씨체는 본인도 알아 볼 수 없을 만큼 바르지 못합니다. 마우스와 키보드에 익숙하기 때문입니다.",
        "글씨체를 바로 잡음으로서 산만함을 약화시키고 집중력을 가지게 해 줄 수 있습니다."
    ]
}


const contentInfos = [
    {
        title: "캘리그라피를 배워보세요~~!!",
        description: "캘리그라피 어쩌구 설명을 적어요        캘리그라피 어쩌구 설명을 적어요        캘리그라피 어쩌구 설명을 적어요",
        images: [
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",

            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg"
        ]
    },
    {
        title: "캘리그라피를 배워보세요~~!!",
        description: "캘리그라피 어쩌구 설명을 적어요        캘리그라피 어쩌구 설명을 적어요        캘리그라피 어쩌구 설명을 적어요",
        images: [
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",

            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg"
        ]
    },
    {
        title: "캘리그라피를 배워보세요~~!!",
        description: "캘리그라피 어쩌구 설명을 적어요        캘리그라피 어쩌구 설명을 적어요        캘리그라피 어쩌구 설명을 적어요",
        images: [
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",

            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg",
            "https://daonfont.com/upload_files/board/board_32//202109/16312427891.jpg"
        ]
    }
];

function ContentWrapper(props) {

    const [infos, setInfo] = useState(contentInfos);

    console.log(infos);

    return (
        <div className="relative w-full h-full">
            <div className="flex flex-col w-full h-full">
                <Intro />
                <div className="overflow-auto flex-1 w-full p-2 md:p-5">
                    <h2 className="text-2xl bg-white rounded-lg mb-2 md:mb-5 p-2">무엇을 배우나요?</h2>
                    {
                        infos.map((obj, index) => {
                            return (
                                <Content info={obj} key={index} />
                            )
                        })
                    }
                    <div className="text-right p-2 md:p-5 md:text-xl text-gray-600">
                        문의 전화 010-9189-3254
                    </div>
                </div>
            </div>
            <div className="absolute right-0 bottom-0 flex flex-col w-fit m-2">
                <button className="p-1 rounded-lg bg-blue-200 hover:bg-blue-300 opacity-50 mb-2">top</button>
                <button className="p-1 rounded-lg bg-blue-200 hover:bg-blue-300 opacity-50">up</button>
            </div>
        </div>
    )
}

function Intro(props) {

    const info = infroInfo;

    return (
        <div className="h-1/4 flex md:flex-row">
            <div className="p-5 h-full md:flex-1">
                <img src={info.image} alt="" className="h-full"></img>
            </div>
            <div className="hidden md:h-full md:w-2/5 p-5">
                {
                    info.comments.map((comment, index) => {
                        return (
                            <p className="mb-1">
                                {comment}
                            </p>
                        )
                    })
                }
            </div>
        </div>
    )
}

function Content(props) {

    const info = props.info;

    console.log(info);
    return (
        <div className="bg-white border-t border-gray-100 rounded-lg shadow-md mb-5">
            <h3 className="text-center text-2xl border-b p-5">{info.title}</h3>
            <p className="p-1 md:p-5 text-lg">{info.description}
            </p>
            <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-1 gap-1">
                {
                    info.images.map((src, index) => {
                        return (
                            <img className={`rounded-lg border ${index > 3 ? "sm:hidden md:inline" : ""}`} src={src} key={index} alt=""></img>
                        )
                    })
                }
            </div>
            <div className="flex justify-end">
                <button className="text-blue-300 hover:text-blue-900 rounded-lg mx-5 my-3 p-1">더보기</button>
            </div>
        </div>
    )
}

export default ContentWrapper;