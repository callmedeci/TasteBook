import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: 'index.html',
                main: 'src/js/main.js',
                aboutUs: 'src/pages/aboutUs.html',
                articles: 'src/pages/articles.html',
                drinksRecipes: 'src/pages/drinksRecipes.html',
                foodRecipes: 'src/pages/foodRecipes.html',
                helpCenter: 'src/pages/helpCenter.html',
                termsOfService: 'src/pages/termsOfService.html',
            },
        },
    },
});
