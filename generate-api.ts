import * as path from 'path';

import { generateApi } from 'swagger-typescript-api';

await generateApi({
    fileName: 'api.ts',
    output: path.resolve(import.meta.dirname, './src/shared/api'),
    url: 'http://localhost:3000/api/docs-json',
    httpClientType: 'axios',
});
