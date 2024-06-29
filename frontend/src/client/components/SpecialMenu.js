export default function SpecialMenu(detailMenu){
  return(
    <div className='special-offer-card'>
      <div className='imgMenu'>
        <img src="" alt="" className=""/>
      </div>
      <p className="titleMenu bold">{detailMenu.name}</p>
      <p className="priceMenu reguler">IDR {detailMenu.price}K</p>
      <button type="button">
        <p className="medium">Add</p>
        <img src="/svgs/plus.svg" alt="plus"/>
      </button>
    </div>
  )
}