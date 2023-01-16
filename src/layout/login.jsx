import React, { useContext } from "react";
import PageContext from "../context/page_context";
import UrlContext from "../context/url";

function LoginPage(props) {

    const host = useContext(UrlContext);
    const url = `${host}/admin/login`;
    const changeView = useContext(PageContext);

    const requestLogin = () => {

        const id = document.getElementById("loginId").value;
        const pw = document.getElementById("loginPw").value;

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
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                changeView(null, "main");
            })
            .catch((error) => {
                console.error('Error:', error);
                alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.")
            });
    }

    return (
        <div className="p-20 bg-gray-200 h-screen">
            <div className="border p-5 rounded-md shadow-md bg-white">
                <div className="text-center">
                    <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">로그인</h4>
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
                <form>
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
                            back to main
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;