import { useState } from "react";

function GerenciadorTarefas() {
    // Definição dos atributos utilizados ao longo do códico.
    const [tarefas, setTarefas] = useState([]);
    const [id, setId] = useState(1);
    const [titulo, setTitulo] = useState('');
    const [prioridade, setPrioridade] = useState('baixa');
    const [prioridadeFiltro, setPrioridadeFiltro] = useState('nao_filtrar');

    // Função que adiciona uma nova tarefa, criando um objeto com id, titulo, 
    // prioridade e estado inicial 'pendente' representado por 'false'
    const adicionarTarefa = (e) => {
        e.preventDefault();
        if (titulo.trim() === '') {
            alert('O titulo da tarefa não pode ser vazio!')
            return;
        }
        const novaTarefa = {
            id: id,
            titulo,
            prioridade,
            concluida: false,

        };
        setTarefas([...tarefas, novaTarefa]);
        setTitulo('');
        setPrioridade('baixa');
        setId(id + 1);
    };
    // Função que altera o estado de conclusão de uma tarefa, não foi necessário um usestate especifico para isso.
    function alterarConclusao(idTarefa) {
        setTarefas((tarefasAnteriores) =>
            tarefasAnteriores.map((t) =>
                t.id === idTarefa ? { ...t, concluida: !t.concluida } : t
            )
        );
    }

    // Função que conta as tarefas com base na prioridade passada como parametro ou todas as tarefas por padrão.
    function contarTarefas(prioridadeTarefa) {
        return tarefas.reduce((contador, tarefa) => {
            if (prioridadeTarefa === 'nao_filtrar' || tarefa.prioridade === prioridadeTarefa) {
                return contador + 1;
            }
            return contador;
        }, 0);
    }

    // Função que utiliza sort() para alterar a ordem com que as tarefas são exibidas.
    function ordenarPorPrioridade() {
        const prioridadeValor = {
            alta: 3,
            media: 2,
            baixa: 1
        };

        const tarefasOrdenadas = [...tarefas].sort((a, b) => {
            return prioridadeValor[b.prioridade] - prioridadeValor[a.prioridade];
        });

        setTarefas(tarefasOrdenadas);
    }
    // Variavel que guarda a primeira tarefa pendente com find()
    const primeiraPendente = tarefas.find((tarefa) => tarefa.concluida === false)

    // Função que conta as tarefas e altera o contador com base em seu estatdo, as dividindo entre pendentes e concluidas.
    function contarPendentesEConcluidas(prioridadeTarefa) {
        return tarefas.reduce(
            (contador, tarefa) => {
                if (prioridadeTarefa === 'nao_filtrar' || tarefa.prioridade === prioridadeTarefa) {
                    if (tarefa.concluida) {
                        contador.concluidas++;
                    } else {
                        contador.pendentes++;
                    }
                }
                return contador;
            },
            { concluidas: 0, pendentes: 0 }
        );
    }
    const total = contarTarefas(prioridadeFiltro);
    const { concluidas, pendentes } = contarPendentesEConcluidas(prioridadeFiltro);


    // VAriavel que guarda uma lista com base na original, filtrando pela prioridade passada.
    const tarefasFiltradas = prioridadeFiltro === 'nao_filtrar'
        ? tarefas
        : tarefas.filter(t => t.prioridade === prioridadeFiltro);


    // Função e variavel que deveriam gerar true apenas caso todas as tarefas estejam concluidas. 
    // (Não completamente implementado)
    const estaoConcluidas = (concluida) => concluida == true;
    const resultado = tarefas.every(estaoConcluidas)
    console.log(resultado)

    // Variavel que usa some() para definir se tem alguma prioridade alta.
    const seTemAlta = tarefas.some(tarefa => tarefa.prioridade === 'alta');


    // Exibição.
    return (
        <div>
            <h3>Bem vindo ao seu gerenciador de tarefas!</h3>
            <form onSubmit={adicionarTarefa}>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Digite sua tarefa"
                />
                <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                </select>
                <button>Adicionar Tarefa</button>
            </form>
            <p>
                Primeira pendente: {primeiraPendente ? primeiraPendente.titulo : 'Nenhuma'}
            </p>
            <p>
                {seTemAlta ? 'Há tarefas com prioridade alta.' : 'Não há tarefas com prioridade alta.'}
            </p>



            <button onClick={ordenarPorPrioridade}>Ordenar por prioridade</button>
            <label>Filtrar por prioridade: </label>
            <select
                value={prioridadeFiltro}
                onChange={(e) => setPrioridadeFiltro(e.target.value)}
            >
                <option value="nao_filtrar">Não filtrar</option>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
            </select>

            <p>
                Total de {total} tarefas | ✅ {concluidas} concluída(s) | ❌ {pendentes} pendente(s)
            </p>

            <ul>
                {tarefasFiltradas.map((tarefa) => (
                    <li key={tarefa.id} style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}>
                        {tarefa.titulo} - Prioridade: {tarefa.prioridade}
                        <button onClick={() => alterarConclusao(tarefa.id)}>
                            {tarefa.concluida ? '✔️' : '❌'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GerenciadorTarefas;
