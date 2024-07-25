import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [featureOne, setFeatureOne] = useState()
  const [featureTwo, setFeatureTwo] = useState()
  const [prediction, setPrediction] = useState([])

  const teams = ['Chicago Bulls', 'Toronto Raptors', 'Miami Heat', 'Memphis Grizzlies', 'Atlanta Hawks', 'LA Lakers', 'Indiana Pacers', 'Houston Rockets', 'LA Clippers', 'Atlanta Hawks']

  const getRandomNumber = () => {
    return Math.floor(Math.random() * (112 - 50 + 1)) + 50;
  }

  const handleTeamSelect1 = (event) => {
    const randomNum = getRandomNumber();
    setCount(prevCount => prevCount + 1);
    setFeatureOne(randomNum.toString());

  }

  const handleTeamSelect2 = (event) => {
    const randomNum = getRandomNumber();
    setCount(prevCount => prevCount + 1);
    setFeatureTwo(randomNum.toString());
  }

  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  const handlePredict = async () => {

    // console.log('features ', Number featureOne, typeof featureTwo)
    try {
      const response = await axios.post('https://basketball-score-predictor.onrender.com/predict', {

        feature1: Number(featureOne),
        feature2: Number(featureTwo)

      });
      setPrediction(response.data);
      console.log('response', response.data)
      console.log('this is prediction', prediction)
      console.log(response.data)
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  }

  return (
    <div className='flex h-screen w-[100%] items-center justify-center predictor'>
      <div className="select-part w-[50%] h-[100%] flex flex-col items-center bg-black/40 justify-center p-10 border-r-[0.5px] border-white/10">
        <h1 className='text-[50px] font-semibold'>Select opponents</h1>
        <div className="group w-full my-[50px] flex flex-col gap-5">

          <select
            className="select select-secondary w-full color-red-400"
            onChange={handleTeamSelect1}
          >
            <option disabled selected>Pick your first team</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </select>
          <p className='text-center'>First team: {featureOne}</p>
          <select
            className="select select-secondary w-full"
            onChange={handleTeamSelect2}
          >
            <option disabled selected>Pick your second team</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </select>
          <p className='text-center'>Second Team: {featureTwo}</p>
        </div>

        <button onClick={handlePredict} className="btn btn-outline btn-primary w-full text-lg text-white">Predict</button>

      </div>
      <div className="result w-[50%] h-[100%] flex bg-black/40 items-center justify-center ">
        {prediction.prediction && (
          <div className="result-body flex flex-col items-center h-full justify-center">
            <h1 className='text-[50px] font-semibold'>Result </h1>
            <div className="results flex flex-col gap-3"></div>


            {prediction ? (
              <div className='flex flex-col gap-3 my-10'>
                <div className="scores flex mb-12 bg-black/10 rounded-3xl py-10 px-5 flex-col gap-5 items-center">
                  <span className='text-xl font-semibold p-3 rounded-md bg-black/10'>{prediction.prediction[0]}</span>
                  <span className='text-xl font-semibold p-3 rounded-md bg-black/10'>{prediction.prediction[1]}</span>
                </div>
                <span className='text-2xl font-bold text-center italic'>{prediction.prediction[2]} <span className='text-md font-normal'>team comes out on top</span></span>
              </div>
            ) : (
              <p>No prediction yet. Click the Predict button to get a result.</p>
            )}
          </div>
        )}
        {!prediction.prediction && (
          <div className="bounce">
            <img width="80" height="80" src="https://img.icons8.com/officel/80/basketball.png" alt="basketball" className='bouncing-ball'/>
          </div>
        )}
      </div>
    </div>
  )
}

export default App