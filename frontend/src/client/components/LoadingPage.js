import logo from '../assets/svgs/logo_nebula.svg'

export default function LoadingPage(){
  return(
      <section className="loading_screen">
        <div className="container">
          <div className="box_logo">
            <img src={logo} alt="" className="logo"/>
            <p className="title title_logo">nebula</p>
            <div className="subtitle box_subtitle">
              <p className="subtitle subtitle_logo">LOUNGE</p>
              <div className="dot"></div>
              <p className="subtitle subtitle_logo">BALI</p>
            </div>
          </div>
        </div>
      </section>
  )
}