
'use strict';
 
const MAX_LIKES_NUMBER = 200;
const MIN_LIKES_NUMBER = 15;
const MAX_COMMENTS_NUMBER = 21;
const MIN_COMMENTS_NUMBER = 7;
const MAX_INDEX_MESSAGES = 6;
const MAX_SHOW_MINIATURS_NUMBER = 25;
const MIN_INDEX_AVATAR=0;
const MIN_INDEX_NAME=0;

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
const DESCRIPTION=[
  'Какое чудесное фото.Nikkon с каждым разом поражает своими иновациями',
  'Все зависит от объектива и снаровки фотографа.А параметры фотоаппарата не сильно важны.',
  'Cannon дает хорошую картинку на портретных объективах.Неплохая картинка получается на советских объективах',
  'Все же большую роль играет хороший свет на фоне.Не всегда редакторами все сделаешь.',
  'Полагаю Sony может в будущем удивить нас своими возможностями',
]

const picturesData=[];

const clearContentsElement=(element)=>{
  element.innerHTML='' 
};
const getRandomIntegerFromRange=(minValue,maxValue)=>{
  return Math.floor(Math.random()*(maxValue-minValue+1)+minValue)
};
const getRandomIntegerFromArray=(array,minValue=0,maxValue=array.lenght-1)=>{
  return array[getRandomIntegerFromRange(maxValue,minValue)]
};

const  generatePicturesData=()=>{
  const generateCommentsData=()=>{
    const commentsData=[];
    const randomIntergerComments=getRandomIntegerFromRange(MIN_COMMENTS_NUMBER,MAX_COMMENTS_NUMBER);
    for (let index=0;index<randomIntergerComments;index++){
      commentsData.push({
        avatar:getRandomIntegerFromArray(USER_AVATARS,MIN_INDEX_AVATAR),
        message:getRandomIntegerFromArray(MESSAGES, MAX_INDEX_MESSAGES),
        name:getRandomIntegerFromArray(USER_NAMES,MIN_INDEX_NAME)
      })

    }return commentsData;
  }
  for(let index=0;index<MAX_SHOW_MINIATURS_NUMBER;index++){
    picturesData.push({
      comment:generateCommentsData(),
      like:getRandomIntegerFromRange(MAX_LIKES_NUMBER,MIN_LIKES_NUMBER),
      image:PHOTOS_URLS[index]
    })
}
}
const renderAllPictures = () => {
  const picturesContainer = document.querySelector(".pictures");
  const fragment = document.createDocumentFragment(); 
  const pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");

  const createPicture = (picture, index) => {
    const image =pictureTemplate.cloneNode(true);
    image.querySelector(".picture__comments").textContent = picture.comments;
    image.querySelector(".picture__likes").textContent = picture.likes;
    image.querySelector(".picture__img").src = picture.image;
    return image;
  }
  picturesData.forEach((picture, index) => {
    fragment.append(createPicture(picture, index));
  });

  picturesContainer.append(fragment);  
  const miniaturs = document.querySelectorAll(".picture");
  const setPicturesClickListeners = () => {
    const miniaturs = picturesContainer.querySelectorAll(".picture__img");    
 }
}
const BigPicture=document.querySelector('.big-picture')
const renderBigPicture=(pictureID)=>{
  ///BigPicture.classList.remove('hidden')
  const dataForBigPicture=()=>{
    BigPicture.querySelector('.big-picture__img').src=picturesData[pictureID].image;
    BigPicture.querySelector('.likes-count').textContent=picturesData[pictureID].likes;
    BigPicture.querySelector('.comments-count').textContent=picturesData[pictureID].comments.lenght;
    BigPicture.querySelector('.social__caption').textContent=picturesData[pictureID].description
  }
  const renderCommentsFromBigPicture=(pictureID)=>{
    const commentList=bigPicture.querySelector('.social__comment');
    clearContentsElement(commentList);
    const newComments=(picureID)=>{
      const creatNewComments=new DocumentFragment();
       const creatComment=(index)=>{
         const someNewElement=()=>{
           const commentElement=document.createElement('li');
           commentElement.classList.add('social__comment');
           return commentElement;
         }
       }
    }
}
}
///BigPicture.classList.add('hidden')

generatePicturesData();
renderAllPictures();
