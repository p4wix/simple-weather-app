import React, { Component } from "react";
import Form from "./Form";
import Result from "./Result";
import "./App.css"; 

//API key
const API_KEY = "5de7bbddd5a076166b5221065a93e1ac";
 
class App extends Component {
	//handle API

	state = {
		value: "",
		date: "",
		cityName: "",
		sunrise: "",
		sunset: "",
		temp: "",
		pressure: "",
		wind: "",
		timeZone: "",
		err: false,
	};

	handleInputChange = (e) => {
		this.setState({
			value: e.target.value,
		});
	};

	handleCitySubmit = (e) => {
		e.preventDefault();
		const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${API_KEY}&units=metric`;

		fetch(API)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw Error("there is no such city");
			})
			.then((result) => {
				const date = new Date().toLocaleString();
				this.setState({
					date: date,
					sunrise: result.sys.sunrise,
					sunset: result.sys.sunset,
					temp: result.main.temp,
					pressure: result.main.pressure,
					wind: result.wind.speed,
					cityName: this.state.value,
					err: false,
					timeZone: result.timeZone,
				});
			})
			.catch((err) => {
				console.log(err);
				this.setState({
					err: true,
					cityName: this.state.value,
				});
			});
	};

	render() {
		const currentWeather = {
			date: this.state.date,
			sunrise: this.state.sunrise,
			sunset: this.state.sunset,
			temp: this.state.temp,
			pressure: this.state.pressure,
			wind: this.state.wind,
			cityName: this.state.cityName,
			err: this.state.err,
			timeZone: this.state.timeZone,
		};

		return (
			<div className="App">
				{/* passing the value and chagneFunction to Form props*/}
				<Form
					value={this.state.value}
					change={this.handleInputChange}
					submit={this.handleCitySubmit}
				/>
				<Result weather={currentWeather} />
			</div>
		);
	}
}

export default App;
