import React, { useState } from 'react';
import { TextInput, Text, View } from 'react-native';
import { z } from "zod";

// Esquema de contraseña
const passwordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .max(32, "La contraseña no puede tener más de 32 caracteres")
  .regex(/[A-Z]/, "Debe incluir al menos 1 letra mayúscula")
  .regex(/[a-z]/, "Debe incluir al menos 1 letra minúscula")
  .regex(/[0-9]/, "Debe incluir al menos 1 número")
  .regex(/[^A-Za-z0-9]/, "Debe incluir al menos 1 caracter especial");

const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [errorMatch, setErrorMatch] = useState<string | null>(null);

  // Validación individual
  const validatePassword = (text: string) => {
    const result = passwordSchema.safeParse(text);

    if (result.success) {
      setErrorPassword(null);
    } else {
      setErrorPassword(result.error.issues[0].message);
    }
  };

  // Validación de coincidencia
  const validateMatch = (text: string, other: string) => {
    if (text !== other) {
      setErrorMatch("Las contraseñas no coinciden");
    } else {
      setErrorMatch(null);
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);

    if (text.length === 0) {
      setErrorPassword("La contraseña es requerida.");
    } else {
      validatePassword(text);
    }

    // También verifica coincidencia si ya hay texto en la otra
    if (password2.length > 0) {
      validateMatch(text, password2);
    }
  };

  const handlePassword2Change = (text: string) => {
    setPassword2(text);

    if (text.length === 0) {
      setErrorMatch("Debe repetir la contraseña.");
    } else {
      validateMatch(text, password);
    }
  };

  const borderClass1 = errorPassword ? "border-red-500" : "border-green-500";
  const borderClass2 = errorMatch ? "border-red-500" : "border-green-500";

  return (
    <View className="gap-4">

      {/* PASSWORD */}
      <View>
        <TextInput
          secureTextEntry
          className={`h-15 ${borderClass1} border px-3 rounded-md text-base`}
          placeholder="Contraseña"
          value={password}
          onChangeText={handlePasswordChange}
        />
        {errorPassword && (
          <Text className="text-red-500 mt-1 text-xs">{errorPassword}</Text>
        )}
      </View>

      {/* CONFIRM PASSWORD */}
      <View>
        <TextInput
          secureTextEntry
          className={`h-15 ${borderClass2} border px-3 rounded-md text-base`}
          placeholder="Repetir contraseña"
          value={password2}
          onChangeText={handlePassword2Change}
        />
        {errorMatch && (
          <Text className="text-red-500 mt-1 text-xs">{errorMatch}</Text>
        )}
      </View>

    </View>
  );
};

export default PasswordInput;
