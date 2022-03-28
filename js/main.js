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
const MAX_SLIDER_VALUE = 100;
const MAX_HASHTAG_NUMBER = 5;
const MAX_HASHTAG_LENGTH = 20;
const SEPARATOR = " ";

const KEY = { 
 ENTER: 'Enter',
 ESCAPE: 'Escape',
};

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

const Effect = {

  NONE: {
    className: 'effect__preview--none',
    property: 'none',
    maxValue: null,
    minValue: null,
    measure: ''
  },

  CHROME: {
    className: 'effects__preview--chrome',
    property: 'grayscale',
    maxValue: 1,
    minValue: 0,
    measure: ''
  },

  SEPIA: {
    className: 'effects__preview--sepia',
    property: 'sepia',
    maxValue: 1,
    minValue: 0,
    measure: ''
  },

  MARVIN: {
    className: 'effects__preview--marvin',
    property: 'invert',
    maxValue: 100,
    minValue: 0,
    measure: '%'
  },

  PHOBOS: {
    className: 'effects__preview--phobos',
    property: 'blur',
    maxValue: '5',
    minValue: '3',
    measure: 'px'
  },

  HEAT: {
    className: 'effects__preview--heat',
    property: 'brightness',
    maxValue: 3,
    minValue: 1,
    measure: ''
  },
};

const picturesData = [];

const isEnterEvent = (evt, callback) => {
  if (evt.code === KEY.ENTER) {
    callback(evt);
  }
};

const isEscapeEvent = (evt, callback) => {
  if (evt.code === KEY.ESCAPE) {
    callback(evt);
  }
};

const clearElementContents = (element) => {
  element.innerHTML = '';
};

const showElement = (element) => {
  element.classList.remove("hidden");
};

const hideElement = (element) => {
  element.classList.add("hidden");
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
      avatar: getRandomElementFromArray(USER_AVATARS, MIN_INDEX_AVATAR),
      message: getRandomElementFromArray(MESSAGES, MIN_INDEX_MESSAGES),
      name: getRandomElementFromArray(USER_NAMES, MIN_INDEX_NAME)
    })
  }
    return commentsData;
};

const generatePicturesData = () => {
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

  picturesData.forEach((picture, index) => {
    fragment.append(createPicture(picture, index));
  });

  picturesContainer.append(fragment);  

  const miniaturs = document.querySelectorAll(".picture");

  miniaturs.forEach((picture) => {
    picture.addEventListener("click", handlePictureClick);
    picture.addEventListener("keydown", handlePictureKeyDown);
  })
};

const getPictureDataNumber = (evt) => {
  return evt.currentTarget.getAttribute("data-number");
};

const handlePictureClick = (evt) => {
  renderBigPicture(getPictureDataNumber(evt));

 picture.removeEventListener("click", handlePictureClick);
};

const handlePictureKeyDown = (downEvt) => {
  isEnterEvent(downEvt, (evt) => {
    evt.preventDefault();
    renderBigPicture(getPictureDataNumber(evt));
  });

  picture.removeEventListener("keydown", handlePictureKeyDown);
};

