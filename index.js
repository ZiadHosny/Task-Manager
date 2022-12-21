var searchInput = document.getElementById('searchInput');
var form = document.getElementById('form');
var tasksSection = document.getElementsByClassName('tasksSection');

for (let i = 0; i < tasksSection.length; i++) {
  tasksSection[i].addEventListener('dragover', dragOver);
  tasksSection[i].addEventListener('drop', drop);
}

form.onsubmit = () => {
  var inProgress = JSON.parse(localStorage.getItem('inProgress'));
  if (!inProgress) {
    inProgress = {};
  }
  inProgress[searchInput.value] = searchInput.value;

  localStorage.setItem('inProgress', JSON.stringify(inProgress));
};

window.onload = () => {
  for (let i = 0; i < tasksSection.length; i++) {
    var tasks = JSON.parse(
      localStorage.getItem(tasksSection[i].parentElement.className)
    );
    for (const key in tasks) {
      var li = document.createElement('li');
      li.draggable = true;
      li.innerHTML = tasks[key];
      li.id = key;
      li.addEventListener('dragstart', dragStart);
      tasksSection[i].appendChild(li);
    }
  }
};

function dragStart(e) {
  e.dataTransfer.setData('text', this.id);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  var droppedItem = e.dataTransfer.getData('text');

  var item = document.getElementById(droppedItem);
  var deletedParent = item.parentElement.parentElement.className;

  var allItemsInParent = JSON.parse(localStorage[deletedParent]);
  for (const key in allItemsInParent) {
    if (allItemsInParent[key] == droppedItem) {
      delete allItemsInParent[key];
    }
  }

  localStorage.setItem(deletedParent, JSON.stringify(allItemsInParent));

  this.appendChild(item);

  var parentName = this.parentElement.className;

  var parent = JSON.parse(localStorage.getItem(parentName));
  if (!parent) {
    parent = {};
  }
  parent[item.textContent] = item.textContent;

  localStorage.setItem(parentName, JSON.stringify(parent));
}
