import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImg from '../../assets/logo.png';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const SignUp: React.FC = () => {
  const [showButton, setShowButton] = useState(true);

  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback((data: object) => {
    console.log(data);
  }, []);

  const hideCreateAccountButton = useCallback(() => {
    setShowButton(false);
  }, []);
  const showCreateAccountButton = useCallback(() => {
    setShowButton(true);
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      Keyboard.addListener('keyboardDidShow', hideCreateAccountButton);
      Keyboard.addListener('keyboardDidHide', showCreateAccountButton);

      return () => {
        Keyboard.removeListener('keyboardDidShow', hideCreateAccountButton);
        Keyboard.removeListener('keyboardDidHide', showCreateAccountButton);
      };
    }
    return undefined;
  }, [hideCreateAccountButton, showCreateAccountButton]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input name="name" icon="user" placeholder="Nome" />
              <Input name="email" icon="mail" placeholder="E-amil" />
              <Input
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Criar conta
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {showButton && (
        <BackToSignIn
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={20} color="#fff" />
          <BackToSignInText>Voltar para logon</BackToSignInText>
        </BackToSignIn>
      )}
    </>
  );
};

export default SignUp;