export interface Env {
  CHANGELOG_KV: KVNamespace;
  FLEET_METADATA: KVNamespace;
}

interface VesselChange {
  id: string;
  vessel: string;
  type: 'deploy' | 'config' | 'scale' | 'rollback';
  timestamp: number;
  version: string;
  description: string;
  author?: string;
  repo?: string;
  commit?: string;
}

interface Release {
  id: string;
  version: string;
  date: number;
  summary: string;
  changes: VesselChange[];
}

const HTML_HEADER = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fleet Changelog</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --dark: #0a0a0f;
      --accent: #65a30d;
      --light: #f8fafc;
      --gray: #64748b;
      --border: #1e293b;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      background: var(--dark);
      color: var(--light);
      line-height: 1.6;
      min-height: 100vh;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    header {
      border-bottom: 1px solid var(--border);
      padding: 2rem 0;
      margin-bottom: 3rem;
    }
    
    .hero {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .hero h1 {
      font-size: 3rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--accent) 0%, #84cc16 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
    }
    
    .hero p {
      font-size: 1.25rem;
      color: var(--gray);
      max-width: 600px;
      margin: 0 auto;
    }
    
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    
    .feature-card {
      background: rgba(30, 41, 59, 0.3);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.5rem;
      transition: transform 0.2s;
    }
    
    .feature-card:hover {
      transform: translateY(-2px);
      border-color: var(--accent);
    }
    
    .feature-card h3 {
      color: var(--accent);
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
    
    .endpoints {
      background: rgba(30, 41, 59, 0.3);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 2rem;
      margin-bottom: 3rem;
    }
    
    .endpoint {
      display: flex;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid var(--border);
    }
    
    .endpoint:last-child {
      border-bottom: none;
    }
    
    .method {
      background: var(--accent);
      color: var(--dark);
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-weight: 600;
      font-size: 0.875rem;
      margin-right: 1rem;
    }
    
    .path {
      font-family: 'Monaco', 'Courier New', monospace;
      color: var(--light);
    }
    
    footer {
      border-top: 1px solid var(--border);
      padding: 2rem 0;
      text-align: center;
      color: var(--gray);
      font-size: 0.875rem;
    }
    
    .fleet-footer {
      color: var(--accent);
      font-weight: 600;
    }
    
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2rem;
      }
      
      .features {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="hero">
        <h1>Fleet Changelog</h1>
        <p>Every change, everywhere, tracked. Automated changelog for the entire fleet.</p>
      </div>
    </header>`;

const HTML_FOOTER = `
    <footer>
      <p>Powered by <span class="fleet-footer">Fleet Changelog</span> — Git-backed mutation tracking across all vessels</p>
    </footer>
  </div>
</body>
</html>`;
const sh = {"Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-ancestors 'none'","X-Frame-Options":"DENY"};
export default { async fetch(r: Request) { const u = new URL(r.url); if (u.pathname==='/health') return new Response(JSON.stringify({status:'ok'}),{headers:{'Content-Type':'application/json',...sh}}); return new Response(html,{headers:{'Content-Type':'text/html;charset=UTF-8',...sh}}); }};