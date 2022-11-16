import React from "react";
import ContentWrapper from "../component/content";

function RootLayout(props){

    return (
        <div className="w-screen h-screen bg-gradient-to-b from-green-100 to-white">
            <ContentWrapper/>
        </div>
    )
}

export default RootLayout;