document.getElementById('myButton').addEventListener('click', function() {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerHTML = `
                <img src="${data.image}" alt="Voldemort" />
            `;
        })
        .catch(error => {
            document.getElementById('result').innerText = "Error fetching image!";
            console.error(error);
        });
});
