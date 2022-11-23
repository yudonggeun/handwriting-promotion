import React from "react";
import ContentWrapper from "../component/content";
import DetailWrapper from "../component/detail_image";

function RootLayout(props){

    return (
        <div className="w-screen h-screen">
            {/* <ContentWrapper/> */}
            <DetailWrapper/>
        </div>
    )
}

export default RootLayout;