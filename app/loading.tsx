"use client"

import { MoonLoader } from "react-spinners"
import css from "./loading.module.css"
import type { CSSProperties } from "react"

const Loading = () => {
	const override: CSSProperties = {
		display: "block",
		margin: "0 auto",
		borderColor: "#17862c",
	}

	return (
		<div className={css.wrapper}>
			<MoonLoader
				color="#17862c"
				loading={true}
				cssOverride={override}
				// size={150}
				aria-label="Loading...."
				data-testid="loader"
			/>
			<span className={css.text}>Loading...please wait a moment.</span>
		</div>
	)
}

export default Loading