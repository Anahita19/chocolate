import { Link } from 'react-router-dom';
import FramedImage from '../components/FramedImage.jsx';
import Reveal from '../components/Reveal.jsx';
import { Emblem } from '../components/Logo.jsx';
import { craft, site } from '../data/site.js';

export default function OurStory() {
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Our story</span>
          <h1 style={{ maxWidth: '24ch' }}>A chocolate house built on a small glass case</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            ANAHITA began with a simple ambition: to make chocolate that deserves the room it is served
            in — and to serve it in a room that deserves the chocolate.
          </p>
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell split-story">
          <Reveal>
            <span className="eyebrow">The idea</span>
            <h2 style={{ maxWidth: '22ch' }}>Everything points at the counter</h2>
            <p className="lede" style={{ marginTop: '1.1rem' }}>
              Walk in and the room arranges itself around one thing: a curved glass case, lit from
              below, filled with handmade chocolate. Dark walnut panels absorb the light, the marble
              wall carries the wordmark, and the arched alcoves hold the gift boxes.
            </p>
            <p className="lede">
              It is a deliberately quiet design. Chocolate is the brightest thing in the room, and we
              would rather it stayed that way.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <FramedImage
              image={{ src: '/images/boutique-interior.jpg', focus: '50% 50%', zoom: 1.05 }}
              alt="Wide view of the ANAHITA boutique interior with dark walnut cabinetry and the curved chocolate counter"
              ratio="frame--portrait"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="shell editorial">
          <Reveal>
            <span className="eyebrow">{craft.eyebrow}</span>
            <p className="editorial__statement">{craft.title}</p>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              {craft.body}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ol className="numbered-notes">
              {craft.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section section--espresso">
        <div className="shell" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', textAlign: 'center' }}>
          <Emblem className="brand__emblem" style={{ width: 44, height: 26 }} />
          <h2 style={{ maxWidth: '28ch' }}>Made in small batches, chosen one piece at a time</h2>
          <p className="lede" style={{ maxWidth: '54ch' }}>
            Come and taste at the counter, or build a box from wherever you are. Either way, it is
            packed the day it leaves us.
          </p>
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/boutique" className="btn btn--gold">
              Visit our boutique
            </Link>
            <Link to="/chocolates" className="btn">
              Explore our chocolates
            </Link>
          </div>
          <p className="form-note">
            {site.boutique.addressLines.length === 0
              ? 'Boutique address, hours and phone number will be published here once confirmed.'
              : null}
          </p>
        </div>
      </section>
    </>
  );
}
