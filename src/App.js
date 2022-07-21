import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import localization from './localization/en-US.json';
import Camera from './components/Camera';

function App() {
  window.bundle = localization;
  return (
    <div className="App">
      <Header />
        <Camera />
      <Footer />
    </div>
  );
}

export default App;
