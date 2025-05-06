import { useState } from "react";



function GerenciadorTarefas() {
    const [tarefas, setTarefas] = useState([])
    const [tarefa, setTarefa] = useState('')
    const [opcao, setOpcao] = useState('')

    return (
        <div>
            <form action="">
                <input type="text" placeholder="Digite sua tarefa" />
                <select value={opcao} onChange={(e) => setOpcao(e.target.value)}>
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                </select>
                <button></button>
            </form>

            <p>{opcao}</p>

        </div>


    );



}
export default GerenciadorTarefas;