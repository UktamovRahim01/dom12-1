

fetch("https://jsonplaceholder.typicode.com/todos")
    .then(res => res.json())
    .then(res => reload(res))



let cont = document.querySelector(`.container`)
function reload(arr) {

    hardcod(arr)

}





function hardcod(arr) {
    // ********************************** cont_reg **
    
    
    let cont_reg = document.querySelector(`.cont_reg span`)
    let down_btn = document.querySelector(`.down`)
    let up_btn = document.querySelector(`.up`)
    
    let sp = +cont_reg.innerHTML
    
    let stranica = 1
    let arr_2 = []
    let todos = []
    stran(stranica)


    up_btn.onclick = () => {
        if (+cont_reg.innerHTML < (arr.length / 16)) {

            cont_reg.innerHTML = +cont_reg.innerHTML + 1
            stranica = +cont_reg.innerHTML
            stran(stranica)
            reload(todos)

        }
    }
    down_btn.onclick = () => {

        if (+cont_reg.innerHTML > 1) {

            cont_reg.innerHTML = +cont_reg.innerHTML - 1
            stranica = +cont_reg.innerHTML
            stran(stranica)
            reload(todos)
        }
    }

    // **********************************
    function stran(num) {
        arr_2 = []
        todos = []
        for (let i = (num * 16) - 16; i < (num * 16); i++) {
            arr_2.push(arr[i])
        }
        todos = [...arr_2]

    }
    // ************************************************************


    let form = document.querySelector('form')
    let container = document.querySelector('.container')
    let spm = document.querySelector(`.spm`)

    // ************************************************************




    reload(todos)


    form.onsubmit = (event) => {
        event.preventDefault()

        let todo = {
            id: Math.random(),
            isDone: false,
            time: new Date().getHours() + ":" + new Date().getMinutes()
        }

        let fm = new FormData(event.target)

        fm.forEach((value, key) => {
            todo[key] = value
        })
        if (spm.value == "") {
            return
        }
        todos.push(todo)
        reload(todos)

    }

    function reload(arr) {
        container.innerHTML = ""

        for (let item of arr) {
            let box = document.createElement('div')
            let p = document.createElement('p')
            let span = document.createElement('span')
            let button_delet = document.createElement('button')
            let button_change = document.createElement('button')

            let inp_change = document.querySelector(`.modal input`)

            let back = document.querySelector(`.back`)
            let accept = document.querySelector(`.accept`)
            let accepts = document.querySelector(`.accepts`)


            p.classList.add(`p`)
            button_delet.classList.add(`button_delet`)
            button_change.classList.add(`button_change`)
            box.classList.add('box')
            p.classList.add('text')
            span.classList.add('op')
            button_delet.innerHTML = "x"
            button_change.innerHTML = "изменить"
            span.innerHTML = item.id
            p.innerHTML = item.title

            container.append(box)
            box.append(p, span, button_change, button_delet)

            button_delet.onclick = () => {
                // let check = prompt(`Напиши "${item.title}" чтобы удалить задачу`)

                // if(check === item.title) {
                todos = todos.filter(el => el.id !== item.id)
                box.classList.add('delete-anim')
                setTimeout(() => {
                    box.remove()
                }, 500);
                // }
            }

            button_change.onclick = () => {
                let modal = document.querySelector(`.modal`)
                let modal_bg = document.querySelector(`.modal_bg`)

                // inp_change.placeholder = (item.title)
                inp_change.value = item.title

                modal.style.display = (`flex`)
                modal_bg.style.display = (`flex`)
                setTimeout(() => {
                    modal.style.opacity = "1";
                    modal_bg.style.opacity = "0.6";
                }, 500);
                back.onclick = () => {
                    setTimeout(() => {
                        modal.style.display = (`none`)
                        modal_bg.style.display = (`none`)
                    }, 1010);
                    modal.style.opacity = "0";
                    modal_bg.style.opacity = "0";

                }
                accept.onclick = () => {
                    setTimeout(() => {
                        modal.style.display = (`none`)
                        modal_bg.style.display = (`none`)
                    }, 1010);
                    modal.style.opacity = "0";
                    modal_bg.style.opacity = "0";

                    item.title = accepts.value
                    reload(todos)
                    accepts.value = ``
                }

            }
            if (item.isDone) {
                p.classList.toggle("red")

            }

            p.onclick = () => {
                p.classList.toggle("red")
                if (item.isDone) {
                    item.isDone = false
                }
                else {
                    item.isDone = true
                }
            }
        }
        spm.value = ``
    }

}