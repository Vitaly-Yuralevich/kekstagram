'use strict';
 
const MAX_LIKES_NUMBER = 200;
const MIN_LIKES_NUMBER = 15;
const MAX_COMMENTS_NUMBER = 21;
const MIN_COMMENTS_NUMBER = 7;
const MIN_INDEX_MESSAGES = 0;
const MAX_SHOW_MINIATURS_NUMBER = 25;
const MAX_SHOW_COMMENTS_COUNT = 5;
const MIN_INDEX_AVATAR = 0;
const MIN_INDEX_NAME = 0;
const MIN_INDEX_DESCRIPTION = 0;

const MESSAGES = [
    'Все отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTOS_URLS = [
    'photos/1.jpg',
    'photos/2.jpg',
    'photos/3.jpg',
    'photos/4.jpg',
    'photos/5.jpg',
    'photos/6.jpg',
    'photos/7.jpg',
    'photos/8.jpg',
    'photos/9.jpg',
    'photos/10.jpg',
    'photos/11.jpg',
    'photos/12.jpg',
    'photos/13.jpg',
    'photos/14.jpg',
    'photos/15.jpg',
    'photos/16.jpg',
    'photos/17.jpg',
    'photos/18.jpg',
    'photos/19.jpg',
    'photos/20.jpg',
    'photos/21.jpg',
    'photos/22.jpg',
    'photos/23.jpg',
    'photos/24.jpg',
    'photos/25.jpg',
];

const USER_NAMES = [
    'Виктория',
    'Артем',
    'Кирилл',
    'Александра',
    'Валерия',
    'Анстасия'
]; 

const USER_AVATARS = [
    'img/avatar-1.svg',
    'img/avatar-2.svg',
    'img/avatar-3.svg',
    'img/avatar-4.svg',
    'img/avatar-5.svg',
    'img/avatar-6.svg'
];

const DESCRIPTIONS = [
  'Какое чудесное фото.Nikkon с каждым разом поражает своими иновациями',
  'Все зависит от объектива и снаровки фотографа.А параметры фотоаппарата не сильно важны.',
  'Cannon дает хорошую картинку на портретных объективах.Неплохая картинка получается на советских объективах',
  'Все же большую роль играет хороший свет на фоне.Не всегда редакторами все сделаешь.',
  'Полагаю Sony может в будущем удивить нас своими возможностями',
];

const picturesData = [];

const clearElementContents=(element) => {
  element.innerHTML = '' 
};

const getRandomIntegerFromRange = (minValue, maxValue) => {

  return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
};

const getRandomElementFromArray = (array, minValue = 0, maxValue = array.length - 1) => {

  return array[getRandomIntegerFromRange(minValue, maxValue)];
};



const generateCommentsData = () => {
  const commentsData = [];
  const commentsCount = getRandomIntegerFromRange(MAX_COMMENTS_NUMBER, MIN_COMMENTS_NUMBER);
  
  for (let index = 0; index < commentsCount; index++) {
    commentsData.push({
      avatar: getRandomElementFromArray ( USER_AVATARS, MIN_INDEX_AVATAR),
      message: getRandomElementFromArray ( MESSAGES, MIN_INDEX_MESSAGES),
      name: getRandomElementFromArray ( USER_NAMES, MIN_INDEX_NAME)
    })
  }

    return commentsData;
};

const  generatePicturesData = () => {
  for(let index = 0; index < MAX_SHOW_MINIATURS_NUMBER; index++) {
    picturesData.push({
      comments: generateCommentsData(),
      likes: getRandomIntegerFromRange(MAX_LIKES_NUMBER, MIN_LIKES_NUMBER),
      image: PHOTOS_URLS[index],
      description: getRandomElementFromArray(DESCRIPTIONS, MIN_INDEX_DESCRIPTION)
    })
  }
};

generatePicturesData();

const renderAllPictures = () => {
  const picturesContainer = document.querySelector(".pictures");
  const fragment = document.createDocumentFragment(); 
  const pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
 
  const createPicture = (picture, index) => {
    const image = pictureTemplate.cloneNode(true);

    image.querySelector(".picture__comments").textContent = picture.comments.length;
    image.querySelector(".picture__likes").textContent = picture.likes;
    image.querySelector(".picture__img").src = picture.image;
    image.setAttribute("data-number", index);

    return image;
  }

  picturesData.forEach((picture, index) => {
    fragment.append(createPicture(picture, index));
  });

  picturesContainer.append(fragment);  

  const setPicturesClickListeners = () => {
    const miniaturs = picturesContainer.querySelectorAll(".picture__img");
  
    miniaturs.forEach((event) => {
      event.addEventListener("click", handlePictureClick)
    });
  }

  setPicturesClickListeners();

};



const renderBigPicture = (pictureID) => {
  const bigPicture = document.querySelector(".big-picture");

  const dataForBigPictures = () => {  
    bigPicture.querySelector(".big-picture__img img").src = picturesData[pictureID].image;
    bigPicture.querySelector(".comments-count").textContent = picturesData[pictureID].comments.length;
    bigPicture.querySelector(".social__caption").textContent = picturesData[pictureID].description;
    bigPicture.querySelector(".likes-count").textContent = picturesData[pictureID].likes;
  }

  const renderSocialComments = (pictureID) => {
    const commentsList = bigPicture.querySelector(".social__comments");
    clearElementContents(commentsList);
    
    const createNewComments = (pictureID) => {
			const newComments = new DocumentFragment();
    
      const createCommentWrapper = (index) => {
        const createComment = () => {
          const newComment = document.createElement('li');
          newComment.classList.add("social__comment");
  
          return newComment;
        }
        
        const avatarForComments = () => {
          const avatarElement = document.createElement("img");
          avatarElement.classList.add("social__picture");

          avatarElement.src = picturesData[pictureID].comments[index].avatar; 
          
          return avatarElement;
        }

        const messageForComments = () => {
          const messageElement = document.createElement("p");
          messageElement.classList.add("social__text");

          messageElement.textContent = picturesData[pictureID].comments[index].message; 

          return messageElement;
        }

        const comment = createComment();
        comment.append(avatarForComments(),messageForComments());
        
        return comment;
      }
            
      const maxShowCommentCount = Math.min(picturesData[pictureID].comments.length, MAX_SHOW_COMMENTS_COUNT);

    	for (let index = 0; index < maxShowCommentCount; index++) {
      	newComments.append(createCommentWrapper(index));
			}
			 
       return newComments;
		}
		    
    commentsList.append(createNewComments(pictureID));
	}
	
	renderSocialComments(pictureID);
	dataForBigPictures();
  bigPicture.classList.remove('hidden')
  
  const removePicturesClickListeners = () => {
    const miniaturs = document.querySelectorAll(".picture__img");
  
    miniaturs.forEach((event) => {
      event.removeEventListener("click", handlePictureClick)
    });
  }

  removePicturesClickListeners();
  }

  const handlePictureClick = (event) => {
    document.querySelector(".social__comment-count").classList.add("visually-hidden");
    document.querySelector(".comments-loader").classList.add("visually-hidden");
    const pictureID = event.currentTarget.parentNode.getAttribute("data-number");

   renderBigPicture(pictureID);
  }



renderAllPictures();




