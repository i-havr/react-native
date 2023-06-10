import { TouchableOpacity } from "react-native";

import { styles } from "./ButtonCustomized.styles";

export const ButtonCustomized = ({
  children,
  actionHandler,
  isActive,
  buttonStyle,
  bgColors,
}) => {
  return (
    <TouchableOpacity
      onPress={actionHandler}
      disabled={isActive ? false : true}
      style={{
        ...styles[buttonStyle],
        backgroundColor: isActive ? bgColors[0] : bgColors[1],
      }}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};
