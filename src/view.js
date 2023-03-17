import onChange from 'on-change';

import heartSvg from './images/heart.svg';
import likedHeartSvg from './images/liked-heart.svg';
import trashSvg from './images/trash.svg';

import { getCurrentDate, getCurrentFormatedDate } from './init.js';

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

	const likeImg = document.createElement('img');
	likeImg.classList.add('comment__item_like');
	likeImg.setAttribute('src', heartSvg);
	likeImg.setAttribute('alt', 'Нравится');

	const removeImg = document.createElement('img');
	removeImg.classList.add('comment__item_remove');
	removeImg.setAttribute('src', trashSvg);
	removeImg.setAttribute('alt', 'Удалить');

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
			const likedImg = document.createElement('img');
			likedImg.classList.add('comment__item_like');
			likedImg.setAttribute('src', likedHeartSvg);
			likedImg.setAttribute('alt', 'Нравится');
			likeImg.replaceWith(likedImg);

		} else {
			const unlikedImg = document.createElement('img');
			unlikedImg.classList.add('comment__item_like');
			unlikedImg.setAttribute('src', heartSvg);
			unlikedImg.setAttribute('alt', 'Нравится');

			likeImg.replaceWith(unlikedImg);
		}
	})
}

const getStringInCorrectCase = (int) => {
	const words = ['комментарий', 'комментария', 'комментариев'];

	if (int === 0) {
		return 'Нет ' + words[2];
	}

	const number = int + ' ';
	const remainderOf100 = int % 100;
	const remainderOf10 = remainderOf100 % 10;

	if (remainderOf100 > 10 && remainderOf100 < 20) {
		return number + words[2];
	}

	if (remainderOf10 > 1 && remainderOf10 < 5) {
		return number + words[1];
	}

	if (remainderOf10 === 1) {
		return number + words[0];
	}

	return number + words[2];
}

export default (elements, state) => onChange(state, (path, value) => {
	const {
		lineWithNumberOfComments,
		container,
		name,
		noticeName,
		date,
		textArea,
		noticeTextArea,
		form,
	} = elements;

	const {
		comments,
		likeCommentIds,
		numberOfComments,
	} = state;

	switch (path) {
		case 'comments':
			renderComments(comments, container);
			likeComments(likeCommentIds);
			break;

		case 'numberOfComments':
			lineWithNumberOfComments.textContent = getStringInCorrectCase(numberOfComments);
			break;

		case 'likeCommentIds':
			likeComments(likeCommentIds);
			break;

		case 'validationField.name.focused':
			if (value) {
				name.classList.remove('invalid');
				noticeName.style.display = 'none';
			}
			break;

		case 'validationField.name.valid':
			if (value) {
				name.classList.remove('invalid');
				noticeName.style.display = 'none';
			} else {
				name.classList.add('invalid');
				name.blur();
				noticeName.style.display = 'block';
			}
			break;

		case 'validationField.textArea.focused':
			if (value) {
				textArea.classList.remove('invalid');
				noticeTextArea.style.display = 'none';
			}
			break;

		case 'validationField.textArea.valid':
			if (value) {
				textArea.classList.remove('invalid');
				noticeTextArea.style.display = 'none';
			} else {
				textArea.classList.add('invalid');
				noticeTextArea.style.display = 'block';
			}
			break;

		case 'process':
			form.reset();
			name.focus();
			date.value = getCurrentFormatedDate(getCurrentDate());
			break;

		default:
			throw new Error('Unknown state!');
	}
})
