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

      setStatus({ type: 'success', msg: 'Presença confirmada com sucesso! Mal podemos esperar para celebrar com você.' })
      setFormData({ nome_titular: '', qtd_acompanhantes: 0, qtd_filhos: 0 })
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', msg: 'Houve um erro ao confirmar. Tente novamente mais tarde.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <div className="glass-card">
        <h1 className="title">Você foi convidado!</h1>
        <p className="subtitle">Junte-se a nós para uma noite inesquecível de celebração. Por favor, confirme sua presença abaixo.</p>

        {status.msg && (
          <div className={`alert alert-${status.type}`}>
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nome Completo do Titular</label>
            <input 
              type="text" 
              className="form-input" 
              required
              placeholder="Ex: João da Silva"
              value={formData.nome_titular}
              onChange={(e) => setFormData({...formData, nome_titular: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Quantidade de Acompanhantes</label>
            <input 
              type="number" 
              className="form-input" 
              min="0"
              required
              value={formData.qtd_acompanhantes}
              onChange={(e) => setFormData({...formData, qtd_acompanhantes: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Quantidade de Filhos (Crianças)</label>
            <input 
              type="number" 
              className="form-input" 
              min="0"
              required
              value={formData.qtd_filhos}
              onChange={(e) => setFormData({...formData, qtd_filhos: e.target.value})}
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Processando...' : 'Confirmar Presença'}
          </button>
        </form>
      </div>
    </main>
  )
}
