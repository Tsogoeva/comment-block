import render from './view.js';

const getId = () => Math.floor(Math.random() * 1000);

const eventHandlers = (view, state, elements) => {
	const { form, container } = elements;

	function submitHandler(event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		view.process = 'receiving';

		view.comments.push({
			id: getId(),
			name: formData.get('name'),
			text: formData.get('text'),
			date: formData.get('date'),
		})

		view.process = 'received';
	}

	function commentsHandler(event) {
		const target = event.target;

		if (target.classList.contains('comment__item_like')) {
			const currentTagComment = target.closest('[data-id]');
			const currentId = currentTagComment.dataset.id;

			let indexId = state.likeCommentIds.indexOf(currentId);

			if (indexId !== -1) {
				view.likeCommentIds.splice(indexId, 1);
			} else {
				view.likeCommentIds.push(currentId);
			}
		}

		if (target.classList.contains('comment__item_remove')) {
			const currentTagComment = target.closest('[data-id]');
			const currentId = currentTagComment.dataset.id;

			view.removingCommentId = +currentId;
			const filtered = state.comments.filter((comment) => comment.id !== +currentId);

			view.comments = [...filtered];
			state.removingCommentId = '';
		}
	}


	// function likeCommentHandler(event) {
	// 	console.log('sdvsdfbsfb')
	// 	const currentTagComment = event.target.closest('[data-id]');
	// 	const currentId = currentTagComment.dataset.id;

	// 	let indexId = state.likeCommentIds.indexOf(currentId);

	// 	if (indexId !== -1) {
	// 		view.likeCommentIds.splice(indexId, 1);
	// 	} else {
	// 		view.likeCommentIds.push(currentId);
	// 	}
	// }

	// function removeCommentHandler(event) {
	// 	const currentTagComment = event.target.closest('[data-id]');
	// 	const currentId = currentTagComment.dataset.id;

	// 	view.removingCommentId = currentId;
	// 	view.comments.filter((comment) => comment.id !== currentId);
	// 	view.process = 'removing';
	// }

	// console.log('')

	form.addEventListener('submit', submitHandler);
	container.addEventListener('click', commentsHandler);
	// likeIcons.forEach((icon) => icon.addEventListener('click', likeCommentHandler));
	// removeIcons.forEach((icon) => icon.addEventListener('click', removeCommentHandler));

}





export default function () {
	console.log('FRRRRRRRRRR')


	const elements = {
		form: document.querySelector('form'),
		container: document.querySelector('.comment__list'),
		// nameItem: document.querySelector('.comment__item_name'),
		// textItem: document.querySelector('.comment__item_text'),
		// dateItem: document.querySelector('.comment__item_date'),
		// likeIcons: document.querySelectorAll('.comment__item_like'),
		// removeIcons: document.querySelectorAll('.comment__item_remove'),
		textArea: document.querySelector('.comment__field_input'),
		button: document.querySelector('[type="submit"]'),
	}

	const state = {
		process: '', // receivind, received, removing, addLike, removeLike
		comments: [
			{
				id: 75,
				name: 'Tanya',
				text: 'Tatatatatatattatatattataatat',
				date: '25.04.2022',
			}
		], // { id, name, text, date, isLiked: false }
		likeCommentIds: ['3', '4', '77', '46'],
		removingCommentId: '',
	}

	const view = render(elements, state);

	eventHandlers(view, state, elements);
}