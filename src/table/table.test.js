import renderTable from './table.js';

// Créez un jeu de données de test pour simuler les données du tableau
const testData = [
  {
    _id: '5f0c554442ea1b1fc6cc5b75',
    index: 0,
    balance: '$2,130.88',
    age: 38,
    eyeColor: 'blue',
    name: {
      first: 'Henson',
      last: 'Jacobson',
    },
    company: 'DELPHIDE',
    email: 'henson.jacobson@delphide.org',
  },
  {
    _id: '5f0c55441edd2190adecd281',
    index: 1,
    balance: '$1,087.51',
    age: 37,
    eyeColor: 'brown',
    name: {
      first: 'Naomi',
      last: 'Puckett',
    },
    company: 'ROUGHIES',
    email: 'naomi.puckett@roughies.name',
  },
];

// Créez un élément de tableau vide pour les tests
beforeEach(() => {
  document.body.innerHTML = '<table id="dataTable"><tbody></tbody></table>';
});

describe('renderTable', () => {

  // Test pour vérifier si le tableau est correctement rendu avec les données fournies.
  it('should render the table with the provided data', () => {
    
    // Appelez la fonction renderTable avec les données de test
    renderTable(testData);

    // Vérifiez que le tableau a été rendu correctement
    const tableRows = document.querySelectorAll('#dataTable tbody tr');
    expect(tableRows.length).toBe(testData.length);

    // Vérifiez le contenu des cellules pour la première ligne
    const firstRowCells = tableRows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent).toBe('Jacobson');
    expect(firstRowCells[1].textContent).toBe('Henson');
    expect(firstRowCells[2].textContent).toBe('38');
    expect(firstRowCells[3].textContent).toBe('blue');
    expect(firstRowCells[4].textContent).toBe('henson.jacobson@delphide.org');
    expect(firstRowCells[5].textContent).toBe('DELPHIDE');
    expect(firstRowCells[6].textContent).toBe('$2,130.88');
  });

  // Test pour vérifier que les lignes existantes sont effacées avant d'afficher de nouvelles données.
  it('should clear existing rows before rendering new data', () => {
    // Ajoutez une ligne au tableau avant d'appeler renderTable
    const tableBody = document.querySelector('#dataTable tbody');
    const newRow = document.createElement('tr');
    const cell = document.createElement('td');
    cell.textContent = 'Existing Data';
    newRow.appendChild(cell);
    tableBody.appendChild(newRow);

    // Appelez la fonction renderTable avec les données de test
    renderTable(testData);

    // Vérifiez que la ligne existante a été supprimée
    const tableRows = document.querySelectorAll('#dataTable tbody tr');
    expect(tableRows.length).toBe(testData.length);
  });
});
