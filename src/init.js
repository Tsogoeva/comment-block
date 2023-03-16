import render from './view.js';

const getId = () => Math.floor(Math.random() * 1000);

export const getCurrentDate = () => {
	const now = new Date();

	const date = {
		day: now.getDate().toString(),
		month: (now.getMonth() + 1) > 9 ? (now.getMonth() + 1).toString() : `0${now.getMonth() + 1}`,
		year: now.getFullYear().toString(),
		hour: now.getHours().toString(),
		minutes: now.getMinutes().toString(),
	}
	return date;
}

export const getCurrentFormatedDate = (date) => `${date.year}-${date.month}-${date.day}T${date.hour}:${date.minutes}`;

const formatDate = (date) => {
	const now = getCurrentDate();

	const enteredYear = date.slice(0, 4);
	const enteredMonth = date.slice(5, 7);
	const enteredDay = (date.slice(8, 10)).startsWith('0') ? date.slice(9, 10) : date.slice(8, 10);
	const enteredHour = date.slice(11, 13);
	const enteredMinutes = date.slice(14, 16);

	if (now.day === enteredDay && now.month === enteredMonth && now.year === enteredYear) {
		return `сегодня ${enteredHour}:${enteredMinutes}`;
	}

	if (now.day - 1 === +enteredDay && now.month === enteredMonth && now.year === enteredYear) {
		return `вчера ${enteredHour}:${enteredMinutes}`;
	}

	return `${enteredDay}.${enteredMonth}.${enteredYear} ${enteredHour}:${enteredMinutes}`;
}

const eventHandlers = (view, state, elements) => {
	const { form, container, name, textArea } = elements;

	function submitHandler(event) {
		event.preventDefault();

		const formData = new FormData(form);
		const date = formatDate(formData.get('date'));

		if (formData.get('name') && formData.get('text')) {
			view.comments.push({
				id: getId(),
				name: formData.get('name'),
				text: formData.get('text'),
				date,
			})

			view.validationField.name.valid = true;
			view.validationField.textArea.valid = true;

			view.numberOfComments = state.comments.length;
			view.process = 'received';
			state.process = '';

		} else {
			if (!formData.get('name')) {
				view.validationField.name.valid = false;
			}

			if (!formData.get('text')) {
				view.validationField.textArea.valid = false;
			}
		}
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

			const filtered = state.comments.filter((comment) => comment.id !== +currentId);

			view.comments = [...filtered];
			view.numberOfComments = state.comments.length;
		}
	}

	name.addEventListener('focus', () => {
		view.validationField.name.focused = true;
	});
	name.addEventListener('blur', () => {
		view.validationField.name.focused = false;
	});
	textArea.addEventListener('focus', () => {
		view.validationField.textArea.focused = true;
	});
	textArea.addEventListener('blur', () => {
		view.validationField.textArea.focused = false;
	});

	container.addEventListener('click', commentsHandler);
	form.addEventListener('submit', submitHandler);
	form.addEventListener('keyup', (event) => {
		if (event.code === 'Enter') {
			submitHandler(event);
		}
	})
}


export default function () {
	const elements = {
		form: document.querySelector('form'),
		name: document.querySelector('[name="name"]'),
		noticeName: document.querySelector('.comment__name_notice'),
		date: document.querySelector('[name="date"]'),
		textArea: document.querySelector('.comment__field_input'),
		noticeTextArea: document.querySelector('.comment__field_notice'),
		button: document.querySelector('[type="submit"]'),
		container: document.querySelector('.comment__list'),
		lineWithNumberOfComments: document.querySelector('.comment__count'),
	}

	const state = {
		process: '', // received
		comments: [],
		numberOfComments: 0,
		likeCommentIds: [],
		validationField: {
			name: {
				focused: false,
				valid: true,
			},

			textArea: {
				focused: false,
				valid: true,
			},
		},
	}

	const view = render(elements, state);

	eventHandlers(view, state, elements);
	elements.name.focus();
	elements.date.value = getCurrentFormatedDate(getCurrentDate());
}
