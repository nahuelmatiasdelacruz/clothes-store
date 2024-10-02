import { Button, Layout, Input, Text } from "@ui-kitten/components";
import { Alert, ScrollView, useWindowDimensions } from "react-native"
import { CustomIcon } from "../../components/ui/CustomIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { useState } from "react";
import { tesloApi } from "../../../config/api/tesloApi";

interface RegisterScreenProps extends StackScreenProps<RootStackParams,'RegisterScreen'>{};

interface RegisterFormProps {
  fullName: string;
  email: string;
  password: string;
}

export const RegisterScreen = ({ navigation }:RegisterScreenProps) => {
  const [registerForm,setRegisterForm] = useState<RegisterFormProps>({
    fullName: '',
    email: '',
    password: ''
  });
  const [isPosting,setIsPosting] = useState(false);
  const { height } = useWindowDimensions();
  const onRegister = async () => {
    if(!registerForm.email.length || !registerForm.fullName.length || !registerForm.password.length){
      return Alert.alert('Hubo un error','Por favor, complete todos los campos para continuar con el registro');
    }
    setIsPosting(true);
    try{
      await tesloApi.post('/auth/register',registerForm);
      setIsPosting(false);
      Alert.alert('Registro completado','Ya puede iniciar sesión');
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}]
      });
    }catch(e){
      Alert.alert('Error',`Hubo un error al completar el registro: ${e}`);
      setIsPosting(false);
    }
  }
  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.30}}>
          <Text category='h1'>Registro</Text>
          <Text category='p2'>Por favor, complete sus datos para continuar con el registro</Text>
        </Layout>
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder='Nombre completo'
            accessoryLeft={<CustomIcon name='person-outline'/>}
            autoCapitalize='none'
            value={registerForm.fullName}
            onChangeText={(fullName)=>setRegisterForm({...registerForm,fullName})}
            style={{marginBottom: 10}}
          />
          <Input
            placeholder='Email'
            keyboardType='email-address'
            accessoryLeft={<CustomIcon name='email-outline'/>}
            autoCapitalize='none'
            value={registerForm.email}
            onChangeText={(email)=>setRegisterForm({...registerForm,email})}
            style={{marginBottom: 10}}
          />
          <Input
            placeholder='Password'
            secureTextEntry
            autoCapitalize='none'
            value={registerForm.password}
            onChangeText={(password)=>setRegisterForm({...registerForm,password})}
            accessoryLeft={<CustomIcon name='lock-outline'/>}
            style={{marginBottom: 20}}
          />
        </Layout>
        <Layout style={{height: 20}}/>
        <Layout>
          <Button
            disabled={isPosting}
            accessoryRight={<CustomIcon name='arrow-forward-outline' white/>}
            onPress={onRegister}>
            Completar registro
          </Button>
        </Layout>
        <Layout style={{height: 40}}/>
        <Layout style={{alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center'}}>
          <Text>¿Ya tenés una cuenta?</Text>
          <Text status='primary' category='s1' onPress={()=>navigation.goBack()}>{' '}Ingresar</Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};