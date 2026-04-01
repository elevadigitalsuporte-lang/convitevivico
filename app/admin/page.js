'use client'

import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [errorLogin, setErrorLogin] = useState('')

  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)
  
  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => {
    // Check local storage for quick bypass in same session
    if (localStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true)
      fetchRecords()
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'admin123') { // Hardcoded password requirement
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
      fetchRecords()
      setErrorLogin('')
    } else {
      setErrorLogin('Senha incorreta')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
    setRecords([])
  }

  const fetchRecords = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/rsvp')
      const data = await res.json()
      if (res.ok) {
        setRecords(data.data || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if(!confirm('Tem certeza que deseja excluir este registro?')) return;
    try {
      await fetch(`/api/rsvp?id=${id}`, { method: 'DELETE' })
      fetchRecords()
    } catch (err) {
      console.error(err)
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch('/api/rsvp', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      })
      setEditingItem(null)
      fetchRecords()
    } catch (err) {
      console.error(err)
    }
  }

  // Calculate totals
  const totalAdults = records.reduce((acc, curr) => acc + 1 + curr.qtd_acompanhantes, 0)
  const totalKids = records.reduce((acc, curr) => acc + curr.qtd_filhos, 0)

  if (!isAuthenticated) {
    return (
      <main className="container" style={{ display: 'flex', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}>
        <div className="glass-card" style={{ width: '100%' }}>
          <h2 className="title" style={{ fontSize: '2rem' }}>Acesso Restrito</h2>
          <form onSubmit={handleLogin} style={{ marginTop: '2rem' }}>
            <div className="form-group">
              <input 
                type="password" 
                className="form-input" 
                placeholder="Senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorLogin && <p style={{ color: 'var(--error)', marginBottom: '1rem', textAlign: 'center' }}>{errorLogin}</p>}
            <button className="btn">Entrar</button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <main className="admin-container">
        <div className="dashboard-header">
        <h1 className="title" style={{ margin: 0 }}>Dashboard Admin</h1>
        <button onClick={handleLogout} className="btn btn-secondary btn-small" style={{ width: 'auto' }}>Sair</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{totalAdults}</span>
          <span className="stat-label">Total Adultos<br/>(Titulares + Acomp.)</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalKids}</span>
          <span className="stat-label">Total Crianças<br/>(Filhos)</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{records.length}</span>
          <span className="stat-label">Famílias<br/>(Registros)</span>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>Lista de Confirmados</h3>
        {loading ? <p style={{ color: 'var(--text-secondary)' }}>Carregando dados...</p> : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Titular</th>
                  <th>Acompanhantes</th>
                  <th>Filhos</th>
                  <th>Data Registro</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {records.map(rec => (
                  <tr key={rec.id}>
                    <td>{rec.nome_titular}</td>
                    <td>{rec.qtd_acompanhantes}</td>
                    <td>{rec.qtd_filhos}</td>
                    <td>{new Date(rec.data_registro).toLocaleDateString('pt-BR')}</td>
                    <td className="td-actions">
                      <button 
                        className="btn btn-secondary btn-small" 
                        onClick={() => setEditingItem(rec)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-danger btn-small"
                        onClick={() => handleDelete(rec.id)}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
                {records.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Nenhum registro encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>Editar Registro</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label className="form-label">Nome Titular</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editingItem.nome_titular}
                  onChange={(e) => setEditingItem({...editingItem, nome_titular: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Acompanhantes (Extras)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={editingItem.qtd_acompanhantes}
                  onChange={(e) => setEditingItem({...editingItem, qtd_acompanhantes: parseInt(e.target.value)})}
                  required min="0"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Filhos (Crianças)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={editingItem.qtd_filhos}
                  onChange={(e) => setEditingItem({...editingItem, qtd_filhos: parseInt(e.target.value)})}
                  required min="0"
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingItem(null)}>Cancelar</button>
                <button type="submit" className="btn">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}
      </main>
    </div>
  )
}
