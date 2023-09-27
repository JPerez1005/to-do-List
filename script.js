const d=document;

let fecha=d.getElementById('fecha');
let lista=d.getElementById('lista');//el ul
let input=d.getElementById('input');
let button=d.getElementById('enter');
let check='fa-check-circle';
let uncheck='fa-circle';
let lineThrough='line-trough';
let id
let List


// Creación de fecha
let Fecha=new Date();
fecha.innerHTML=Fecha.toLocaleDateString('es-CO', {weeeday:'long',month:'short',day:'numeric'});

// Función Agregar Tarea
function agregarTarea(tarea,id,realizado,eliminado)
{
    if (eliminado) {
        return
    }

    let Realizado=realizado?check:uncheck
    let Line = realizado?lineThrough:''

    let elemento=`
    <li id="elemento">
        <i class="far ${Realizado}" data="realizado" id="${id}"></i>
        <p class="text ${Line}">${tarea}</p>
        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
    </li>
    `;
    lista.insertAdjacentHTML('beforeend',elemento);
}

// Función para Realizar Tarea
function tareaRealizada(element)
{
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    // interaccion entre hermanos
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    List[element.id].realizado=List[element.id].realizado?false:true;//
}

// Funcion para eliminar Tarea
function tareaEliminada(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);
    List[element.id].eliminado=true;
}

button.addEventListener('click',()=>{
    let tarea=input.value;
    if (tarea) {//si tarea tiene algun valor
        agregarTarea(tarea,id,false,false);
        List.push({
            nombre:tarea,
            id:id,
            realizado:false,
            eliminado:false
        });
    }
    localStorage.setItem('TODO',JSON.stringify(List));
    input.value='';
    id++;/*ahora el id aumenta consecutivamente de uno en uno*/

});

d.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        let tarea=input.value;
        if (tarea) {//si tarea tiene algun valor
            agregarTarea(tarea,id,false,false);
            List.push({
                nombre:tarea,
                id:id,
                realizado:false,
                eliminado:false
            });
        }
        localStorage.setItem('TODO',JSON.stringify(List));
        input.value='';
        id++;/*ahora el id aumenta consecutivamente de uno en uno*/
    }
});

// si hacemos click en lista entonces...
lista.addEventListener('click', function(event){
    let element=event.target//obtenemos el elemento
    let elementData=element.attributes.data.value//obtenemos el valor del elemento este caso el valor del data
    // console.log(element);
    // console.log(elementData);
    if(elementData==='realizado'){
        tareaRealizada(element);
    }
    else if(elementData==='eliminado'){
        tareaEliminada(element);
    }
    // Convertimos info a json
    localStorage.setItem('TODO',JSON.stringify(List));
})


// Obtener datos del local 

let data=localStorage.getItem('TODO');
if(data){
    List=JSON.parse(data)
    id=List.length
    cargarLista(List)
}else{
    List=[]
    id=0
}

function cargarLista(DATA) {
    DATA.forEach(function(i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    });
}