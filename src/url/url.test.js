import urlUtils from './url.js';

const { getURLParams, buildUrl } = urlUtils;

describe('urlUtils', () => {
    describe('getURLParams', () => {
        // Test pour vérifier si getURLParams renvoie des valeurs vides en l'absence de paramètres d'URL
        it('should return empty values when there are no query parameters', () => {
            // Simuler un objet 'window.location.search' sans paramètres
            const originalLocation = Object.getOwnPropertyDescriptor(
                window,
                'location'
            );
            Object.defineProperty(window, 'location', {
                value: { search: '' },
                writable: true,
            });

            const params = getURLParams();

            // Vérifiez que les paramètres retournés sont vides
            expect(params.eyeColor).toBe('');
            expect(params.age).toBe('');

            // Restaurer l'objet 'window.location' à son état d'origine
            Object.defineProperty(window, 'location', originalLocation);
        });

        // Test pour vérifier si getURLParams renvoie les bons paramètres quand ils existent dans l'URL
        it('should return query parameters when they exist in the URL', () => {
            // Simuler un objet 'window.location.search' avec des paramètres
            const originalLocation = Object.getOwnPropertyDescriptor(
                window,
                'location'
            );
            Object.defineProperty(window, 'location', {
                value: { search: '?eyeColor=blue&age=20-25' },
                writable: true,
            });

            const params = getURLParams();

            // Vérifier que les valeurs renvoyées correspondent aux paramètres de l'URL

            expect(params.eyeColor).toBe('blue');
            expect(params.age).toBe('20-25');

            // Restaurez l'objet 'window.location' d'origine
            Object.defineProperty(window, 'location', originalLocation);
        });
    });

    describe('buildUrl', () => {
        // Test pour vérifier que buildUrl construit correctement une URL avec des paramètres spécifiés
        it('should build URL with specified parameters', () => {
            const eyeColor = 'brown';
            const age = '26-30';

            const urlParams = buildUrl(eyeColor, age);

            // Vérifier que l'URL est correctement construite
            expect(urlParams.toString()).toBe('eyeColor=brown&age=26-30');
        });

        // Test pour vérifier que buildUrl construit une URL sans paramètres lorsque ceux-ci ne sont pas spécifiés
        it('should build URL without parameters if not specified', () => {
            const urlParams = buildUrl();

            // Vérifier que l'URL est construite sans paramètres
            expect(urlParams.toString()).toBe('');
        });
    });
});
