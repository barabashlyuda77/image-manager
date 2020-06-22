import { takeLatest, call, put } from 'redux-saga/effects'
import { setImageList, UPDATE_IMAGE } from '../actions'
import { apiReplaceImage } from '../api';

function* updateImageSaga({ payload: { imageId, image} }) {
    const imageList = yield call(apiReplaceImage, imageId, image)
    yield put(setImageList(imageList))
}

export function* watchUpdateImageSaga() {
    yield takeLatest(UPDATE_IMAGE, updateImageSaga);
}