import { takeLatest, call, put } from 'redux-saga/effects'
import { ADD_IMAGE, setImageList } from '../actions'
import { apiSaveNewImage } from '../api';

function* addImageSaga({ payload }) {
    console.log('payload', payload)
    const imageList = yield call(apiSaveNewImage, payload)
    yield put(setImageList(imageList))
}

export function* watchAddImageSaga() {
    yield takeLatest(ADD_IMAGE, addImageSaga);
}