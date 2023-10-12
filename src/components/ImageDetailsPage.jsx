import './ImageDetailsPage.css';

export const ImageDetailsPage = ({
	artist_title,
	image,
	title,
	setSelectedArtwork,
}) => {
	return (
		<>
			<div className="heading">
				<div className="title">
					<h1>{title}</h1>
					{artist_title && <h4>by {artist_title}</h4>}
				</div>
				<button
					className="back-button"
					onClick={() => setSelectedArtwork(null)}
				>
					Back
				</button>
			</div>
			<img
				alt={artist_title}
				src={`https://www.artic.edu/iiif/2/${image}/full/843,/0/default.jpg`}
			/>
		</>
	);
};
