import React, { useEffect, useCallback, useState } from 'react';
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

import logoImg from '../../assets/logo.png';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const [showButton, setShowButton] = useState(true);

  const navigation = useNavigation();

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
              <Title>Faça seu logon</Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-amil" />
            <Input
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
            />
            <Button
              onPress={() => {
                console.log('adof');
              }}
            >
              Entrar
            </Button>

            <ForgotPassword
              onPress={() => {
                console.log('adof');
              }}
            >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {showButton && (
        <CreateAccountButton
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <Icon name="log-in" size={20} color="#ff9000" />
          <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
      )}
    </>
  );
};

export default SignIn;
