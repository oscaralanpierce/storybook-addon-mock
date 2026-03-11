import { readFileSync } from 'node:fs';
import { defineConfig, type Options } from 'tsup';

const NODE_TARGET = 'node20.19'; // Minimum Node version supported by Storybook 10

export default defineConfig(async () => {
    const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

    const {
        bundler: { managerEntries = [], previewEntries = [], nodeEntries = [] },
    } = packageJson;

    const commonConfig: Options = {
        /*
         keep this line commented until https://github.com/egoist/tsup/issues/1270 is resolved
         clean: options.watch ? false : true,
        */
        clean: false,
        format: ['esm'],
        treeshake: true,
        splitting: true,
        external: ['react', 'react-dom', '@storybook/icons'],
    };

    const configs: Options[] = [];

    if (managerEntries.length) {
        configs.push({
            ...commonConfig,
            entry: managerEntries,
            platform: 'browser',
            target: 'esnext',
        });
    }

    if (previewEntries.length) {
        configs.push({
            ...commonConfig,
            entry: previewEntries,
            platform: 'browser',
            target: 'esnext',
            dts: true,
        });
    }

    if (nodeEntries.length) {
        configs.push({
            ...commonConfig,
            entry: nodeEntries,
            platform: 'node',
            target: NODE_TARGET,
        });
    }

    return configs;
});
