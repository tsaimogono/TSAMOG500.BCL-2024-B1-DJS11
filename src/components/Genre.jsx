import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGenre } from '../services/PodcastService.js';

const Genre = () => {
  const { genreId } = useParams();
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch genre data based on genreId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGenre(genreId);
        setGenre(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching genre with ID ${genreId}:`, error);
        setLoading(false);// Set loading state to false in case of error
      }
    };

    fetchData();
  }, [genreId]);
// Render loading state while waiting for data.
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!genre) {
    return <div>Genre not found</div>;
  }
// Render genre details and list of shows once data is loaded
  return (
    <div>
      <h1>{genre.name} Podcasts</h1>
      <ul>
        {genre.shows.map(show => (
          <li key={show.id}>
            <a href={`/show/${show.id}`}>{show.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genre;