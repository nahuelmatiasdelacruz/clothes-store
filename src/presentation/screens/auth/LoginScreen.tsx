import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { Alert, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomIcon } from "../../components/ui/CustomIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface LoginScreenProps extends StackScreenProps<RootStackParams,'LoginScreen'>{};

export const LoginScreen = ({ navigation }:LoginScreenProps) => {
  const { login } = useAuthStore();
  const [isPosting,setIsPosting] = useState(false);
  const [form,setForm] = useState({
    email: '',
    password: ''
  });
  const onLogin = async () => {
    if(form.email.length === 0 || form.password.length === 0) return;
    setIsPosting(true);
    const success = await login(form.email,form.password);
    setIsPosting(false);
    if(!success) Alert.alert('Error al iniciar sesión','Usuario o contraseña incorrectos');
  }
  const { height } = useWindowDimensions();
  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category='h1'>Ingresar</Text>
          <Text category='p2'>Por favor, ingrese para continuar</Text>
        </Layout>
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder='Email'
            keyboardType='email-address'
            accessoryLeft={<CustomIcon name='email-outline'/>}
            autoCapitalize='none'
            value={form.email}
            onChangeText={(email)=>setForm({...form,email})}
            style={{marginBottom: 10}}
          />
          <Input
            placeholder='Password'
            secureTextEntry
            autoCapitalize='none'
            value={form.password}
            onChangeText={(password)=>setForm({...form,password})}
            accessoryLeft={<CustomIcon name='lock-outline'/>}
            style={{marginBottom: 20}}
          />
        </Layout>
        <Layout style={{height: 20}}/>
        <Layout>
          <Button
            disabled={isPosting}
            accessoryRight={<CustomIcon name='arrow-forward-outline' white/>}
            onPress={onLogin}>
            Iniciar sesión
          </Button>
        </Layout>
        <Layout style={{height: 40}}/>
        <Layout style={{alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center'}}>
          <Text>¿No tenés una cuenta?</Text>
          <Text status='primary' category='s1' onPress={()=>navigation.navigate('RegisterScreen')}>{' '}Crear cuenta</Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};