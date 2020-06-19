import { takeLatest, call, put } from 'redux-saga/effects'
import { GET_IMAGE_LIST, setImageList } from '../actions'
import { apiGetImageList } from '../api';

function* getImageListSaga({ payload }) {
    const imageList = yield call(apiGetImageList)
    yield put(setImageList(imageList))
}

export function* watchGetImageListSaga() {
    yield takeLatest(GET_IMAGE_LIST, getImageListSaga);
}