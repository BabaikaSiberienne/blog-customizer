import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type ArrowButtonProps = {
	closeOnClick?: () => void;
	formOpened?: boolean;
};

export const ArrowButton = ({ closeOnClick, formOpened }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={closeOnClick}
			className={clsx(styles.container, {
				[styles.container_open]: formOpened,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, formOpened && styles.arrow_open)}
			/>
		</div>
	);
};
