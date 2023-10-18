import fetchData from './fetchData.js';
import urlUtils from '../url/url.js';
import renderTable from '../table/table.js';

// Mock de la fonction renderTable
jest.mock('../table/table.js', () => jest.fn());

// Mock de la fonction getURLParams
jest.mock('../url/url.js', () => ({
    getURLParams: jest.fn(),
}));

describe('fetchData', () => {
    // Avant chaque test, réinitialiser les mock de fetch
    beforeEach(() => {
        fetch.resetMocks();
    });

    // Test pour vérifier que la fonction récupère les données et met à jour la table
    it('should fetch data and render the table', async () => {
        // Données à simuler pour la réponse de fetch
        const mockData = [
            { eyeColor: 'blue', age: 20 },
            { eyeColor: 'brown', age: 30 },
        ];

        // Simuler une réponse réussie de fetch
        fetch.mockResponseOnce(JSON.stringify(mockData));

        // Simuler le retour de la fonction 'getURLParams'
        urlUtils.getURLParams.mockReturnValue({
            eyeColor: 'blue',
            age: '20-25',
        });

        // Initialiser le DOM pour le test
        document.body.innerHTML = `
    <select id="eyeColorFilter">
      <option value="">Couleur des yeux</option>
      <option value="blue">Blue</option>
      <option value="brown">Brown</option>
      <option value="green">Green</option>
    </select>
    <select id="ageFilter">
      <option value="">Âge</option>
      <option value="20-25">20-25</option>
      <option value="26-30">26-30</option>
      <option value="31-35">31-35</option>
      <option value="36-41">36-41</option>
    </select>
  `;

        await fetchData();

        // Vérifier que la table a été rendue avec les données filtrées
        expect(renderTable).toHaveBeenCalledWith([
            { eyeColor: 'blue', age: 20 },
        ]);
        // Vérifier que les champs de filtre sont correctement définis
        expect(document.getElementById('eyeColorFilter').value).toBe('blue');
        expect(document.getElementById('ageFilter').value).toBe('20-25');
    });

    // Test pour gérer les erreurs pendant l'appel de fetch
    it('should handle errors', async () => {
        // Simuler une erreur de fetch
        fetch.mockReject(new Error('Failed to fetch'));

        // Espionner la fonction console.error pour vérifier qu'elle est appelée
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation();

        await fetchData();

        // Vérifier que console.error a été appelé avec le bon message
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Une erreur est survenue :',
            expect.any(Error)
        );

        // Restaurer le comportement original de console.error
        consoleErrorSpy.mockRestore();
    });
});
