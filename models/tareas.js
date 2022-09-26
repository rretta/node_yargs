import Tarea from "./tarea.js";
import "colors"

export default class Tareas {

    _listado= {};

    get listadoArr() {

        const listado = [];

        Object.keys(this._listado).forEach(key => {
           const tarea = this._listado[key]
           listado.push(tarea)
        })

        return listado

    }

    constructor () {
        this._listado = {};
        
    }

    borrarTarea (id = ""){
        if (this._listado[id]){
            delete this._listado[id];
        }

    }

    cargarTareasFromArray(tareas = [] ) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
            
        })
        
    }

    crearTarea(desc=""){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){
        console.log()
        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index+1}`.green
            console.log(`${idx}.  ${tarea.desc} :: ${tarea.completadoEn ===null? "Pendiente".red: "Completado".green} `) })

    }


    listarCompletadas (){
     
        console.log()
        this.listadoArr.forEach((tarea, index) => {


            if(tarea.completadoEn){
                let idx = `${index+1}`.green
                console.log(`${idx}. ${tarea.desc} ${">>".green} fecha:${tarea.completadoEn}`)
            }
        })


    }

    listarPendientes (){
       
        console.log()

        this.listadoArr.forEach((tarea, index) => {
            if(tarea.completadoEn===null){
                const idx = `${index+1}`.green
                console.log(`${idx}. ${">>".red} ${tarea.desc}`)
            }
        })


    }

    toggleCompletadas (ids = []){
        
        
        ids.forEach ( id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })


        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
               

            }
        })


    }


}