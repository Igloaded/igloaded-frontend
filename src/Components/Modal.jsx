import Swal from 'sweetalert2';

const closeModal = () => {
	Swal.close();
};

const Modal = (props) => {
	const {
		title = 'Are you sure?',
		description = "You won't be able to revert this!",
		icon = 'warning',
		cancel = true,
		confirmText = 'Okay',
	} = props ? props : {};
	return Swal.fire({
		titleText: title,
		text: description,
		icon: icon,
		showCancelButton: cancel ? true : false,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: confirmText,
	});
};

export { Modal, closeModal };
