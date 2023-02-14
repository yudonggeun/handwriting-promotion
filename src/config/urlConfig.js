
// const host = `//localhost:3000`; //local enviroment
// const host = `//localhost/api`; //test enviroment at docker
const host = `//www.beautifulwriting.site/api`; //operation enviroment

const protocol = () => {
    return window.location.protocol;
}

const API = {
    HOST: host,
    contentInfosURL: `${protocol()}${host}/data/content`,
    amendURL: `${protocol()}${host}/admin/isAmend`,
    introInfosURL: `${protocol()}${host}/data/intro`,

    INTRO_CHANGE: `${protocol()}${host}/data/intro`,
    CONTENT_CHANGE: `${protocol()}${host}/data/content`,

    IMAGE_CHANGE: `${protocol()}${host}/data/detail`,
    CONTENT_IMAGE: `${protocol()}${host}/data/content/image`,

    LOGIN: `${host}/admin/login`
}

export default API;