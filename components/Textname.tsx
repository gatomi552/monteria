import React, { useState } from 'react';
import { TextInput, Text, View } from 'react-native';
import { z } from "zod";

const nombreSchema = z
  .string()
  .min(3, "El nombre debe tener al menos 3 caracteres")
  .max(25, "El nombre no puede tener más de 25 caracteres")
  .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El nombre solo puede contener letras y espacios");

const Textname = () => {

    const [Name, setEmail] = useState('');

    const [error, setError] = useState<string | null>(null);

    const validateInput = (text: string) => {
        // Ejecuta la validación de Zod
        const result = nombreSchema.safeParse(text);

        if (result.success) {
            setError(null);
        } else {
            // Si falla, guarda el primer mensaje de error
            setError(result.error.issues[0].message);
        }
    };

    // Función que se ejecuta con cada cambio en el TextInput
    const handleChangeText = (text: string) => {
        setEmail(text);
        // Validación en tiempo real
        
        if (text.length > 0) {
            validateInput(text);
        } else {
            // Muestra error si el campo se vacía
            setError("El Nombre es requerido.");
        }
    };

    // Define el estilo del borde dinámicamente
    const inputBorderClass = error ? 'border-red-500' : 'border-gray-500';

    <View>
        <TextInput
            // Estilos de NativeWind: altura, borde dinámico, ancho del borde, padding y redondeo
            className={`h-15 ${inputBorderClass} border px-3 rounded-md text-base`} 
            placeholder='Pablito'
            value={Name}
            onChangeText={handleChangeText}
            autoCapitalize="none"
        />
    </View>
};

export default Textname;
