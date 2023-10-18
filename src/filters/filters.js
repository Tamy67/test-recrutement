import urlUtils from '../url/url.js';
import fetchData from '../service/fetchData.js';

// Fonction pour appliquer les filtres
const applyFilter = () => {
  const eyeColorFilter = document.getElementById('eyeColorFilter').value;
  const ageFilter = document.getElementById('ageFilter').value;

  const newUrlParams = urlUtils.buildUrl(eyeColorFilter, ageFilter);

  history.replaceState(null, null, '?' + newUrlParams.toString());
  fetchData();
}

// Fonction pour mettre à jour les filtres sur la page à partir de l'URL
const updatePageFilters = ({ eyeColor, age }) => {
  const eyeColorElement = document.getElementById('eyeColorFilter');
  const ageElement = document.getElementById('ageFilter');

  if (eyeColor && eyeColorElement) {
    eyeColorElement.value = eyeColor;
  }
  if (age && ageElement) {
    ageElement.value = age;
  }
}

const filters = {
  applyFilter,
  updatePageFilters,
};

export default filters;
