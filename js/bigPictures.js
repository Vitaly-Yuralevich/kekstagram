(() => {
    'use strict'; 
    const MAX_SHOW_COMMENTS_COUNT = 5;
      
const renderBigPicture = (pictureID) => {
    const bigPicture = document.querySelector('.big-picture');
    const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  
    const dataForBigPictures = () => {  
      bigPicture.querySelector('.big-picture__img img').src = window.data.picturesData[pictureID].image;
      bigPicture.querySelector('.comments-count').textContent = window.data.picturesData[pictureID].comments.length;
      bigPicture.querySelector('.social__caption').textContent = window.data.picturesData[pictureID].description;
      bigPicture.querySelector('.likes-count').textContent = window.data.picturesData[pictureID].likes;
    };
  
    const setBigPictureListeners = () => {
      bigPictureCancel.addEventListener('click', handleBigPictureCloseClick);
      bigPicture.addEventListener('click', handleBigPictureOverlayClick);
      document.addEventListener('keydown', handleBigPictureCloseKeyDown); 
    };
  
  const removeBigPictureListeners = () => {
    bigPictureCancel.removeEventListener('click', handleBigPictureCloseClick);
    bigPicture.removeEventListener('click', handleBigPictureOverlayClick);
    document.removeEventListener('keydown', handleBigPictureCloseKeyDown); 
    };
  
    const closeBigPicture = () => {
      window.utils.hideElement(bigPicture); 
      removeBigPictureListeners();
    };
    
    const handleBigPictureCloseClick = () => {
    closeBigPicture();
    } ;
    
    const handleBigPictureOverlayClick = (evt) => {
      
      if (evt.target.className === 'big-picture overlay' ){
        closeBigPicture();
      } 
    };
    
    const handleBigPictureCloseKeyDown = (downEvt) => {
      window.utils.isEscapeEvent(downEvt, (evt) => {
        evt.preventDefault();
        closeBigPicture();
      })
    };
  
    const renderSocialComments = () => {
      const commentsList = bigPicture.querySelector('.social__comments');
      window.utils.clearElementContents(commentsList);
      
      const createNewComments = () => {
      const newComments = new DocumentFragment();
      
        const createCommentWrapper = (index) => {
          const createComment = () => {
            const newComment = document.createElement('li');
            newComment.classList.add('social__comment');
    
            return newComment;
          };
          
        const createNewAvatar = () => {
            const avatarElement = document.createElement('img');
            avatarElement.classList.add('social__picture');
            avatarElement.src = window.data.picturesData[pictureID].comments[index].avatar; 
            
            return avatarElement;
          };
  
          const createNewMessage = () => {
            const messageElement = document.createElement('p');
            messageElement.classList.add('social__text');
            messageElement.textContent = window.data.picturesData[pictureID].comments[index].message; 
  
            return messageElement;
          };
  
          const comment = createComment();
          comment.append(createNewAvatar(), createNewMessage());
          
          return comment;
        };
              
        const maxShowCommentCount = Math.min(window.data.picturesData[pictureID].comments.length, MAX_SHOW_COMMENTS_COUNT);
  
        for (let index = 0; index < maxShowCommentCount; index++) {
          newComments.append(createCommentWrapper(index));
        };
        
        return newComments;
      }
          
      commentsList.append(createNewComments(pictureID));
    };
    
    const hideCommentsCounter = () => {
      document.querySelector(".social__comment-count").classList.add("visually-hidden");
      document.querySelector(".comments-loader").classList.add("visually-hidden");
    } ;
  
    renderSocialComments();
    dataForBigPictures();
    window.utils.showElement(bigPicture);
    hideCommentsCounter();
    setBigPictureListeners();
};

window.bigPictures = {
  renderBigPicture
};

})();