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
    <main className="min-h-screen bg-gray-100 font-comic flex flex-col items-center md:py-12 overflow-x-hidden">
      
      {/* Container Principal do Convite */}
      <div className="w-full max-w-md bg-white shadow-2xl relative flex flex-col items-center md:rounded-[2.5rem] overflow-hidden min-h-screen md:min-h-[850px]">
        
        {/* 1. TOPO (HERO) */}
        <div className="w-full relative pt-8 pb-4 flex justify-center items-start min-h-[140px]">
          {/* Spidey Teia no canto superior esquerdo (descendo) */}
          <img 
            src="/spidey-teia.png" 
            alt="Homem Aranha Pendurado na Teia" 
            className="absolute top-0 left-0 w-32 md:w-40 object-contain drop-shadow-md z-10"
          />
          
          {/* Logo Aranha no centro superior discreto */}
          <img 
            src="/logo-aranha.png" 
            alt="Logo Aranha" 
            className="w-16 h-16 object-contain opacity-80 z-0 drop-shadow-sm mt-2"
          />
        </div>

        {/* 2. CONVITE E MENSAGEM */}
        <div className="px-8 text-center mt-2 mb-6 relative z-10">
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed font-bold tracking-wide">
            Diretamente da minha teia para você! Estou completando <span className="text-red-600 font-black">1 aninho</span> e preciso de heróis e heroínas para essa grande aventura. Venha comemorar comigo esse dia especial
          </p>
        </div>

        {/* 3. DESTAQUE DO ANIVERSARIANTE */}
        <div className="w-full flex flex-col items-center mb-8 relative z-10">
          {/* Faixa/Ribbon Azul */}
          <div className="bg-blue-600 w-full py-4 shadow-xl border-y-[6px] border-red-600 transform -rotate-2">
            <h1 className="text-white text-4xl md:text-5xl font-black text-center tracking-widest uppercase drop-shadow-[2px_2px_0_#991b1b]">
              JOÃO VICENTE
            </h1>
          </div>
          
          {/* Imagem do Número 1 */}
          <img 
            src="/numero-1.png" 
            alt="1 Aninho" 
            className="mt-6 h-[120px] md:h-[150px] object-contain drop-shadow-xl transform rotate-3 hover:scale-105 transition-transform"
          />
        </div>

        {/* 4. INFORMAÇÕES E PERSONAGEM */}
        <div className="w-full px-6 flex flex-col items-center relative z-10 space-y-6">
          
          {/* Bloco de Informações */}
          <div className="w-full bg-white border-4 border-blue-600 rounded-3xl p-5 shadow-[6px_6px_0px_#e11d48] text-center relative">
            <div className="absolute -top-4 -left-3 bg-yellow-400 border-2 border-blue-900 rounded-lg px-3 py-1 transform -rotate-12 shadow-sm">
               <span className="font-bold text-blue-900 text-xs uppercase tracking-wider">Top Secret</span>
            </div>

            <p className="text-2xl font-black text-blue-900 mb-2">
              DATA: <span className="text-red-600 font-bold ml-1">21/06</span>
            </p>
            <p className="text-2xl font-black text-blue-900 mb-4">
              HORÁRIO: <span className="text-red-600 font-bold ml-1">15:00</span>
            </p>
            <div className="w-4/5 mx-auto border-t-[3px] border-dashed border-gray-300 mb-4"></div>
            <p className="text-xl font-bold text-gray-600 tracking-wide">ENDEREÇO:</p>
            <p className="text-2xl font-black text-blue-800 leading-tight mt-1">Avenida Terra nova 502</p>
            <p className="text-md font-bold text-gray-500 uppercase tracking-widest mt-1">Salão de Festas</p>
          </div>

          {/* Personagem Agachado */}
          <img 
            src="/spidey-agachado.png" 
            alt="Spidey Agachado" 
            className="w-48 md:w-56 object-contain drop-shadow-2xl z-20 hover:-translate-y-2 transition-transform duration-300"
          />
        </div>

        {/* 5. RODAPÉ DA ARTE (CIDADE) & 6. FORMULÁRIO RSVP */}
        {/* Fundo da cidade pegando o final do componente inteiro */}
        <div 
          className="w-full mt-auto pt-32 pb-8 px-5 flex flex-col items-center relative"
          style={{ 
            backgroundImage: "url('/fundo-cidade.jpg')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Degradê sobre a cidade para facilitar a leitura se a cidade for clara/escura */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none"></div>

          {/* Card Translúcido RSVP */}
          <div className="w-full max-w-sm bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] p-7 border-[3px] border-blue-600 relative z-10 transition-all">
            <h2 className="text-2xl font-black text-center text-red-600 mb-5 tracking-wide uppercase drop-shadow-sm">
              Confirmar Missão
            </h2>

            {status.msg && (
              <div className={`p-4 rounded-xl mb-5 text-center font-bold border-2 shadow-sm ${status.type === 'success' ? 'bg-green-100 text-green-700 border-green-500' : 'bg-red-100 text-red-700 border-red-500'}`}>
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-1 uppercase tracking-wide">Nome Titular</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Peter Parker"
                  className="w-full border-[3px] border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all font-sans font-bold text-gray-800"
                  value={formData.nome_titular}
                  onChange={(e) => setFormData({...formData, nome_titular: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-blue-900 mb-1 uppercase tracking-wider text-center">Acompanhantes</label>
                  <input 
                    type="number" 
                    min="0"
                    required
                    className="w-full border-[3px] border-gray-300 rounded-xl px-3 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-sans text-center text-xl font-black text-gray-800"
                    value={formData.qtd_acompanhantes}
                    onChange={(e) => setFormData({...formData, qtd_acompanhantes: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-blue-900 mb-1 uppercase tracking-wider text-center">Filhos</label>
                  <input 
                    type="number" 
                    min="0"
                    required
                    className="w-full border-[3px] border-gray-300 rounded-xl px-3 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-sans text-center text-xl font-black text-gray-800"
                    value={formData.qtd_filhos}
                    onChange={(e) => setFormData({...formData, qtd_filhos: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xl py-4 rounded-2xl shadow-[0_5px_0_#991b1b] active:translate-y-1 active:shadow-none transition-all mt-6 uppercase tracking-widest flex justify-center gap-2 items-center group"
              >
                <span className="group-hover:rotate-12 transition-transform">🕸️</span>
                {loading ? 'Aguarde...' : 'Confirmar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
