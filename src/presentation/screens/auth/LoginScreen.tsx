import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomIcon } from "../../components/ui/CustomIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";

interface LoginScreenProps extends StackScreenProps<RootStackParams,'LoginScreen'>{};

export const LoginScreen = ({ navigation }:LoginScreenProps) => {
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
            style={{marginBottom: 10}}
          />
          <Input
            placeholder='Password'
            secureTextEntry
            autoCapitalize='none'
            accessoryLeft={<CustomIcon name='lock-outline'/>}
            style={{marginBottom: 20}}
          />
        </Layout>
        <Layout style={{height: 20}}/>
        <Layout>
          <Button
            accessoryRight={<CustomIcon name='arrow-forward-outline' white/>}
            onPress={()=>{}}>
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