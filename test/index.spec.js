// importamos la funcion que vamos a testear

import { firebase } from '../src/lib/templates';
import { sendSingUp } from '../src/lib/data';

describe('sendSingUp', () => {
  it('debería ser una función', () => {
    expect(typeof sendSingUp).toBe('function');
  });
  it('debería retornar user', () => {
    expect(sendSingUp('ratatrampa@google.com', '123456')).toBe(Object);
  });
});
