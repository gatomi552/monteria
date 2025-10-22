import { Text, View } from "react-native";
import TextField from "@/components/Textfield";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Escribe tu email</Text>
      <TextField></TextField>
    </View>
  );
}
