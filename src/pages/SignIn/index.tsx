import React from 'react';
import { Image } from 'react-native';

import logoImg from '../../assets/logo.png';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu logon</Title>

      <Input name="email" icon="mail" placeholder="E-amil" />
      <Input name="password" icon="lock" placeholder="Senha" secureTextEntry />
      <Button
        onPress={() => {
          console.log('adof');
        }}
      >
        Entrar
      </Button>
    </Container>
  );
};

export default SignIn;