const renderBigPicture = (pictureID) => {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  const dataForBigPictures = () => {  
    bigPicture.querySelector('.big-picture__img img').src = picturesData[pictureID].image;
    bigPicture.querySelector('.comments-count').textContent = picturesData[pictureID].comments.length;
    bigPicture.querySelector('.social__caption').textContent = picturesData[pictureID].description;
    bigPicture.querySelector('.likes-count').textContent = picturesData[pictureID].likes;
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
    hideElement(bigPicture); 
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
    isEscapeEvent(downEvt, (evt) => {
      evt.preventDefault();
      closeBigPicture();
    })
  };

  const renderSocialComments = () => {
    const commentsList = bigPicture.querySelector('.social__comments');
    clearElementContents(commentsList);
    
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
          avatarElement.src = picturesData[pictureID].comments[index].avatar; 
          
          return avatarElement;
        };

        const createNewMessage = () => {
          const messageElement = document.createElement('p');
          messageElement.classList.add('social__text');
          messageElement.textContent = picturesData[pictureID].comments[index].message; 

          return messageElement;
        };

        const comment = createComment();
        comment.append(createNewAvatar(),createNewMessage());
        
        return comment;
      };
            
      const maxShowCommentCount = Math.min(picturesData[pictureID].comments.length, MAX_SHOW_COMMENTS_COUNT);

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
  showElement(bigPicture);
  hideCommentsCounter();
  setBigPictureListeners();
  };

  const loadNewImage = () => {
const uploadForm = document.querySelector('.img-upload__form');
const upLoadInput = uploadForm.querySelector('.img-upload__input');
const upLoadOverlay = uploadForm.querySelector('.img-upload__overlay');
const upLoadPreview = upLoadOverlay.querySelector('.img-upload__preview img');
const upLoadEffect = upLoadOverlay.querySelector('.img-upload__effect-level')
const upLoadCancel = upLoadOverlay.querySelector('.img-upload__cancel')
const levelValue = upLoadEffect.querySelector('.effect-level__value');
const pin = upLoadEffect.querySelector('.effect-level__pin');
const depth = upLoadEffect.querySelector('.effect-level__depth');
const effectList = upLoadOverlay.querySelector('.effects__list');
const hashtagInput = upLoadOverlay.querySelector('.text__hashtags');
const textDescription = upLoadOverlay.querySelector('.text__description');

 const handleLoadFile = () => {
  showElement(upLoadOverlay);
  hideElement(upLoadEffect);
    setEditFormListeners();
    upLoadInput.removeEventListener('change', handleLoadFile)
  };

 const deleteOldEffects = () => {
  upLoadPreview.style.filter = '';
  upLoadPreview.className = '';
  };

 upLoadInput.addEventListener('change', handleLoadFile);

 const useEffects = (currentElement) => {
  if (currentElement.value === 'none') {
    hideElement(upLoadEffect);
   } else {
    showElement(upLoadEffect);
  };

   const addEffectData = (currentElement) => {
     const effect = Effect[currentElement.value.toUpperCase()];
    
    upLoadPreview.style.filter = `${effect.property}
                                   (${effect.maxValue}
                                    ${effect.measure})`;
    upLoadPreview.classList.add(effect.className)
   };

  const setSliderValue = (value) => {
     pin.style.left = `${value}%`;
     depth.style.width = `${value}%`;
     levelValue.setAttribute('value', value)
   };

   deleteOldEffects();
   addEffectData(currentElement);
   setSliderValue(MAX_SLIDER_VALUE);
  };
 
 const setEditFormListeners = () => {
   upLoadCancel.addEventListener('click', handleImageEditorCloseClick);
   upLoadOverlay.addEventListener('click', closeTheWindowOutside);
   document.addEventListener('keydown', handleImageEditorCloseKeyDown);
   hashtagInput.addEventListener('input', handleHashtag);  
   uploadForm.addEventListener('submit',handleForSubmit);
   
   effectList.addEventListener('focus', (evt) => {
    useEffects(evt.target)
   }, {capture: true}); 
  };

 const handleHashtag = (evt) => {
   hashtagInput.setCustomValidity('');
   hashtagInput.setCustomValidity(errorChecking(evt));
  };

 const errorChecking = (evt) => {
   const errors = {
     noHashtag: false,
     noOneSymbol: false,
     space: false,
     repeatHashTag: false,
     maxLimitHashtag: false,
     longHashtag: false,
   };

  const errorsToPrompt = {
     noHashtag: 'Хэш-тег начинается с символа # (решетки).',
     noOneSymbol: 'Хэш-тег не может состоять только из одной решетки.',
     space: 'Хэш-теги разделяются пробелами.',
     repeatHashTag: 'Один и тот же хэш-тег не может быть использован дважды.',
     maxLimitHashtag: `Нельзя указать больше ${MAX_HASHTAG_NUMBER} хэш-тегов.`,
     longHashtag: `Максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решетку.`
   };

  let hashtagPrompt = '';
 
  const hashtags = evt.target.value.toLowerCase().split(' ').filter(element => !!element);

  hashtags.forEach((hashtag) => {
     errors.noHashtag = errors.noHashtag || (hashtag[0]  !=='#');
     errors.noOneSymbol = errors.noOneSymbol || (hashtag === '#');
     errors.space = errors.space || (hashtag.includes('#', 1));
     errors.longHashtag = errors.longHashtag || (hashtag.length > MAX_HASHTAG_LENGTH);
  
    });

   const getHashtagRepeatErros = (hashtags) => {
     const hashtagsArray = hashtags.filter((element, index) => {
    return (index !== hashtags.indexOf(element)) || (index !== hashtags.lastIndexOf(element));
    });

   return hashtagsArray
   };

   errors.maxLimitHashtag = errors.maxLimitHashtag || (hashtags.length > MAX_HASHTAG_NUMBER);
   errors.repeatHashTag = errors.repeatHashTag || (getHashtagRepeatErros(hashtags).length > 0);

  for (const element in errors) {
     if(errors[element]) {
      hashtagPrompt += `${errorsToPrompt[element]} ${SEPARATOR}`;
     }
   }

   return hashtagPrompt;
  };

 const removeEditFormListeners = () => {
  upLoadCancel.removeEventListener('click', handleImageEditorCloseClick);
  upLoadOverlay.removeEventListener('click', closeTheWindowOutside);
  document.removeEventListener('keydown', handleImageEditorCloseKeyDown);
  hashtagInput.removeEventListener('input', handleHashtag);  
  uploadForm.removeEventListener('submit', handleForSubmit);
  
  effectList.removeEventListener('focus', (evt) => {
   useEffects(evt.target)
  }); 
 };

 const closeEditForm = () => {
  upLoadInput.value = '';
  hashtagInput.value ='';
  textDescription.value = '';

   hideElement(upLoadOverlay);
   removeEditFormListeners();
  deleteOldEffects();
 };

const handleImageEditorCloseClick = () => {
  closeEditForm();
 }; 

const handleForSubmit = (evt) =>{
  evt.preventDefault();
};

const closeTheWindowOutside = (evt) => {
  if (evt.target.className === 'img-upload__overlay'){
    closeEditForm();
   } 
  };

const handleImageEditorCloseKeyDown = (downEvt) => {
 isEscapeEvent(downEvt, (evt) => {
   if(hashtagInput !== document.activeElement && textDescription !== document.activeElement){
    handleForSubmit(evt);
    closeEditForm();
     }
   });
  };
};

renderAllPictures();
loadNewImage();




