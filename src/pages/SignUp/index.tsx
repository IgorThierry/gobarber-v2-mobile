import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.png';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [showButton, setShowButton] = useState(true);

  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Email obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert('Sucesso!', 'Usuário cadastrado com sucesso.');
        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro na cadastro',
          'Ocorreu um erro ao fazer o cadastro, tente novamente mais tarde.',
        );
      }
    },
    [navigation],
  );

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
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-amil"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
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
