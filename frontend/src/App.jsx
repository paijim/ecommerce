import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  // Charger les produits
  const fetchProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  }

  useEffect(() => { fetchProducts() }, [])

  // Envoyer un nouveau produit
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price), description: "Nouveau produit", stock: 10 })
    })
    .then(() => {
      fetchProducts() // Rafraîchir la liste après l'ajout
      setName('')
      setPrice('')
    })
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>TechStore Admin</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px' }}>
        <h3>Ajouter un produit</h3>
        <input placeholder="Nom" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Prix" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        <button type="submit">Enregistrer</button>
      </form>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h4>{p.name}</h4>
            <p>{p.price} €</p>
            <button onClick={() => alert('Ajouté au panier !')}>Panier</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App