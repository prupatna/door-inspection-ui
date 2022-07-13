import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import localization from './localization/en-US.json';

function App() {
  window.bundle = localization;
  return (
    <div className="App">
      <Header />
        Hello There Content
      <Footer />
    </div>
  );
}

export default App;
