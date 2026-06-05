import 'server-only';
import fs from 'fs';
import path from 'path';
import { getArticleBySlug } from './articles-data';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

export function getArticleBody(slug: string): string | null {
  const meta = getArticleBySlug(slug);
  if (!meta || !meta.file) return null;
  try {
    return fs.readFileSync(path.join(ARTICLES_DIR, meta.file), 'utf-8');
  } catch {
    return null;
  }
}
