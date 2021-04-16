import React from "react";
import "./Result.css";

const Result = (props) => {
	const {
		cityName,
		sunrise,
		sunset,
		date,
		temp,
		pressure,
		wind,
		err,
		timeZone,
	} = props.weather;

	let content = null;

	if (!err && cityName !== "") {
		const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
		const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
		content = (
			<div>
				<h3>
					Wyniki wyszukiwania dla <em>{cityName}</em>
				</h3>
				<h4>Dane dla dnia i godziny: {date}</h4>
				<h4>Aktualna temperatura: {Math.round(temp)} &deg;C</h4>
				<h4>Wschód słońca dzisiaj o {sunriseTime}</h4>
				<h4>Zachód słońca dzisiaj o {sunsetTime}</h4>
				<h4>Aktualna siła wiatru {wind} m/s</h4>
				<h4>Aktualne ciśnienie {pressure} hPa</h4>
			</div>
		);
	}

	return (
		<div className="result">
			{err ? `Nie mamy w bazie ${cityName}` : content}
		</div>
	);
};

export default Result;
