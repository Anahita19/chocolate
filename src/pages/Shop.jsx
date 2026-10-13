import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { categories, products } from '../data/products.js';

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price · low to high' },
  { id: 'price-desc', label: 'Price · high to low' },
  { id: 'name', label: 'Name · A to Z' },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'all';
  const query = params.get('q') || '';
  const sort = params.get('sort') || 'featured';
  const [searchDraft, setSearchDraft] = useState(query);

  const update = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([key, value]) => {
      if (!value || value === 'all' || (key === 'sort' && value === 'featured')) next.delete(key);
      else next.set(key, value);
    });
    setParams(next, { replace: true });
  };

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    let list = products.filter((product) => {
      const inCategory = category === 'all' || product.category === category;
      const matches =
        !term ||
        [product.name, product.short, product.flavour, product.category]
          .join(' ')
          .toLowerCase()
          .includes(term);
      return inCategory && matches;
    });

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, query, sort]);

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">The chocolate case</span>
          <h1>Our Chocolates</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Everything we make, arranged as it is in the boutique — from single pralines to the full
            twenty-four piece assortment. Prices are in Iranian toman.
          </p>
        </div>
      </section>

      <section className="section section--ivory" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="shell">
          <div className="filter-bar" style={{ justifyContent: 'space-between' }}>
            <div className="filter-bar__scroll" role="group" aria-label="Filter by category">
              {categories.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`pill ${category === option.id ? 'pill--active' : ''}`}
                  aria-pressed={category === option.id}
                  onClick={() => update({ category: option.id })}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  update({ q: searchDraft.trim() });
                }}
                style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}
              >
                <div className="field" style={{ minWidth: '200px' }}>
                  <label className="field__label" htmlFor="shop-search">
                    Search
                  </label>
                  <input
                    id="shop-search"
                    className="field__input"
                    type="search"
                    value={searchDraft}
                    onChange={(event) => setSearchDraft(event.target.value)}
                    placeholder="Pistachio, truffle…"
                  />
                </div>
                <button type="submit" className="btn btn--ink btn--sm">
                  Find
                </button>
              </form>

              <div className="field" style={{ minWidth: '190px' }}>
                <label className="field__label" htmlFor="shop-sort">
                  Sort
                </label>
                <select
                  id="shop-sort"
                  className="field__select"
                  value={sort}
                  onChange={(event) => update({ sort: event.target.value })}
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <p className="form-note" style={{ marginTop: '1.5rem' }}>
            {visible.length} {visible.length === 1 ? 'chocolate' : 'chocolates'}
            {query ? ` matching “${query}”` : ''}
            {category !== 'all'
              ? ` in ${categories.find((option) => option.id === category)?.label || category}`
              : ''}
            .
          </p>

          <div className="grid grid--3" style={{ marginTop: '1.5rem' }}>
            {visible.map((product, index) => (
              <Reveal key={product.id} delay={(index % 3) * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="empty-state">
              <p>Nothing in the case matches that search.</p>
              <button
                type="button"
                className="btn btn--ink"
                onClick={() => {
                  setSearchDraft('');
                  setParams(new URLSearchParams(), { replace: true });
                }}
              >
                Show everything
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
