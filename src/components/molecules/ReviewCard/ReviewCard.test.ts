import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync(
  'src/components/molecules/ReviewCard/ReviewCard.astro',
  'utf8',
);

describe('ReviewCard source', () => {
  it('uses design tokens for styling values', () => {
    expect(source).toMatch(/var\(--space-lg\)/);
    expect(source).toMatch(/var\(--radius-lg\)/);
    expect(source).toMatch(/var\(--color-background-body\)/);
    expect(source).toMatch(/var\(--border-width-sm\)/);
    expect(source).toMatch(/var\(--color-border-subtle\)/);
    expect(source).toMatch(/var\(--size-content-max-width-lg\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/userName: string/);
    expect(source).toMatch(/userAvatar: string/);
    expect(source).toMatch(/userAvatarAlt\?: string/);
    expect(source).toMatch(/reviewText: string/);
    expect(source).toMatch(/rating: number/);
    expect(source).toMatch(/textTruncateLength\?: number/);
    expect(source).toMatch(/class\?: string/);
  });

  it('uses existing atomic components', () => {
    expect(source).toMatch(
      /import Image from '\.\.\/\.\.\/atoms\/Image\.astro'/,
    );
    expect(source).toMatch(
      /import Paragraph from '\.\.\/\.\.\/atoms\/Paragraph\.astro'/,
    );
    expect(source).toMatch(/import Link from '\.\.\/\.\.\/atoms\/Link\.astro'/);
    expect(source).toMatch(/import Rating from '\.\.\/Rating\.astro'/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/rating = 5/);
    expect(source).toMatch(/textTruncateLength = 150/);
    expect(source).toMatch(/userAvatarAlt = 'user'/);
    expect(source).toMatch(/class: className = ''/);
  });

  it('implements expandable text functionality', () => {
    expect(source).toMatch(/shouldTruncate/);
    expect(source).toMatch(/truncatedText/);
    expect(source).toMatch(/Read more/);
    expect(source).toMatch(/Show less/);
  });

  it('uses semantic HTML structure', () => {
    expect(source).toMatch(/<div class="hg-ReviewCard__img-holder">/);
    expect(source).toMatch(/<Paragraph class="hg-ReviewCard__user-name">/);
    expect(source).toMatch(/<div class="hg-ReviewCard__slide-content">/);
    expect(source).toMatch(/<div class="hg-ReviewCard__rating">/);
  });

  it('has proper CSS classes', () => {
    expect(source).toMatch(/\.hg-ReviewCard/);
    expect(source).toMatch(/\.hg-ReviewCard__img-holder/);
    expect(source).toMatch(/\.hg-ReviewCard__user-name/);
    expect(source).toMatch(/\.hg-ReviewCard__slide-content/);
    expect(source).toMatch(/\.hg-ReviewCard__rating/);
  });

  it('includes responsive design', () => {
    expect(source).toMatch(/@media \(width <= 48rem\)/);
    expect(source).toMatch(/var\(--space-md\)/);
    expect(source).toMatch(/var\(--width-md\)/);
  });

  it('has proper transitions and hover effects', () => {
    expect(source).toMatch(/transition:/);
    expect(source).toMatch(/transform:/);
    expect(source).toMatch(/:hover/);
  });

  it('uses proper text truncation CSS', () => {
    expect(source).toMatch(/\.hg-ReviewCard__line-3/);
    expect(source).toMatch(/-webkit-line-clamp: 3/);
    expect(source).toMatch(/-webkit-box-orient: vertical/);
  });

  it('includes JavaScript functionality', () => {
    expect(source).toMatch(/addEventListener/);
    expect(source).toMatch(/querySelector/);
    expect(source).toMatch(/classList/);
    expect(source).toMatch(/aria-expanded/);
  });

  it('follows project naming conventions', () => {
    expect(source).toMatch(/hg-ReviewCard/);
    expect(source).toMatch(/hg-ReviewCard__img-holder/);
    expect(source).toMatch(/hg-ReviewCard__user-name/);
    expect(source).toMatch(/hg-ReviewCard__slide-content/);
    expect(source).toMatch(/hg-ReviewCard__btn-show-more/);
  });

  it('has proper component documentation', () => {
    expect(source).toMatch(/Molecule: ReviewCard/);
    expect(source).toMatch(
      /Displays a customer review with avatar, name, expandable text, and star rating/,
    );
    expect(source).toMatch(/Uses existing atoms and molecules for consistency/);
  });
});
