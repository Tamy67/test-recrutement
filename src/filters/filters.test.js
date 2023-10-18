import urlUtils from '../url/url.js';
import fetchData from '../service/fetchData.js';
import filters from './filters.js';

const { applyFilter, updatePageFilters } = filters;

// Simuler les modules
jest.mock('../url/url.js');
jest.mock('../service/fetchData.js');

// Simuler la fonction "replaceState" de l'objet "history"
global.history.replaceState = jest.fn();

// Bloc pour regrouper les tests relatifs au module "filters"
describe('filters', () => {
    // Initialiser les mocks avant chaque test
    beforeEach(() => {
        urlUtils.buildUrl.mockClear();
        fetchData.mockClear();
        global.history.replaceState.mockClear();
    });

    // Bloc pour regrouper les tests relatifs à la fonction "applyFilter"
    describe('applyFilters', () => {
        // Test pour vérifier que "applyFilter" applique correctement les filtres
        test('should correctly apply the filters', () => {
            // Données simulées
            const mockEyeColor = 'blue';
            const mockAge = '20-25';

            // Simuler des éléments DOM
            const eyeColorFilterElement = { value: mockEyeColor };
            const ageFilterElement = { value: mockAge };

            // Simuler la méthode "getElementById" du document
            document.getElementById = jest.fn((id) => {
                if (id === 'eyeColorFilter') return eyeColorFilterElement;
                if (id === 'ageFilter') return ageFilterElement;
            });

            // Simuler le retour de la fonction buildUrl
            urlUtils.buildUrl.mockReturnValue(
                `eyeColor=${mockEyeColor}&age=${mockAge}`
            );

            // Appeler la fonction à tester
            applyFilter();

            // Vérifier si les fonctions ont été appelées avec les bons arguments
            expect(urlUtils.buildUrl).toHaveBeenCalledWith(
                mockEyeColor,
                mockAge
            );
            expect(history.replaceState).toHaveBeenCalledWith(
                null,
                null,
                `?eyeColor=${mockEyeColor}&age=${mockAge}`
            );
            expect(fetchData).toHaveBeenCalled();
        });

        // Test pour vérifier que "applyFilter" gère correctement les valeurs de filtres vides ou null
        test('should handle empty or null filter values', () => {
            // Simuler des éléments du DOM avec des valeurs vides ou null
            const eyeColorFilterElement = { value: '' };
            const ageFilterElement = { value: null };

            // Simuler la méthode "getElementById" du document
            document.getElementById = jest.fn((id) => {
                if (id === 'eyeColorFilter') return eyeColorFilterElement;
                if (id === 'ageFilter') return ageFilterElement;
            });

            // Simuler le retour de la fonction "buildUrl" avec une chaîne vide
            urlUtils.buildUrl.mockReturnValue('');

            // Appeler la fonction à tester
            applyFilter();

            // Vérifier que les fonctions appelées ont reçu les bons arguments
            expect(urlUtils.buildUrl).toHaveBeenCalledWith('', null);
            expect(history.replaceState).toHaveBeenCalledWith(null, null, '?');
            expect(fetchData).toHaveBeenCalled();
        });

        // Test pour vérifier que "applyFilter" gère correctement les cas d'erreur
        test('should handle error cases', () => {
            // Simuler la méthode "getElementById" du document pour retourner null
            document.getElementById = jest.fn().mockReturnValue(null);

            // Simuler un lancer d'erreur par "buildUrl"
            urlUtils.buildUrl.mockImplementation(() => {
                throw new Error('An error occurred');
            });

            // Appeler la fonction à tester en entourant d'un bloc try-catch pour capturer l'erreur
            try {
                applyFilter();
            } catch (error) {
                // Supprimer l'erreur pour ce cas de test
            }

            // Vérifier que les fonctions n'ont pas été appelées
            expect(urlUtils.buildUrl).not.toHaveBeenCalled();
            expect(history.replaceState).not.toHaveBeenCalled();
            expect(fetchData).not.toHaveBeenCalled();
        });
    });

    // Tests pour la fonction "updatePageFilters"
    describe('updatePageFilters', () => {
        // Test pour vérifier la mise à jour correcte des filtres lorsque "eyeColor" et "age" sont fournis
        test('should correctly update the filters when eyeColor and age are provided', () => {
            const mockEyeColor = 'blue';
            const mockAge = '20-25';

            const eyeColorFilterElement = { value: '' };
            const ageFilterElement = { value: '' };

            document.getElementById = jest.fn((id) => {
                if (id === 'eyeColorFilter') return eyeColorFilterElement;
                if (id === 'ageFilter') return ageFilterElement;
            });

            updatePageFilters({ eyeColor: mockEyeColor, age: mockAge });

            // Vérifier si les valeurs des éléments DOM ont été mises à jour
            expect(eyeColorFilterElement.value).toBe(mockEyeColor);
            expect(ageFilterElement.value).toBe(mockAge);
        });

        // Test pour vérifier que les filtres ne sont pas mis à jour lorsque "eyeColor" ou "age" sont nuls ou vides
        test('should not update the filters when eyeColor or age are null or empty', () => {
            // Éléments DOM initiaux
            const eyeColorFilterElement = { value: 'initialEyeColor' };
            const ageFilterElement = { value: 'initialAge' };

            document.getElementById = jest.fn((id) => {
                if (id === 'eyeColorFilter') return eyeColorFilterElement;
                if (id === 'ageFilter') return ageFilterElement;
            });

            // Appeler la fonction à tester avec des valeurs nulles ou vides
            updatePageFilters({ eyeColor: null, age: '' });

            // Vérifier que les valeurs initiales des éléments DOM restent inchangées
            expect(eyeColorFilterElement.value).toBe('initialEyeColor');
            expect(ageFilterElement.value).toBe('initialAge');
        });

        // Test pour vérifier le bon fonctionnement lorsque "document.getElementById" retourne null
        test('should handle cases where document.getElementById returns null', () => {
            // Simuler `document.getElementById` pour retourner null
            document.getElementById = jest.fn().mockReturnValue(null);

            // Vérifier que la fonction à tester ne lance pas d'erreur
            expect(() => {
                updatePageFilters({ eyeColor: 'blue', age: '20-25' });
            }).not.toThrow();
        });
    });
});
