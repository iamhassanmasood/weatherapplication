import React from 'react'
import Title from "./components/Title"
import Form from "./components/Form"
import Weather from './components/Weather';

const API_KEY = "390b34d7d6792e3a2bd43701541053c9";

class App extends React.Component{
    state={
        temperature: undefined,
        humidity: undefined,
        city: undefined,
        country: undefined,
        description: undefined,
        error: undefined
    }


 getWeather= async (e)=>{
     e.preventDefault();
     const city = e.target.elements.city.value;
     const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);

    const data = await api_call.json();
    console.log(data);
    this.setState({
    temperature: data.main.temp,
    humidity: data.main.humidity,
    city: data.name,
    country:data.sys.country,
    description: data.weather[0].description,
    error: ""
    })
 }
    render(){
        return(
            <div>
                <Title/>
                <Form getWeather={this.getWeather}/>
                <Weather 
                temperature={this.state.temperature} 
                city={this.state.city}
                country={this.state.country}
                description={this.state.description}
                humidity={this.state.humidity}
                error={this.state.error}
                 />
            </div>
        );
    }
}
export default App;