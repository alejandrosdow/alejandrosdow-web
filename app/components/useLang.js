'use client';

import { useState, useEffect, useCallback } from 'react';

// Idioma de la web: español por defecto, siempre.
// Solo cambia cuando la persona pulsa ES / EN, y esa elección se recuerda
// (en este navegador) al pasar de una página a otra.
const KEY = 'lang';

export default function useLang() {
  const [lang, set] = useState('es');

  useEffect(() => {
    try {
      if (window.localStorage.getItem(KEY) === 'en') set('en');
    } catch {}
  }, []);

  const setLang = useCallback((l) => {
    set(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  return [lang, setLang];
}
