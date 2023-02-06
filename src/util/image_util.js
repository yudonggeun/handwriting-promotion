import imageCompression from 'browser-image-compression';

const ImageUtil = {
    compressImage: async (image) => {
        try {
            const options = {
                maxSizeMb: 1,
                maxWidthOrHeight: 960,
                useWebWorker: true,
            }
            return await imageCompression(image, options);;
        } catch (e) {
            console.log(e);
        }
    },
    handleImageUpload: async (e) => {
        const files = e.target.files;
        if (!files) {
            console.log(`error : 입력한 파일이 없습니다.`);
            return;
        }
        const dataTransfer = new DataTransfer();
        for (let i = 0; i < files.length; i++) {
            const originalImage = files[i];
            const compressedImage = await ImageUtil.compressImage(originalImage);
            const fileName = (Math.random() + 1).toString(36).substring(2, 12) + files[i].name;
            dataTransfer.items.add(new File([compressedImage], fileName, { lastModified: new Date().getTime(), type: compressedImage.type }));
            console.log(new File([compressedImage], fileName, { lastModified: new Date().getTime(), type: compressedImage.type }).size)
        }
        e.target.files = dataTransfer.files;
        console.log("압축", e.target.files);
    },
    readURL: (file) => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = e => res(e.target.result);
            reader.onerror = e => rej(e);
            reader.readAsDataURL(file);
        });
    }
}

export default ImageUtil;