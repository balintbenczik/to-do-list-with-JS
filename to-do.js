        const form = document.getElementById('todo-form');
        const input = document.getElementById('todo-input');
        const list = document.getElementById('todo-list');

        // betöltés localStorage-ból
        let todos = JSON.parse(localStorage.getItem('todos')) || [];

        function render() {
            list.innerHTML = '';
            todos.forEach((todo, index) => {
                const li = document.createElement('li');
                li.textContent = todo.text;
                if (todo.done) li.classList.add('done');

                // Kész gomb
                const doneBtn = document.createElement('button');
                doneBtn.textContent = '✓';
                doneBtn.onclick = () => {
                    todos[index].done = !todos[index].done;
                    saveAndRender();
                };

                // Törlés gomb
                const delBtn = document.createElement('button');
                delBtn.textContent = 'X';
                delBtn.onclick = () => {
                    todos.splice(index, 1);
                    saveAndRender();
                };

                li.appendChild(doneBtn);
                li.appendChild(delBtn);
                list.appendChild(li);
            });
        }

        function saveAndRender() {
            localStorage.setItem('todos', JSON.stringify(todos));
            render();
        }

        form.addEventListener('submit', e => {
            e.preventDefault();
            todos.push({ text: input.value, done: false });
            input.value = '';
            saveAndRender();
        });

        render();