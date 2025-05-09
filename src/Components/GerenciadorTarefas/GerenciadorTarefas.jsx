import { useState } from "react";

function GerenciadorTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [id, setId] = useState(1);
    const [titulo, setTitulo] = useState('');
    const [prioridade, setPrioridade] = useState('baixa');
    const [concluida, setConcluida] = useState(false);
    const [prioridadeFiltro, setPrioridadeFiltro] = useState('nao_filtrar');
    const adicionarTarefa = (e) => {
        e.preventDefault();

        const novaTarefa = {
            id: id,
            titulo,
            prioridade,
            concluida,
        };

        setTarefas([...tarefas, novaTarefa]);
        setTitulo('');
        setPrioridade('baixa');
        setId(id + 1);
    };

    function alterarConclusao(idTarefa) {
        setTarefas((tarefasAnteriores) =>
            tarefasAnteriores.map((t) =>
                t.id === idTarefa ? { ...t, concluida: !t.concluida } : t
            )
        );
    }


    function contarTarefas(prioridadeTarefa) {
        return tarefas.reduce((contador, tarefa) => {
            if (prioridadeTarefa === 'nao_filtrar' || tarefa.prioridade === prioridadeTarefa) {
                return contador + 1;
            }
            return contador;
        }, 0);
    }
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



    const tarefasFiltradas = prioridadeFiltro === 'nao_filtrar'
        ? tarefas
        : tarefas.filter(t => t.prioridade === prioridadeFiltro);

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
            {(() => {
                const total = contarTarefas(prioridadeFiltro);
                const { concluidas, pendentes } = contarPendentesEConcluidas(prioridadeFiltro);
                return (
                    <p>
                        Total de {total} tarefas | ✅ {concluidas} concluída(s) | ❌ {pendentes} pendente(s)
                    </p>
                );
            })()}

            <ul>
                {tarefasFiltradas.map((tarefa) => (
                    <li key={tarefa.id}>
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
