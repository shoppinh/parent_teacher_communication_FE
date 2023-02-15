export const copyToClipboardCommand = (value: string) => {
  createTextArea(value);
  selectText();
  copyToClipboard();
};

let textArea;

function createTextArea(text: string) {
  textArea = document.createElement('textArea');
  textArea.value = text;
  document.body.appendChild(textArea);
}

function selectText() {
  let range, selection;
  range = document.createRange();
  range.selectNodeContents(textArea);
  selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  textArea.setSelectionRange(0, 999999);
}

function copyToClipboard() {
  document.execCommand('copy');
  document.body.removeChild(textArea);
}
