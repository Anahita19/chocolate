import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { categories, products } from '../data/products.js';
import { toPersianDigits } from '../lib/format.js';

const sortOptions = [
  { id: 'featured', label: 'پیشنهاد ما' },
  { id: 'price-asc', label: 'قیمت · از کم به زیاد' },
  { id: 'price-desc', label: 'قیمت · از زیاد به کم' },
  { id: 'name', label: 'نام · الف تا ی' },
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
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'fa'));
    return list;
  }, [category, query, sort]);

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">ویترین شکلات</span>
          <h1>شکلاتهای ما</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            هر چه میسازیم، به همان ترتیبی که در بوتیک چیده شده — از یک پرالین تنها تا مجموعهی کامل
            بیستوچهار قطعهای. قیمتها به تومان است.
          </p>
        </div>
      </section>

      <section className="section section--ivory" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="shell">
          <div className="filter-bar" style={{ justifyContent: 'space-between' }}>
            <div className="filter-bar__scroll" role="group" aria-label="فیلتر بر اساس دسته">
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
                    جستوجو
                  </label>
                  <input
                    id="shop-search"
                    className="field__input"
                    type="search"
                    value={searchDraft}
                    onChange={(event) => setSearchDraft(event.target.value)}
                    placeholder="پسته، ترافل…"
                  />
                </div>
                <button type="submit" className="btn btn--ink btn--sm">
                  بگرد
                </button>
              </form>

              <div className="field" style={{ minWidth: '190px' }}>
                <label className="field__label" htmlFor="shop-sort">
                  ترتیب
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
            {toPersianDigits(visible.length)} شکلات
            {query ? ` با «${query}»` : ''}
            {category !== 'all'
              ? ` در دستهی ${categories.find((option) => option.id === category)?.label || category}`
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
              <p>چیزی در ویترین با این جستوجو پیدا نشد.</p>
              <button
                type="button"
                className="btn btn--ink"
                onClick={() => {
                  setSearchDraft('');
                  setParams(new URLSearchParams(), { replace: true });
                }}
              >
                نمایش همه
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
