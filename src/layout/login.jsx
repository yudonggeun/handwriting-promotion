import React, { useContext, useRef } from "react";
import GoogleLogin from "../component/oauth/googleOauth";
import KakaoLogin from "../component/oauth/kakaoOauth";
import AmendContext from "../context/amend_status_context";
import PageContext from "../context/page_context";

function LoginPage(props) {

    const host = process.env.REACT_APP_HOSTNAME
    const loginUrl = host + "/api/admin/login"

    const changeView = useContext(PageContext);
    const loginFailMessage = "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.";
    const [isAmend, setAmend] = useContext(AmendContext);

    const inputPassword = useRef();
    const inputId = useRef();

    const loginSuccess = () => {
        setAmend(true);
        changeView(null, "main");
    }

    const loginFail = () => {
        inputPassword.current.value = "";
        alert(loginFailMessage);
    }

    const requestLogin = () => {

        console.log("request login");

        const id = inputId.current.value;
        const pw = inputPassword.current.value;

        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                pw: pw
            }),
        })
            .then((response) => {
                const token = response.headers.get("authorization");
                if (token) {
                    localStorage.setItem("access-token", token);
                }
                return response.json()
            }
            )
            .then((response) => {
                if (response.status === "success") {
                    if (response.data.role === "ADMIN") {
                        loginSuccess();
                    } else {
                        loginFail();
                    }
                } else {
                    alert(`POST : 로그인이 실패했습니다. 다시 실행해보시고 관리자에게 문의하세요.`);
                    console.log(response)
                }
            })
            .catch((error) => {
                console.error('Error:', error, error.message);
                alert(loginFailMessage);
            });
    }

    return (
        <div className="p-5 md:p-10 lg:p-20 bg-gray-200 h-full">
            <div className="border p-5 m-auto rounded-md shadow-md bg-white">
                <div className="text-center">
                    <h4 className="text-xl font-semibold mt-1 mb- pb-1">로그인</h4>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="id"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        ref={inputId} placeholder="Username" />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="pw"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        ref={inputPassword} placeholder="Password" />
                </div>
                <div className="flex flex-col text-center pt-1 mb-1 pb-1">
                    <button
                        className="mb-2 bg-gradient-to-r from-red-300 to-pink-300 hover:to-pink-400 rounded-md shadow-md uppercase py-1 
                        text-xs text-white"
                        typeof="button"
                        onClick={() => changeView(null, "main")}>
                        HOME
                    </button>
                    <button
                        className="mb-2 bg-gradient-to-r from-blue-300 to-slate-300 hover:to-slate-400 rounded-md shadow-md uppercase py-1 
                        text-xs text-white"
                        typeof="button"
                        onClick={() => requestLogin()}>
                        Log in
                    </button>
                    <GoogleLogin />
                    <KakaoLogin />
                </div>
            </div>
        </div>
    )
}

export default LoginPage;