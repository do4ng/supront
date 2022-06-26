import type { BuildOptions } from 'esbuild';

export function javascriptPlugin(config?: { base?: string; esbuild?: BuildOptions }): { name: string; transform(code: string, node: any) };
