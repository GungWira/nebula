import SpecialMenu from './SpecialMenu'


export default function SpecialMenuBox(props){
  return(
    <div className='special-offer'>
      <p className='bold menu-head'>Special Offer</p>
      <div className='box-special-offer'>
      {props.data.map((spes) =>(
        <SpecialMenu name={spes.name} price={spes.price} key={spes.id}/>
      ))}
      </div>
    </div>
  )
}