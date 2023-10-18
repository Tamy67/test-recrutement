// Fonction pour rendre le tableau HTML
const renderTable = (data) => {
    const tableBody = document
        .getElementById('dataTable')
      .getElementsByTagName('tbody')[0];
  
    tableBody.innerHTML = ''; 

    data.forEach((item) => {
        const newRow = tableBody.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6);

        cell1.innerHTML = item.name.last;
        cell2.innerHTML = item.name.first;
        cell3.innerHTML = item.age;
        cell4.innerHTML = item.eyeColor;
        cell5.innerHTML = item.email;
        cell6.innerHTML = item.company;
        cell7.innerHTML = item.balance;
    });
};

export default renderTable;
