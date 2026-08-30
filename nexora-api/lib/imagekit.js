import { ImageKit } from "@imagekit/nodejs/client.js";


const imageKit = new ImageKit ({
    PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY,
    PUBLIC_KEY:process.env.IMAGEKIT_PUBLIC_KEY,
    ENDPOINT:process.env.IMAGEKIT_URL_ENDPOINT
})

export default imageKit;
