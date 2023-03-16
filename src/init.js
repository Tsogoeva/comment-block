import render from './view.js';

const getId = () => Math.floor(Math.random() * 1000);

const eventHandlers = (view, state, elements) => {
	const { form, container, name, textArea } = elements;

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

	name.addEventListener('focus', (event) => {
		state.invalidField.name = '';
		view.focusedField.name = event.target;
	});
	name.addEventListener('blur', (event) => {
		state.focusedField.name = '';

		if (event.target.value.length === 0) {
			view.invalidField.name = event.target;
		}
	});
	textArea.addEventListener('focus', (event) => {
		state.invalidField.textArea = '';
		view.focusedField.textArea = event.target;
	});
	textArea.addEventListener('blur', (event) => {
		state.focusedField.textArea = '';

		if (event.target.value.length === 0) {
			view.invalidField.textArea = event.target;
		}
	});

	container.addEventListener('click', commentsHandler);
	form.addEventListener('submit', submitHandler);


}






export default function () {
	console.log('FRRRRRRRRRR')


	const elements = {
		form: document.querySelector('form'),
		name: document.querySelector('[name="name"]'),
		date: document.querySelector('[name="date"]'),
		textArea: document.querySelector('.comment__field_input'),
		button: document.querySelector('[type="submit"]'),
		container: document.querySelector('.comment__list'),
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
		focusedField: {
			name: '', textArea: '',
		},
		invalidField: {
			name: '', textArea: '',
		},
	}

	const view = render(elements, state);

	eventHandlers(view, state, elements);

}