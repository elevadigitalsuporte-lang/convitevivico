'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [nome, setNome] = useState('')
  const [status, setStatus] = useState({ type: '', msg: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', msg: '' })
    try {
      const { error } = await supabase
        .from('convite_evento_rsvp')
        .insert([{ nome_titular: nome, qtd_acompanhantes: 0, qtd_filhos: 0 }])
      if (error) throw error
      setStatus({ type: 'success', msg: '✅ Presença confirmada! Te vejo na festa!' })
      setNome('')
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', msg: '❌ Algo deu errado. Tente novamente!' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#06091a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .invite-card {
          width: 100%;
          max-width: 390px;
          min-height: 100svh;
          background: linear-gradient(180deg, #04122e 0%, #091a4a 30%, #091a4a 55%, #080d28 80%, #04091a 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: 'Nunito', sans-serif;
        }

        /* ── Teias de aranha nos 4 cantos ── */
        .web-corner {
          position: absolute;
          width: 100px;
          height: 100px;
          opacity: 0.55;
          z-index: 2;
        }
        .web-tl { top: 0; left: 0; }
        .web-tr { top: 0; right: 0; transform: scaleX(-1); }
        .web-bl { bottom: 140px; left: 0; transform: scaleY(-1); }
        .web-br { bottom: 140px; right: 0; transform: scale(-1,-1); }

        /* ── Pontinha de banda de pontinhos do topo ── */
        .top-dots {
          width: 100%;
          text-align: center;
          font-size: 22px;
          letter-spacing: 2px;
          color: #fff;
          padding: 6px 0 4px;
          position: relative;
          z-index: 3;
          text-shadow: 0 0 8px rgba(220,38,38,0.7);
        }

        /* ── Spidey Baby topo-esquerda ── */
        .spidey-top-left {
          position: absolute;
          top: -6px;
          left: -2px;
          width: 110px;
          object-fit: contain;
          filter: drop-shadow(0 4px 14px rgba(220,38,38,0.5));
          z-index: 4;
          animation: float1 3.5s ease-in-out infinite;
        }
        /* ── Spidey Baby topo-direita ── */
        .spidey-top-right {
          position: absolute;
          top: -4px;
          right: 0px;
          width: 90px;
          object-fit: contain;
          filter: drop-shadow(0 4px 14px rgba(220,38,38,0.5));
          z-index: 4;
          transform: scaleX(-1);
          animation: float2 4s ease-in-out infinite;
        }

        @keyframes float1 {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes float2 {
          0%,100% { transform: scaleX(-1) translateY(0px); }
          50% { transform: scaleX(-1) translateY(-5px); }
        }
        @keyframes floatBottom {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulse-glow {
          0%,100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        /* ── Área central com o nome ── */
        .hero-section {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 80px;
          padding-bottom: 4px;
        }

        .invite-text {
          color: #c5d8ff;
          font-size: 10.5px;
          font-weight: 700;
          text-align: center;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        /* nome principal estilo comic */
        .name-block {
          position: relative;
          text-align: center;
          margin: 0 8px;
          white-space: nowrap;
        }
        .name-main {
          font-size: clamp(30px, 8.5vw, 38px);
          font-weight: 900;
          font-family: 'HomemAranha', 'Nunito', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          line-height: 1;
          color: #fff;
          text-shadow:
            3px 3px 0 #000,
            5px 5px 0 rgba(0,0,0,0.5);
          display: inline;
        }
        /* ── Bloco de idade 1 ANO ── */
        .age-block {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 6px;
        }
        .age-num {
          font-size: clamp(72px, 20vw, 88px);
          font-weight: 900;
          font-family: 'HomemAranha', 'Nunito', sans-serif;
          line-height: 0.85;
          color: #fff;
          text-shadow:
            3px 3px 0 #000,
            6px 6px 0 rgba(0,0,0,0.55);
          display: block;
        }
        .age-ano {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }
        .age-ano-text {
          font-size: clamp(26px, 7.5vw, 34px);
          font-weight: 900;
          font-family: 'HomemAranha', 'Nunito', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #f0c040;
          text-shadow: 2px 2px 0 #92600a, 0 0 16px rgba(253,224,71,0.8);
          line-height: 1;
          display: block;
        }
        .age-ano-sub {
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          display: block;
          margin-top: 2px;
        }

        /* Faixa vermelha abaixo do nome */
        .red-strip {
          width: 100%;
          background: linear-gradient(90deg, #7f1d1d, #dc2626 30%, #dc2626 70%, #7f1d1d);
          padding: 5px 0;
          text-align: center;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.3em;
          color: #fff;
          text-transform: uppercase;
          position: relative;
          z-index: 3;
          border-top: 2px solid #450a0a;
          border-bottom: 2px solid #450a0a;
          margin-top: 8px;
        }

        /* ── Card de data/hora/local estilo do modelo ── */
        .info-card {
          position: relative;
          z-index: 3;
          margin: 10px 16px 0;
          border: 2px solid #b91c1c;
          border-radius: 12px;
          background: rgba(4,18,46,0.85);
          display: flex;
          align-items: stretch;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(220,38,38,0.3), inset 0 0 12px rgba(37,99,235,0.1);
        }
        .info-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px 6px;
          gap: 1px;
        }
        .info-col + .info-col {
          border-left: 1.5px solid #b91c1c;
        }
        .info-label {
          font-size: 8.5px;
          font-weight: 900;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #93c5fd;
        }
        .info-value {
          font-size: 14px;
          font-weight: 900;
          color: #fff;
          text-align: center;
          line-height: 1.1;
        }
        .info-day {
          font-size: 38px;
          font-weight: 900;
          color: #fff;
          line-height: 1;
          text-shadow: 0 0 16px rgba(220,38,38,0.7);
        }

        /* ── Spidey baby agachado embaixo  ── */
        .spidey-bottom {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: center;
          margin-top: 4px;
          flex: 1;
          align-items: flex-end;
        }
        .spidey-bottom img {
          height: 130px;
          object-fit: contain;
          filter: drop-shadow(0 -4px 20px rgba(37,99,235,0.5)) drop-shadow(0 4px 12px rgba(0,0,0,0.7));
          animation: floatBottom 3.2s ease-in-out infinite;
        }

        /* ── RSVP Section destacada ── */
        .rsvp-section {
          position: relative;
          z-index: 3;
          margin: 8px 12px 14px;
          border-radius: 18px;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border: 2.5px solid #fbbf24;
          box-shadow:
            0 0 0 4px rgba(220,38,38,0.25),
            0 8px 32px rgba(220,38,38,0.45),
            0 2px 8px rgba(0,0,0,0.6);
          overflow: hidden;
          animation: rsvp-pulse 2.5s ease-in-out infinite;
        }
        @keyframes rsvp-pulse {
          0%,100% { box-shadow: 0 0 0 4px rgba(220,38,38,0.25), 0 8px 32px rgba(220,38,38,0.45), 0 2px 8px rgba(0,0,0,0.6); }
          50%      { box-shadow: 0 0 0 7px rgba(251,191,36,0.3),  0 8px 40px rgba(220,38,38,0.7), 0 2px 8px rgba(0,0,0,0.6); }
        }
        .rsvp-header {
          background: rgba(0,0,0,0.25);
          padding: 10px 16px 8px;
          text-align: center;
          border-bottom: 1.5px solid rgba(255,255,255,0.15);
        }
        .rsvp-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fbbf24;
          color: #7c2d12;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 99px;
          margin-bottom: 5px;
        }
        .rsvp-title {
          color: #fff;
          font-size: 17px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
          margin: 0;
        }
        .rsvp-subtitle {
          color: rgba(255,255,255,0.75);
          font-size: 10.5px;
          font-weight: 700;
          margin-top: 3px;
          letter-spacing: 0.05em;
        }
        .rsvp-body {
          padding: 10px 14px 14px;
        }
        .rsvp-label {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #fde68a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
        .rsvp-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .rsvp-input {
          flex: 1;
          background: rgba(255,255,255,0.95);
          border: 2.5px solid #fbbf24;
          border-radius: 12px;
          padding: 11px 14px;
          font-size: 14px;
          font-weight: 800;
          color: #1e1b4b;
          font-family: 'Nunito', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }
        .rsvp-input::placeholder { color: #9ca3af; font-weight: 600; }
        .rsvp-input:focus { border-color: #fff; box-shadow: 0 0 0 3px rgba(255,255,255,0.35), inset 0 2px 4px rgba(0,0,0,0.1); }
        .rsvp-btn {
          background: linear-gradient(135deg, #fbbf24, #d97706);
          color: #7c2d12;
          font-family: 'Nunito', sans-serif;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: none;
          border-radius: 12px;
          padding: 11px 16px;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .rsvp-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.4); }
        .rsvp-btn:active { transform: translateY(1px); }
        .rsvp-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .rsvp-msg {
          font-size: 12px;
          font-weight: 800;
          text-align: center;
          margin-top: 8px;
          border-radius: 10px;
          padding: 6px 10px;
        }
        .rsvp-msg.success { background: rgba(21,128,61,0.3); color: #bbf7d0; border: 1px solid rgba(74,222,128,0.3); }
        .rsvp-msg.error   { background: rgba(0,0,0,0.3); color: #fca5a5; border: 1px solid rgba(248,113,113,0.3); }

        /* city glow overlay no fundo */
        .city-glow {
          position: absolute;
          bottom: 130px;
          left: 0; right: 0;
          height: 120px;
          background: linear-gradient(0deg, rgba(37,99,235,0.18) 0%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }
        .radial-glow {
          position: absolute;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(220,38,38,0.18) 0%, rgba(37,99,235,0.1) 50%, transparent 70%);
          pointer-events: none;
          z-index: 1;
          animation: pulse-glow 4s ease-in-out infinite;
        }
      `}</style>

      <div className="invite-card">

        {/* Glow radial de fundo */}
        <div className="radial-glow" />
        <div className="city-glow" />

        {/* ── Teias nos cantos ── */}
        <WebCorner className="web-corner web-tl" />
        <WebCorner className="web-corner web-tr" />
        <WebCorner className="web-corner web-bl" />
        <WebCorner className="web-corner web-br" />

        {/* ── Spideys no topo ── */}
        <img src="/spidey-teia.png" alt="Spidey" className="spidey-top-left" />
        <img src="/spidey.png.png" alt="Spidey" className="spidey-top-right" />

        {/* ── Pontinhos do topo ── */}
        <div className="top-dots">• • • • • • • • • • • • • • • • • • • • • • • •</div>

        {/* ── Nome Hero ── */}
        <div className="hero-section">
          <p className="invite-text">🕷️ você foi convidado para participar dessa aventura! 🕷️</p>
          <div className="name-block">
            <span className="name-main">JOÃO VICENTE</span>
            <div className="age-block">
              <span className="age-num">1</span>
              <div className="age-ano">
                <span className="age-ano-text">ANO</span>
                <span className="age-ano-sub">do João Vicente</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Faixa vermelha ── */}
        <div className="red-strip">🕸️ &nbsp; Baby Spider &nbsp; 🕸️</div>

        {/* ── Card de data/hora/local ── */}
        <div className="info-card">
          <div className="info-col">
            <span className="info-label">Junho</span>
            <span className="info-label">às 15 horas</span>
          </div>
          <div className="info-col" style={{ flex: '0 0 64px' }}>
            <span className="info-day">21</span>
          </div>
          <div className="info-col">
            <span className="info-label">Sábado</span>
            <span className="info-value" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>Av. Terra Nova, 502</span>
          </div>
        </div>

        {/* ── Spidey agachado ── */}
        <div className="spidey-bottom">
          <img src="/spidey-agachado.png" alt="Spidey Baby" />
        </div>

        {/* ── RSVP destacado ── */}
        <div className="rsvp-section">
          <div className="rsvp-header">
            <div className="rsvp-badge">✅ Confirmação de Presença</div>
            <p className="rsvp-title">Você vai comparecer?</p>
            <p className="rsvp-subtitle">Digite seu nome abaixo e confirme!</p>
          </div>
          <div className="rsvp-body">
            <div className="rsvp-label">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#fde68a"><path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"/></svg>
              Seu nome completo
            </div>
            <form onSubmit={handleSubmit}>
              <div className="rsvp-row">
                <input
                  id="rsvp-name"
                  className="rsvp-input"
                  type="text"
                  required
                  placeholder="Ex: Maria Parker"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />
                <button id="rsvp-submit" className="rsvp-btn" type="submit" disabled={loading}>
                  {loading ? '...' : 'Confirmar'}
                </button>
              </div>
              {status.msg && (
                <div className={`rsvp-msg ${status.type}`}>{status.msg}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

/* SVG de teia de aranha nos cantos */
function WebCorner({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="0" x2="100" y2="0" stroke="white" strokeWidth="0.8"/>
      <line x1="0" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.8"/>
      <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="1"/>
      <line x1="0" y1="0" x2="70" y2="100" stroke="white" strokeWidth="0.7"/>
      <line x1="0" y1="0" x2="100" y2="70" stroke="white" strokeWidth="0.7"/>
      <line x1="0" y1="0" x2="40" y2="100" stroke="white" strokeWidth="0.6"/>
      <line x1="0" y1="0" x2="100" y2="40" stroke="white" strokeWidth="0.6"/>
      <path d="M0 20 Q10 10 20 0" stroke="white" strokeWidth="0.7" fill="none"/>
      <path d="M0 40 Q20 20 40 0" stroke="white" strokeWidth="0.7" fill="none"/>
      <path d="M0 60 Q30 30 60 0" stroke="white" strokeWidth="0.7" fill="none"/>
      <path d="M0 80 Q40 40 80 0" stroke="white" strokeWidth="0.8" fill="none"/>
      <path d="M0 100 Q50 50 100 0" stroke="white" strokeWidth="0.9" fill="none"/>
      <path d="M20 100 Q60 60 100 20" stroke="white" strokeWidth="0.7" fill="none"/>
      <path d="M40 100 Q70 70 100 40" stroke="white" strokeWidth="0.7" fill="none"/>
      <path d="M60 100 Q80 80 100 60" stroke="white" strokeWidth="0.6" fill="none"/>
    </svg>
  )
}
