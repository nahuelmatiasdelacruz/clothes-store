import { Button, Icon, Layout, Text } from "@ui-kitten/components"

export const HomeScreen = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HOME SCREEN</Text>
      <Button accessoryLeft={<Icon name='facebook'/>}>
        Cerrar sesión
      </Button>
    </Layout>
  )
}