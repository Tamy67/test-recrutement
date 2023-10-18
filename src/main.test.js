import urlUtils from './url/url.js';
import filters from './filters/filters.js';
import fetchData from './service/fetchData.js';

import { initialize } from './main.js';

const { applyFilter, updatePageFilters } = filters;
const { getURLParams } = urlUtils;

// Mise en place de mock pour les fonctions afin d'éviter les appels réels lors des tests
jest.mock('./url/url.js');
jest.mock('./filters/filters.js');
jest.mock('./service/fetchData.js');

let applyFilterButton; // Variable pour stocker l'élément bouton

beforeEach(() => {
    // Réinitialisation de tous les mocks pour avoir un environnement propre pour chaque test
    jest.clearAllMocks();

    // Simuler une partie du DOM pour les tests
    document.body.innerHTML = `
      <button id="applyFilter"></button>
    `;

    applyFilterButton = document.getElementById('applyFilter');

    initialize();
});

describe('main', () => {
    // Test pour vérifier l'ajout des écouteurs d'événements et les appels de méthodes au chargement de la page
    it('should add event listeners and call methods on window load', async () => {
        // Mock pour simuler le comportement de la fonction fetchData
        const fetchMock = jest.fn();
        fetchData.mockImplementation(fetchMock);

        await initialize(); // Appel manuel de la fonction d'initialisation

        // Vérifications pour s'assurer que les fonctions ont bien été appelées
        expect(getURLParams).toHaveBeenCalled();
        expect(updatePageFilters).toHaveBeenCalled();
        expect(fetchMock).toHaveBeenCalled();
    });

    // Test pour vérifier que l'écouteur d'événements du bouton "applyFilter" est ajouté
    it('should add an event listener for the "applyFilter" button', () => {
        // Mock pour simuler le comportement de la fonction applyFilter
        const applyFilterMock = jest.fn();
        applyFilter.mockImplementation(applyFilterMock);

        applyFilterButton.click(); // Simuler un clic sur le bouton

        // Vérification pour s'assurer que la fonction applyFilterMock a été appelée
        expect(applyFilterMock).toHaveBeenCalled();
    });
});
