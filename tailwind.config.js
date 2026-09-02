/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', ':root[data-theme="dark"]'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ground: 'var(--ground)',
        panel: 'var(--panel)',
        'panel-sunk': 'var(--panel-sunk)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        rule: 'var(--rule)',
        'rule-2': 'var(--rule-2)',
        signal: 'var(--signal)',
        'signal-bg': 'var(--signal-bg)',
        ok: 'var(--ok)',
        'ok-bg': 'var(--ok-bg)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Instrument Sans', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Source Serif 4', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightish: '-0.02em',
        snug2: '-0.03em',
        gauge: '-0.035em',
        label: '0.12em',
        'label-wide': '0.16em',
      },
      fontSize: {
        label: ['0.66rem', { lineHeight: '1rem', letterSpacing: '0.12em' }],
      },
      borderColor: {
        DEFAULT: 'var(--rule)',
      },
      transitionTimingFunction: {
        instrument: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [],
}
