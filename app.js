import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";
import { confirmar, inquirerMenu, leerInput, listadoTareasBorrar, mostrarListadoChecklist, pause } from "./helpers/inquirer.js";
import Tareas from "./models/tareas.js";



const main = async () => {
  let opt = "";
  let tareas = new Tareas();

  const tareasDB = leerDB();


  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB)
  }
  


  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción:");

        tareas.crearTarea(desc);
        break;

      case "2":
        tareas.listadoCompleto()
        break;
        
        case "3":

        tareas.listarCompletadas()
        break;

        case "4":
          tareas.listarPendientes()
          break;

        case "5":
          const ids = await mostrarListadoChecklist(tareas.listadoArr)
          tareas.toggleCompletadas(ids);
          break

          case "6":
            const id = await listadoTareasBorrar(tareas.listadoArr)
            if(id !== "0"){
            const ok = await confirmar("¿seguro?");
            if (ok){
               tareas.borrarTarea(id)
            }}
            break
      }


    guardarDB(tareas.listadoArr)

    await pause();
  } while (opt !== "0");
};

main();
