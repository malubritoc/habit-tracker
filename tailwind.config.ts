import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'dark-orange': '#f23e02',
			'medium-orange': '#eb613b',
			'light-orange': '#f98f6f',
			'dark-turquoise': '#2c6b74',
			'medium-turquoise': '#00988d',
			'light-turquoise': '#c1d9cd',
			'dark-blue': '#013750',
			'baby-yellow': '#fef5c8',
			'beige': '#f7eadc',
			'default-gray': '#64748B',
			'baby-gray': '#f1f5f9',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
