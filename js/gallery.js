(() => {
  'use strict';

  const renderAllPictures = () => {
      const picturesContainer = document.querySelector('.pictures');
      const fragment = document.createDocumentFragment(); 
      const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    
      const createPicture = (picture, index) => {
        const image = pictureTemplate.cloneNode(true);
    
        image.querySelector('.picture__comments').textContent = picture.comments.length;
        image.querySelector('.picture__likes').textContent = picture.likes;
        image.querySelector('.picture__img').src = picture.image;
        image.setAttribute('data-number', index);
    
        return image;
      };
    
      const getPictureDataNumber = (evt) => {
        return evt.currentTarget.getAttribute("data-number");
      };
      
      const handlePictureClick = (evt) => {
         window.bigPictures.renderBigPicture(getPictureDataNumber(evt));
          picture.removeEventListener("click", handlePictureClick);
        };
      
        const handlePictureKeyDown = (downEvt) => {
          window.utils.isEnterEvent(downEvt, (evt) => {
            evt.preventDefault();
           window.renderBigPicture(getPictureDataNumber(evt));
          });
      
          picture.removeEventListener("keydown", handlePictureKeyDown);
        };
      
      window.data.picturesData.forEach((picture, index) => {
        fragment.append(createPicture(picture, index));
      });
    
      picturesContainer.append(fragment);  
    
      const miniaturs = document.querySelectorAll(".picture");
      miniaturs.forEach((picture) => {
          picture.addEventListener("click", handlePictureClick);
          picture.addEventListener("keydown", handlePictureKeyDown);
        })
    };
    renderAllPictures();
    
})();
