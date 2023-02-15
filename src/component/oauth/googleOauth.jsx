import React from "react";

function GoogleLogin(props) {

    return (
        <div>
            <script src="https://accounts.google.com/gsi/client" async defer></script>
            <div id="g_id_onload"
                data-client_id="820197375372-5t7ggmkufp7eqi81idkls96s61firir1.apps.googleusercontent.com"
                data-login_uri="https://www.beautifulwriting.site"
                data-auto_prompt="false">
            </div>
            <div class="g_id_signin"
                data-type="standard"
                data-size="large"
                data-theme="outline"
                data-text="sign_in_with"
                data-shape="rectangular"
                data-logo_alignment="left">
            </div>
        </div>
    )
}

export default GoogleLogin;