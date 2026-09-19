import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useDocumentTitle, useMetaDescription } from './meta';

describe('useDocumentTitle', () => {
  it('sets the document title', () => {
    renderHook(() => useDocumentTitle('DCUOBot'));

    expect(document.title).toBe('DCUOBot');
  });

  it('updates the document title when it changes', () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: 'DCUOBot' },
    });

    rerender({ title: 'DCUOBot - Characters' });

    expect(document.title).toBe('DCUOBot - Characters');
  });
});

describe('useMetaDescription', () => {
  afterEach(() => {
    document.querySelectorAll('meta[name="description"]').forEach((meta) => meta.remove());
  });

  it('creates a meta description tag when none exists', () => {
    renderHook(() => useMetaDescription('Track your DCUO characters'));

    const meta = document.querySelector('meta[name="description"]');
    expect(meta).not.toBeNull();
    expect(meta?.getAttribute('content')).toBe('Track your DCUO characters');
  });

  it('reuses an existing meta description tag', () => {
    const existing = document.createElement('meta');
    existing.setAttribute('name', 'description');
    document.head.appendChild(existing);

    renderHook(() => useMetaDescription('Track your DCUO characters'));

    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(existing.getAttribute('content')).toBe('Track your DCUO characters');
  });

  it('updates the meta description when it changes', () => {
    const { rerender } = renderHook(({ description }) => useMetaDescription(description), {
      initialProps: { description: 'Track your DCUO characters' },
    });

    rerender({ description: 'Explore leagues and rankings' });

    const meta = document.querySelector('meta[name="description"]');
    expect(meta?.getAttribute('content')).toBe('Explore leagues and rankings');
  });
});
