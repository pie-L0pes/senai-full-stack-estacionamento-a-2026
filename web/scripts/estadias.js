const API = "http://localhost:3000/estadia";

const form = document.getElementById("formEstadia");
const lista = document.getElementById("listaEstadias");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const estadia = {
        placa: document.getElementById("placa").value,
        valorHora: Number(document.getElementById("valorHora").value)
    };

    await fetch(`${API}/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(estadia)
    });

    form.reset();
    listarEstadias();
});

async function listarEstadias() {

    const resposta = await fetch(`${API}/listar`);
    const estadias = await resposta.json();

    lista.innerHTML = "";

    estadias.forEach((item) => {

        lista.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.placa}</td>
                <td>${new Date(item.entrada).toLocaleString()}</td>
                <td>
                    ${item.saida ? new Date(item.saida).toLocaleString() : "Em aberto"}
                </td>
                <td>
                    ${item.valorTotal ? `R$ ${item.valorTotal.toFixed(2)}` : "-"}
                </td>
                <td>
                    <button onclick="finalizar(${item.id})">
                        Finalizar
                    </button>

                    <button onclick="excluir(${item.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

async function finalizar(id) {

    await fetch(`${API}/atualizar/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            saida: new Date()
        })
    });

    listarEstadias();
}

async function excluir(id) {

    await fetch(`${API}/excluir/${id}`, {
        method: "DELETE"
    });

    listarEstadias();
}

listarEstadias();