import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/ui/Header';
import ExplorePage from './components/pages/ExplorePage';
import HomePage from './components/pages/HomePage';

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/explore" element={<ExplorePage />} />
					{/* Add more routes here if needed */}
					<Route path="/" element={<HomePage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;