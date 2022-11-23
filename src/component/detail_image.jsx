import React from "react";

function DetailWrapper(props) {

    const temper_src = "https://mblogthumb-phinf.pstatic.net/20111129_250/stupidpark_1322533136260BDN70_JPEG/1322324832103.jpg?type=w2";

    let t_array = [];
    for (let i = 0; i < 30; i++) {
        t_array.push(0);
    }

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex-1 grid grid-cols-1 md:flex overflow-auto">

                <div className="md:w-6/12 lg:w-5/12 xl:4/12 2xl:3/12 h-fit
                                md:order-last
                                grid place-content-stretch
                                p-5
                                overflow-auto" >
                    <div className="bg-white grid gap-5 justify-center content-start rounded-lg shadow-lg border py-5">
                        <img src="https://storage.googleapis.com/jjalbot/2018/12/qXdIxpDVf/zzal.jpg"></img>
                    </div>
                </div>
                <div className="h-full grid content-start grid-cols-3 md:gap-2 
                                md:flex-1 md:flex md:flex-wrap md:p-5 justify-center
                                overflow-auto scrollbar-hide
                                ">
                    {
                        t_array.map((src, index) => {
                            return (
                                <div className="md:p-2 md:rounded-lg md:shadow hover:shadow-2xl hover:bg-gray-200 md:bg-gray-50">
                                    <img className="border object-fill" src={temper_src} key={index}></img>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

            <div className="md:order-first flex bg-blue-300 w-full p-3">
                <button>pre</button>
                <nav className="flex-1 text-center">네이바</nav>
                <button>back</button>
            </div>

            <div className="absolute bottom-10 right-0 p-1
                            md:bottom-0 md:p-3">
                <button className="opacity-60 hover:opacity-100 p-2 bg-red-200 text-red-500 rounded-full">BACK</button>
            </div>
        </div>
    )
}


export default DetailWrapper;