const FEED_URL = 'https://alejandrosdow.substack.com/feed';

export async function GET() {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; alejandrosdow-bot/1.0)' },
    });

    if (!res.ok) {
      return Response.json({ error: 'Failed to fetch feed' }, { status: 502 });
    }

    const xml = await res.text();
    const items = parseRSS(xml);

    return Response.json({ items });
  } catch {
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}

// ─── XML helpers ────────────────────────────────────────────────────────────

function extractCDATA(str) {
  const m = str.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return m ? m[1] : str;
}

function getTagContent(xml, tag) {
  // Handles both <tag>content</tag> and <ns:tag>content</ns:tag>
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = xml.match(re);
  return m ? extractCDATA(m[1]).trim() : '';
}

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function estimateRead(content) {
  const words = stripHtml(content).split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parseRSS(xml) {
  const itemRe = /<item>([\s\S]*?)<\/item>/gi;
  const items = [];
  let m;

  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1];

    const title = stripHtml(getTagContent(block, 'title'));
    // <link> in RSS 2.0 is plain text between tags
    const linkMatch = block.match(/<link>([^<]+)<\/link>/i);
    const link = linkMatch ? linkMatch[1].trim() : '';
    const pubDate = getTagContent(block, 'pubDate');
    const description = getTagContent(block, 'description');
    const content = getTagContent(block, 'content:encoded') || description;

    const catRe = /<category[^>]*>([\s\S]*?)<\/category>/gi;
    const categories = [];
    let cat;
    while ((cat = catRe.exec(block)) !== null) {
      categories.push(extractCDATA(cat[1]).trim());
    }

    const date = pubDate
      ? new Date(pubDate).toISOString().slice(0, 10).replace(/-/g, '.')
      : '';

    if (title && link) {
      items.push({
        title,
        link,
        date,
        excerpt: stripHtml(description).slice(0, 220),
        read: estimateRead(content),
        tag: categories[0] || '',
      });
    }
  }

  return items;
}
