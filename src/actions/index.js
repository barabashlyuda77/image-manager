export const ADD_IMAGE = 'ADD_IMAGE'
export const UPDATE_IMAGE = 'UPDATE_IMAGE'
export const REMOVE_IMAGE = 'REMOVE_IMAGE'
export const SET_IMAGE_LIST = 'SET_IMAGE_LIST'
export const GET_IMAGE_LIST = 'GET_IMAGE_LIST'

export const addImage = image => ({
    type: 'ADD_IMAGE',
    payload: image
})

export const removeImage = imageId => ({
    type: 'REMOVE_IMAGE',
    payload: { imageId }
})

export const updateImage = (imageId, image) => ({
    type: 'UPDATE_IMAGE',
    payload: {
        imageId,
        image,
    }
})

export const setImageList = imageList => ({
    type: 'SET_IMAGE_LIST',
    payload: { imageList }
})

export const getImageList = () => ({
    type: 'GET_IMAGE_LIST'
})