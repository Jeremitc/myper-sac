// src/types/user.ts

// Usamos 'export' para que este "plano" esté disponible para cualquier otro archivo del proyecto que lo necesite.
// 'interface User' es como decir: "Estoy creando una plantilla o un contrato llamado 'User'".
export interface User {
  // A partir de ahora, cualquier variable o dato en nuestro código que se declare como de tipo 'User'
  // está OBLIGADO a cumplir con la siguiente estructura:

  // DEBE tener una propiedad 'id', y su valor DEBE ser un número (number).
  id: number;
  
  // DEBE tener una propiedad 'name', y su valor DEBE ser texto (string).
  name: string;
  
  // DEBE tener una propiedad 'username', y su valor DEBE ser texto (string).
  username: string;
  
  // DEBE tener una propiedad 'email', y su valor DEBE ser texto (string).
  email: string;
  
  // DEBE tener una propiedad 'phone', y su valor DEBE ser texto (string).
  phone: string;
}