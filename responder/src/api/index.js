import { postFetch, getFetch } from './resource.js';

exports.answer = formData => {
  formData.append('concrete', 'answer');
  let promiseRes = postFetch(formData);
  return promiseRes;
}

exports.resetStore = () => {
	let formData = new FormData()
  formData.append('concrete', 'resetStore');
  let promiseRes = postFetch(formData);
  return promiseRes;
}

exports.getUsersData = (page = 1) => {
  let data = `concrete=getUsersData&page=${page}`;
  return getFetch(data);
}