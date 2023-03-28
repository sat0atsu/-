const fileInput = document.getElementById('fileInput');
const modifyButton = document.getElementById('modify');
const downloadButton = document.getElementById('download');
const categoriesTextarea = document.getElementById('categories');
const itemsTextarea = document.getElementById('items');
let modifiedFileContent;

fileInput.addEventListener('change', function () {
  downloadButton.disabled = true;

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const content = e.target.result;
    const categoriesMatch = content.match(/var categories = \["(.*?)"\];/);
    const itemsMatch = content.match(/"bg": \["(.*?)"\]/);

    if (categoriesMatch && categoriesMatch[1]) {
      categoriesTextarea.value = categoriesMatch[1];
      categoriesTextarea.disabled = false;
    }

    if (itemsMatch && itemsMatch[1]) {
      itemsTextarea.value = itemsMatch[1];
      itemsTextarea.disabled = false;
    }

    modifiedFileContent = content;
  };

  reader.readAsText(file);
});

modifyButton.addEventListener('click', function () {
  if (!fileInput.files.length) {
    alert('ファイルを選択してください');
    return;
  }

  modifiedFileContent = modifiedFileContent.replace(
    /var categories = \["(.*?)"\];/,
    `var categories = ["${categoriesTextarea.value}"];`
  );

  modifiedFileContent = modifiedFileContent.replace(
    /"bg": \["(.*?)"\]/,
    `"bg": ["${itemsTextarea.value}"]`
  );

  downloadButton.disabled = false;
});

downloadButton.addEventListener('click', function () {
  if (!modifiedFileContent) {
    alert('まずファイルを書き換えてください');
    return;
  }

  const blob = new Blob([modifiedFileContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileInput.files[0].name;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
});
