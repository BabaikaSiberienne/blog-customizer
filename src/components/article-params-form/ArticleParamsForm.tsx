import { ArrowButton } from '../arrow-button';
import { Button } from 'components/button';
import { useState } from 'react';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { clsx } from 'clsx';

export const ArticleParamsForm = () => {
	const [formOpenState, setFormOpenState] = useState<boolean>(false);

	function closeOnArrowButton() {
		setFormOpenState(!formOpenState);
	}

	return (
		<>
			<ArrowButton
				closeOnClick={() => closeOnArrowButton()}
				formOpened={formOpenState}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: formOpenState,
				})}>
				<h2>Задайте параметры</h2>
				<p>Шрифт</p>
				<Select
					selected={fontFamilyOptions[0]}
					options={fontFamilyOptions}></Select>
				<p>Размер шрифта</p>
				<RadioGroup
					title='Размер шрифта'
					name='Размер шрифта'
					options={fontSizeOptions}
					selected={fontSizeOptions[0]}></RadioGroup>
				<p>Цвет шрифта</p>
				<Select selected={fontColors[0]} options={fontColors}></Select>
				<Separator></Separator>
				<p>Цвет фона</p>
				<Select
					selected={backgroundColors[0]}
					options={backgroundColors}></Select>
				<p>Ширина контента</p>
				<Select
					selected={contentWidthArr[0]}
					options={contentWidthArr}></Select>

				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
