import urlUtils from './url/url.js';
import filters from './filters/filters.js';
import fetchData from './service/fetchData.js';
import './table/table.js';

const { applyFilter, updatePageFilters } = filters;
const { getURLParams } = urlUtils;

// La fonction initialize effectue l'initialisation de l'application lors du chargement de la page
export const initialize = async () => {
  const urlParams = getURLParams(); // Obtenez les paramètres de l'URL
   
  updatePageFilters(urlParams);  // Mettez à jour les filtres sur la page en fonction des paramètres de l'URL
  await fetchData(); // Chargez les données et mettez à jour l'interface

    // Ajoutez un gestionnaire d'événements pour le bouton "Appliquer filtres"
  document.getElementById('applyFilter').addEventListener('click', applyFilter);
};

// Ajoutez un gestionnaire d'événements qui appelle l'initialisation lors du chargement de la page
window.addEventListener('load', async () => {
  await initialize();
});


