export default function Weather({ weatherObj, city }) {
  if (weatherObj) {
    const { weather, main, wind } = weatherObj;

    return (
      <>
        <h3>{`Current Weather in ${city}`}</h3>
        <div className="weather">
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
            alt={weather[0].main}
            className="wicon"
          />
          <p className="wtext">{`Temp: ${(main.temp - 273.15).toFixed(1)}`}°C</p>
          <p className="wtext">{`Wind: ${wind.speed} m/s`}</p>
        </div>
      </>
    );
  }
}
