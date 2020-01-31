class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.valor = descricao
        this.descricao = valor
    }

    validaDados () {
        for (let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }

}

class Bd {
    
    constructor () {
        //verificar se exite algum id cadastrado
        let id = localStorage.getItem('id')
        console.log(id)

        if (id === null) {
            localStorage.setItem('id' , 0)
        } 
    }

    pesquisar (despesa) {
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()
        console.log('completo',despesasFiltradas)


        if(despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter( d => d.ano == despesa.ano)
        }

        if(despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter( d => d.mes == despesa.mes)
        }

        if(despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter( d => d.dia == despesa.dia)
        }
        if(despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter( d => d.tipo == despesa.tipo)
        }

        if(despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter( d => d.descricao == despesa.descricao)
        }

        if(despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter( d => d.valor == despesa.valor)
        }

        return despesasFiltradas
        
    }
    
    getProximoId () {
        //logica para incrementar id's no localstorage
        let proxId = parseInt(localStorage.getItem('id'))
        return  proxId +1
        
    }

    gravar(despesa) {
        //gravar objeto JSON com a CHAVE ID ATUALIZADA 
        let id = this.getProximoId()
        localStorage.setItem( id, JSON.stringify(despesa) )

        localStorage.setItem('id', id)
    }

    remover (id) {
        console.log(id)
        localStorage.removeItem(id)

        //remover classes de sucesso
        document.getElementById('modal-btn').classList.remove('btn-danger')
        document.getElementById('modal-div').classList.remove('text-danger')

        //adicionar formatação de erro
        document.getElementById('modal-btn').classList.add('btn-success')
        document.getElementById('modal-btn').innerHTML = 'Voltar'
        document.getElementById('modal-div').classList.add('text-success')
        document.getElementById('modal-titulo').innerHTML = 'Deletar despesa'
        document.getElementById('modal-corpo').innerHTML = 'Despesa removida com sucesso'
        $('#sucessoGravacao').modal('show')

         //limpar dados dos inputs
         document.getElementById('modal-btn').addEventListener('click',function () {location.reload()})

    }

    recuperarTodosRegistros () {
        let despesas = Array()
        let id = localStorage.getItem('id')

        for (let index = 1; index <= id; index++) {
            
            let despesa = JSON.parse(localStorage.getItem(index))
            if (despesa != null) {
                despesa.id = index
                despesas.push(despesa)    
            }
            
        }

        return despesas
    }
}

let bd = new Bd ()

function cadastrarDespesa () {

    //recuperar dados dos inputs e criar objeto literal
    let ano = document.getElementsByName('ano')[0].options[
        document.getElementsByName('ano')[0].selectedIndex
    ]
    let mes = document.getElementsByName('mes')[0].options[
        document.getElementsByName('mes')[0].selectedIndex
    ]
    let dia = document.getElementsByName('dia')[0].options[
        document.getElementsByName('dia')[0].selectedIndex
    ]
    let tipo = document.getElementsByName('tipo')[0].options[
        document.getElementsByName('tipo')[0].selectedIndex
    ]
    let descricao = document.getElementsByName('descricao')[0]
    let valor = document.getElementsByName('valor')[0]

    let despesa = new Despesa (
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        valor.value,
        descricao.value
    )


    if (despesa.validaDados()) {
        bd.gravar(despesa)

        //remover classes de erro
        document.getElementById('modal-btn').classList.remove('btn-danger')
        document.getElementById('modal-div').classList.remove('text-danger')

        //adicionar formatação de sucesso
        document.getElementById('modal-btn').classList.add('btn-success')
        document.getElementById('modal-btn').innerHTML = 'Voltar'
        document.getElementById('modal-div').classList.add('text-success')
        document.getElementById('modal-titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal-titulo').innerHTML = 'Despesa foi cadastrada com sucesso'

        $('#sucessoGravacao').modal('show')
        //limpar dados dos inputs
        document.getElementById('modal-btn').addEventListener('click',function () {location.reload()})
    } else {
        //remover classes de sucesso
        document.getElementById('modal-btn').classList.remove('btn-success')
        document.getElementById('modal-div').classList.remove('text-success')

        //adicionar formatação de erro
        document.getElementById('modal-btn').classList.add('btn-danger')
        document.getElementById('modal-btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal-div').classList.add('text-danger')
        document.getElementById('modal-titulo').innerHTML = 'Erro na gravação'
        document.getElementById('modal-corpo').innerHTML = 'Existem campos obrigatório que não foram prenchidos'
        $('#sucessoGravacao').modal('show')
    }


}
function recarregar() {
    //location.reload()
}
function carregaListaDespesas (despesas = Array(), filtro = false) {

    if (despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros()
    }
    
    let total = 0

    let listaDespesas = document.getElementById('lista-despesas')
    
    /*
    <tr>
        0 = <td scope="row"></td>
        1 = <td></td>
        2 = <td></td>
        3 = <td></td>
    </tr>
    */

    despesas.forEach( function(d) {
        //criar a linha na tabela
        let linha = listaDespesas.insertRow()
        
        //criar colunas
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        total += parseFloat(d.valor)

        let btn = document.createElement('button')

        btn.className = 'btn btn-danger font-weight-bold'
        btn.innerHTML = 'x'
        btn.id = `id-despesa-${d.id}` 
        btn.onclick = function() {
            let id = this.id.replace('id-despesa-','')
            bd.remover(id)
        }
        console.log(btn)

        linha.insertCell(4).append(btn)
        
    })

    totalDespesas = document.getElementById('total')
    totalDespesas.innerHTML = total.toFixed(2)
    
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let total = 0

    let despesasFiltradas = Array()

    let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)

    despesasFiltradas = bd.pesquisar(despesa)

    let listaDespesas = document.getElementById('lista-despesas')

    listaDespesas.innerHTML = ''

    carregaListaDespesas(despesasFiltradas,true)
    
}

function leapYear(year){
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}