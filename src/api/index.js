import { v4 as uuid } from 'uuid';
const LOCAL_STORAGE_KEY = 'IMAGE_LIST'

export const apiGetImageList = () => {
    const items = localStorage.getItem(LOCAL_STORAGE_KEY)
    return items 
        ? JSON.parse(items)
        : []
}

export const apiSaveNewImage = ({ image, tooltipText, tooltipPosition, tooltipColor }) => {
    /* eslint-disable no-console */
    console.log('data', image);
    
    const imageList = apiGetImageList()
    const imageId = uuid()
    const newImage = {
        id: imageId,
        image,
        tooltipText,
        tooltipPosition,
        tooltipColor
    }
    const newImageList = [ ...imageList, newImage]
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newImageList))
    return newImageList
}

export const apiRemoveImage = imageId => {
    const imageList = apiGetImageList()
    const newImageList = imageList
        .filter(image => image.id !== imageId)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newImageList))
    return newImageList
}
