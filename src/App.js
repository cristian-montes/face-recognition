import { Component } from 'react';
import Particles from 'react-tsparticles';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRocognition/FaceRecognition'
import Logo from './components/Logo/Logo';
import ImageLinkForm  from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Clarifai from "clarifai";
import './App.css';

// import axios from "axios"
const app = new Clarifai.App({
  apiKey:'58f6b9fdb79340e0afefa0bee880c6f3' // enter YOUR API key here
}) ;



const particlesOptions = {
  
    fpsLimit: 100,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              }
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
          }
        

}

class App extends Component {
  state ={
    input: '',
    imageUrl:''
  }

  onInputChange = (event) => {
   this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL , this.state.input)
    .then( function(response){
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err){

    }
    );
  }

  render(){
  return (
    <div className="App">
      <Particles className='particles'
          params={particlesOptions}
      />
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  );
  }
}

export default App;
