import 'colors'
import inquirer from 'inquirer'


const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 3,
                name: `${'3.'.green} Salir`
            },
        ]

    }
]



export const inquirerMenu = async() => {
    console.clear()
    
    console.log('========================='.yellow);
    console.log('  Seleccione una opción'.green);
    console.log('=========================\n'.yellow);

    const { option } = await inquirer.prompt(questions) 

    return option
}



const pausaQuestions = {
    type: 'input',
    name: 'enter',
    message: `Presione ${'Enter'.green} para continuar...`.bold
}

export const pausa = async () => {
    console.log('\n');
    await inquirer.prompt(pausaQuestions)
}


export const leerInput = async (message) => {
    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate( value ) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor'
            }
            return true
        }
    }

    const { desc } = await inquirer.prompt(question) 

    return desc

}

export const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        return {
            value: tarea.id,
            name: `${((i + 1) + '.') .green } ${tarea.desc}`
        }
    })

    const questions = {
        type: 'list',
        name: 'id',
        message: 'Seleccione la tarea a borrar',
        choices
    }

    const { id } = await inquirer.prompt(questions) 

    return id

}


export const confirm = async (message) => { 
    const questions = {
        type: 'confirm',
        name: 'ok',
        message
    }
    const { ok } = await inquirer.prompt(questions) 

    return ok
}

export const mostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        return {
            value: tarea.id,
            name: `${((i + 1) + '.').green} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false,
        }
    })

    const questions = {
        type: 'checkbox',
        name: 'id',
        message: 'Selecciones',
        choices
    }

    const { id } = await inquirer.prompt(questions) 

    return id

}