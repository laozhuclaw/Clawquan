/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // 商务主色: 墨绿
        brand: {
          50:  '#F0FAF5',
          100: '#DCF3E5',
          200: '#B6E3C7',
          300: '#86CEA3',
          400: '#4FB17A',
          500: '#2E9159',
          600: '#1F7345',
          700: '#175938',
          800: '#10452C',
          900: '#0A2E1E',
        },
        // 点缀: 暖金 (奖章/认证/重点提示)
        gold: {
          50:  '#FDF8EE',
          100: '#FAEFD4',
          200: '#F3DBA0',
          300: '#E8BF6C',
          400: '#D4A24A',
          500: '#B88432',
          600: '#956726',
        },
        // 中性: 偏暖的 slate
        ink: {
          50:  '#F7F8F8',
          100: '#EDEEF0',
          200: '#D8DCDF',
          300: '#B6BDC2',
          400: '#8F98A1',
          500: '#6B7680',
          600: '#525B64',
          700: '#38434C',
          800: '#232B33',
          900: '#1A2128',
        },
      },
      boxShadow: {
        card:       '0 1px 2px rgba(16,24,32,0.04), 0 2px 8px rgba(16,24,32,0.05)',
        'card-hover':'0 2px 4px rgba(16,24,32,0.06), 0 8px 24px rgba(16,24,32,0.08)',
        chip:       '0 1px 2px rgba(16,24,32,0.05)',
      },
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', '"PingFang SC"', '"Helvetica Neue"',
          '"Microsoft YaHei"', 'Arial', 'sans-serif',
        ],
        serif: ['"Noto Serif SC"', '"Songti SC"', 'serif'],
      },
      borderRadius: {
        xl:  '12px',
        '2xl':'16px',
        '3xl':'20px',
      },
    },
  },
  plugins: [],
}
