import { Button, Layout } from "@ui-kitten/components";
import { CustomIcon } from "./CustomIcon";
import { StyleProp, ViewStyle } from "react-native";

interface FABProps {
  iconName: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const FAB = ({ style, iconName, onPress }:FABProps) => {
  return (
    <Button style={[{
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.4,
        elevation: 3,
        borderRadius: 13,
      },
      style
      ]}
      accessoryLeft={<CustomIcon name={iconName} white/>}
      onPress={onPress}
    />
  )
}