import { all } from 'redux-saga/effects'
import { watchAddImageSaga } from './addImageSaga'
import { watchGetImageListSaga } from './getImageListSaga'

export default function* rootSaga() {
    yield all([
        watchAddImageSaga(),
        watchGetImageListSaga(),
    ])
  }