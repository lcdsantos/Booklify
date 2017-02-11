# Booklify [![CircleCI](https://circleci.com/gh/lcdsantos/Booklify.svg?style=shield&circle-token=0ae2d6e920a3454d58528b86d35b3a5b41f81d6b)](https://circleci.com/gh/lcdsantos/Booklify)

Escolhi usar React pra esse projeto pois nao tenho muito costume de usar um framework JavaScript e React é o que eu mais tinha familiaridade, entendia o conceito e a sintaxe, mas mesmo assim, nunca tinha feito nada sério com ele.

Como tive pouquíssimo tempo livre para desenvolver (trabalho em tempo integral e demoro bastante no deslocamenteo), acabou que eu não consegui fazer tudo que eu queria.

Passei bastante tempo tentando resolver um problema na paginação e descobri que é um comportamento da própria API. Para não deixar a primeira chamada muito lenta para responder, o Google manda um valor aproximado de resultados para a busca. Isso dificulta na hora de fazer as contas e gerar a paginação. Mas depois de um tempo eu consegui gerar numa solução aceitável. Talvez não a melhor, mas funciona.

Outra coisa que aconteceu é que de uma hora pra outra a API começou a não responder mais, mas acontecia algo que no console mostrava os resultados, mas na tela não aparecia nada. O que occorreu foi que eu cheguei em um limíte de requisições. Foi só criar uma chave de acesso no [Google APIs Console](https://console.developers.google.com) que tudo voltou a funcionar.

Optei por usar o [Semantic-UI-React](http://react.semantic-ui.com/introduction) que é um projeto que eu acompanho há algum tempo mas nunca tive a oportunidade de realmente usá-lo.

Se eu tivesse mais tempo, eu provávelmente teria criado os componentes do zero, para ter mais controle.

## Como executar

Clone o repositório:
```bash
git clone https://github.com/lcdsantos/Booklify.git
```


Entre na pasta criada:
```bash
cd Booklify
```


Instale as dependências:
```
npm install
```


Inicialize os serviços:
```
npm start
```


A aplicação deverá estar disponível no endereço [http://localhost:3000/](http://localhost:3000/).
