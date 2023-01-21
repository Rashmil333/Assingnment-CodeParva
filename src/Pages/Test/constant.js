import { HumidityIcon, VisiIcon, WindIcon } from "../../constant";

export const Measures = [
    { id: 0, title: 'Wind', icon: WindIcon }, { id: 1, title: 'Humidity', icon: HumidityIcon }, { id: 2, title: 'Visibility', icon: VisiIcon }
];

export function weatherapihandler(cityname) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=886705b4c1182eb1c69f28eb8c520e20`;
};

export const ErrorData = {
    name: 'city not found',
}