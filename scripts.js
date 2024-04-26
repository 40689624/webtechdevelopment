document.addEventListener('DOMContentLoaded', function () {
    const upfie = document.getElementById('upfile');
    const uploadButton = document.getElementById('uploadButton');
    const picture = document.getElementById('picture');

    uploadButton.addEventListener('click', function () {
        const file = upfile.files[0];
        if (file) {
            uploadPhoto(file);
        } else {
            alert('Please select a file to upload.');
        }
    });

    function uploadPhoto(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const photoDataUrl = reader.result;
            const photo = createPhotoElement(photoDataUrl);
            picture.appendChild(photo);
        };
    }

    function createPhotoElement(photoDataUrl) {
        const photoContainer = document.createElement('div');
        photoContainer.classList.add('photo');

        const img = document.createElement('img');
        img.src = photoDataUrl;
        photoContainer.appendChild(img);

        const commentTextarea = document.createElement('textarea');
        commentTextarea.placeholder = 'Add a comment...';
        photoContainer.appendChild(commentTextarea);

        const commentButton = document.createElement('button');
        commentButton.textContent = 'comment';
        commentButton.addEventListener('click', function () {
            const comment = commentTextarea.value.trim();
            if (comment) {
                postComment(photoContainer, comment);
                commentTextarea.value = '';
            } else {
                alert('Enter a comment.');
            }
        });
        photoContainer.appendChild(commentButton);

        return photoContainer;
    }

    function postComment(photoContainer, comment) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.textContent = comment;
        photoContainer.appendChild(commentElement);
    }
});