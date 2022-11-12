import React from "react";
import ContentWrapper from "../component/content";

function RootLayout(props){

    return (
        <div className="w-screen h-screen bg-gradient-to-b from-green-300 to-green-50">
            <ContentWrapper/>
        </div>
    )
}

export default RootLayout;