import React from "react";

function LoginPage(props) {

    return (
        <div className="p-20 bg-gray-200 h-screen">
            <div className="border p-5 rounded-md shadow-md bg-white">
                <div className="text-center">
                    <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">로그인</h4>
                </div>
                <form method="post" action="/admin/login">
                    <div className="mb-4">
                        <input type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="loginId" placeholder="Username" />
                    </div>
                    <div className="mb-4">
                        <input type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="loginPw" placeholder="Password" />
                    </div>
                    <div className="text-center pt-1 mb-12 pb-1">
                        <button className="bg-gradient-to-r from-green-500 to-blue-50 w-full rounded-md shadow-md uppercase py-1 text-white" typeof="submit">
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;