import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/ui/Header';
import ExplorePage from './components/pages/ExplorePage';
import HomePage from './components/pages/HomePage';
import MultiPlayerPage from './components/pages/MultiPlayerPage';

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/explore" element={<ExplorePage />} />
					{/* Add more routes here if needed */}
					<Route path="/" element={<HomePage />} />
					<Route path="/multiplayer" element={<MultiPlayerPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;