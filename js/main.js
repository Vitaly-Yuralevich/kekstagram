'use strict';
const MAX_LIKES_NUMBER = 200;
const MIN_LIKES_NUMBER = 15;
const MAX_COMMENTS_NUMBER = 21;
const MIN_COMMENTS_NUMBER = 7;
const MIN_INDEX_MESSAGES = 0;
const MAX_INDEX_MESSAGES = 6;
const MIN_INDEX_USER_AVATAR = 0;
const MIN_INDEX_USER_NAME = 0;

const MESSAGES = [
    'Все отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const PHOTO_URLS = [
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
const PictureData = [];
const getRandomIntegerFromRange = (maxValue, minValue) => {
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
}
const getRandomElementFromArray = (array, minValue = 0, maxValue = array.length - 1) => {
    return array[getRandomIntegerFromRange(maxValue, minValue)];
}
const generatePictureData = () => {
    const generateCommentsData = () => {
        const commentsDate = [];
        const randomQuantityComments = getRandomIntegerFromRange(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER);
        for (let index = 0; index < randomQuantityComments; index++) {
            commentsIndex.push({
                avatar: getRandomElementFromArray(MIN_INDEX_USER_AVATAR, USER_AVATARS),
                message: getRandomElementFromArray(MIN_INDEX_MESSAGES, MESSAGES),
                name: getRandomElementFromArray(MIN_INDEX_USER_NAME, USER_NAMES),
            })
        }
    }
};
const getRandomElementFromArray = (array, minValue = 0, maxValue = array.length - 1) => {
    return array[getRandomIntegerFromRange(maxValue, minValue)];
}