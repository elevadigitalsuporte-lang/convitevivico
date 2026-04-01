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
    <main className="min-h-screen bg-gray-100 font-comic flex flex-col items-center pb-12">
      
      {/* 
         ARTE DO CONVITE 
         Proporção mobile, fundo inteiramente branco inspirado nas referências 
      */}
      <div className="w-full max-w-md bg-white shadow-2xl overflow-hidden relative mt-0 md:mt-8 flex flex-col items-center min-h-[800px]">
        
        {/* --- DECORAÇÕES DE TOPO (TEIAS CINZAS) --- */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-70 pointer-events-none">
           {/* Tag da Imagem: Teia Canto Esquerdo */}
           {/* <img src="/teia-esquerda.png" alt="Teia" className="w-full h-full object-contain" /> */}
           <div className="w-full h-full border-r border-b border-dashed border-gray-300 flex items-center justify-center text-xs text-center text-gray-400">
             [img: teia-esq.png]
           </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-70 pointer-events-none">
           {/* Tag da Imagem: Teia Canto Direito */}
           {/* <img src="/teia-direita.png" alt="Teia" className="w-full h-full object-contain transform scale-x-[-1]" /> */}
           <div className="w-full h-full border-l border-b border-dashed border-gray-300 flex items-center justify-center text-xs text-center text-gray-400">
             [img: teia-dir.png]
           </div>
        </div>

        {/* --- FAIXA (BANNER) AZUL --- */}
        <div className="mt-20 relative w-64 h-20 flex flex-col items-center justify-center z-10 pointer-events-none">
           {/* Tag da Imagem: Banner Aquarela (Coloque-a por trás do texto) */}
           {/* <img src="/banner.png" alt="Banner" className="absolute w-full h-full object-contain drop-shadow-md" /> */}
           <div className="absolute inset-0 border-2 border-dashed border-blue-400 bg-blue-50 rounded-2xl flex flex-col items-center justify-center text-blue-400 opacity-50">
             [img: banner.png]
           </div>

           {/* Nome do Aniversariante */}
           <h1 className="relative z-10 text-3xl font-extrabold text-[#1e3a8a] text-center drop-shadow-sm mt-1 uppercase tracking-wide">
             JOÃO VICENTE
           </h1>
        </div>

        {/* --- NÚMERO 1 E ELEMENTOS CENTRAIS --- */}
        <div className="relative mt-12 mb-8 flex items-center justify-center w-full z-10 pointer-events-none">
           
           {/* Teia Laranja de Fundo */}
           <div className="absolute inset-0 flex items-center justify-center opacity-80 z-0">
             {/* <img src="/teia-laranja.png" alt="Teia Centro" className="w-48 h-48 object-contain" /> */}
             <div className="w-48 h-48 border border-dashed text-orange-400 border-orange-400 rounded-full flex items-center justify-center text-xs text-center">
               [img: teia-laranja.png]
             </div>
           </div>
           
           {/* O Número 1 centralizado */}
           <span className="relative z-10 text-[10rem] leading-none font-black text-red-600 drop-shadow-[5px_5px_0px_#1e3a8a]">
             1
           </span>
           
           {/* Spidey Baby Pendurado (Canto Direito do número 1) */}
           <div className="absolute right-4 top-4 w-32 h-32 z-20">
             {/* <img src="/spidey-voando.png" alt="Homem Aranha Pendurado" className="w-full h-full object-contain" /> */}
             <div className="w-full h-full border border-dashed border-red-500 bg-red-50/50 flex items-center justify-center text-red-500 text-xs text-center">
               [img: spidey-voando.png]
             </div>
           </div>
        </div>

        {/* --- INFORMAÇÕES DA FESTA --- */}
        <div className="w-full px-8 text-center relative z-20 flex-grow mb-48"> {/* mb-48 para não bater na cidade do rodapé */}
          <p className="text-xl font-bold text-gray-800 mb-6 px-4">
            "Venha comemorar comigo essa grande aventura!"
          </p>
          
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-2xl font-extrabold text-[#1e3a8a]">
              DATA: <span className="text-red-600">21/06</span>
            </p>
            <p className="text-2xl font-extrabold text-[#1e3a8a]">
              HORÁRIO: <span className="text-red-600">15:00</span>
            </p>
            
            <div className="mt-4 pt-4 text-center">
              <span className="text-xl font-bold text-[#1e3a8a] block mb-1">ENDEREÇO:</span>
              <p className="text-lg font-bold text-gray-700">Avenida Terra nova 502</p>
              <p className="text-md font-medium text-gray-500 uppercase tracking-widest">Salão de Festas</p>
            </div>
          </div>
        </div>

        {/* --- RODAPÉ: CIDADE E SPIDEY EM PÉ --- */}
        <div className="absolute bottom-0 left-0 w-full h-[35%] flex items-end pointer-events-none">
          
          {/* Silhueta da Cidade */}
          <div className="absolute bottom-0 w-full h-[80%] z-0">
             {/* <img src="/cidade.png" alt="Cidade" className="w-full h-full object-cover object-bottom" /> */}
             <div className="w-full h-full border-t border-dashed border-blue-600 bg-blue-100 flex items-center justify-center text-blue-600 text-sm">
               [img: cidade.png]
             </div>
          </div>

          {/* Spidey Baby Pousado (Canto Esquerdo) */}
          <div className="absolute bottom-0 left-[-5%] w-[50%] h-full z-10 flex items-end">
             {/* <img src="/spidey-chao.png" alt="Homem Aranha Chão" className="w-full h-auto object-contain" /> */}
             <div className="w-full h-[80%] border-t border-r border-dashed border-red-500 bg-red-100/50 flex flex-col items-center justify-center text-red-500 text-xs text-center">
               [img: spidey-chao.png]
             </div>
          </div>
        </div>
      </div>

      {/* 
         FORMULÁRIO RSVP 
         Localizado perfeitamente abaixo do convite 
      */}
      <div className="w-full max-w-md mt-6 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-8 border-blue-600 relative overflow-hidden">
          
          {/* Decoração suave no fundo do form */}
          <div className="absolute -top-4 -right-4 text-blue-100 opacity-60 text-9xl transform rotate-12 pointer-events-none">
            🕷️
          </div>

          <h2 className="text-2xl font-black text-center text-[#1e3a8a] mb-6 relative z-10 uppercase tracking-wide">
            Confirmar Presença
          </h2>

          {status.msg && (
            <div className={`p-4 rounded-lg mb-6 text-center font-bold relative z-10 ${status.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 tracking-wide">Nome Completo do Titular</label>
              <input 
                type="text" 
                required
                placeholder="Ex: Peter Parker"
                className="w-full border-[3px] border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all font-sans"
                value={formData.nome_titular}
                onChange={(e) => setFormData({...formData, nome_titular: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 tracking-wide">Acompanhantes</label>
                <input 
                  type="number" 
                  min="0"
                  required
                  className="w-full border-[3px] border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-sans text-center text-lg"
                  value={formData.qtd_acompanhantes}
                  onChange={(e) => setFormData({...formData, qtd_acompanhantes: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 tracking-wide">Filhos (Crianças)</label>
                <input 
                  type="number" 
                  min="0"
                  required
                  className="w-full border-[3px] border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-sans text-center text-lg"
                  value={formData.qtd_filhos}
                  onChange={(e) => setFormData({...formData, qtd_filhos: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xl py-4 rounded-xl shadow-[0_5px_0_rgb(153,27,27)] active:shadow-[0_0px_0_rgb(153,27,27)] active:translate-y-1 transition-all mt-6 uppercase tracking-widest"
            >
              {loading ? 'Enviando...' : 'Confirmar Presença'}
            </button>
          </form>
        </div>
      </div>

    </main>
  )
}
