import { useState } from 'react';

import { ImageDetailsPage } from './ImageDetailsPage';
import { searchArtworks } from '../api';
import { SearchForm } from './SearchForm';
import { Footer } from './Footer';

import './App.css';

export function App() {
	const [artworks, setArtworks] = useState([]);
	const [selectedArtwork, setSelectedArtwork] = useState(null);

	function onSearchSubmit(query) {
		// Search for the users's query.
		// TODO: render the results, instead of logging them to the console.
		// NOTE: `searchArtworks` currently returns local data, so that we
		// don't make too many requests to the API! Once we've built out
		// our UI, we need to make real requests!
		// @see: ./src/api.js
		searchArtworks(query).then((json) => {
			setArtworks(json.data);
			console.log(json.data);
		});
	}

	const handleArtworkSelection = (e) => {
		const result = artworks.find(({ title }) => title === e.target.value);
		setSelectedArtwork(result);
	};

	return (
		<div className="App">
			{!selectedArtwork ? (
				<>
					<h1>TCL Career Lab Art Finder</h1>
					<SearchForm onSearchSubmit={onSearchSubmit} />
					{artworks.map((art, idx) => (
						<ul key={idx}>
							<li>
								<button
									className="artwork-selection-button"
									value={art.title}
									onClick={handleArtworkSelection}
								>
									{art.title}
									{art.artist_title && <> by {art.artist_title}</>}
								</button>
							</li>
						</ul>
					))}
					<Footer />
				</>
			) : (
				<ImageDetailsPage
					artist_title={selectedArtwork.artist_title}
					image={selectedArtwork.image_id}
					setSelectedArtwork={setSelectedArtwork}
					title={selectedArtwork.title}
				/>
			)}
		</div>
	);
}
