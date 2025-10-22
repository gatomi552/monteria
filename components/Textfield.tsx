import React, { useState } from 'react';
import { TextInput, Text, View } from 'react-native';
import { z } from "zod";

// 1. Define tu esquema de Zod
const emailSchema = z.string().email("Por favor, ingresa un email válido.");

const TextField = () => {
    // Estado para guardar el valor del input
    const [email, setEmail] = useState('');
    // Estado para guardar el error de validación
    const [error, setError] = useState<string | null>(null);

    // Función para validar el input
    const validateInput = (text: string) => {
        // Ejecuta la validación de Zod
        const result = emailSchema.safeParse(text);

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
            setError("El email es requerido.");
        }
    };
    
    // Define el estilo del borde dinámicamente
    const inputBorderClass = error ? 'border-red-500' : 'border-gray-500';

    return (
        // Los estilos se aplican usando el prop 'className' de NativeWind
        <View className="w-4/5 my-2"> 
            <TextInput
                // Estilos de NativeWind: altura, borde dinámico, ancho del borde, padding y redondeo
                className={`h-15 ${inputBorderClass} border px-3 rounded-md text-base`} 
                placeholder='you@email.com'
                value={email}
                onChangeText={handleChangeText}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {/* Muestra el error si existe */}
            {error && <Text className="text-red-500 mt-1 text-xs">{error}</Text>}
        </View>
    );
};

export default TextField;