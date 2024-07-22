import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import { useState, useRef, FormEvent, useEffect } from 'react';
import { Select } from '../select';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';
import { clsx } from 'clsx';
import { Text } from '../text';

type ArticleParamsFormProps = {
	setAppState: (value: ArticleStateType) => void;
};
export const ArticleParamsForm = ({ setAppState }: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState(defaultArticleState);

	const [isFormOpen, setFormOpenState] = useState<boolean>(false);

	const asideRef = useRef<HTMLFormElement>(null);

	function closeOnArrowButton() {
		setFormOpenState(!isFormOpen);
	}

	function resetData() {
		setFormState(defaultArticleState);
		setAppState(defaultArticleState);
	}

	function submitData(event: FormEvent) {
		event.preventDefault();
		setAppState(formState);

		setFormState(formState);
	}

	useEffect(() => {
		if (!isFormOpen) return;

		function handleBackgroundClick(event: MouseEvent) {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setFormOpenState(false);
			}
		}

		document.addEventListener('mousedown', handleBackgroundClick);
		return () => {
			document.removeEventListener('mousedown', handleBackgroundClick);
		};
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton
				closeOnClick={() => closeOnArrowButton()}
				formOpened={isFormOpen}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form className={styles.form} onSubmit={submitData}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}></Select>
					<RadioGroup
						title='Размер шрифта'
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, fontSizeOption: value })
						}></RadioGroup>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, fontColor: value })
						}></Select>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, backgroundColor: value })
						}></Select>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, contentWidth: value })
						}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetData} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
