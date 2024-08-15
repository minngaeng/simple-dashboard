import resolveConfig from 'tailwindcss/resolveConfig';
import config from '../../tailwind.config';
export const tailwindTheme = resolveConfig(config).theme;
