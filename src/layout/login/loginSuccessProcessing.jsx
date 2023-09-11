import React, { useEffect } from "react";
import Loading from "../loading";

function LoginSuccessProcess(){

    const login = () => {
        fetch("/api/admin/login")
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
                window.location.href = `${window.location.protocol}//${window.location.host}`;
            } else {
                alert(`로그인이 실패했습니다. 다시 실행해보시고 관리자에게 문의하세요.`);
                window.location.href = `${window.location.protocol}//${window.location.host}`;
            }
        })
        .catch((error) => {
            console.error('Error:', error, error.message);
            alert(`로그인이 실패했습니다. 다시 실행해보시고 관리자에게 문의하세요.`);
        });
    }

    useEffect(() => {
        login();
    })
    
    return (
        <div className="w-full h-full bg-gradient-to-b from-red-400 to-white">
            <Loading />
        </div>
    )
}

export default LoginSuccessProcess;