import React from 'react';

type Block =
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'h4'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'hr' }
  | { kind: 'quote'; text: string };

function parseBlocks(md: string): Block[] {
  const lines = md.split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (trimmed === '---') {
      blocks.push({ kind: 'hr' });
      i++;
      continue;
    }

    if (trimmed.startsWith('#### ')) {
      blocks.push({ kind: 'h4', text: trimmed.slice(5).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith('### ')) {
      blocks.push({ kind: 'h3', text: trimmed.slice(4).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      blocks.push({ kind: 'h2', text: trimmed.slice(3).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith('# ')) {
      i++;
      continue;
    }

    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ kind: 'quote', text: quoteLines.join(' ') });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push({ kind: 'ul', items });
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push({ kind: 'ol', items });
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length) {
      const t = lines[i].trim();
      if (!t) break;
      if (t === '---') break;
      if (t.startsWith('#')) break;
      if (/^[-*]\s+/.test(t)) break;
      if (/^\d+\.\s+/.test(t)) break;
      if (t.startsWith('> ')) break;
      paraLines.push(t);
      i++;
    }
    if (paraLines.length) {
      blocks.push({ kind: 'p', text: paraLines.join(' ') });
    }
  }

  return blocks;
}

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let idx = 0;

  while ((m = tokenRegex.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(text.slice(last, m.index));
    }
    const token = m[0];
    const key = `${keyPrefix}-${idx++}`;

    if (token.startsWith('**')) {
      parts.push(<strong key={key} className="font-semibold text-[#0A0A0A]">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`')) {
      parts.push(<code key={key} className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#0A0A0A] text-[0.9em] font-mono">{token.slice(1, -1)}</code>);
    } else if (token.startsWith('[')) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        const [, label, url] = linkMatch;
        const isExternal = /^https?:\/\//.test(url);
        parts.push(
          <a
            key={key}
            href={url}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-[#FF6A00] underline underline-offset-2 hover:text-[#e05e00]"
          >
            {label}
          </a>
        );
      }
    } else if (token.startsWith('*')) {
      parts.push(<em key={key} className="italic">{token.slice(1, -1)}</em>);
    }

    last = m.index + token.length;
  }
  if (last < text.length) {
    parts.push(text.slice(last));
  }
  return parts;
}

export function renderMarkdown(md: string): React.ReactNode {
  const blocks = parseBlocks(md);
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'h2':
            return (
              <h2 key={i} className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] mt-14 mb-5 leading-tight tracking-tight">
                {renderInline(b.text, `h2-${i}`)}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="text-xl sm:text-2xl font-bold text-[#0A0A0A] mt-10 mb-4 leading-snug">
                {renderInline(b.text, `h3-${i}`)}
              </h3>
            );
          case 'h4':
            return (
              <h4 key={i} className="text-lg font-bold text-[#0A0A0A] mt-8 mb-3">
                {renderInline(b.text, `h4-${i}`)}
              </h4>
            );
          case 'p':
            return (
              <p key={i} className="text-[#374151] text-base sm:text-lg leading-[1.75] mb-6">
                {renderInline(b.text, `p-${i}`)}
              </p>
            );
          case 'ul':
            return (
              <ul key={i} className="mb-6 space-y-2 pl-5">
                {b.items.map((item, j) => (
                  <li key={j} className="text-[#374151] text-base sm:text-lg leading-[1.7] relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#FF6A00]">
                    {renderInline(item, `li-${i}-${j}`)}
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="mb-6 space-y-2 pl-5 list-decimal marker:text-[#FF6A00] marker:font-bold">
                {b.items.map((item, j) => (
                  <li key={j} className="text-[#374151] text-base sm:text-lg leading-[1.7] pl-2">
                    {renderInline(item, `oli-${i}-${j}`)}
                  </li>
                ))}
              </ol>
            );
          case 'hr':
            return <hr key={i} className="my-12 border-t border-[#E5E5E5]" />;
          case 'quote':
            return (
              <blockquote key={i} className="my-8 border-l-4 border-[#FF6A00] pl-6 py-1 italic text-[#0A0A0A] text-lg">
                {renderInline(b.text, `q-${i}`)}
              </blockquote>
            );
        }
      })}
    </>
  );
}
