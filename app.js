const fileInput = document.getElementById('fileInput');
const modifyButton = document.getElementById('modify');
const downloadButton = document.getElementById('download');
let modifiedFileContent;

fileInput.addEventListener('change', function() {
    downloadButton.disabled = true;
});

modifyButton.addEventListener('click', function() {
    const searchText = document.getElementById('searchText').value;
    const replaceText = document.getElementById('replaceText').value;

    if (!fileInput.files.length || !searchText || !replaceText) {
        alert('ファイルを選択し、検索テキストと置換テキストを入力してください');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        modifiedFileContent = content.replace(new RegExp(searchText, 'g'), replaceText);
        downloadButton.disabled = false;
    };

    reader.readAsText(file);
});

downloadButton.addEventListener('click', function() {
    if (!modifiedFileContent) {
        alert('まずファイルを書き換えてください');
        return;
    }

    const blob = new Blob([modifiedFileContent],
