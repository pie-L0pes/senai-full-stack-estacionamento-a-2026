const API = "http://localhost:3000/automovel";

const form = document.getElementById("formAutomovel");
const lista = document.getElementById("listaAutomoveis");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const automovel = {
        placa: document.getElementById("placa").value,
        proprietario: document.getElementById("proprietario").value,
        tipo: document.getElementById("tipo").value,
        modelo: document.getElementById("modelo").value,
        marca: document.getElementById("marca").value,
        cor: document.getElementById("cor").value || null,
        ano: document.getElementById("ano").value
            ? Number(document.getElementById("ano").value)
            : null,
        telefone: document.getElementById("telefone").value
    };

    await fetch(`${API}/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(automovel)
    });

    form.reset();

    listarAutomoveis();
});

async function listarAutomoveis() {

    const resposta = await fetch(`${API}/listar`);

    const automoveis = await resposta.json();

    lista.innerHTML = "";

    automoveis.forEach((item) => {

        lista.innerHTML += `
            <tr>
                <td>${item.placa}</td>
                <td>${item.proprietario}</td>
                <td>${item.modelo}</td>

                <td>
                    <button onclick="excluir('${item.placa}')">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

async function excluir(placa) {

    await fetch(`${API}/excluir/${placa}`, {
        method: "DELETE"
    });

    listarAutomoveis();
}

listarAutomoveis();