import onChange from 'on-change';

import heartSvg from './images/heart.svg';
import trashSvg from './images/trash.svg';

function createComment(comment) {
	const container = document.createElement('div');
	container.classList.add('comment__item');
	container.dataset.id = comment.id;

	const name = document.createElement('span');
	name.classList.add('comment__item_name');
	name.textContent = comment.name;

	const text = document.createElement('span');
	text.classList.add('comment__item_text');
	text.textContent = comment.text;

	const footer = document.createElement('div');
	footer.classList.add('comment__item_footer');

	// const likeBlock = document.createElement('div');
	// likeBlock.classList.add('comment__item_like');

	const likeImg = document.createElement('img');
	likeImg.classList.add('comment__item_like');
	likeImg.setAttribute('src', heartSvg);
	likeImg.setAttribute('alt', 'Нравится');
	// likeBlock.append(likeImg);

	const removeImg = document.createElement('img');
	removeImg.classList.add('comment__item_remove');
	removeImg.setAttribute('src', trashSvg);
	removeImg.setAttribute('alt', 'Удалить');

	// const removeSvg = document.createElement('svg');
	// removeSvg.classList.add('comment__item_remove');
	// removeSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	// removeSvg.setAttribute('id', 'Outline');
	// removeSvg.setAttribute('viewBox', '0 0 24 24');
	// removeSvg.setAttribute('width', '15');

	// const trashPath1 = document.createElement('path');
	// trashPath1.setAttribute('d', 'M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z');
	// const trashPath2 = document.createElement('path');
	// trashPath2.setAttribute('d', 'M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z');
	// const trashPath3 = document.createElement('path');
	// trashPath3.setAttribute('d', 'M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z');

	// removeSvg.append(trashPath1, trashPath2, trashPath3);

	// console.log(removeSvg)

	// <svg xmlns = "http://www.w3.org/2000/svg" 
	// id = "Outline" 
	// viewBox = "0 0 24 24" 
	// width = "15" 
	// fill = "#b7b6b6" >
	// <path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z" />
	// <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z" />
	// <path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" /></ >




	const date = document.createElement('span');
	date.classList.add('comment__item_date');
	date.textContent = comment.date;

	footer.append(likeImg, removeImg, date);
	container.append(name, text, footer);

	return container;
}

function renderComments(comments, container) {
	container.innerHTML = '';

	comments.forEach((comment) => {
		const element = createComment(comment);
		container.append(element);
	});
}

function likeComments(likedIds) {
	const allComments = document.querySelectorAll('.comment__item');

	allComments.forEach((tag) => {
		const tagId = tag.dataset.id;
		const likeImg = tag.querySelector('.comment__item_like');

		if (likedIds.includes(tagId)) {
			likeImg.classList.add('liked');
		} else {
			likeImg.classList.remove('liked');
		}
	})
}

// function addNotice(field) {
// }

// function removeNotice(field) {

// }

export default (elements, state) => onChange(state, (path, value) => {

	console.log('VIEWWWWWWW')

	console.log(path)
	console.log(value)

	const { button, textArea, container, form, name, date } = elements;

	switch (path) {
		case 'comments':
			renderComments(state.comments, container);
			break;

		case 'likeCommentIds':
			likeComments(state.likeCommentIds);
			break;

		case 'focusedField.name':
			state.focusedField.name.classList.remove('invalid');

			if (state.invalidField.textArea) {
				button.setAttribute('disabled', '');
			} else {
				button.removeAttribute('disabled');
			}
			break;

		case 'focusedField.textArea':
			state.focusedField.textArea.classList.remove('invalid');

			if (state.invalidField.name) {
				button.setAttribute('disabled', '');
			} else {
				button.removeAttribute('disabled');
			}
			break;

		case 'invalidField.name':
			state.invalidField.name.classList.add('invalid');
			button.setAttribute('disabled', '');
			break;

		case 'invalidField.textArea':
			state.invalidField.textArea.classList.add('invalid');
			button.setAttribute('disabled', '');
			break;

		case 'process': {
			switch (value) {
				case 'receiving':
					button.setAttribute('disabled', '');
					name.setAttribute('readonly', '');
					date.setAttribute('readonly', '');
					textArea.setAttribute('readonly', '');
					break;

				case 'received':
					button.removeAttribute('disabled');
					name.removeAttribute('readonly');
					date.removeAttribute('readonly');
					textArea.removeAttribute('readonly');
					form.reset();
					textArea.focus();
					break;

				default:
					throw new Error('Unknown process!');

			}
			break;
		}

		default:
			throw new Error('Unknown state!');
	}
})