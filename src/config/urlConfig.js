
const host = `http://localhost:3000`; //local enviroment
// const host = `http://localhost/api`; //test enviroment at docker
// const host = `http://www.beautifulwriting.site/api`; //operation enviroment

const API = {
    HOST: host,
    contentInfosURL: `${host}/data/content`,
    amendURL: `${host}/admin/isAmend`,
    introInfosURL: `${host}/data/intro`,

    INTRO_CHANGE: `${host}/data/intro`,
    CONTENT_CHANGE: `${host}/data/content`,

    IMAGE_CHANGE: `${host}/data/detail`,
    CONTENT_IMAGE: `${host}/data/content/image`,

    LOGIN: `${host}/admin/login`,
}

export default API;