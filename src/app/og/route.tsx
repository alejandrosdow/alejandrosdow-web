import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div style={{
        width: '1200px',
        height: '630px',
        background: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 96px',
        fontFamily: 'sans-serif',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span style={{ fontSize: '24px', color: '#6b7280' }}>CMO · Builder · Internet Surfer</span>
          <span style={{ fontSize: '96px', fontWeight: 900, color: '#000', lineHeight: 1 }}>Alejandro Marcos</span>
          <span style={{ fontSize: '32px', color: '#6b7280' }}>Construyo marcas y comunidades en internet.</span>
        </div>
        <span style={{ fontSize: '24px', color: '#00e05a' }}>alejandrosdow.com</span>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
