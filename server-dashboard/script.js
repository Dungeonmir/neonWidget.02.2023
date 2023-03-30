
let data = [
    {
      image: 'https://via.placeholder.com/500x500/cccccc/615f5f?text=Text',
      width: '43.43',
      height: '54.55',
      price: '6543',
      phone: '83434333',
      elements: '7'
    },
    {
        image: 'https://via.placeholder.com/500x500/cccccc/615f5f?text=Why',
        width: '43.43',
        height: '54.55',
        price: '5664',
        phone: '83434333',
        elements: '7'
      },
      {
        image: 'https://via.placeholder.com/500x500/cccccc/615f5f?text=Something',
        width: '43.43',
        height: '54.55',
        price: '3644',
        phone: '83434333',
        elements: '20'
      },
  ];

fetch('http://localhost:5501/')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    insertCards(data)
  })
  .catch(error => {
    console.error('Error fetching JSON: ', error);
  });


function createCard({image, width, height, price, phone, elements}){
    const card = `

<div class="card flex-basis-25">
                <img src="${image}" class="card flex-basis-25-img-top" alt="">
                <div class="card flex-basis-25-body container" >
                    <div class="row">
                        <h5 class="card-title">Номер <span>${phone}</span></h5>
                    </div>
                    <div class="row">
                        <div class="col">
                            <p>В x Ш: </p>
                        </div>
                        <div class="col text-end">
                            <p>${width} мм x ${height} мм</p>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <p>Примерная стоимость: </p>
                        </div>
                        <div class="col text-end">
                            <p>${price} р.</p>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <p>Кол-во элементов: </p>
                        </div>
                        <div class="col text-end">
                            <p>${elements}</p>
                        </div>
                    </div>
                    
                    
                    
                </div>
            </div>

`
    return card
}

function insertCards(data){
    const container = document.getElementById('cards-container');

    data.forEach((element)=>{
        const card = createCard(element)
        container.insertAdjacentHTML('beforeend', card)
    })
}
