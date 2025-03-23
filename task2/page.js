document.getElementById('displayButton').addEventListener('click', function() {
    var inputText = document.getElementById('inputField').value;
    document.getElementById('displayText').innerText = inputText;
});