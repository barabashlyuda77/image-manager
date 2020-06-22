import { takeLatest, call, put } from 'redux-saga/effects'
import { REMOVE_IMAGE, setImageList } from '../actions'
import { apiRemoveImage } from '../api';

function* removeImageSaga({ payload }) {
    const imageList = yield call(apiRemoveImage, payload.imageId)
    yield put(setImageList(imageList))
}

export function* watchRemoveImageSaga() {
    yield takeLatest(REMOVE_IMAGE, removeImageSaga);
}