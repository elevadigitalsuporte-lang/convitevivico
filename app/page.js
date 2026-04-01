'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [formData, setFormData] = useState({
    nome_titular: '',
    qtd_acompanhantes: 0,
    qtd_filhos: 0
  })
  
  const [status, setStatus] = useState({ type: '', msg: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', msg: '' })

    try {
      const { error } = await supabase
        .from('convite_evento_rsvp')
        .insert([
          {
            nome_titular: formData.nome_titular,
            qtd_acompanhantes: parseInt(formData.qtd_acompanhantes),
            qtd_filhos: parseInt(formData.qtd_filhos)
          }
        ])

      if (error) throw error

      setStatus({ type: 'success', msg: 'Sua presença heroica foi confirmada! Te vejo lá.' })
      setFormData({ nome_titular: '', qtd_acompanhantes: 0, qtd_filhos: 0 })
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', msg: 'Ops! A teia falhou. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f0f4f8] font-comic flex flex-col items-center pb-12 overflow-x-hidden">
      
      {/* 
         ARTE DO CONVITE (COMIC BOOK STYLE)
         Gradiente simulando céu azul e nuvens na base 
      */}
      <div className="w-full max-w-md bg-gradient-to-b from-blue-400 via-blue-100 to-white shadow-2xl relative mt-0 md:mt-8 flex flex-col items-center pb-8 border-x-[8px] border-b-[8px] border-white md:rounded-b-[2.5rem] overflow-hidden">
        
        {/* TEXTURA QUADRINHO (Halftone Dots overlay suave) */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none z-0"
          style={{ 
            backgroundImage: 'radial-gradient(#00244f 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px' 
          }}
        ></div>

        {/* FAIXA SUPERIOR VERMELHA INTENSA */}
        <div className="w-full h-8 bg-red-600 border-b-[4px] border-blue-900 z-10 relative"></div>

        {/* FAIXA (BANNER) COM O NOME */}
        <div className="mt-8 relative z-10 flex flex-col items-center w-[85%]">
            {/* Banner Estilo Botão Quadrinho */}
            <div className="bg-blue-600 w-full border-[5px] border-yellow-400 rounded-3xl py-3 shadow-[4px_6px_0px_#1e3a8a] transform -rotate-1 skew-x-2">
              <h1 className="text-3xl sm:text-4xl font-black text-white text-center drop-shadow-[2px_2px_0px_#000] uppercase tracking-wide">
                JOÃO VICENTE
              </h1>
            </div>
            
            {/* Badge Secundária */}
            <div className="bg-white border-[3px] border-red-500 rounded-full px-5 py-1 mt-3 shadow-[2px_3px_0px_#e11d48] transform rotate-3">
              <span className="text-red-600 font-extrabold uppercase tracking-widest text-sm drop-shadow-sm">
                Vai fazer 1 aninho!
              </span>
            </div>
        </div>

        {/* O NUMERO 1 E A SUA IMAGEM DO ARANHA */}
        <div className="relative mt-8 mb-4 w-full flex flex-col items-center justify-center z-10 min-h-[220px]">
           
           {/* Fundo radiante simulando efeito de explosão (sunburst) */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-yellow-300 rounded-full opacity-50 blur-xl"></div>
           
           {/* O Número 1 centralizado e imponente */}
           <span className="relative text-[11rem] leading-none font-black text-red-600 drop-shadow-[8px_8px_0px_#1e3a8a]">
             1
           </span>
           
           {/* Sua arte do aranha (aranha.png.png) */}
           <div className="absolute right-[-20px] sm:right-0 top-1/2 -translate-y-[40%] w-52 sm:w-60 h-auto z-20 pointer-events-none drop-shadow-2xl hover:scale-105 transition-transform duration-300">
              <img src="/aranha.png.png" alt="Homem Aranha Baby" className="w-full h-auto object-contain" />
           </div>
        </div>

        {/* BOX DE INFORMAÇÕES (Estilo Quadrinho) */}
        <div className="w-[85%] bg-white border-[4px] border-blue-600 rounded-2xl shadow-[6px_6px_0px_#e11d48] px-6 py-6 text-center relative z-20 mt-4 mb-[200px]"> 
          
          {/* Badge Balãozinho */}
          <div className="absolute -top-5 -left-4 bg-yellow-400 border-[3px] border-blue-900 rounded-full px-4 py-1 shadow-sm transform -rotate-6">
            <span className="font-extrabold text-blue-900 text-sm">VOCÊ FOI CONVOCADO!</span>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 mt-3">
            <p className="text-2xl font-black text-[#1e3a8a] flex items-center gap-2">
              <span className="text-xl">📅</span> <span className="text-red-600 bg-red-100/50 px-2 py-1 rounded-lg">21 DE JUNHO</span>
            </p>
            <p className="text-2xl font-black text-[#1e3a8a] flex items-center gap-2">
              <span className="text-xl">⏰</span> <span className="text-blue-600 bg-blue-100/50 px-2 py-1 rounded-lg">15:00 HS</span>
            </p>
            
            <div className="w-[80%] border-t-[3px] border-dashed border-gray-300 my-2"></div>
            
            <div className="text-center pt-2">
              <span className="text-lg font-bold text-gray-500 block mb-1 uppercase tracking-widest flex items-center justify-center gap-1">
                <span className="text-red-500">📍</span> Local da Missão
              </span>
              <p className="text-2xl font-extrabold text-red-600 leading-tight">Avenida Terra nova 502</p>
              <p className="text-lg font-bold text-[#1e3a8a] mt-1">Salão de Festas</p>
            </div>
          </div>
        </div>

        {/* RODAPÉ E ARTE DA SUA CIDADE (cidade.png.png) */}
        <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none">
          {/* Ocultando a textura pra cidade ficar nítida no vermelho */}
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
          <img src="/cidade.png.png" alt="Cidade de Fundo" className="w-full h-auto max-h-64 object-cover object-bottom relative z-10" />
        </div>
      </div>

      {/* 
         FORMULÁRIO RSVP ABAIXO (Manteve Estilo Integrado Quadrinhos) 
      */}
      <div className="w-full max-w-md mt-6 px-4">
        <div className="bg-white rounded-3xl shadow-[0px_10px_0px_#1e3a8a] p-8 border-[5px] border-blue-600 relative overflow-hidden">
          
          <div className="absolute -top-4 -right-4 text-blue-100 opacity-60 text-9xl transform rotate-12 pointer-events-none">
            🕷️
          </div>

          <h2 className="text-2xl font-black text-center text-red-600 mb-6 relative z-10 uppercase tracking-widest drop-shadow-[2px_2px_0px_#1e3a8a]">
            Confirmar Missão
          </h2>

          {status.msg && (
             <div className={`p-4 rounded-xl mb-6 text-center font-bold relative z-10 border-[3px] shadow-[4px_4px_0px_currentColor] ${status.type === 'success' ? 'bg-green-100 text-green-700 border-green-600' : 'bg-red-100 text-red-700 border-red-600'}`}>
               {status.msg}
             </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 tracking-wide uppercase">Nome do Herói Principal</label>
              <input 
                type="text" 
                required
                placeholder="Ex: Peter Parker"
                className="w-full border-[3px] border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:shadow-[4px_4px_0px_#e11d48] transition-all font-sans font-bold text-gray-800"
                value={formData.nome_titular}
                onChange={(e) => setFormData({...formData, nome_titular: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 tracking-wide uppercase">Aliados<br/>(Acompanhantes)</label>
                <input 
                  type="number" 
                  min="0"
                  required
                  className="w-full border-[3px] border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 focus:shadow-[4px_4px_0px_#2563eb] transition-all font-sans text-center text-xl font-black text-gray-800"
                  value={formData.qtd_acompanhantes}
                  onChange={(e) => setFormData({...formData, qtd_acompanhantes: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 tracking-wide uppercase">Pequenos<br/>(Crianças)</label>
                <input 
                  type="number" 
                  min="0"
                  required
                  className="w-full border-[3px] border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 focus:shadow-[4px_4px_0px_#2563eb] transition-all font-sans text-center text-xl font-black text-gray-800"
                  value={formData.qtd_filhos}
                  onChange={(e) => setFormData({...formData, qtd_filhos: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 border-[4px] border-blue-900 text-white font-black text-xl py-4 rounded-xl shadow-[4px_6px_0px_#1e3a8a] active:shadow-[0_0px_0_#1e3a8a] active:translate-y-1 active:translate-x-1 transition-all mt-6 uppercase tracking-widest flex justify-center items-center gap-2 group"
            >
              <span className="group-hover:rotate-12 transition-transform">🕸️</span>
              {loading ? 'Avisando QG...' : 'Confirmar'}
            </button>
          </form>
        </div>
      </div>

    </main>
  )
}
