/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Photo } from '../../models/Photo';
import axios, { AxiosResponse } from 'axios';

export const PhotoList: React.FC = () => {
  const [refresh, setRefresh] = useState(0);
  const [name, setName] = useState('');

  return (
    <div>
      <button onClick={() => setRefresh((cr) => ++cr)}>refresh</button>
      <div>
        <label>
          Your Name:
          <input
            name="Your name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
        </label>
        <List refresh={refresh} name={name} />
      </div>
    </div>
  );
};

export function List({ refresh, name }: { refresh: number; name: string }) {
  const [loading, setLoading] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading((l) => l + 1);

      try {
        const r = await axios.get<Photo[]>(`/api/photos?name=${name}`);
        setPhotos(r.data);
        setError('');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        // eslint-disable-next-line
        setError(e.response.data.message);
      } finally {
        setLoading((l) => l - 1);
      }
    }

    void load();
  }, [refresh, name]);

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
        }}
      >
        {error ? (
          <div
            className="error"
            style={{
              background: 'rgb(232, 232, 232)',
              color: 'white',
              margin: '1rem',
              padding: '1rem',
              borderRadius: '1rem',
            }}
          >
            {error}
          </div>
        ) : null}
        {loading ? (
          <div
            className="loading"
            style={{
              background: 'rgb(192, 192, 192)',
              margin: '1rem',
              padding: '1rem',
              borderRadius: '1rem',
            }}
          >
            Loading...
          </div>
        ) : null}
      </div>

      {photos.map((photo) => (
        <PhotoDetail photo={photo} key={photo.id} />
      ))}
    </div>
  );
}

export function PhotoDetail({ photo }: { photo: Photo }) {
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    setFavourite(false);
  }, [photo]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        margin: '1rem',
        border: '1px solid grey',
        borderRadius: '1rem',
        overflow: 'hidden',
      }}
    >
      <img
        style={{
          marginRight: '1rem',
        }}
        src={photo.thumbnailURL}
        aria-label={photo.title}
        alt={photo.title}
      />
      <div>
        <h2>{photo.title}</h2>
        <h3>PhotoId: {photo.id}</h3>

        <button
          onClick={() => {
            // we already have an example with .catch for this video :)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            void axios
              .post<Photo>('/api/favourite', { ...photo, favourite })
              .then((response: AxiosResponse<{ favourite: boolean }>) => {
                setFavourite(response.data.favourite);
              });
          }}
        >
          {favourite ? 'Remove from Favourites' : 'Add To Favourites'}
        </button>
      </div>
    </div>
  );
}
