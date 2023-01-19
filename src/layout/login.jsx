import React, { useContext } from "react";
import AmendContext from "../context/amend_status_context";
import PageContext from "../context/page_context";
import UrlContext from "../context/url";

function LoginPage(props) {

    const host = useContext(UrlContext);
    const url = `${host}/admin/login`;
    const changeView = useContext(PageContext);
    const loginFailMessage = "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.";
    const [isAmend, setAmend] = useContext(AmendContext);

    const requestLogin = () => {

        console.log("request login");
        const passwordElement = document.getElementById("loginPw");

        const id = document.getElementById("loginId").value;
        const pw = passwordElement.value;

        fetch(url, {
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
                if(token){
                    localStorage.setItem("access-token", token);
                }
                return response.json()
            }
            )
            .then((data) => {
                console.log('Success:', data);
                if (data.amendAuthority) {
                    setAmend(true);
                    changeView(null, "main");
                } else {
                    passwordElement.value = "";
                    alert(loginFailMessage);
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
                        id="loginId" placeholder="Username" />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="pw"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="loginPw" placeholder="Password" />
                </div>
                <div className="text-center pt-1 mb-12 pb-1">
                    <button
                        className="mb-2 bg-gradient-to-r from-green-500 to-blue-50 w-full rounded-md shadow-md uppercase py-1 text-white"
                        typeof="button"
                        onClick={() => requestLogin()}>
                        Log in
                    </button>
                    <button
                        className="bg-gradient-to-r from-pink-300 to-red-50 w-full rounded-md shadow-md uppercase py-1 text-white"
                        typeof="button"
                        onClick={() => changeView(null, "main")}>
                        HOME
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;