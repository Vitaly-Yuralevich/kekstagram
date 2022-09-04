(() => {
'use strict';

const MAX_SLIDER_VALUE = 100;
const MAX_HASHTAG_NUMBER = 5;
const MAX_HASHTAG_LENGTH = 20;
const SEPARATOR = ' ';

const Effect = {

    NONE: {
      clName: 'none',
      property: 'none',
      maxValue: null,
      minValue: null,
      measure: ''
    },
  
    CHROME: {
      clName: 'chrome',
      property: 'grayscale',
      maxValue: 1,
      minValue: 0,
      measure: ''
    },
  
    SEPIA: {
      clName: 'sepia',
      property: 'sepia',
      maxValue: 1,
      minValue: 0,
      measure: ''
    },
  
    MARVIN: {
      clName: 'marvin',
      property: 'invert',
      maxValue: 100,
      minValue: 0,
      measure: '%'
    },
  
    PHOBOS: {
      clName: 'phobos',
      property: 'blur',
      maxValue: 5,
      minValue: 0,
      measure: 'px'
    },
  
    HEAT: {
      clName: 'heat',
      property: 'brightness',
      maxValue: 3,
      minValue: 1,
      measure: ''
    },
  };

const loadNewImage = () => {
    const uploadForm = document.querySelector('.img-upload__form');
    const upLoadInput = uploadForm.querySelector('.img-upload__input');
    const upLoadOverlay = uploadForm.querySelector('.img-upload__overlay');
    const upLoadPreview = upLoadOverlay.querySelector('.img-upload__preview img');
    const upLoadEffect = upLoadOverlay.querySelector('.img-upload__effect-level');
    const upLoadCancel = upLoadOverlay.querySelector('.img-upload__cancel');
    const levelValue = upLoadEffect.querySelector('.effect-level__value');
    const pin = upLoadEffect.querySelector('.effect-level__pin');
    const depth = upLoadEffect.querySelector('.effect-level__depth');
    const effectList = upLoadOverlay.querySelector('.effects__list');
    const hashtagInput = upLoadOverlay.querySelector('.text__hashtags');
    const textDescription = upLoadOverlay.querySelector('.text__description');
    const effectLine = upLoadEffect.querySelector('.effect-level__line');
   
    const handleLoadFile = () => {
    window.utils.showElement(upLoadOverlay);
    window.utils.hideElement(upLoadEffect);
     setEditFormListeners();
     };
   
    const deleteEffect = () => {
     upLoadPreview.style.filter = '';
     upLoadPreview.clName = '';
     };
   
    upLoadInput.addEventListener('change', handleLoadFile);
    
    let selectedEffect = {};
   
    const addEffectData = (selectedEffect, filterValue) => {
     const getLevelRatio = (effect, value) => {
     const ratio = (effect.maxValue - effect.minValue) / 100;
      return (ratio * value) + effect.minValue;
      };
   
     upLoadPreview.style.filter = `${selectedEffect.property}(${getLevelRatio(selectedEffect, filterValue)}${selectedEffect.measure})`;
     upLoadPreview.classList.add(`selectedEffect.clName`);
     };
      
    const setSliderValue = (value) => {
     pin.style.left = `${value}%`;
     depth.style.width = `${value}%`;
     levelValue.setAttribute('value', value)
     };
   
    const useEffects = (currentElement) => {
     if (currentElement.value === 'none') {
       window.utils.hideElement(upLoadEffect);
     } else {
       window.utils.showElement(upLoadEffect);
     };
       
     deleteEffect();
   
     const effect = Effect[currentElement.value.toUpperCase()];
       
     upLoadPreview.style.filter = `${effect.property}(${effect.maxValue}${effect.measure})`;
     upLoadPreview.classList.add(effect.clname);
      
     selectedEffect = effect;
   
     setSliderValue(MAX_SLIDER_VALUE);
     };
   
    const handleMouseDown = (evt) => {
     evt.preventDefault();
     let offSet = evt.clientX - pin.getBoundingClientRect().left;
    
     const handleMouseMove = (evt) => {
      let newLeft = evt.clientX - offSet - effectLine.getBoundingClientRect().left;
     
      if (newLeft < 0) {
       newLeft = 0;
      };
       
      let rightEdge = effectLine.offsetWidth - pin.offsetWidth;
       
      if (newLeft > rightEdge) {
       newLeft = rightEdge;
      };
   
      const pinPosition = newLeft * 100 / rightEdge;
      setSliderValue(pinPosition);
      addEffectData(selectedEffect, pinPosition);
      };
   
      const handleMouseUp = () => {
       document.removeEventListener('mousemove', handleMouseMove);
       document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
     };
   
    const setEditFormListeners = () => {
     upLoadCancel.addEventListener('click', handleImageEditorCloseClick);
     document.addEventListener('keydown', handleImageEditorCloseKeyDown);
     hashtagInput.addEventListener('input', handleHashtag);  
     uploadForm.addEventListener('submit', handleForSubmit);
     effectList.addEventListener('focus', handleEffectChange, {capture: true});
     upLoadEffect.addEventListener('mousedown', handleMouseDown);
     };
    
    const handleEffectChange = (evt) => {
     useEffects(evt.target);
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
       };
     };
   
     hashtagInput.removeEventListener('keydown', handleImageEditorCloseKeyDown);
   
      return hashtagPrompt;
     };
   
    const removeEditFormListeners = () => {
     upLoadCancel.removeEventListener('click', handleImageEditorCloseClick);
     document.removeEventListener('keydown', handleImageEditorCloseKeyDown);
     hashtagInput.removeEventListener('input', handleHashtag);  
     uploadForm.removeEventListener('submit', handleForSubmit);
     effectList.removeEventListener('focus', handleEffectChange, {capture: true}); 
     upLoadEffect.removeEventListener('mousedown', handleMouseDown);
     };
   
     const exitForm = () =>{
      upLoadInput.value = '';
      hashtagInput.value = '';
      textDescription.value = '';
     };

    const closeEditForm = () => {
     window.utils.hideElement(upLoadOverlay);
     removeEditFormListeners();
     deleteEffect();
     exitForm();
     };
   
    const handleImageEditorCloseClick = () => {
     closeEditForm();
     }; 
   
    const handleForSubmit = (evt) => {
     evt.preventDefault();
     };
   
    const handleImageEditorCloseKeyDown = (downEvt) => {
     window.utils.isEscapeEvent(downEvt, (evt) => {
      if(hashtagInput !== document.activeElement && textDescription !== document.activeElement){
       handleForSubmit(evt);
       closeEditForm();
       };
     });
    };
   };

   loadNewImage();

  })();
