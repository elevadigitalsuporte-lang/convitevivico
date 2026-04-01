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
      
      {/* Container Principal Mobile-First */}
      <div className="w-full max-w-md bg-white shadow-2xl overflow-hidden relative">
        
        {/* Cabeçalho Vermelho com Imagens (Teia e Spidey) */}
        <div className="bg-red-600 w-full pt-8 pb-12 px-4 relative flex flex-col items-center justify-center border-b-8 border-blue-600">
          {/* Placeholder da Teia de Aranha */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 overflow-hidden flex justify-center">
             {/* Substitua a div abaixo pela tag: <img src="/teia.png" alt="Teia" className="object-cover w-full h-full" /> */}
             <div className="w-full h-full border-4 border-dashed border-white/50 flex items-center justify-center text-white/50 text-sm">
                /teia.png
             </div>
          </div>
          
          {/* Placeholder do Spidey Baby */}
          <div className="relative z-10 w-32 h-32 bg-white rounded-full border-4 border-blue-600 shadow-xl overflow-hidden flex items-center justify-center mb-2">
             {/* Substitua a div abaixo pela tag: <img src="/spidey.png" alt="Spidey Baby" className="object-cover w-full h-full" /> */}
             <span className="text-gray-400 text-xs font-bold text-center">/spidey.png</span>
          </div>
        </div>

        {/* Corpo do Convite */}
        <div className="px-6 py-8 flex flex-col items-center text-center bg-white relative z-20 -mt-6 rounded-t-3xl shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]">
          
          {/* Mensagem de Abertura */}
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 mb-6 relative">
            <span className="absolute -top-3 -left-3 text-red-500 text-2xl">🕸️</span>
            <p className="text-gray-800 text-lg leading-relaxed font-medium">
              &quot;Diretamente da minha teia para você! Estou completando 1 aninho e preciso de heróis e heroínas para essa grande aventura. Venha comemorar comigo esse dia especial&quot;
            </p>
            <span className="absolute -bottom-3 -right-3 text-blue-500 text-2xl">🕷️</span>
          </div>

          {/* Nome do Aniversariante (Ribbon Azul) */}
          <div className="bg-blue-600 w-[110%] py-3 mb-4 shadow-lg transform -rotate-2 border-y-4 border-yellow-400">
            <h1 className="text-white text-3xl font-extrabold tracking-wider drop-shadow-md">
              JOÃO VICENTE
            </h1>
          </div>

          {/* Idade Destacada */}
          <div className="mb-8 transform rotate-3">
            <span className="text-8xl font-black text-red-600 drop-shadow-[5px_5px_0px_rgba(37,99,235,1)]">
              1
            </span>
            <span className="text-2xl font-bold text-blue-600 block -mt-2 uppercase tracking-widest">
              Aninho
            </span>
          </div>

          {/* Detalhes da Festa */}
          <div className="w-full bg-blue-50 rounded-2xl p-6 border-2 border-blue-200 shadow-inner mb-6 space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">📅</span>
              <p className="text-xl font-bold text-gray-800">Data: <span className="text-red-600">21/06</span></p>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">⏰</span>
              <p className="text-xl font-bold text-gray-800">Horário: <span className="text-red-600">15:00</span></p>
            </div>
            <div className="flex flex-col items-center justify-center mt-2 pt-4 border-t border-blue-200">
              <span className="text-2xl mb-1">📍</span>
              <p className="text-md font-bold text-gray-800">Endereço:</p>
              <p className="text-gray-600 font-medium">Avenida Terra nova 502</p>
              <p className="text-gray-600 font-medium">salão de festas</p>
            </div>
          </div>
        </div>

        {/* Rodapé da Cidade */}
        <div className="w-full h-24 bg-gray-800 relative flex items-end justify-center overflow-hidden">
           {/* Substitua a div abaixo pela tag: <img src="/cidade.png" alt="Cidade" className="w-full object-cover opacity-80" /> */}
           <div className="w-full h-full border-t border-dashed border-gray-600 flex items-center justify-center text-gray-500 text-sm">
             [ Imagem: /cidade.png ]
           </div>
        </div>

      </div>

      {/* Formulário RSVP */}
      <div className="w-full max-w-md mt-8 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-8 border-red-600 relative overflow-hidden">
          
          {/* Teia de fundo no formulário */}
          <div className="absolute -top-10 -right-10 text-gray-100 opacity-50 transform rotate-45" style={{ fontSize: '10rem' }}>
            🕸️
          </div>

          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6 relative z-10">Confirmar Presença</h2>

          {status.msg && (
            <div className={`p-4 rounded-lg mb-6 text-center font-bold relative z-10 ${status.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nome Completo do Titular</label>
              <input 
                type="text" 
                required
                placeholder="Ex: Peter Parker"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all font-sans"
                value={formData.nome_titular}
                onChange={(e) => setFormData({...formData, nome_titular: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Acompanhantes</label>
                <input 
                  type="number" 
                  min="0"
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-sans text-center"
                  value={formData.qtd_acompanhantes}
                  onChange={(e) => setFormData({...formData, qtd_acompanhantes: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Filhos (Crianças)</label>
                <input 
                  type="number" 
                  min="0"
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-sans text-center"
                  value={formData.qtd_filhos}
                  onChange={(e) => setFormData({...formData, qtd_filhos: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-4 rounded-xl shadow-[0_4px_0_rgb(185,28,28)] active:shadow-[0_0px_0_rgb(185,28,28)] active:translate-y-1 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? 'Lançando Teia...' : 'Confirmar Presença'}
            </button>
          </form>
        </div>
      </div>

    </main>
  )
}
