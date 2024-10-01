import { Button, Layout, Input, Text } from "@ui-kitten/components";
import { ScrollView, useWindowDimensions } from "react-native"
import { CustomIcon } from "../../components/ui/CustomIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";

interface RegisterScreenProps extends StackScreenProps<RootStackParams,'RegisterScreen'>{};

export const RegisterScreen = ({ navigation }:RegisterScreenProps) => {
  const { height } = useWindowDimensions();
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
            style={{marginBottom: 10}}
          />
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