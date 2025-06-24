import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/connection';
import styles from './Products.module.css';

const Products = () => {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const productCollection = collection(db, 'products');

  // Carrega marcas
  useEffect(() => {
    const q = query(collection(db, 'brands'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBrands(list);
    });
  }, []);

  // Carrega produtos
  useEffect(() => {
    const q = query(productCollection, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(list);
    });
  }, []);

  // Mensagem temporária
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Submeter novo produto ou atualização
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brand || !name || !price || !unit) {
      setMessage('Preencha todos os campos.');
      return;
    }

    try {
      if (editId) {
        const ref = doc(db, 'products', editId);
        await updateDoc(ref, {
          brand,
          name,
          price: parseFloat(price),
          unit,
        });
        setMessage('Produto atualizado com sucesso!');
        setEditId(null);
      } else {
        await addDoc(productCollection, {
          brand,
          name,
          price: parseFloat(price),
          unit,
          createdAt: Timestamp.now(),
        });
        setMessage('Produto cadastrado com sucesso!');
      }

      setBrand('');
      setName('');
      setPrice('');
      setUnit('');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setMessage('Erro ao salvar o produto.');
    }
  };

  // Editar produto
  const handleEdit = (product) => {
    setBrand(product.brand);
    setName(product.name);
    setPrice(product.price);
    setUnit(product.unit);
    setEditId(product.id);
    setMessage('');
  };

  // Excluir produto
  const handleDelete = async (id) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este produto?');
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'products', id));
      setMessage('Produto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setMessage('Erro ao excluir o produto.');
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.formWrapper}>
      <h2>{editId ? 'Editar Produto' : 'Cadastrar Produto'}</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Marca:
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">Selecione uma marca</option>
            {brands.map((b) => (
              <option key={b.id} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do produto"
          />
        </label>

        <label>
          Preço:
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Preço"
          />
        </label>

        <label>
          Unidade:
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="Unidade"
          />
        </label>

        <button type="submit" className={styles.btn}>
          {editId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      <input
        type="text"
        placeholder="Buscar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      {message && <p>{message}</p>}

      <h3>Produtos Cadastrados:</h3>
      <ul className={styles.list}>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <span>
              <strong>{product.name}</strong> - {product.brand} - R${product.price} / {product.unit}
              {product.createdAt && (
                <small style={{ marginLeft: '10px', color: '#666' }}>
                  ({product.createdAt.toDate().toLocaleDateString()})
                </small>
              )}
            </span>
            <div>
              <button onClick={() => handleEdit(product)} className={styles.btnEdit}>Editar</button>
              <button onClick={() => handleDelete(product.id)} className={styles.btnDelete}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
