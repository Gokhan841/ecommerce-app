import { useEffect, useState } from 'react'

const useProductlist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    console.log(11); // senin console.log(11) burada
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        console.log(data); // gelen veri
        setProducts(data); // state'e yaz
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [])

  return { products, loading, error };
}

export default useProductlist