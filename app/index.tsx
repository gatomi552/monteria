import { Text, View } from "react-native";
import "@/global.css"
import TextField from "@/components/Textfield";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-red-100 h-screen">
      <Text className="text-xl font-bold text-gray-900 mb-2">Escribe tu email</Text>
      <TextField></TextField>
    </View>
  );
}
