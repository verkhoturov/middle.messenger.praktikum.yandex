import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import Handlebars from 'handlebars';

function handlebarsPrecompile() {
    return {
        name: 'vite-plugin-handlebars-precompile',
        transform(src, id) {
            const fileRegexp = /\.hbs$|\.handlebars$/;

            if (!fileRegexp.test(id)) {
                return
            }

            const code = `
            import Handlebars from 'handlebars';
            export default Handlebars.template(${Handlebars.precompile(src)});
            `;

            return {
                code
            }
        },
    }
}

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    
    return defineConfig({
        root: resolve(__dirname, 'src'),
        build: {
            outDir: resolve(__dirname, 'dist')
        },
        plugins: [handlebarsPrecompile()],
        resolve: {
            alias: {
                handlebars: "handlebars/runtime"
            }
        },
    })
}


