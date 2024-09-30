import { Icon, useTheme } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

interface CustomIconProps {
  name: string;
  color?: string;
  white?: boolean;
}

export const CustomIcon = ({name, color, white = false}:CustomIconProps) => {
  const theme = useTheme();
  if(white){
    color = theme['color-info-100']
  }else if(!color){
    color = theme['text-basic-color']
  }else{
    color = theme[color] ?? theme['text-basic-color']
  }
  return (
    <Icon style={styles.icon} name={name} fill={color}/>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  }
});