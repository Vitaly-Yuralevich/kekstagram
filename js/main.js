'use strict';
const MAX_LIKES_NUMBER = 200;
const MIN_LIKES_NUMBER = 15;
const MAX_COMMENTS_NUMBER = 21;
const MIN_COMMENTS_NUMBER = 7;
const MAX_INDEX_MESSAGES = 6;
const MAX_SHOW_MINIATURS_NUMBER = 25;

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
const рicturesData = []; ///создание пустого массива 

const clearStructuresOfElements = (element) => { element.innerHTML = ""; } //удаление содержимого элемента

const showElement = (element) => {
    element.classList.remove('hidden') ///<=удаление класса hidden
}

const deleteElement = (element) => {
    element.classlist.add('hidden'); ///<= заполнение класса hidden
};

const getRandomIntegerFromRange = (maxValue, minValue) => { ///получить случайное целое число из диапазона
    return Math.floor(Math.random() * (maxValue - minValue) + minValue);
}

const getRandomElementFromArray = (array, minValue = 0, maxValue = array.length - 1) => { ///получить случайное число из массива
    return array[getRandomIntegerFromRange(maxValue, minValue)];
}

const generateCommentsData = () => {
    const commentsData = [];
    const randomQuantityComments = getRandomIntegerFromRange(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER);
    for (let index = 0; index < randomQuantityComments; index++) {
        commentsData.push({
            avatar: getRandomElementFromArray(0, USER_AVATARS),
            message: getRandomElementFromArray(0, MESSAGES),
            name: getRandomElementFromArray(0, USER_NAMES),
        })
    }
    return commentsData;
}

const generatePicturesData = () => { ///создания массива для генерации с обЪектами
    generateCommentsData();
    for (let index = 0; index < MAX_SHOW_MINIATURS_NUMBER; index++) {
        picturesData.push({
            comments: generateCommentsData(),
            likes: getRandomIntegerFromRange(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
            image: PHOTOS_URLS[index]
        })
    }

};
const renderAllPictures = () => {
    const creatPicture = (picture, index) => {
        const picturesTemplate = document.querySelector('#picture').textContent.document.querySelector('.picture');

        const image = picturesTemplate.cloneNode(true);

        image.querySelector(".picture__comments").textContent = picture.comments.length;
        image.querySelector("picture__likes").textContent = picture.likes;
        image.querySelector("picture__img").src = piture.image;
        return image;
    }
    const picturesContainer = document.querySelector(".picture");
    const picturesFragment = document.createDocumentFragment();

    picturesData.forEach((picture, index) => {
        picturesFragment.append(creatPicture(picture, index));

    });
    picturesContainer.append(picturesFragment);

    const setPicturesClickListeners = () => {
        const miniatures = picturesContainer.querySelectorAll(".picture__img");

        miniatures.forEach((evt) => {
            evt.addEventListener("click", handlePictureClick)
        });

    }
    setPicturesClickListeners();
};
const renderBigPictures = (pictureID) => {
    const bigPicture = document.querySelector(".big-picture");

    const assinDataForBigPicture = () => {
        bigPicture.querySelector(".big-picture__img img").src = picturesData[pictureID].image;
        bigPicture.querySelector(".comments-count").textContent = picturesData[pictureID].comments.length;
        bigPicture.querySelector("social__caaption").textContent = picturesData[pictureID].description;
        bigPicture.querySelector(".like-count").textContent = picturesData[pictureID].likes;
    }
    const renderCommentsForBigPicture = (pictureID) => {
        const commentlist = bigPicture.querySelector(".social__comments");
        clearContentsOfElement(commentList);
        const creatComments = (pictureID) => {
            const fragment = newDocumentFragment();
            const createCommentWrapper = (index) => {
                const creatComment = () => {

                    const newComment = document.createElement("li");
                    newComment.classList.add("social_comment");
                    return newComment;
                }
                const createAvatar = () => {
                    const avatarElement = document.createElement("img");
                    avatarElement.classList.add("social__picture");
                    avatarElement.src = picturesData[pictureID].comments[index].avatar;
                    return avatarElement;
                }
                const createMessage = () => {
                    const massageElement = document.createElement("p");
                    messageElement.classList.add("social__text");
                    messageElement.textContent = picturesData[pictureID].comments[index].message;
                    return messageElement;
                }

                const comment = createComment();
                comment.append(createAvatar(), createMessage());
                return comment;
            }
            const maxShowCommentCount = Math.min(pictureData[pictureID].comments.length, MAX_COMMENTS_NUMBER);
            for (let index = 0; index < maxShowCommentCount; index++) {
                fragment.append(createCommentWrapper(index));
            }
            return fragment;
        }
        commentList.append(createComments(pictureID));
    }
    renderCommentsForBigPicture(pictureID);
    assinDataForBigPicture();
    showElement(bigPicture);
    const removePicturesClickListeners = () => {
        const miniatures = document.querySelectorAll(".picture__img");
        miniatures.forEach((evt) => {
            evt.removeEventListener("click", handlePictureClick)
        });
    }
    removePicturesClickListeners();
}
const handlePictureClick = (evt) => {
    document.querySelector(".social__comment-count").classList.add("visually-hidden");
    document.querySelector(".comments-loader").classList.add("visually-hidden");
    const pictureID = evt.currentTarget.parentNode.getAttribute("data-number");
    renderBigPictures(pictureID);

}
generatePicturesData();
renderAllPictures();