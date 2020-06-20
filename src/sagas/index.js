import { all } from 'redux-saga/effects'
import { watchAddImageSaga } from './addImageSaga'
import { watchGetImageListSaga } from './getImageListSaga'
import { watchRemoveImageSaga } from './removeImageSaga'
import { watchUpdateImageSaga } from './updateImageSaga'

export default function* rootSaga() {
    yield all([
        watchAddImageSaga(),
        watchUpdateImageSaga(),
        watchGetImageListSaga(),
        watchRemoveImageSaga(),
    ])
  }