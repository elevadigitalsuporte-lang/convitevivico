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
        .insert([{
          nome_titular: formData.nome_titular,
          qtd_acompanhantes: parseInt(formData.qtd_acompanhantes),
          qtd_filhos: parseInt(formData.qtd_filhos)
        }])

      if (error) throw error

      setStatus({ type: 'success', msg: '✅ Presença confirmada! Te vejo na festa!' })
      setFormData({ nome_titular: '', qtd_acompanhantes: 0, qtd_filhos: 0 })
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', msg: '❌ Algo deu errado. Tente novamente!' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center font-sans overflow-x-hidden">

      {/* =============================================
          BLOCO 1: O CONVITE COM FUNDO DA CIDADE
          ============================================= */}
      <div
        className="w-full max-w-md relative flex flex-col items-center overflow-hidden shadow-2xl"
        style={{
          backgroundImage: "url('/fundo-cidade.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay gradiente para melhorar legibilidade mantendo a cidade viva */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/30 via-transparent to-blue-900/80 pointer-events-none" />

        {/* --- TOPO: Logo + Spidey na teia --- */}
        <div className="relative w-full flex justify-between items-start pt-6 px-4 z-10">
          {/* Spidey descendo da teia, canto esquerdo */}
          <img
            src="/spidey-teia.png"
            alt="Spidey na Teia"
            className="w-28 object-contain drop-shadow-lg"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}
          />
          {/* Logo da aranha no centro/direita discreta */}
          <img
            src="/logo-aranha.png"
            alt="Logo Aranha"
            className="w-12 h-12 object-contain opacity-90 mt-2 mr-2"
          />
        </div>

        {/* --- MENSAGEM DO CONVITE --- */}
        <div className="relative z-10 mx-5 mt-3 mb-4 bg-white/85 backdrop-blur-sm rounded-3xl px-6 py-5 shadow-lg border border-white/60">
          <p className="text-gray-800 text-[15px] leading-relaxed text-center font-medium"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            Diretamente da minha teia para você!<br />
            Estou completando <span className="text-red-600 font-black text-lg">1 aninho</span> e preciso de heróis e heroínas para essa grande aventura.<br />
            <span className="font-bold text-blue-800">Venha comemorar comigo esse dia especial!</span>
          </p>
        </div>

        {/* --- FAIXA DO NOME (RIBBON AZUL) --- */}
        <div className="relative z-10 w-full py-4 bg-blue-600 border-t-4 border-b-4 border-red-500 shadow-xl">
          <h1 className="text-white text-4xl font-black text-center tracking-widest uppercase"
            style={{
              textShadow: '3px 3px 0px #991b1b, 5px 5px 0px rgba(0,0,0,0.3)',
              fontFamily: "'Nunito', sans-serif"
            }}>
            JOÃO VICENTE
          </h1>
        </div>

        {/* --- SEÇÃO 1 ANO - HERO VISUAL --- */}
        <div className="relative z-10 w-full overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d2461 40%, #1a0a2e 100%)' }}>

          {/* Radial glow central */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(220,38,38,0.35) 0%, rgba(37,99,235,0.25) 50%, transparent 100%)'
          }} />

          {/* Teia decorativa SVG - canto esquerdo */}
          <svg className="absolute left-0 top-0 w-28 h-28 opacity-20" viewBox="0 0 100 100" fill="none">
            <line x1="50" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.8"/>
            <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.8"/>
            <line x1="50" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.8"/>
            <path d="M50 15 Q25 30 10 50 Q25 70 50 80 Q75 70 90 50 Q75 30 50 15Z" stroke="white" strokeWidth="0.6" fill="none"/>
            <path d="M50 30 Q30 40 22 55 Q30 70 50 75 Q70 70 78 55 Q70 40 50 30Z" stroke="white" strokeWidth="0.6" fill="none"/>
          </svg>

          {/* Teia decorativa SVG - canto direito */}
          <svg className="absolute right-0 top-0 w-28 h-28 opacity-20" viewBox="0 0 100 100" fill="none" style={{ transform: 'scaleX(-1)' }}>
            <line x1="50" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.8"/>
            <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.8"/>
            <line x1="50" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.8"/>
            <path d="M50 15 Q25 30 10 50 Q25 70 50 80 Q75 70 90 50 Q75 30 50 15Z" stroke="white" strokeWidth="0.6" fill="none"/>
            <path d="M50 30 Q30 40 22 55 Q30 70 50 75 Q70 70 78 55 Q70 40 50 30Z" stroke="white" strokeWidth="0.6" fill="none"/>
          </svg>

          {/* Estrelinhas decorativas */}
          {[
            { top: '10%', left: '12%', size: 18, delay: '0s' },
            { top: '20%', left: '80%', size: 14, delay: '0.4s' },
            { top: '65%', left: '8%', size: 12, delay: '0.8s' },
            { top: '70%', left: '85%', size: 16, delay: '0.2s' },
            { top: '45%', left: '90%', size: 10, delay: '1s' },
            { top: '50%', left: '5%', size: 11, delay: '0.6s' },
          ].map((star, i) => (
            <div key={i} className="absolute pointer-events-none" style={{
              top: star.top, left: star.left,
              animation: `twinkle 2s ease-in-out infinite alternate`,
              animationDelay: star.delay,
            }}>
              <svg width={star.size} height={star.size} viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="#FFD700" opacity="0.9"/>
              </svg>
            </div>
          ))}

          {/* Badge "PRIMEIRO ANIVERSÁRIO" */}
          <div className="relative flex justify-center pt-5 pb-1">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-1.5">
              <span className="text-sm">🕷️</span>
              <span className="text-white/90 text-xs font-black uppercase tracking-[0.2em]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Primeiro Aniversário
              </span>
              <span className="text-sm">🕷️</span>
            </div>
          </div>

          {/* Número 1 centralizado com glow */}
          <div className="relative flex justify-center items-center py-2">
            {/* Anel de glow atrás do número */}
            <div className="absolute w-44 h-44 rounded-full" style={{
              background: 'radial-gradient(circle, rgba(220,38,38,0.5) 0%, rgba(37,99,235,0.3) 50%, transparent 70%)',
              filter: 'blur(20px)',
            }} />
            <img
              src="/numero-1.png"
              alt="1 Aninho"
              className="relative h-40 object-contain"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(220,38,38,0.8)) drop-shadow(0 0 40px rgba(37,99,235,0.5)) drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
                animation: 'floatNum 3s ease-in-out infinite',
              }}
            />
          </div>

          {/* Label "ANO" em destaque */}
          <div className="relative flex justify-center pb-2">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400/80" />
                <span className="text-yellow-300 text-2xl font-black uppercase tracking-[0.35em]"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    textShadow: '0 0 12px rgba(253,224,71,0.8), 0 2px 4px rgba(0,0,0,0.5)',
                  }}>
                  ANO
                </span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400/80" />
              </div>
              <p className="text-blue-200/80 text-[11px] font-bold uppercase tracking-[0.25em]"
                style={{ fontFamily: "'Nunito', sans-serif" }}>
                do João Vicente
              </p>
            </div>
          </div>

          {/* Barra inferior decorativa */}
          <div className="w-full h-1 mt-1" style={{
            background: 'linear-gradient(90deg, transparent, #dc2626 20%, #2563eb 50%, #dc2626 80%, transparent)',
          }} />

          {/* CSS animations inline */}
          <style jsx>{`
            @keyframes floatNum {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
            }
            @keyframes twinkle {
              0% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
              100% { opacity: 1; transform: scale(1.2) rotate(15deg); }
            }
          `}</style>
        </div>

        {/* --- CARD DE INFORMAÇÕES --- */}
        <div className="relative z-10 mx-5 mb-4 w-[calc(100%-2.5rem)] bg-white/90 backdrop-blur-md rounded-3xl px-6 py-5 shadow-xl border-2 border-white/80">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">📅</span>
              <p style={{ fontFamily: "'Nunito', sans-serif" }} className="text-blue-900 text-xl font-extrabold">
                21 de Junho
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">⏰</span>
              <p style={{ fontFamily: "'Nunito', sans-serif" }} className="text-blue-900 text-xl font-extrabold">
                15:00 horas
              </p>
            </div>
            <div className="pt-3 mt-3 border-t-2 border-dashed border-blue-200">
              <span className="text-2xl block mb-1">📍</span>
              <p style={{ fontFamily: "'Nunito', sans-serif" }} className="text-red-600 font-extrabold text-lg leading-snug">
                Avenida Terra Nova, 502
              </p>
              <p style={{ fontFamily: "'Nunito', sans-serif" }} className="text-gray-500 font-bold text-sm uppercase tracking-widest">
                Salão de Festas
              </p>
            </div>
          </div>
        </div>

        {/* --- SPIDEY AGACHADO --- */}
        <div className="relative z-10 w-full flex justify-center pb-6">
          <img
            src="/spidey-agachado.png"
            alt="Spidey Baby"
            className="h-44 object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* =============================================
          BLOCO 2: FORMULÁRIO RSVP (FUNDO NEUTRO)
          ============================================= */}
      <div className="w-full max-w-md bg-slate-100 px-5 pt-8 pb-12">

        {/* Linha decorativa com ícone */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-[2px] bg-gray-300 rounded-full"></div>
          <span className="text-2xl">🕷️</span>
          <div className="flex-1 h-[2px] bg-gray-300 rounded-full"></div>
        </div>

        {/* Card do Formulário */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-7">
          <h2
            className="text-2xl font-black text-center text-red-600 mb-1 uppercase tracking-wide"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Confirmar Presença
          </h2>
          <p className="text-center text-gray-400 text-sm mb-6 font-medium">
            Preencha os dados abaixo para confirmar
          </p>

          {status.msg && (
            <div className={`p-4 rounded-2xl mb-5 text-center text-sm font-bold ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-gray-500 mb-1.5 uppercase tracking-widest">
                Nome do Responsável
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Maria Parker"
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all text-gray-800 font-semibold text-base bg-gray-50"
                value={formData.nome_titular}
                onChange={(e) => setFormData({ ...formData, nome_titular: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold text-gray-500 mb-1.5 uppercase tracking-widest text-center">
                  Adultos
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-full border-2 border-gray-200 rounded-2xl px-3 py-3.5 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all text-center text-2xl font-black text-gray-800 bg-gray-50"
                  value={formData.qtd_acompanhantes}
                  onChange={(e) => setFormData({ ...formData, qtd_acompanhantes: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-gray-500 mb-1.5 uppercase tracking-widest text-center">
                  Crianças
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-full border-2 border-gray-200 rounded-2xl px-3 py-3.5 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all text-center text-2xl font-black text-gray-800 bg-gray-50"
                  value={formData.qtd_filhos}
                  onChange={(e) => setFormData({ ...formData, qtd_filhos: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-lg py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all mt-2 uppercase tracking-widest flex justify-center gap-2 items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>Confirmar Presença 🕸️</>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
