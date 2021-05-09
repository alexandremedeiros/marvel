import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, AvatarInput } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';

interface SerieItem {
  resourceURI: string;
  name: string;
}

interface Serie {
  items: SerieItem[];
}

interface Thumbnail {
  extension: string;
  path: string;
}

interface CharacterData {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  imagePath: string;
  series: Serie;
}

const CharacterDetail: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const location = useLocation();

  const locationState: CharacterData = location.state as CharacterData;
  const [imagePath, setImagePath] = useState<string>('');

  // console.log(locationState);

  useEffect(() => {
    if (locationState) {
      formRef.current?.setData({ name: locationState.name });
      formRef.current?.setData({ description: locationState.description });
      setImagePath(
        `${locationState.thumbnail.path}.${locationState.thumbnail.extension}`,
      );
    }
  }, [locationState]);

  const handleSubmit = useCallback(
    async (data: CharacterData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, description } = data;

        // console.log('Data', data);
        // console.log('ID', locationState.id);

        localStorage.setItem(
          String(locationState.id),
          JSON.stringify({
            id: locationState.id,
            name,
            description,
          }),
        );

        addToast({
          type: 'success',
          title: 'Pesonagem atualizado!',
          description:
            'Suas informações do personagem foram atualizadas com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar personagem. Tente novamente.',
        });
      }
    },
    [addToast, locationState.id],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <AvatarInput>
            {imagePath ? (
              <img src={imagePath} alt={locationState.name} />
            ) : (
              <img
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                alt="avatar"
              />
            )}
          </AvatarInput>

          <Input name="name" />
          <TextArea label="" name="description" rows={7} />
          <br />
          <h2>Séries</h2>

          <ul>
            {locationState.series.items.map((item) => (
              <li key={item.resourceURI}>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CharacterDetail;
