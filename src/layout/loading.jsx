import React from "react";

function Loading() {
    return (
        <div className="absolute z-10 w-full h-full bg-gradient-to-b from-red-400/100 to-white/80  grid content-center">
            <div className="w-full flex justify-center">
                <img className="justify-self-center" src={`${process.env.PUBLIC_URL}/images/loading_spin.gif`} alt="로딩중" />
            </div>
            <h2 className="text-2xl text-center text-gray-800 font-bold">로딩 중입니다.</h2>
            <h2 className="text-sm text-center text-gray-800 font-medium"> 잠시만 기다려주세요.</h2>
        </div>
    )
}

export default Loading;