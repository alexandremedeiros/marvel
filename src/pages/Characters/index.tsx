import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, ContentArea, Character } from './styles';

import api from '../../services/api';

interface Thumbnail {
  extension: string;
  path: string;
}

interface CharacterData {
  id: number;
  name: string;
  thumbnail: Thumbnail;
  imagePath: string;
  description: string;
}

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<CharacterData[]>([]);

  useEffect(() => {
    api
      .get(
        `/characters?ts=1&apikey=5c3a13d5c230a072424217c160f86f2c&hash=92a35ec92565a92d76bcb71d6bdda9bf&limit=100&offset=0`,
      )
      .then((response) => {
        // console.log(response.data.data.results);
        const characterFormatted = response.data.data.results.map(
          (charac: CharacterData) => {
            const newCharac: CharacterData = charac;
            const characJson = localStorage.getItem(String(charac.id));
            if (characJson) {
              const tmp =
                characJson !== null ? JSON.parse(characJson) : undefined;
              newCharac.name = tmp.name;
              newCharac.description = tmp.description;
            }

            return {
              ...newCharac,
              imagePath: `${charac.thumbnail.path}.${charac.thumbnail.extension}`,
            };
          },
        );

        setCharacters(characterFormatted);
      });
  }, []);

  return (
    <Container>
      <Content>
        <ContentArea>
          <h1>Characters</h1>

          {characters.map((charac) => (
            <Character key={charac.id}>
              <Link
                to={{
                  pathname: '/character-detail',
                  state: charac,
                }}
              >
                <img src={charac.imagePath} alt={charac.name} />
              </Link>

              <strong>{charac.name}</strong>
            </Character>
          ))}
        </ContentArea>
      </Content>
    </Container>
  );
};

export default Characters;
