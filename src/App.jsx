import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import { translations } from './locales/translations';

export default function App() {
  const [lang, setLang] = useState('ar');

  return (
    <div dir={translations[lang].dir} style={{ backgroundColor: '#0f1016', color: '#fff', minHeight: '100vh' }}>
      <Navbar currentLang={lang} setLang={setLang} />
      <Hero currentLang={lang} />
    </div>
  );
}