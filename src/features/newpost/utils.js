export const isPostLikedByLoggedInUser = (post, loggedInUser) => {
    return post.likes.findIndex(user => user._id === loggedInUser._id) !== -1;
}

export const uploadImage = async (imageFiles) => {
    let imagesMedia = [];
    for (let i = 0; i < imageFiles.length; i++) {
        const formData = new FormData();
        formData.append('file', imageFiles[i]);
        formData.append('upload_preset', 'dqgaizhyi');
        let response = await fetch(
            'https://api.cloudinary.com/v1_1/dqgaizhyi/image/upload',
            {
                method: 'POST',
                body: formData,
            }
        );
        response = await response.json();
        imagesMedia.push(response.url);        
    }    
    return imagesMedia;
};


export const validateFileSize = (files) => {
    for (let i = 0; i < files.length; i++) {
        if ((files[i].size / 1024 / 1024) > 5) {
            return false;
        }
    }
    return true;
}