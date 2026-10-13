/* Renders boutique photography framed like the shop's glass display cases.
   `image` is always { src, focus, zoom } so real product photography can be
   dropped in later without touching a component. */
export default function FramedImage({
  image,
  alt,
  ratio = 'frame--tall',
  className = '',
  eager = false,
  sizes,
}) {
  const { src, focus = '50% 50%', zoom = 1 } = image || {};

  return (
    <div
      className={`frame ${ratio} ${className}`.trim()}
      style={{ '--focus': focus, '--zoom': zoom }}
    >
      <img
        src={src}
        alt={alt || ''}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={eager ? 'high' : undefined}
        sizes={sizes}
      />
    </div>
  );
}
