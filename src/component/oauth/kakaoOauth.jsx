import React from "react";

function KakaoLogin() {
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a className="mb-2 py-1 px-2 flex border rounded-md 
        bg-gradient-to-r from-kakao to-yellow-300 hover:to-yellow-200 hover:border-yellow-300
        border-yellow-200" href={"/api/oauth2/authorization/kakao"}>
            <img className="w-4 h-4" src={`${process.env.PUBLIC_URL}/images/kakao_logo.png`} alt="카카오"></img>
            <span className="text-xs text-center text-gray-900 flex-1">Kakao 계정으로 로그인</span>
            <script src="https://accounts.google.com/gsi/client" async defer></script>
            <div id="buttonDiv"></div>
        </a>
    )
}

export default KakaoLogin;