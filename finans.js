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
    
    getProximoId () {
        //logica para incrementar id's no localstorage
        let proxId = parseInt(localStorage.getItem('id'))
        console.log(proxId)
        return  proxId +1
        
    }

    gravar(despesa) {
        //gravar objeto JSON com a CHAVE ID ATUALIZADA 
        let id = this.getProximoId()
        localStorage.setItem( id, JSON.stringify(despesa) )

        localStorage.setItem('id', id)
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
    let tipo = document.getElementsByName('tipo')[0]
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

function leapYear(year){
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}