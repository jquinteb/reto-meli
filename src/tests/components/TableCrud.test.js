import { render } from "@testing-library/react";
import TableCrud from "../../components/TableCrud"

describe('Probando TableCrud', () => {

    //1. inicialización
    const message1 = 'Hola Mundo';
        
    //2. estimulo
    const message2 = message1.trim();
    
    //3. observar el comportamiento... esperado
    expect(message1).toBe(message2);
    
  
})
