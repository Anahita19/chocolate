/** Money for «جعبه را خودت بچین» — the box the customer fills themselves.

    Each chocolate carries `piecePrice`: what one single piece of it costs, in
    toman (`src/data/products.js`). The boutique sets those prices from its admin
    panel, and until a piece has one it stays `0` — so a box costs its own price
    today and the total grows on its own the moment the piece prices are filled
    in. Nothing here is invented and no price is written into a component: this
    function is the one place the box's money is worked out, and both the builder
    (which prints it) and `addBuiltBox` in `lib/cart.jsx` (which stores it on the
    line) read it. */

export function boxPricing(product, pieces = []) {
  const base = Number(product?.price) || 0;
  const piecesTotal = pieces.reduce(
    (sum, piece) => sum + (Number(piece?.piecePrice) || 0) * (Number(piece?.count) || 0),
    0,
  );
  return { base, pieces: piecesTotal, total: base + piecesTotal };
}
