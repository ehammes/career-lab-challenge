import { useState } from 'react';

import { ImageDetailsPage } from './ImageDetailsPage';
import { searchArtworks } from '../api';
import { SearchForm } from './SearchForm';
import { Footer } from './Footer';

import './App.css';

export function App() {
	// Set artwork search results
	const [artworks, setArtworks] = useState([]);
	// Set selected artwork
	const [selectedArtwork, setSelectedArtwork] = useState(null);

	// Fetch data results from API based on search query
	function onSearchSubmit(query) {
		searchArtworks(query).then((json) => {
			setArtworks(json.data);
		});
	}

	// Find matching artwork object based on user's artwork selection in artwork list and set as state
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
