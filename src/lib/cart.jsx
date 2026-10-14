import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { site } from '../data/site.js';
import { giftPrice, giftSummary } from '../data/gifting.js';
import { toPersianDigits } from './format.js';
import { boxPricing } from './pricing.js';

const STORAGE_KEY = 'anahita.cart.v1';

const CartContext = createContext(null);

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStored);
  const [isOpen, setOpen] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable (private mode) — the cart simply stays in memory */
    }
  }, [items]);

  const addItem = useCallback((item, qty = 1) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.key === item.key);
      if (existing) {
        return current.map((entry) =>
          entry.key === item.key ? { ...entry, qty: entry.qty + qty } : entry,
        );
      }
      return [...current, { ...item, qty }];
    });
  }, []);

  const addProduct = useCallback(
    (product, qty = 1) => {
      addItem(
        {
          key: `product:${product.id}`,
          kind: 'product',
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          weight: product.weight,
          image: product.image,
        },
        qty,
      );
      setNotice(`${product.name} به سبد شما اضافه شد`);
      setOpen(true);
    },
    [addItem],
  );

  const addGiftBox = useCallback(
    (box, qty = 1) => {
      addItem(
        {
          key: `gift:${box.id}`,
          kind: 'gift',
          id: box.id,
          slug: box.slug,
          name: box.name,
          price: box.price,
          weight: box.pieces,
          image: box.image,
        },
        qty,
      );
      setNotice(`${box.name} به سبد شما اضافه شد`);
      setOpen(true);
    },
    [addItem],
  );

  const addPersonalised = useCallback(
    (selection, qty = 1) => {
      const signature = JSON.stringify(selection);
      addItem(
        {
          key: `custom:${signature}`,
          kind: 'custom',
          id: `custom-${Date.now()}`,
          slug: 'personalised-gift',
          name: 'Personalised Chocolate Gift',
          price: giftPrice(selection),
          weight: giftSummary(selection),
          selection,
          image: { src: '/images/boutique-interior.jpg', focus: '74% 52%', zoom: 2.1 },
        },
        qty,
      );
      setNotice('هدیه‌ی شخصی‌سازی‌شده‌ی شما به سبد اضافه شد');
      setOpen(true);
    },
    [addItem],
  );

  /* «جعبه را خودت بچین» — the customer's own arrangement of a box. The price is
     the box's own price plus the pieces that went into it (see `boxPricing`), the
     figure the builder showed the customer, and the arrangement travels with the
     order as the line's composition. Two different
     arrangements of the same box are two separate lines. */
  const addBuiltBox = useCallback(
    (product, pieces, qty = 1) => {
      const composition = pieces
        .map((piece) => `${piece.name} × ${toPersianDigits(piece.count)}`)
        .join(' · ');
      const signature = pieces.map((piece) => `${piece.id}-${piece.count}`).join('|');
      addItem(
        {
          key: `built:${product.id}:${signature}`,
          kind: 'product',
          id: product.id,
          slug: product.slug,
          name: `${product.name} — چیده‌شده توسط شما`,
          price: boxPricing(product, pieces).total,
          weight: composition,
          image: product.image,
        },
        qty,
      );
      setNotice('جعبه‌ی چیده‌شده‌ی شما به سبد اضافه شد');
      setOpen(true);
    },
    [addItem],
  );

  const setQty = useCallback((key, qty) => {
    setItems((current) =>
      qty <= 0
        ? current.filter((entry) => entry.key !== key)
        : current.map((entry) => (entry.key === key ? { ...entry, qty } : entry)),
    );
  }, []);

  const removeItem = useCallback((key) => {
    setItems((current) => current.filter((entry) => entry.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 3200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const subtotal = useMemo(
    () => items.reduce((sum, entry) => sum + entry.price * entry.qty, 0),
    [items],
  );

  const count = useMemo(() => items.reduce((sum, entry) => sum + entry.qty, 0), [items]);

  const threshold = site.giftBagThreshold;
  const remainingForGift = Math.max(0, threshold - subtotal);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      notice,
      isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      addProduct,
      addGiftBox,
      addPersonalised,
      addBuiltBox,
      setQty,
      removeItem,
      clear,
      threshold,
      remainingForGift,
      giftUnlocked: threshold > 0 && subtotal >= threshold,
    }),
    [
      items,
      count,
      subtotal,
      notice,
      isOpen,
      addProduct,
      addGiftBox,
      addPersonalised,
      addBuiltBox,
      setQty,
      removeItem,
      clear,
      threshold,
      remainingForGift,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside a CartProvider');
  return context;
}
