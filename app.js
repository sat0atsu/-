document.getElementById('convert').addEventListener('click', function() {
    const input = document.getElementById('input').value;
    const words = input.split('　');

    const output = words.map(word => `"${word.trim()}"`).join(', ');

    document.getElementById('output').value = output;
});
