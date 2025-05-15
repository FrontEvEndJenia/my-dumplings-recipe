import { useState } from 'react'
import styles from './app.module.css'
import data from './data.json'

export const App = () => {
	const [steps, setSteps] = useState(data)
	const [activeIndex, setActiveIndex] = useState(0)

	const firstStep = activeIndex === 0
	const lastStep = activeIndex === steps.length - 1

	const backButtonClick = () => {
		if (!firstStep) setActiveIndex(activeIndex - 1)
	}

	const forwardButtonClick = () => {
		if (!lastStep) setActiveIndex(activeIndex + 1)
	}

	const beginningButtonClick = () => {
		setActiveIndex(0)
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{/* вывожу список шагов. в зависимости от активного шага, добавляю стили*/}
						{steps.map((step, index) => (
							<li
								className={
									styles['steps-item'] +
									' ' +
									(index < activeIndex ? styles.done : '') +
									' ' +
									(index === activeIndex ? styles.active : '')
								}
								key={step.id}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => {
										setActiveIndex(index)
									}}
								>
									{index + 1}
								</button>
								{step.title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							disabled={firstStep}
							onClick={backButtonClick}
						>
							Назад
						</button>
						{/* если элемент последний, добавляю кнопку 'начать сначала', иначе 'далее' */}
						{lastStep ? (
							<button
								className={styles.button}
								onClick={beginningButtonClick}
							>
								Начать сначала
							</button>
						) : (
							<button
								className={styles.button}
								onClick={forwardButtonClick}
							>
								Далее
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
